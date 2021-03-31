<?php

namespace Database\Factories;

use App\Models\ProjectFeedbackRating;
use App\Models\Question;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProjectFeedbackRatingFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ProjectFeedbackRating::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            "rating" => rand(1,5),
            "question_id" => Question::all()->random()->id,
        ];
    }
}
