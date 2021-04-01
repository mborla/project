<!doctype html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">

    <!-- js -->
    <script src="https://d3js.org/d3.v4.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">

    <title>Annotation</title>

    @php
        $config = json_decode(file_get_contents(base_path('config.json')), true);
    @endphp

    <link href="../css/annotation.css" type="text/css" rel="stylesheet"/>

    @isset($config['grammar']['model']['name'])
    <link rel="stylesheet" href="../css/{{ $config['grammar']['model']['name'] }}.css">
    @endif

</head>
<body>

<!-- Option 1: jQuery and Bootstrap Bundle (includes Popper) -->
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>


<div class="container-fluid">
    @foreach($config['layout'] as $layout => $layout)

        <div class="{{ $layout }}">

        @foreach($config['layout'][$layout] as $div => $div)

            @include($div) <!--richiamo il div del modello, del tweet e dei bottoni -->

                <style>
                    #{{ $div }}{
                        width: {{ $config['layout'][$layout][$div]['width'] }};
                        float: {{ $config['layout'][$layout][$div]['float'] }};
                        margin-left: {{ $config['layout'][$layout][$div]['margin-left'] }};
                        margin-right: {{ $config['layout'][$layout][$div]['margin-right'] }};
                    }
                    @media (max-width : 800px) {
                        #{{ $div }}{
                            width: 100%;
                            float:none;
                        }
                    }
                </style>
            @endforeach
        </div>
    @endforeach
</div>

<!-- richiama il js del modello scelto, es. plutchik.js -->
@isset($config['grammar']['model'])
<script type="text/javascript" src="../js/{{ $config['grammar']['model']['name'] }}.js"></script>
@endif

<script>
    var next = $("#btn_next");
    var annotation = []; // array tiene traccia dei tag selezionati

    // se il tweet è già stato annotato metto in evidenza i tag
    $(window).on("load", function(){

        @isset($tag)
        @foreach($tag as $tags)

            annotation.push('{{ $tags->tag }}');

            // metto in evidenza le emozioni della ruota
            if("{{$config['extra']}}"==='true'){
                $({{explode('[', $tags->tag)[0]}}).attr("class", "active");
                $({{explode('[', $tags->tag)[0]}}).attr("id", "{{$tags->tag}}");
            }else {
                $({{ $tags->tag }}).attr("class", "active");
                $(".dyads #text_{{ $tags->tag }}").attr("class", "text_active");
            }
            // metto in evidenza i bottoni e gestisco il blocco
            $("input").each(function (){
                if($(this).attr("id") === "{{ $tags->tag }}"){

                    $(this).attr("class", "active").prop('checked', true);

                    var flag = $(this).attr("value");
                    var selected_btn = $(this).attr("id");
                    if (flag === "true") {  // se il bottone è bloccante deseleziono tutti i bottoni che blocca
                        @foreach($config['grammar']['category'] as $category => $category)
                            @foreach($config['grammar']['category'][$category]['buttons'] as $button => $button)
                                @foreach($config['grammar']['category'][$category]['buttons'][$button]['block']['by'] as $block => $block)
                                    if ('{{ $block }}' === selected_btn) {
                                        $({{ $button }}).attr("class", "not-active").prop('checked', false).prop("disabled", true);
                                    }
                                @endforeach

                                @isset($config['grammar']['model']['block']['by'])
                                @foreach($config['grammar']['model']['block']['by'] as $block => $block)
                                    if ('{{ $block }}' === selected_btn) {
                                        $('#model').css("pointer-events", "none");
                                    }
                                @endforeach
                                @endisset
                            @endforeach
                        @endforeach
                    }
                }
            })

        @endforeach

        next.attr("disabled", function(){
            if(annotation.length !== 0){ return null; }else{ return "disabled";}
        });
        @endisset

    })


    $("body").on("click", function(){

        annotation = [];

        // inserisco nell'array annotation tutti gli id degli elementi che hanno classe "selected"
        $(".active").each(function(i) {
            annotation.push($(this).attr("id"));
        });

        next.attr("disabled", function(){
            if(annotation.length !== 0){ return null; }else{ return "disabled";}
        });

        //console.log(annotation);

    })

    next.on("click", function(){ // quando clicco next invio al backend l'annotazione
        $.ajax({
            type:'get',
            url:"/addAnnotation",
            data: { id: {{ $id }}, data: annotation}
        });
    })
</script>


</body>
</html>


