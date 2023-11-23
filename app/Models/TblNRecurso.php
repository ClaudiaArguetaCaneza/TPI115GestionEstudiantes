<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use OwenIt\Auditing\Contracts\Auditable;

class TblNRecurso extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;
    use HasFactory;

    protected $table ="tbl_n_recurso";

    protected $hidden=[
        'created_at',
        'updated_at'
    ];

    public function tipo_recurso(): BelongsTo
    {
        return $this->belongsTo(TblNTipoRecurso::class,'fk_tipo_recurso');
    }


}
