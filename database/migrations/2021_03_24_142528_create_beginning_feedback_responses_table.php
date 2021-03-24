<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBeginningFeedbackResponsesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('beginning_feedback_responses', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('who_am_i');
            $table->string('why_am_i_here');
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
        Schema::dropIfExists('beginning_feedback_responses');
    }
}
