<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('home');
});

Route::get('/','App\Http\Controllers\ProjectController@index');

Route::post('/insertProject','App\Http\Controllers\ProjectController@store');

Route::get('/new_project', function () {
    return view('new_project');
});

Route::get('/annotation/{id_project}', function () {
    return view('annotation');
});

Route::get('/annotation/{id_project}','App\Http\Controllers\TweetController@index');

Route::post('/next/{id}','App\Http\Controllers\TweetController@next');

Route::get('/previous/{id}','App\Http\Controllers\TweetController@previous');

Route::get('/previousList/{id}','App\Http\Controllers\TweetController@listTweets');

Route::get('/addAnnotation','App\Http\Controllers\AnnotationController@store');

Route::get('/showsTheSentenceToChange/{id}','App\Http\Controllers\TweetController@showsTheSentenceToChange');

Route::get('/info', function () {
    return view('info');
});
