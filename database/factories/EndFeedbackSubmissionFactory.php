<?php

namespace Database\Factories;

use App\Models\EndFeedbackSubmission;
use Illuminate\Database\Eloquent\Factories\Factory;

class EndFeedbackSubmissionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = EndFeedbackSubmission::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'improve_project' => $this->faker->sentence,
            'favourite_activities' => $this->faker->sentence,
        ];
    }
}
