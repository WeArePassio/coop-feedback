<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectFeedbackSubmission extends Model
{
    use HasFactory;
    protected $fillable = ['cohort_id', 'name', 'submission_type', 'submission_id'];
    protected $with = ['submission', 'projectFeedbackRatings', 'projectFeedbackComments'];

    public function projectFeedbackRatings()
    {
        return $this->hasMany(ProjectFeedbackRating::class)->orderBy('question_id');
    }

    public function projectFeedbackComments()
    {
        return $this->hasMany(ProjectFeedbackComment::class)->orderBy('question_theme_id');
    }

    public function submission()
    {
        return $this->morphTo();
    }
}
