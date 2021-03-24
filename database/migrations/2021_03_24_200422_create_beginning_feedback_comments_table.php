<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBeginningFeedbackCommentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('beginning_feedback_comments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('beginning_feedback_submission_id')->constrained('beginning_feedback_submissions')->index('comment_response_id')->onDelete('cascade');
            $table->foreignId('question_theme_id')->constrained('question_themes')->onDelete('cascade');
            $table->string('text');
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
        Schema::dropIfExists('beginning_feedback_comments');
    }
}
