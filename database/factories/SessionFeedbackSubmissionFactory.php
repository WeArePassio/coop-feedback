<?php

namespace Database\Factories;

use App\Models\SessionFeedbackSubmission;
use Illuminate\Database\Eloquent\Factories\Factory;

class SessionFeedbackSubmissionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = SessionFeedbackSubmission::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'enjoyment_rating' => $this->faker->numberBetween(1,5),
            'enjoyed_most' => $this->faker->sentence(),
            'changes' => $this->faker->sentence(),
            'other_topics' => $this->faker->sentence(),
            'democracy' => $this->faker->boolean(),
            'self_help' => $this->faker->boolean(),
            'self_responsibility' => $this->faker->boolean(),
            'equality' => $this->faker->boolean(),
            'equity' => $this->faker->boolean(),
            'solidarity' => $this->faker->boolean(),
            'openness' => $this->faker->boolean(),
            'honesty' => $this->faker->boolean(),
            'social_responsibility' => $this->faker->boolean(),
            'created_at' => $this->faker->dateTimeBetween($startDate = '-6 months', $endDate = 'now'),
        ];
    }
}
