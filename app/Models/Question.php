<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;
    protected $fillable = ['question_theme_id', 'title'];

    public function theme()
    {
        return $this->belongsTo(QuestionTheme::class, 'question_theme_id');
    }
}
