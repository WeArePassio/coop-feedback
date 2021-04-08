<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddImageToBeginningFeedbackSubmissions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('beginning_feedback_submissions', function (Blueprint $table) {
            $table->string('image')->after('why_am_i_here')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('beginning_feedback_submissions', function (Blueprint $table) {
            $table->dropColumn('image');
        });
    }
}
