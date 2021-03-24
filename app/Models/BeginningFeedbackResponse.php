<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BeginningFeedbackResponse extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'who_am_i', 'why_am_i_here'];
}
