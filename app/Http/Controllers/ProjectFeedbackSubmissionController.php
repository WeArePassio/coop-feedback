<?php

namespace App\Http\Controllers;

use App\Models\ProjectFeedbackSubmission;
use App\Models\BeginningFeedbackSubmission;
use App\Models\EndFeedbackSubmission;
use App\Models\ProjectFeedbackRating;
use App\Models\ProjectFeedbackComment;
use Illuminate\Http\Request;

class ProjectFeedbackSubmissionController extends Controller
{
    public function submit(Request $request, $type)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'who_am_i' => 'string',
            'why_am_i_here' => 'string',
            'image' => 'image',
            'improve_project' => 'string',
            'favourite_activities' => 'string',
            'question_ratings' => 'required|json',
            'theme_comments' => 'required|json',
        ]);

        if ($type === 'beginning') {
            $submission = BeginningFeedbackSubmission::create([
                'who_am_i' => $validatedData['who_am_i'],
                'why_am_i_here' => $validatedData['why_am_i_here'],
            ]);

            $path = $validatedData['image']->storePublicly('user_images');
            $submission->image = $path;
            $submission->save();
        } else {
            $submission = EndFeedbackSubmission::create([
                'improve_project' => $validatedData['improve_project'],
                'favourite_activities' => $validatedData['favourite_activities'],
            ]);
        }
        $projectSubmission = ProjectFeedbackSubmission::create([
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
