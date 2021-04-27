<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCohortIdsToSubmissions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('project_feedback_submissions', function (Blueprint $table) {
            $table->foreignId('cohort_id')->after('id')->constrained('cohorts');
        });
        Schema::table('session_feedback_submissions', function (Blueprint $table) {
            $table->foreignId('cohort_id')->after('id')->constrained('cohorts');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('project_feedback_submissions', function (Blueprint $table) {
            $table->dropForeign(['cohort_id']);
        });
        Schema::table('session_feedback_submissions', function (Blueprint $table) {
            $table->dropForeign(['cohort_id']);
        });
    }
}
