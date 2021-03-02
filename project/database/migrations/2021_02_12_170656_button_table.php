<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ButtonTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('buttons', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('header');
            $table->string('name');
            $table->string('color');
            $table->boolean('block');
            $table->string('by');
            $table->timestamps();
        });

        Schema::table('buttons', function (Blueprint $table) {
            $table->foreignId('id_project')->constrained('projects')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
