<?php

namespace Database\Factories;

use App\Models\BeginningFeedbackResponse;
use Illuminate\Database\Eloquent\Factories\Factory;

class BeginningFeedbackResponseFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = BeginningFeedbackResponse::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name,
            'who_am_i' => $this->faker->sentence,
            'why_am_i_here' => $this->faker->sentence,
        ];
    }
}
