<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectFeedbackRating extends Model
{
    use HasFactory;
    protected $fillable = ['project_feedback_submission_id', 'question_id', 'rating'];
}
