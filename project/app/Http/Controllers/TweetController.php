<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

class TweetController extends Controller
{
    private $user;
    private $id_user;
    private $config;

    public function __construct()
    {
        //$this->config = json_decode(file_get_contents('..'.DIRECTORY_SEPARATOR.'config.json'), true);
        $this->config = json_decode(file_get_contents(base_path('config.json')), true);

        $this->user = $this->config['user'];//config('config.user');
        $this->id_user = DB::table('users')
                        ->select('id')
                        ->where('name', $this->user)
                        ->first()->id;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View|\Illuminate\Http\Response
     */
    public function index()
    {
        $config = $this->config;
        $id_project = Route::current()->parameter('id_project');

        $filename = DB::table('projects')
                        ->select('config')
                        ->where('id', $id_project)
                        ->first()->config;

        //$config = json_decode(file_get_contents('..\project_config\\'.$filename.'.json'), true);
        //$config = json_decode(file_get_contents('..'.DIRECTORY_SEPARATOR.'project_config'.DIRECTORY_SEPARATOR.$filename.'.json'), true);
        //file_put_contents(config_path('..'.DIRECTORY_SEPARATOR.'config.json'), json_encode($config, JSON_PRETTY_PRINT));

        $config = json_decode(file_get_contents(base_path('project_config'.DIRECTORY_SEPARATOR.$filename.'.json'),true));
        file_put_contents(base_path('config.json'), json_encode($config, JSON_PRETTY_PRINT));

        $id_project = DB::table('project_user')
                        ->select('id_project')
                        ->where('id_user', $this->id_user)
                        ->where('id_project', $id_project)
                        ->first()->id_project;

        // numero di annotazioni fatte dal l'utente per un progetto
        $num_annotations = DB::table('annotations')
            ->join('tweet_user', 'tweet_user.id', '=', 'annotations.id_tweet_user')
            ->join('tweets', 'tweets.id', '=', 'tweet_user.id_tweet')
            ->select('annotations.id_tweet_user')
            ->where('annotations.id_user', $this->id_user)
            ->where('tweets.id_project', $id_project)
            ->count();

        // se non ci sono annotazioni prendo il primo tweet
        if ($num_annotations == 0) {
            $sentence = DB::table('tweets')
                ->join('tweet_user', 'tweet_user.id_tweet', '=', 'tweets.id')
                ->select('sentence', 'tweet_user.id')
                ->where('id_project', $id_project)
                ->where('tweet_user.id_user', $this->id_user)
                ->orderBy('tweet_user.id')
                ->first();

            return view('annotation', ['sentence' => $sentence->sentence, 'id' => $sentence->id]);

        } else {    // altrimenti prendo l'id dell'ultima annotazione fatta il successivo tweet da annotare

            $last_annotation_id = DB::table('annotations')
                ->join('tweet_user', 'tweet_user.id', '=', 'annotations.id_tweet_user')
                ->join('tweets', 'tweets.id', '=', 'tweet_user.id_tweet')
                ->select('annotations.id_tweet_user')
                ->where('annotations.id_user', $this->id_user)
                ->where('tweets.id_project', $id_project)
                ->orderBy('annotations.id_tweet_user', 'DESC')
                ->first()->id_tweet_user;

            $i = $last_annotation_id;

            $sentence = DB::table('tweets')
                ->join('tweet_user', 'tweet_user.id_tweet', '=', 'tweets.id')
                ->select('tweet_user.id', 'sentence')
                ->where('id_project', $id_project)
                ->where('tweet_user.id_user', $this->id_user)
                ->where('tweet_user.id', '>', $i)
                ->orderBy('tweet_user.id')
                ->first();

            if($sentence != null){
                return view('annotation', ['sentence' => $sentence->sentence, 'id' => $sentence->id]);
            }else{
                return view('info', ['info' => 'Finish', 'last_id' => $last_annotation_id]);
            }
        }
    }

    public function next(Request $request, $id) {

        $id_project = DB::table('tweets')
                        ->join("tweet_user", "tweet_user.id_tweet", '=', 'tweets.id')
                        ->select("tweets.id_project")
                        ->where('tweet_user.id', $id)
                        ->first()->id_project;

        // cerco il tweet successivo nelle annotazioni
        $sentence = DB::table('annotations')
            ->join('tweet_user', 'annotations.id_tweet_user', '=', 'tweet_user.id')
            ->join('tweets', 'tweet_user.id_tweet', '=', 'tweets.id')
            ->select('tweet_user.id', 'sentence')
            ->where('tweet_user.id', '>', $id)
            ->where('annotations.id_user', $this->id_user)
            ->where('tweets.id_project', $id_project)
            ->orderBy('annotations.id_tweet_user')
            ->first();

        // se il tweet era già stato annotato seleziono i tag per visualizzarli
        if($sentence != null){
            $id_next_tweet = $sentence->id;
            $tags = DB::table('annotations')
                    ->join('tweet_user', 'tweet_user.id', '=', 'annotations.id_tweet_user')
                    ->join('project_user', 'project_user.id_user', '=', 'annotations.id_user')
                    ->select('id_tweet_user', 'tag')
                    ->where('id_tweet_user', $id_next_tweet)
                    ->where('annotations.id_user', $this->id_user)
                    ->where('project_user.id_project', $id_project)
                    ->get();

            return view('annotation', ['sentence' => $sentence->sentence, 'id' => $sentence->id, 'tag' => $tags]);

        }else{  // altrimenti visulizzo solo il tweet

            $sentence = DB::table('tweets')
                ->join('tweet_user', 'tweets.id', '=', 'tweet_user.id_tweet')
                ->select('tweet_user.id', 'sentence')
                ->where('id_project', $id_project)
                ->where('tweet_user.id', '>', $id)
                ->where('tweet_user.id_user', $this->id_user)
                ->orderBy('tweet_user.id')
                ->first();


            if($sentence != null){
                return view('annotation', ['sentence' => $sentence->sentence, 'id' => $sentence->id]);
            }else{
                return view('info', ['info' => 'Finish', 'last_id' => $id]);
            }

        }


    }

    public function previous($id)
    {

        $id_project = DB::table('tweets')
                    ->join("tweet_user", "tweet_user.id_tweet", '=', 'tweets.id')
                    ->select("tweets.id_project")
                    ->where('tweet_user.id', $id)
                    ->first()->id_project;

        // seleziono il tweet precendente
        $sentence = DB::table('annotations')
                    ->join('tweet_user', 'annotations.id_tweet_user', '=', 'tweet_user.id')
                    ->join('tweets', 'tweet_user.id_tweet', '=', 'tweets.id')
                    ->select('tweet_user.id', 'sentence')
                    ->where('annotations.id_tweet_user', '<', $id)
                    ->where('annotations.id_user', $this->id_user)
                    ->where('tweets.id_project', $id_project)
                    ->orderBy('tweet_user.id', 'DESC')
                    ->first();

        if($sentence != null){

            $id_previous_tweet = $sentence->id;

            // seleziono i tag del tweet precedente
            $tags = DB::table('annotations')
                        ->join('tweet_user', 'annotations.id_tweet_user', '=', 'tweet_user.id')
                        ->join('project_user', 'project_user.id_user', '=', 'annotations.id_user')
                        ->select('id_tweet_user', 'tag')
                        ->where('id_tweet_user', $id_previous_tweet)
                        ->where('project_user.id_project', $id_project)
                        ->where('annotations.id_user', $this->id_user)
                        ->get();

            return view('annotation', ['sentence' => $sentence->sentence, 'id' => $sentence->id, 'tag' => $tags]);
        }else{
            return view('info', ['info' => 'No previous tweet']);
        }
    }

    //  seleziono il tweet da aggiornare scelto dalla lista dei precedenti
    public function showsTheSentenceToChange($id){

        $id_project = DB::table('tweets')
                        ->join("tweet_user", "tweet_user.id_tweet", '=', 'tweets.id')
                        ->select("tweets.id_project")
                        ->where('tweet_user.id', $id)
                        ->first()->id_project;

        $sentence = DB::table('annotations')
                        ->join('tweet_user', 'annotations.id_tweet_user', '=', 'tweet_user.id')
                        ->join('tweets', 'tweet_user.id_tweet', '=', 'tweets.id')
                        ->select('tweet_user.id', 'sentence', 'tag')
                        ->where('tweets.id_project', $id_project)
                        ->where('id_tweet_user', $id)
                        ->where('annotations.id_user', $this->id_user)
                        ->first();

        $tags = DB::table('annotations')
                    ->join('tweet_user', 'annotations.id_tweet_user', '=', 'tweet_user.id')
                    ->join('project_user', 'project_user.id_user', '=', 'annotations.id_user')
                    ->select('id_tweet_user', 'tag')
                    ->where('project_user.id_project', $id_project)
                    ->where('id_tweet_user', $id)
                    ->where('annotations.id_user', $this->id_user)
                    ->get();

        return view('annotation', ['sentence' => $sentence->sentence, 'id' => $sentence->id, 'tag' => $tags]);
    }


    // seleziono i 10 tweet, annotati, precedenti al tweet corrente
    public function listTweets($id){

        $id_project = DB::table('tweets')
                        ->join("tweet_user", "tweet_user.id_tweet", '=', 'tweets.id')
                        ->select("tweets.id_project")
                        ->where('tweet_user.id', $id)
                        ->first()->id_project;

        $tweets = DB::table('annotations')
                    ->join('tweet_user', 'annotations.id_tweet_user', '=', 'tweet_user.id')
                    ->join('tweets', 'tweet_user.id_tweet', '=', 'tweets.id')
                    ->select('tweet_user.id', 'sentence')
                    ->latest('tweet_user.id')
                    ->where('tweets.id_project', $id_project)
                    ->where('annotations.id_user', $this->id_user)
                    ->whereBetween('tweet_user.id', [$id-10, $id])
                    ->distinct()
                    ->simplePaginate(10);

        $tags = DB::table('annotations')
                    ->join('tweet_user', 'annotations.id_tweet_user', '=', 'tweet_user.id')
                    ->join('project_user', 'project_user.id_user', '=', 'annotations.id_user')
                    ->select('id_tweet_user', 'tag')
                    ->where('project_user.id_project', $id_project)
                    ->latest('id_tweet_user')
                    ->where('annotations.id_user', $this->id_user)
                    ->get();

        $s = "";
        $complete_list = [];
        foreach ($tweets as $row_tweet) {
            foreach ($tags as $row_tag){
                if($row_tag->id_tweet_user == $row_tweet->id){
                    $s = $row_tag->tag . ", " . $s;
                }
            }
            $s = substr($s, 0, strlen($s)-2);
            $complete_list[$row_tweet->id][] = $s;
            $s = "";
        }

        return view('previous', ['tweets' => $tweets, 'tags' => $complete_list]);
    }
}
