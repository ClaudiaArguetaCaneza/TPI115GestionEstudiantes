<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TblNAplicacionOferta extends Model
{
    use HasFactory;
    protected $table ="tbl_n_aplicacion_oferta";
    protected $hidden=[
        'updated_at',
        'created_at'
    ];

    public function oferta():BelongsTo
    {
        return $this->belongsTo(TblNOferta::class,'fk_oferta');
    }
}
