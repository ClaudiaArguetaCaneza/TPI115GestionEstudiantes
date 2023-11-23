<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblNEstadoAplicacionOferta extends Model
{
    use HasFactory;
    protected $table ="tbl_n_estado_aplicacion_oferta";
    protected $hidden=[
        'updated_at',
        'created_at'
    ];
}
