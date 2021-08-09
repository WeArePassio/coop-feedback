<?php

namespace App\Http\Controllers;

use App\Models\ProjectFeedbackSubmission;
use App\Models\BeginningFeedbackSubmission;
use App\Models\EndFeedbackSubmission;
use App\Models\ProjectFeedbackRating;
use App\Models\ProjectFeedbackComment;
use App\Models\Cohort;
use App\Models\Question;
use App\Models\QuestionTheme;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ProjectFeedbackSubmissionController extends Controller
{
    public function submit(Request $request, $type)
    {
        $validatedData = $request->validate([
            'cohort_token' => 'required|string',
            'name' => 'required|string',
            'gain' => 'nullable|string',
            'interest' => 'nullable|string',
            'image' => 'nullable|image',
            'improve_project' => 'nullable|string',
            'favourite_activities' => 'nullable|string',
            'question_ratings' => 'required|json',
            'theme_comments' => 'required|json',
        ]);

        $cohort = Cohort::where('token', $validatedData['cohort_token'])->first();
        if (!$cohort) {
            throw ValidationException::withMessages([
                'cohort_token' => ['No matching cohort was found with this token'],
            ]);
        }

        if ($type === 'beginning') {
            $submission = BeginningFeedbackSubmission::create([
                'gain' => isset($validatedData['gain']) ? $validatedData['gain'] : null,
                'interest' => isset($validatedData['interest']) ? $validatedData['interest'] : null,
            ]);

            if (isset($validatedData['image'])) {
                $path = $validatedData['image']->storePublicly('user_images');
                $submission->image = $path;
                $submission->save();
            }
        } else {
            $submission = EndFeedbackSubmission::create([
                'improve_project' => isset($validatedData['improve_project']) ? $validatedData['improve_project'] : null,
                'favourite_activities' => isset($validatedData['favourite_activities']) ? $validatedData['favourite_activities'] : null,
            ]);
        }
        $projectSubmission = ProjectFeedbackSubmission::create([
            'cohort_id' => $cohort->id,
            'name' => $validatedData['name'],
            'submission_id' => $submission->id,
            'submission_type' => get_class($submission),
        ]);

        foreach (json_decode($validatedData['question_ratings'], true) as $question_rating) {
            $rating = ProjectFeedbackRating::create([
                'project_feedback_submission_id' => $projectSubmission->id,
                'question_id' => $question_rating['question_id'],
                'rating' => $question_rating['rating'],
            ]);
        }
        foreach (json_decode($validatedData['theme_comments'], true) as $theme_comment) {
            $comment = ProjectFeedbackComment::create([
                'project_feedback_submission_id' => $projectSubmission->id,
                'question_theme_id' => $theme_comment['question_theme_id'],
                'text' => $theme_comment['text'],
            ]);
        }
        return response()->json($projectSubmission->fresh());
    }

    public function submissions($cohortToken)
    {
        $cohort = Cohort::where('token', $cohortToken)->first();
        if (!$cohort) {
            throw ValidationException::withMessages([
                'cohort_token' => ['No matching cohort was found with this token'],
            ]);
        }
        return ProjectFeedbackSubmission::where('cohort_id', $cohort->id)->get();
    }

    public function export($cohort_token)
    {
        $cohort = Cohort::where('token', $cohort_token)->first();
        if (!$cohort) {
            throw ValidationException::withMessages([
                'cohort_token' => ['No matching cohort was found with this token'],
            ]);
        }
        $fileName = 'project-feedback.csv';
        $submissions = $cohort->projectFeedbackSubmissions;

        $columns = array('cohort_token', 'beginning/end', 'name', 'created_at', 'beginning_gain', 'beginning_interest', 'end_improve_project', 'end_favourite_activities');
        // Add a column for each question
        $questions = Question::all();
        foreach ($questions as $question) {
            array_push($columns, "question_" . $question->id . "_rating");
        }
        $themes = QuestionTheme::all();
        foreach ($themes as $theme) {
            array_push($columns, "theme_" . $theme->id . "_comment");
        }

        $callback = function () use ($cohort_token, $submissions, $columns, $questions) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $columns);
            foreach ($submissions as $submission) {
                $row = [];
                $row['cohort_token'] = $cohort_token;
                $row['name'] = $submission->name;
                $row['created_at'] = $submission->created_at;
                if ($submission->submission_type === 'App\Models\BeginningFeedbackSubmission') {
                    $row['beginning/end'] = 'start';
                    $row['beginning_gain'] = $submission->submission->gain;
                    $row['beginning_interest'] = $submission->submission->interest;
                    $row['end_improve_project'] = '';
                    $row['end_favourite_activities'] = '';
                } else {
                    $row['beginning/end'] =  'end';
                    $row['beginning_gain'] = '';
                    $row['beginning_interest'] = '';
                    $row['end_improve_project'] = $submission->submission->improve_project;
                    $row['end_favourite_activities'] = $submission->submission->favourite_activities;
                }
                $ratings = $submission->projectFeedbackRatings;
                foreach ($ratings as $rating) {
                    $row["question_" . $rating->question_id . "_rating"] = $rating->rating;
                }
                $comments = $submission->projectFeedbackComments;
                foreach ($comments as $comment) {
                    $row["theme_" . $comment->question_theme_id . "_comment"] = $comment->text;
                }

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
