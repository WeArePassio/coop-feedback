<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectFeedbackSubmission extends Model
{
    use HasFactory;
    protected $fillable = ['name'];
    protected $with = ['submission', 'projectFeedbackRatings', 'projectFeedbackComments'];

    public function projectFeedbackRatings()
    {
        return $this->hasMany(ProjectFeedbackRating::class);
    }

    public function projectFeedbackComments()
    {
        return $this->hasMany(ProjectFeedbackComment::class);
    }

    public function submission()
    {
        return $this->morphTo();
    }
}
