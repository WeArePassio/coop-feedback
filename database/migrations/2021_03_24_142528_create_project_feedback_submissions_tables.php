<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjectFeedbackSubmissionsTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('project_feedback_submissions', function (Blueprint $table) {
            $table->id();
            $table->morphs('submission');
            $table->string('name');
            $table->timestamps();
        });
        Schema::create('beginning_feedback_submissions', function (Blueprint $table) {
            $table->id();
            $table->string('who_am_i')->nullable();
            $table->string('why_am_i_here')->nullable();
            $table->timestamps();
        });
        Schema::create('end_feedback_submissions', function (Blueprint $table) {
            $table->id();
            $table->string('improve_project')->nullable();
            $table->string('favourite_activities')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('end_feedback_submissions');
        Schema::dropIfExists('beginning_feedback_submissions');
        Schema::dropIfExists('project_feedback_submissions');
    }
}
