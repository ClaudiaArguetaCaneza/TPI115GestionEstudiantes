<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use OwenIt\Auditing\Contracts\Auditable;

class TblNTipoRecurso extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;
    use HasFactory;
    protected $table ="tbl_n_tipo_recurso";
    protected $hidden=[
        'created_at',
        'updated_at'
    ];

    public function recursos():HasMany
    {
        return $this->hasMany(TblNRecurso::class,'fk_tipo_recurso');
    }
}
