<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCaringForOthersToSessionFeedbackSubmissions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('session_feedback_submissions', function (Blueprint $table) {
            $table->boolean('caring_for_others')->after('social_responsibility');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('session_feedback_submissions', function (Blueprint $table) {
            $table->dropColumn('caring_for_others');
        });
    }
}
