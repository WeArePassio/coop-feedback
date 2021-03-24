<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BeginningFeedbackSubmission extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'who_am_i', 'why_am_i_here'];
    protected $with = ['beginningFeedbackRatings', 'beginningFeedbackComments'];

    public function beginningFeedbackRatings()
    {
        return $this->hasMany(BeginningFeedbackRating::class);
    }

    public function beginningFeedbackComments()
    {
        return $this->hasMany(BeginningFeedbackComment::class);
    }
}
