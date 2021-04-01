<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SessionFeedbackSubmission extends Model
{
    use HasFactory;
    protected $fillable = ['enjoyment_rating', 'enjoyed_most', 'democracy', 'self_help', 'self_responsibility', 'equality', 'equity', 'solidarity', 'openness', 'honesty', 'social_responsibility'];
}
