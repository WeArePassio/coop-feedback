<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuestionThemeMetric extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'heading', 'label1', 'label2', 'label3', 'label4', 'label5'];
}
