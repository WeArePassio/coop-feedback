<?php

use App\Http\Controllers\CohortController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\QuestionTheme;
use App\Http\Controllers\ProjectFeedbackSubmissionController;
use App\Http\Controllers\SessionFeedbackSubmissionController;
use App\Models\ProjectFeedbackSubmission;
use App\Models\SessionFeedbackSubmission;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/cohorts/{salesforce_name}', [CohortController::class, 'store']);

Route::prefix('project')->group(function () {
    Route::get('/questions', function () {
        return QuestionTheme::all();
    });
    Route::post('/submissions/{type}', [ProjectFeedbackSubmissionController::class, 'submit']);
    Route::get('/submissions/{cohort_token}', [ProjectFeedbackSubmissionController::class, 'submissions']);
    Route::get('/submissions/{cohort_token}/export', [ProjectFeedbackSubmissionController::class, 'export']);
});

Route::prefix('session')->group(function () {
    Route::post('/submissions', [SessionFeedbackSubmissionController::class, 'submit']);
    Route::get('/submissions/{cohort_token}', [SessionFeedbackSubmissionController::class, 'submissions']);
    Route::get('/submissions/{cohort_token}/export', [SessionFeedbackSubmissionController::class, 'export']);
});
