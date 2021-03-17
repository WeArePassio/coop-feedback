<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuestionTheme extends Model
{
    use HasFactory;
    protected $fillable = ['title'];
    protected $with = ['questions'];

    public function questions()
    {
        return $this->hasMany(Question::class);
    }
}
