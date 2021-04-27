<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuestionThemeMetricsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('question_theme_metrics', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('label1');
            $table->string('label2');
            $table->string('label3');
            $table->string('label4');
            $table->string('label5');
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
        Schema::dropIfExists('question_theme_metrics');
    }
}
