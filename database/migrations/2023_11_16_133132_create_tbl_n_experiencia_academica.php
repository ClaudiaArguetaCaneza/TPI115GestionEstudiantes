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
        Schema::create('tbl_n_experiencia_academica', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('fk_curriculum');
            $table->string('institucion_academica',60);
            $table->string('titulo',60);
            $table->boolean('finalizado')->default(true);
            $table->datetime('fecha_inicio');
            $table->datetime('fecha_finalizacion');
            $table->string('ruta_documento',150)->nullable();

            $table->foreign('fk_curriculum')
            ->references('id')->on('tbl_n_curriculum')->onDelete('cascade');
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
        Schema::dropIfExists('tbl_n_experiencia_academica');
    }
};
