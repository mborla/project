<!doctype html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
    <link href="../css/new_project.css" type="text/css" rel="stylesheet"/>


    <!-- js -->
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">

    <title>Home</title>

</head>
<body>
    @php
        //$config = json_decode(file_get_contents('..'.DIRECTORY_SEPARATOR.'config.json'), true);
        $config = json_decode(file_get_contents(base_path('config.json')), true);
    @endphp

    <div class="container-fluid">
        <h1>Hello {{ $config['user'] }}</h1>
        <div class="row">
            <div id="project_list" class="col">
                <h3>Your projects</h3>
                <ul class="list-group list-group-flush"> <!-- lista ei progetti di un utente -->
                    @isset($projects)
                        @foreach($projects as $project)
                            <a class="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list" href="/annotation/{{ $project->id }}" role="tab" aria-controls="project">{{ $project->name }}</a>
                        @endforeach
                    @endisset
                </ul>
            </div>
            <div class="col">
                <h3>Create a new project</h3>
                <a href="/configuration">New</a> <!-- nuovo progetto -->
            </div>
        </div>
    </div>
</body>
</html>


