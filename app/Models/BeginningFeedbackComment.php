<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BeginningFeedbackComment extends Model
{
    use HasFactory;
    protected $fillable = ['beginning_feedback_submission_id', 'question_theme_id', 'text'];
}
