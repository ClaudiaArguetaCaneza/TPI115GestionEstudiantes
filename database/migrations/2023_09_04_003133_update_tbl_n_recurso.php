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
        Schema::table('tbl_n_recurso',function(Blueprint $table){
            $table->unsignedBigInteger('fk_tipo_recurso');
            $table->foreign('fk_tipo_recurso')
            ->references('id')->on('tbl_n_tipo_recurso')->onDelete('cascade');

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
};
