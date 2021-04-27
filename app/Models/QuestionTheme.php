<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuestionTheme extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'question_theme_metric_id'];
    protected $with = ['questions', 'questionThemeMetric'];

    public function questions()
    {
        return $this->hasMany(Question::class);
    }

    public function questionThemeMetric()
    {
        return $this->belongsTo(QuestionThemeMetric::class);
    }
}
