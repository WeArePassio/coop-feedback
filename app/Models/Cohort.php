<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Str;

class Cohort extends Model
{
    use HasFactory;
    protected $fillable = ['salesforce_id', 'token'];
    protected $appends = ['links'];

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

    public function getLinksAttribute()
    {
        return [
            'projectBeginningFeedback' => url('/project/beginning/'.$this->token),
            'projectEndFeedback' => url('/project/end/'.$this->token),
            'sessionFeedback' => url('/session/'.$this->token),
            'projectSubmissions' => url('/project/submissions/'.$this->token),
            'sessionSubmissions' => url('/session/submissions/'.$this->token),
        ];
    }
}
