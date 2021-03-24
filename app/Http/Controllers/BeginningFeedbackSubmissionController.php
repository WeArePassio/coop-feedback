<?php

namespace App\Http\Controllers;

use App\Models\BeginningFeedbackSubmission;
use App\Models\BeginningFeedbackRating;
use Illuminate\Http\Request;

class BeginningFeedbackSubmissionController extends Controller
{
    public function submit(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'who_am_i' => 'required',
            'why_am_i_here' => 'required',
            'question_ratings' => 'required|array',
            'question_ratings.*.question_id' => 'required',
            'question_ratings.*.rating' => 'required|integer',
        ]);
        $submission = BeginningFeedbackSubmission::create([
            'name' => $validatedData['name'],
            'who_am_i' => $validatedData['who_am_i'],
            'why_am_i_here' => $validatedData['why_am_i_here'],
        ]);
        foreach ($validatedData['question_ratings'] as $question_rating) {
            $rating = BeginningFeedbackRating::create([
                'beginning_feedback_submission_id' => $submission->id,
                'question_id' => $question_rating['question_id'],
                'rating' => $question_rating['rating'],
            ]);
        }
        return response()->json($submission->fresh());
    }
}
