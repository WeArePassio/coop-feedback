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
            'gain' => rand(0,1) ? $this->faker->sentence : null,
            'interest' =>  rand(0,1) ? $this->faker->sentence : null,
        ];
    }
}
