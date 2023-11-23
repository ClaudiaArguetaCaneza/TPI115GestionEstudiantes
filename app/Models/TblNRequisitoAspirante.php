<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblNRequisitoAspirante extends Model
{
    use HasFactory;
    protected $table ="tbl_n_requisito_aspirante";
    protected $hidden=[
        'updated_at',
        'created_at'
    ];
}
