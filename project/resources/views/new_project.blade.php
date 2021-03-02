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

    <title>New projct</title>

</head>
<body>

    <div class="container-fluid">
        <div id="home"><a href="/">Home</a></div>
        <div class="row">
            <div class="col">
                <h1>New project</h1>
            </div>
        </div>
        <div class="row">
            <div class="col">

                <form action="/insertProject" method="POST" enctype="multipart/form-data">
                    @csrf
                    <div class="form-group row">
                        <label for="project_name" class="col-sm-2 col-form-label">Project's name *</label>
                        <div class="col-sm-10">
                            <input class="form-control" name="project_name" value="{{ old('project_name') }}" placeholder="">
                            @if($errors->has('project_name'))
                                <div class="error" style="color: red">{{ $errors->first('project_name') }}</div>
                            @endif
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="project_name" class="col-sm-2 col-form-label">Model</label> <!-- modello del progetto -->
                        <div class="col-sm-10">
                            <input class="form-control" name="model" value="{{ old('model') }} "placeholder="">
                        </div>
                    </div>

                    @php
                    $config = json_decode(file_get_contents('..\config.json'), true);
                    @endphp

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
                            <button type="submit" class="btn btn-primary">Start</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

</body>
</html>


