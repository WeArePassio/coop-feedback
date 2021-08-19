<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SessionFeedbackSubmission;
use App\Models\Cohort;
use Illuminate\Validation\ValidationException;

class SessionFeedbackSubmissionController extends Controller
{
    public function submit(Request $request)
    {
        $validatedData = $request->validate([
            'cohort_token' => 'required|string',
            'enjoyment_rating' => 'required|integer',
            'enjoyed_most' => 'string',
            'changes' => 'string',
            'other_topics' => 'string',
            'democracy' => 'boolean',
            'self_help' => 'boolean',
            'self_responsibility' => 'boolean',
            'equality' => 'boolean',
            'equity' => 'boolean',
            'solidarity' => 'boolean',
            'openness' => 'boolean',
            'honesty' => 'boolean',
            'social_responsibility' => 'boolean',
            'caring_for_others' => 'boolean',
        ]);
        $cohort = Cohort::where('token', $validatedData['cohort_token'])->first();
        if (!$cohort) {
            throw ValidationException::withMessages([
                'cohort_token' => ['No matching cohort was found with this token'],
            ]);
        }
        $validatedData['cohort_id'] = $cohort->id;
        $sessionSubmission = SessionFeedbackSubmission::create($validatedData);
        return response()->json($sessionSubmission->fresh());
    }

    public function submissions($cohortToken)
    {
        $cohort = Cohort::where('token', $cohortToken)->first();
        if (!$cohort) {
            throw ValidationException::withMessages([
                'cohort_token' => ['No matching cohort was found with this token'],
            ]);
        }
        return SessionFeedbackSubmission::where('cohort_id', $cohort->id)->get();
    }

    public function export(Request $request, $cohort_token)
    {
        $cohort = Cohort::where('token', $cohort_token)->first();
        if (!$cohort) {
            throw ValidationException::withMessages([
                'cohort_token' => ['No matching cohort was found with this token'],
            ]);
        }
        $fileName = 'session-feedback.csv';
        $submissions = $cohort->sessionFeedbackSubmissions;

        $columns = array('cohort_token', 'created_at', 'enjoyment_rating', 'enjoyed_most', 'changes', 'other_topics', 'democracy', 'self_help', 'self_responsibility', 'equality', 'equity', 'solidarity', 'openness', 'honesty', 'social_responsibility', 'caring_for_others');

        $callback = function () use ($cohort_token, $submissions, $columns) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $columns);
            foreach ($submissions as $submission) {
                $row = [];
                $row['cohort_token'] = $cohort_token;
                $row['created_at'] = $submission->created_at;
                $row['enjoyment_rating'] = $submission->enjoyment_rating;
                $row['enjoyed_most'] = $submission->enjoyed_most;
                $row['changes'] = $submission->changes;
                $row['other_topics'] = $submission->other_topics;
                $row['democracy'] = $submission->democracy;
                $row['self_help'] = $submission->self_help;
                $row['self_responsibility'] = $submission->self_responsibility;
                $row['equality'] = $submission->equality;
                $row['equity'] = $submission->equity;
                $row['solidarity'] = $submission->solidarity;
                $row['openness'] = $submission->openness;
                $row['honesty'] = $submission->honesty;
                $row['social_responsibility'] = $submission->social_responsibility;
                $row['caring_for_others'] = $submission->caring_for_others;

                fputcsv($file, array_values($row));
            }
            fclose($file);
        };

        $headers = array(
            "Content-type"        => "text/csv",
            "Content-Disposition" => "attachment; filename=$fileName",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        );
        return response()->stream($callback, 200, $headers);
    }
}
