<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Question;
use App\Models\QuestionTheme;
use App\Models\BeginningFeedbackSubmission;
use App\Models\BeginningFeedbackRating;
use App\Models\BeginningFeedbackComment;

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
        BeginningFeedbackSubmission::factory(10)
            ->has(BeginningFeedbackRating::factory(15))
            ->has(BeginningFeedbackComment::factory(3))
            ->create();
    }
}
