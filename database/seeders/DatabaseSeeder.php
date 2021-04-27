<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Cohort;
use App\Models\ProjectFeedbackSubmission;
use App\Models\ProjectFeedbackRating;
use App\Models\ProjectFeedbackComment;
use App\Models\SessionFeedbackSubmission;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \Artisan::call('data:import');
        Cohort::factory(10)
            ->has(
                SessionFeedbackSubmission::factory(60)
            )->has(
                ProjectFeedbackSubmission::factory(10)->beginning()
                    ->has(ProjectFeedbackRating::factory(15))
                    ->has(ProjectFeedbackComment::factory(3))
            )->has(
                ProjectFeedbackSubmission::factory(10)->end()
                    ->has(ProjectFeedbackRating::factory(15))
                    ->has(ProjectFeedbackComment::factory(3))
            )->create();
    }
}
