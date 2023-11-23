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
        Schema::create('tbl_n_estudiante', function (Blueprint $table) {
            $table->id();
            $table->string('carnet',7)->unique();
            $table->string('primer_nombre',20);
            $table->string('segundo_nombre',20)->nullable();
            $table->string('primer_apellido',20);
            $table->string('segundo_apellido',20)->nullable();
            $table->string('dui',10)->nullable()->unique();
            $table->dateTime('fecha_nacimiento');
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
        Schema::dropIfExists('tbl_n_estudiante');
    }
};
