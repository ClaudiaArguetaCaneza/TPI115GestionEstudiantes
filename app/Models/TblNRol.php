<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use OwenIt\Auditing\Contracts\Auditable;

class TblNRol extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;
    use HasFactory;
    protected $table ="tbl_n_rol";
    protected $hidden = [
        'created_at',
        'updated_at'
    ];
    public function permisos():HasMany
    {
        return $this->hasMany(TblNPermiso::class,'fk_rol');
    }

    public function permisos_activos():HasMany
    {
        return $this->hasMany(TblNPermiso::class,'fk_rol')->where('activo',true);
    }
}
