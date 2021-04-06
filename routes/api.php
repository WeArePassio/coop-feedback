<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\QuestionTheme;
use App\Http\Controllers\ProjectFeedbackSubmissionController;
use App\Models\ProjectFeedbackSubmission;

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

Route::prefix('project')->group(function () {
    Route::get('/questions', function() {
        return QuestionTheme::all();
    });
    Route::post('/submissions/{type}', [ProjectFeedbackSubmissionController::class, 'submit']);
    Route::get('/submissions', function() {
        return ProjectFeedbackSubmission::all();
    });
});

Route::prefix('session')->group(function () {
});