<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TblNAptitudCurriculum extends Model
{
    use HasFactory;
    protected $table ="tbl_n_aptitud_curriculum";
    protected $hidden=[
        'updated_at',
        'created_at'
    ];

    public function aptitud():BelongsTo
    {
        return $this->belongsTo(TblNAptitud::class,'fk_aptitud');
    }
}
