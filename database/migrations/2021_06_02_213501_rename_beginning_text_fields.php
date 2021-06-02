<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RenameBeginningTextFields extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('beginning_feedback_submissions', function (Blueprint $table) {
            $table->renameColumn('who_am_i', 'gain');
            $table->renameColumn('why_am_i_here', 'interest');
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
            $table->renameColumn('gain', 'who_am_i');
            $table->renameColumn('interest', 'why_am_i_here');
        });
    }
}
