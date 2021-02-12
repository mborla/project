<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tweet_User extends Model
{
    protected $fillable = [
        'id',
        'id_user',
        'id_tweet',
    ];
}
