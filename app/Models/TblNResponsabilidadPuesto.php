<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblNResponsabilidadPuesto extends Model
{
    use HasFactory;
    protected $table ="tbl_n_responsabilidad_puesto";
    protected $hidden=[
        'updated_at',
        'created_at'
    ];
}
