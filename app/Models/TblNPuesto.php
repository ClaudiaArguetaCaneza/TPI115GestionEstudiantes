<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblNPuesto extends Model
{
    use HasFactory;
    protected $table ="tbl_n_puesto";
    protected $hidden=[
        'updated_at',
        'created_at'
    ];
}
