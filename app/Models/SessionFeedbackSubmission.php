<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SessionFeedbackSubmission extends Model
{
    use HasFactory;
    protected $fillable = ['cohort_id', 'enjoyment_rating', 'enjoyed_most', 'changes', 'other_topics', 'democracy', 'self_help', 'self_responsibility', 'equality', 'equity', 'solidarity', 'openness', 'honesty', 'social_responsibility'];
}
