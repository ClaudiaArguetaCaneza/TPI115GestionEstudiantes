<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TblNOferta extends Model
{
    use HasFactory;
    protected $table ="tbl_n_oferta";
    protected $hidden=[
        'updated_at',
        'created_at'
    ];

    public function requisitos_aspirante():HasMany
    {
        return $this->hasMany(TblNRequisitoAspirante::class,'fk_oferta');
    }

    public function responsabilidades_puesto():HasMany
    {
        return $this->hasMany(TblNResponsabilidadPuesto::class,'fk_oferta');
    }

    public function empresa_ctg():BelongsTo
    {
        return $this->belongsTo(TblNEmpresa::class,'fk_empresa');
    }

    public function puesto_ctg():BelongsTo
    {
        return $this->belongsTo(TblNPuesto::class,'fk_puesto');
    }

    public function estado_oferta():BelongsTo
    {
        return $this->belongsTo(TblNEstadoOferta::class,'fk_estado_oferta');
    }
}
