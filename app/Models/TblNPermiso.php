<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use OwenIt\Auditing\Contracts\Auditable;

class TblNPermiso extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;
    use HasFactory;
    protected $table ="tbl_n_permiso";

    protected $hidden=[
        'created_at',
        'updated_at'
    ];

    public function recurso():BelongsTo
    {
        return $this->belongsTo(TblNRecurso::class,'fk_recurso');
    }

    public function rol():BelongsTo
    {
        return $this->belongsTo(TblNRol::class,'fk_rol');
    }

}
