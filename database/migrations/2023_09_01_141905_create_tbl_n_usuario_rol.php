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
        Schema::create('tbl_n_usuario_rol', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('fk_usuario');
            $table->unsignedBigInteger('fk_rol');
            $table->boolean('activo');
            $table->foreign('fk_usuario')
                ->references('id')->on('tbl_n_usuario')->onDelete('cascade');
            $table->foreign('fk_rol')
                ->references('id')->on('tbl_n_rol')->onDelete('cascade');
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
        Schema::dropIfExists('tbl_n_usuario_rol');
    }
};
