<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    static $names = [
        'Marta',
        'Alfonso',
        'Salvatore',
        'Fabio'
    ];

    /**
     * Run the database seeds.
     *
     * @return void
     */

    public function run()
    {
        $config = json_decode(file_get_contents('config.json'), true);
        $name = $config['user'];
        foreach (self::$names as $name) {
            DB::table('users')->insert([
                'name' => $name,
                'email' => Str::random(10).'@gmail.com',
                'password' => Hash::make('password'),
            ]);
        }
    }
}
