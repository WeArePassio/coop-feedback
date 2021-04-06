<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SessionFeedbackSubmission;

class SessionFeedbackSubmissionController extends Controller
{
    public function submit(Request $request)
    {
        $validatedData = $request->validate([
            'enjoyment_rating' => 'required|integer',
            'enjoyed_most' => 'string',
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
        $sessionSubmission = SessionFeedbackSubmission::create($validatedData);
        return response()->json($sessionSubmission->fresh());
    }
}
