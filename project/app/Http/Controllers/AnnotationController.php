<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

class AnnotationController extends Controller
{
    private $config;
    private $user;
    private $id_user;

    public function __construct()
    {
        $this->config = json_decode(file_get_contents('..\config.json'), true);

        $this->user = $this->config['user'];

        $this->id_user = DB::table('users')
                        ->select('id')
                        ->where('name', $this->user)
                        ->first()->id;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $id_tweet_user = $request->id;

        $id_project = DB::table('tweets')
                        ->join("tweet_user", "tweet_user.id_tweet", '=', 'tweets.id')
                        ->select("tweets.id_project")
                        ->where('tweet_user.id', $id_tweet_user)
                        ->first()->id_project;

        //controllo se il tweet era già stato annotato
        $num_annotations = DB::table('annotations')
                            ->join('tweet_user', 'annotations.id_tweet_user', '=', 'tweet_user.id')
                            ->join('project_user', 'project_user.id_user', '=', 'annotations.id_user')
                            ->where('project_user.id_project', $id_project)
                            ->where('id_tweet_user', $id_tweet_user)
                            ->where('annotations.id_user', $this->id_user)
                            ->count();

        if($num_annotations != 0){
            DB::table('annotations')
                ->join('tweet_user', 'annotations.id_tweet_user', '=', 'tweet_user.id')
                ->join('project_user', 'project_user.id_user', '=', 'annotations.id_user')
                ->where('id_tweet_user', $id_tweet_user)
                ->where('project_user.id_project', $id_project)
                ->where('annotations.id_user', $this->id_user)
                ->delete();
        }


        $length = count($request->data);

        // inserimento dell'annotazione
        if ($length != 0) {
            for ($i = 0; $i < $length; $i++) {
                $tag = $request->data[$i];
                DB::insert('INSERT INTO annotations (id_user, id_tweet_user, tag) VALUES (?, ?, ?)', [$this->id_user, $id_tweet_user, $tag]);
            }
        }

    }


}
