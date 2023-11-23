<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblNExperienciaAcademica extends Model
{
    use HasFactory;
    protected $table ="tbl_n_experiencia_academica";
    protected $hidden=[
        'updated_at',
        'created_at'
    ];
}
