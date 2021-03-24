<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\QuestionTheme;
use App\Http\Controllers\BeginningFeedbackSubmissionController;
use App\Models\BeginningFeedbackSubmission;

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

Route::get('/questions', function() {
    return QuestionTheme::all();
});

Route::get('/submissions', function() {
    return BeginningFeedbackSubmission::all();
});
Route::post('/submissions', [BeginningFeedbackSubmissionController::class, 'submit']);