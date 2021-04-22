<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Str;

class Cohort extends Model
{
    use HasFactory;
    protected $fillable = ['salesforce_id', 'token'];

    public function projectFeedbackSubmissions()
    {
        return $this->hasMany(ProjectFeedbackSubmission::class);
    }

    public function sessionFeedbackSubmissions()
    {
        return $this->hasMany(SessionFeedbackSubmission::class);
    }

    public static function generateToken()
    {
        return Str::uuid();
    }
}
