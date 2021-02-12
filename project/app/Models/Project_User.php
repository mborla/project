<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project_User extends Model
{
    protected $fillable = [
        'id_user',
        'id_project',
    ];
}
