<?php

namespace Database\Factories;

use App\Models\BeginningFeedbackSubmission;
use Illuminate\Database\Eloquent\Factories\Factory;

class BeginningFeedbackSubmissionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = BeginningFeedbackSubmission::class;

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
