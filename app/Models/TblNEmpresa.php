<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblNEmpresa extends Model
{
    use HasFactory;
    protected $table ="tbl_n_empresa";
    protected $hidden=[
        'updated_at',
        'created_at'
    ];
}
