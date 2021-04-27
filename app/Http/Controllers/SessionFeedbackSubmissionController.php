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
}
