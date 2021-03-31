<?php

namespace Database\Factories;

use App\Models\ProjectFeedbackSubmission;
use App\Models\BeginningFeedbackSubmission;
use App\Models\EndFeedbackSubmission;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProjectFeedbackSubmissionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ProjectFeedbackSubmission::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name,
        ];
    }

    public function beginning()
    {
        return $this->state(function (array $attributes) {
            $submission = BeginningFeedbackSubmission::factory()->create();
            return [
                'submission_type' => BeginningFeedbackSubmission::class,
                'submission_id' => $submission->id,
            ];
        });
    }

    public function end()
    {
        return $this->state(function (array $attributes) {
            $submission = EndFeedbackSubmission::factory()->create();
            return [
                'submission_type' => EndFeedbackSubmission::class,
                'submission_id' => $submission->id,
            ];
        });
    }
}
