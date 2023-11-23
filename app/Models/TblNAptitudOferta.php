<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblNAptitudOferta extends Model
{
    use HasFactory;

    protected $table ="tbl_n_aptitud_oferta";
    protected $hidden=[
        'updated_at',
        'created_at'
    ];
}
