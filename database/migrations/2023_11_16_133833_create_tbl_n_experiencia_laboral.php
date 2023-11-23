<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_n_experiencia_laboral', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('fk_curriculum');
            $table->unsignedBigInteger('fk_empresa')->nullable();
            $table->unsignedBigInteger('fk_puesto')->nullable();
            $table->string('empresa',60);
            $table->string('duracion',60);
            $table->string('puesto',60)->nullable();
            $table->timestamps();

            $table->foreign('fk_curriculum')
            ->references('id')->on('tbl_n_curriculum')->onDelete('cascade');
            $table->foreign('fk_empresa')
            ->references('id')->on('tbl_n_empresa')->onDelete('cascade');
            $table->foreign('fk_puesto')
            ->references('id')->on('tbl_n_puesto')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tbl_n_experiencia_laboral');
    }
};
