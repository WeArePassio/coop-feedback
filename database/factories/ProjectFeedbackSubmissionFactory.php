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
    public $counter = 0;

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
        return $this->state(function (array $attributes, $parent) {
            // Names for beginning & end feedback should mostly match
            $beginningNames = ProjectFeedbackSubmission::where('cohort_id', $parent->id)->where('submission_type', 'App\Models\BeginningFeedbackSubmission')->get()->pluck('name')->toArray();
            // We use a counter to know how many times this function has been invoked
            $randomName = $beginningNames[$this->counter];
            $this->counter += 1;

            // Simulate typos for 25% of submissions
            $randomName = (rand(0, 4) === 4) ? $randomName . 'a' : $randomName;
            $submission = EndFeedbackSubmission::factory()->create();
            return [
                'name' => $randomName,
                'submission_type' => EndFeedbackSubmission::class,
                'submission_id' => $submission->id,
            ];
        });
    }
}
