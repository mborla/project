<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Annotation extends Model
{
    protected $fillable = [
        'id',
        'id_user',
        'id_tweet_user',
        'tag',
        'id_project'
    ];
}
