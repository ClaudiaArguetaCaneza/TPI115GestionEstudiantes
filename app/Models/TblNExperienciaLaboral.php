<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TblNExperienciaLaboral extends Model
{
    use HasFactory;
    protected $table ="tbl_n_experiencia_laboral";
    protected $hidden=[
        'updated_at',
        'created_at'
    ];

    public function empresa_ctg():BelongsTo
    {
        return $this->belongsTo(TblNEmpresa::class,'fk_empresa');
    }

    public function puesto_ctg():BelongsTo
    {
        return $this->belongsTo(TblNPuesto::class,'fk_puesto');
    }
}
