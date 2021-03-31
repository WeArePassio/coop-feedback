<?php

namespace Database\Factories;

use App\Models\ProjectFeedbackComment;
use App\Models\QuestionTheme;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProjectFeedbackCommentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ProjectFeedbackComment::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            "question_theme_id" => QuestionTheme::all()->random()->id,
            "text" => $this->faker->sentence,
        ];
    }
}
