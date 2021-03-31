<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EndFeedbackSubmission extends Model
{
    use HasFactory;
    protected $fillable = ['improve_project', 'favourite_activities'];
    public function submission()
    {
        return $this->morphOne(ProjectFeedbackSubmission::class, 'submission');
    }
}
