<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BeginningFeedbackSubmission extends Model
{
    use HasFactory;
    protected $fillable = ['gain', 'interest', 'interest', 'image'];
    public function submission()
    {
        return $this->morphOne(ProjectFeedbackSubmission::class, 'submission');
    }
}
