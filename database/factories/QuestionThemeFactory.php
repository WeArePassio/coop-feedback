<?php

namespace Database\Factories;

use App\Models\QuestionTheme;
use Illuminate\Database\Eloquent\Factories\Factory;

class QuestionThemeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = QuestionTheme::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            "title" => $this->faker->unique()->word,
        ];
    }
}
