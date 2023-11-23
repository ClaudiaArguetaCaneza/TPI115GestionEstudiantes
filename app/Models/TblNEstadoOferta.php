<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblNEstadoOferta extends Model
{
    use HasFactory;
    protected $table ="tbl_n_estado_oferta";
    protected $hidden=[
        'updated_at',
        'created_at'
    ];
}
