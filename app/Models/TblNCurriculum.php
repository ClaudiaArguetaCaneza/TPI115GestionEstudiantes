<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TblNCurriculum extends Model
{
    use HasFactory;
    protected $table ="tbl_n_curriculum";
    protected $hidden=[
        'updated_at',
        'created_at'
    ];

    public function experiencias_laborales():HasMany
    {
        return $this->hasMany(TblNExperienciaLaboral::class,'fk_curriculum');
    }
    public function experiencias_academicas():HasMany
    {
        return $this->hasMany(TblNExperienciaAcademica::class,'fk_curriculum');
    }

    public function aptitudes_curriculum():HasMany
    {
        return $this->hasMany(TblNAptitudCurriculum::class,'fk_curriculum');
    }
}
