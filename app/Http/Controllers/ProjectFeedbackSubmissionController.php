<?php

namespace App\Http\Controllers;

use App\Models\ProjectFeedbackSubmission;
use App\Models\BeginningFeedbackSubmission;
use App\Models\EndFeedbackSubmission;
use App\Models\ProjectFeedbackRating;
use App\Models\ProjectFeedbackComment;
use App\Models\Cohort;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ProjectFeedbackSubmissionController extends Controller
{
    public function submit(Request $request, $type)
    {
        $validatedData = $request->validate([
            'cohort_token' => 'required|string',
            'name' => 'required|string',
            'who_am_i' => 'nullable|string',
            'why_am_i_here' => 'nullable|string',
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
                'who_am_i' => isset($validatedData['who_am_i']) ? $validatedData['who_am_i'] : null,
                'why_am_i_here' => isset($validatedData['why_am_i_here']) ? $validatedData['why_am_i_here'] : null,
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
}
