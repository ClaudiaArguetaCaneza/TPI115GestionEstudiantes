<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblNAptitud extends Model
{
    use HasFactory;
    protected $table ="tbl_n_aptitud";
    protected $hidden=[
        'updated_at',
        'created_at'
    ];
}
