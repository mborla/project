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
                        <label for="project_name" class="col-sm-2 col-form-label">Project's name</label>
                        <div class="col-sm-10">
                            <input class="form-control" name="project_name" placeholder="Name">
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="project_name" class="col-sm-2 col-form-label">Model</label> <!-- modello del progetto -->
                        <div class="col-sm-10">
                            <input class="form-control" name="model" placeholder="Model">
                        </div>
                    </div>

                    @php
                    $config = include('..\config.php');
                    @endphp

                    @for($i = 0; $i < $config['num_annotators']; $i++) <!-- numero di caselle di input in base a num_annotators nel file di conf -->
                    <div class="form-group row">
                        <label for="user_name" class="col-sm-2 col-form-label">User name</label>
                        <div class="col-sm-10">
                            <input class="form-control" class="user_name" placeholder="User name" name="users[]"> <!-- type="password"  -->
                        </div>
                    </div>
                    @endfor

                    <div class="form-group">
                        <label for="dataset">Dataset</label>
                        <input type="file" name="dataset" class="form-control-file">
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


