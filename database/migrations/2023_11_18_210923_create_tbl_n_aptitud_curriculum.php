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
        Schema::create('tbl_n_aptitud_curriculum', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('fk_curriculum');
            $table->unsignedBigInteger('fk_aptitud');
            $table->boolean('activo')->default(true);

            $table->foreign('fk_curriculum')
            ->references('id')->on('tbl_n_curriculum')->onDelete('cascade');
            $table->foreign('fk_aptitud')
            ->references('id')->on('tbl_n_aptitud')->onDelete('cascade');
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
        Schema::dropIfExists('tbl_n_aptitud_curriculum');
    }
};
