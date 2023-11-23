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
        Schema::create('tbl_n_oferta', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('fk_empresa')->nullable();
            $table->unsignedBigInteger('fk_puesto')->nullable();
            $table->unsignedBigInteger('fk_estado_oferta')->nullable();
            $table->datetime('fecha_inicio_oferta');
            $table->datetime('fecha_finalizacion_oferta');
            $table->string('empresa',60)->nullable();
            $table->string('puesto',60)->nullable();
            $table->string('descripcion',400);
            $table->integer('id_oferta_sistema_externo')->nullable();
            $table->timestamps();

            $table->foreign('fk_empresa')
            ->references('id')->on('tbl_n_empresa')->onDelete('cascade');
            $table->foreign('fk_puesto')
            ->references('id')->on('tbl_n_puesto')->onDelete('cascade');
            $table->foreign('fk_estado_oferta')
            ->references('id')->on('tbl_n_estado_oferta')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tbl_n_oferta');
    }
};
