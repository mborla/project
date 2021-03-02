<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Button extends Model
{
    protected $fillable = [
        'id',
        'id_project',
        'header',
        'name',
        'color',
        'block',
        'by'
    ];
}
