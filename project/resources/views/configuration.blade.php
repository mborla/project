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

    <title>Project's Configuration</title>

</head>
<body>

<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>


<div class="container-fluid">
    <div id="home"><a href="/">Home</a></div>
    <div class="row">
        <div class="col">
            <h1>Choose configuration's file</h1>
        </div>
    </div>
    <div class="row">
        <div class="col">

            <form action="/insertConfigFile" method="GET" enctype="multipart/form-data">

                @csrf
                <div class="form-group row">
                    <label for="project_name" class="col-sm-2 col-form-label" name="conf_file">Configuration file</label> <!-- modello del progetto -->
                    <div class="col-sm-10">
                        <select class="custom-select" name="filename">
                            <option value="" selected></option>
                            @php
                                $filesInFolder = \File::files(base_path('project_config'));
                            @endphp
                            @foreach($filesInFolder as $path)
                                <option value="{{ pathinfo($path)['filename'] }}">{{ pathinfo($path)['filename'] }}</option>
                            @endforeach
                        </select>
                        @if($errors->has('filename'))
                            <div class="error" style="color: #ff0000">{{ $errors->first('filename') }}</div>
                        @endif
                    </div>
                </div>

                <div class="form-group row">
                    <div class="col-sm-10">
                        <button id="btn_submit"type="submit" class="btn btn-primary">Submit</button>
                    </div>
                </div>

            </form>
        </div>
    </div>
</div>

</body>
</html>


