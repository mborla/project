<!doctype html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
    <link href="../css/info.css" type="text/css" rel="stylesheet"/>


    <!-- js -->
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">

    <title>Info</title>

</head>
<body>
    <div class="container-fluid">
        <div id="info">
            <h1>{{ $info }}!</h1>
            @if(isset($last_id))
                <a href="/previous/{{ $last_id }}">Last annotation</a> <br>
                <a href="/">Home</a> <br>
            @else
                <a href="#" onclick="history.go(-1)">Back</a> <br>
            @endif

        </div>
    </div>
</body>
</html>


