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
        Schema::create('tbl_n_responsabilidad_puesto', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('fk_oferta');
            $table->string('responsabilidad_puesto',200);
            $table->timestamps();

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
        Schema::dropIfExists('tbl_n_responsabilidad_puesto');
    }
};
