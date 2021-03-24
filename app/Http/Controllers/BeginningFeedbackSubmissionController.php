<?php

namespace App\Http\Controllers;

use App\Models\BeginningFeedbackSubmission;
use Illuminate\Http\Request;

class BeginningFeedbackSubmissionController extends Controller
{
    public function submit(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'who_am_i' => 'required',
            'why_am_i_here' => 'required',
        ]);
        $submission = BeginningFeedbackSubmission::create([
            'name' => $validatedData['name'],
            'who_am_i' => $validatedData['who_am_i'],
            'why_am_i_here' => $validatedData['why_am_i_here'],
        ]);
        return response()->json($submission);
    }
}
