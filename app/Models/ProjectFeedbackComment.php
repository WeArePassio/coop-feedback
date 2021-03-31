<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectFeedbackComment extends Model
{
    use HasFactory;
    protected $fillable = ['project_feedback_submission_id', 'question_theme_id', 'text'];
}
