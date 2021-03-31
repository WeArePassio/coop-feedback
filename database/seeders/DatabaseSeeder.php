<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Question;
use App\Models\QuestionTheme;
use App\Models\ProjectFeedbackSubmission;
use App\Models\ProjectFeedbackRating;
use App\Models\ProjectFeedbackComment;

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
        ProjectFeedbackSubmission::factory(5)->beginning()
            ->has(ProjectFeedbackRating::factory(15))
            ->has(ProjectFeedbackComment::factory(3))
            ->create();
        ProjectFeedbackSubmission::factory(5)->end()
            ->has(ProjectFeedbackRating::factory(15))
            ->has(ProjectFeedbackComment::factory(3))
            ->create();
    }
}
