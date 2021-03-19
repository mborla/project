<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Symfony\Component\Console\Input\Input;

class ProjectController extends Controller
{
    private $config;

    public function __construct()
    {
        $this->config = json_decode(file_get_contents('..\config.json'), true);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View|\Illuminate\Http\Response
     */
    public function store(Request $request) // inserimento di un nuovo progetto
    {
        $validated = $request->validate([
            'project_name' => 'required|unique:projects,name',
            'users.*' => 'required|exists:users,name|min:'.$this->config['num_annotators'],
            'dataset' => 'required'
        ]);

        $project_name = $request->project_name;
        $users = $request->users;
        $filename = $request->filename;


        $num_annotators = $this->config['num_annotators'];//config('config.num_annotators');
        $num_tweet = $this->config['num_tweet']; //config('config.num_tweet');
        $num_annotations = $this->config['num_annotation']; //config('config.num_annotation');
        if($this->config['repetition'] == "true") {
            $num_random_tweets = ceil(min(50, (10 / 100) * $num_tweet)); // o il 10% o 50
        }else{
            $num_random_tweets = 0;
        }

        // inserimento del nuovo progetto
        DB::insert('INSERT INTO projects(name, config) VALUES (?, ?)', [$project_name, $filename]);

        $id_project = DB::table('projects')
                        ->select('id')
                        ->where('name', $project_name)
                        ->first();

        // utenti che fanno parte del progetto (da form)
        $list_id_users = [];
        foreach ($users as $user){
            $id_user = DB::table('users')
                        ->select('id')
                        ->where('name', $user)
                        ->first();
            array_push($list_id_users, $id_user->id);

            DB::insert('INSERT INTO project_user (id_user, id_project) VALUES (?, ?)', [$id_user->id, $id_project->id]);
        }

        // dataset
        $upload = $request->file('dataset');
        $filePath = $upload->getRealPath();
        $file = fopen($filePath, 'r');

        // inserimento dei tweet nel db
        $tweets = collect();
        while (!feof($file)) {
            $line = fgets($file);
            $tweets->push($line);
            DB::insert('INSERT INTO tweets (id_project, sentence) VALUES (?, ?)', [$id_project->id, $line]);
        }

        // se il numero di annotatori è uguale al numero di annotazioni --> tutti annotano tutti i tweet
        if($num_annotators <= $num_annotations){

            foreach ($list_id_users as $user){

                $randoms = $tweets->random($num_random_tweets);

                foreach ($randoms as $random){
                    $tweets->push($random); // aggiunta dei tweet random all'array di tweet
                }

                $shuffled = $tweets->shuffle(); // shuffle dei tweet

                // assegnamento dei tweet ad ogni utente
                foreach ($shuffled as $tweet){

                    $tweet = DB::table('tweets')
                                ->select('id')
                                ->where('id_project', $id_project->id)
                                ->where('sentence', $tweet)
                                ->first();

                    DB::insert('INSERT INTO tweet_user (id_tweet, id_user) VALUES (?, ?)', [$tweet->id, $user]);
                }

                foreach ($randoms as $random){  // rimozione dei tweet in più dall'array dei tweet
                    $tweets->pop();
                }
            }

        }else{ // Es. 4 annotatori e 3 annotazioni per tweet
            $num_tweets_for_user = ceil($num_tweet * ($num_annotations / $num_annotators)); // 1000*(3/4) = 750 --> ognuno dei 4 avrà 750 tweet da annotare
            $part = ceil($num_tweet/$num_annotators); // 1000/4 = 250 --> primi 250, secondi 250, terzi 250, quarti 250

            $skip = 0;

            foreach ($list_id_users as $user){
                $tweets = collect();

                for ($j = 1; $j <= $num_annotations; $j++){ // da 1 a 3

                    // selezione dei tweet da assegnare ad ogni utente (es. blocchi da 250)
                    $id_tweets = DB::table('tweets')
                        ->select('id')
                        ->where('id_project', $id_project->id)
                        ->skip($skip)
                        ->take($part)
                        ->get();

                    foreach ($id_tweets as $id_tweet){
                        $tweets->push($id_tweet->id);
                    }

                    $skip = $skip + $part;  // vado avanti di 250

                    if($skip >= $num_tweet){    // quando arrivo a 1000 riparto
                        $skip = 0;
                    }
                }

                $randoms = $tweets->random($num_random_tweets); // tweet random da aggiungere

                foreach ($randoms as $random){
                    $tweets->push($random);
                }

                $shuffled = $tweets->shuffle();

                foreach ($shuffled as $tweet){

                    DB::table('tweet_user')
                        ->insert([
                            'id_tweet' => $tweet,
                            'id_user' => $user
                        ]);
                }

                foreach ($randoms as $random){
                    $tweets->pop();
                }
            }

        }
        return redirect()->to("/annotation/".$id_project->id);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View|\Illuminate\Http\Response
     */
    public function index() // progetti di un utente visualizzati nella home
    {
        $user = $this->config['user'];
        $projects = DB::table('projects')
                    ->join('project_user', 'project_user.id_project', '=', 'projects.id')
                    ->join('users', 'project_user.id_user', '=', 'users.id')
                    ->select('projects.name', 'projects.id')
                    ->where('users.name', $user)
                    ->get();

        return view('home', ['projects' => $projects]);
    }

    public function getConfigFile(Request $request){

        $validated = $request->validate([
            'filename' => 'required'
        ]);

        $config = json_decode(file_get_contents('..\project_config\\'.$request->filename.'.json'), true);
        file_put_contents(config_path('..\config.json'), json_encode($config, JSON_PRETTY_PRINT));

        return view('new_project', ['file' => $request->filename]);

    }

}
