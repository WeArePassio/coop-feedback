<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSessionFeedbackSubmissionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('session_feedback_submissions', function (Blueprint $table) {
            $table->id();
            $table->tinyInteger('enjoyment_rating');
            $table->string('enjoyed_most');
            $table->boolean('democracy');
            $table->boolean('self_help');
            $table->boolean('self_responsibility');
            $table->boolean('equality');
            $table->boolean('equity');
            $table->boolean('solidarity');
            $table->boolean('openness');
            $table->boolean('honesty');
            $table->boolean('social_responsibility');
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
        Schema::dropIfExists('session_feedback_submissions');
    }
}
