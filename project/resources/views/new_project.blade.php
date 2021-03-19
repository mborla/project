<!doctype html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="csrf-token" content="{{ csrf_token() }}" />

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
    <link href="../css/new_project.css" type="text/css" rel="stylesheet"/>


    <!-- js -->
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">



    <title>New projct</title>

</head>
<body>

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>


    <div class="container-fluid">
        <div id="home"><a href="/">Home</a></div>
        <div class="row">
            <div class="col">
                <h1>New project</h1>
            </div>
        </div>
        <div class="row">
            <div class="col">

                @php
                    //$config = json_decode(file_get_contents('..\project_config\\'.$file.'.json'), true);
                    //$config = json_decode(file_get_contents('..'.DIRECTORY_SEPARATOR.'project_config'.DIRECTORY_SEPARATOR.$file.'.json'), true)
                    $config = json_decode(file_get_contents(base_path('project_config'.DIRECTORY_SEPARATOR.$file.'.json')), true)

                @endphp

                <form action="/insertProject" method="POST" enctype="multipart/form-data">
                    @csrf

                    <div class="form-group row" hidden>
                        <label for="project_name" class="col-sm-2 col-form-label">Configuration file *</label>
                        <div class="col-sm-10">
                            <input class="form-control" name="filename" value="{{ $file }}" placeholder="">
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="project_name" class="col-sm-2 col-form-label">Project's name *</label>
                        <div class="col-sm-10">
                            <input class="form-control" name="project_name" value="{{ old('project_name') }}" placeholder="">
                            @if($errors->has('project_name'))
                                <div class="error" style="color: red">{{ $errors->first('project_name') }}</div>
                            @endif
                        </div>
                    </div>

                    <div id="rest_of_form">
                        <div class="form-group row">
                            <label for="project_name" class="col-sm-2 col-form-label">Model</label> <!-- modello del progetto -->
                            <div class="col-sm-10">
                                @if(isset($config['grammar']['model']['name']))
                                <input class="form-control" name="model" value="{{ $config['grammar']['model']['name'] }} " disabled>
                                @else
                                <input class="form-control" name="model" disabled>
                                @endif
                            </div>
                        </div>


                        @for($i = 0; $i < $config['num_annotators']; $i++) <!-- numero di caselle di input in base a num_annotators nel file di conf -->
                        <div class="form-group row">
                            <label for="user_name" class="col-sm-2 col-form-label">User name *</label>
                            <div class="col-sm-10">
                                <input class="form-control" class="user_name" value="{{ old('users.'.$i) }}" placeholder="" name="users[]"> <!-- type="password"  -->
                                @if($errors->has('users.'.$i))
                                    <div class="error" style="color: red">{{ $errors->first('users.'.$i) }}</div>
                                @endif
                            </div>
                        </div>
                        @endfor

                        <div class="form-group">
                            <label for="dataset">Dataset *</label>
                            <input type="file" name="dataset" class="form-control-file">
                            @if($errors->has('dataset'))
                                <div class="error" style="color: red">{{ $errors->first('dataset') }}</div>
                            @endif
                        </div>

                        <div class="form-group row">
                            <div class="col-sm-10">
                                <a class="btn btn-primary" href="#" onclick="history.go(-1)">Back</a>
                                <button type="submit" class="btn btn-primary">Start</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

</body>
</html>


