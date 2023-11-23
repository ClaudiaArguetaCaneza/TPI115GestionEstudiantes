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
        Schema::create('tbl_n_aplicacion_oferta', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('fk_usuario')->nullable();
            $table->unsignedBigInteger('fk_oferta')->nullable();
            $table->boolean('activo')->default(true);
            $table->timestamps();

            $table->foreign('fk_usuario')
            ->references('id')->on('tbl_n_usuario')->onDelete('cascade');
            $table->foreign('fk_oferta')
            ->references('id')->on('tbl_n_oferta')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tbl_n_aplicacion_oferta');
    }
};
