<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BeginningFeedbackSubmission extends Model
{
    use HasFactory;
    protected $fillable = ['who_am_i', 'why_am_i_here', 'why_am_i_here', 'image'];
    public function submission()
    {
        return $this->morphOne(ProjectFeedbackSubmission::class, 'submission');
    }
}
