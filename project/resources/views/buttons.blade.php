<div class="col" id="buttons">  <!-- creazione dei bottoni -->
    @if(isset($config['grammar']['category']))

        @foreach($config['grammar']['category'] as $category => $category)

            <div class="row" id="row_added" value="{{ $category }}">

                @isset($config['grammar']['category'][$category]['header'])
                <div class="text-header">{{ $config['grammar']['category'][$category]['header'] }}</div> <!-- header es. Ironia, Hate speech, Altro-->
                @endisset

                @foreach($config['grammar']['category'][$category]['buttons'] as $button => $button)
                    @if($button != "")
                    <div class="col" id="col_added">
                        <!-- bottoni es. ironia, sarcasmo, odio.. -->
                        <input type="checkbox" name="{{ $button }}" id="{{ $button }}" value="{{ $config['grammar']['category'][$category]['buttons'][$button]['block']['flag'] }}" class="not-active">
                        <label for="{{ $button }}" type="button" class="btn btn-outline btn-block btn-sm">{{ $button }}</label>
                    </div>
                    <style> /* colore dei bottoni dal file di conf */
                        input[id="{{ $button }}"] + label {
                            color: {{ $config['grammar']['category'][$category]['buttons'][$button]['color'] }};
                            border-color: {{ $config['grammar']['category'][$category]['buttons'][$button]['color'] }}
                        }
                        input[id="{{ $button }}"]:checked + label {
                            background-color: {{ $config['grammar']['category'][$category]['buttons'][$button]['color'] }};
                            color: white;
                        }
                    </style>
                    @else
                        <div class="col" id="col_added">
                            <!-- bottoni es. ironia, sarcasmo, odio.. -->
                        </div>
                    @endif
                @endforeach
            </div>

    @endforeach
@endif

<!-- bottoni previous e next -->
    <div class="row" id="row_control">
        <div class="col" id="col_previous">
            <form action="/previous/{{ $id }}" method="GET">
                {{ csrf_field() }}
                <input type="checkbox" name="previous" id="previous" value="previous">
                <button id="btn_previous" for="previous" type="submit" class="btn btn-success btn-block btn-sm">Previous</button>
            </form>
        </div>
        <div class="col" id="col_next">
            <form action="/next/{{ $id }}" method="POST">
                {{ csrf_field() }}
                <input type="checkbox" name="next" id="next" value="next">
                <button id="btn_next" for="next" type="submit" class="btn btn-success btn-block btn-sm" disabled>Next</button>
            </form>
        </div>
    </div>
    @if($config['progress'] == 'true') <!-- se è true dal file di conf visualizzo il numero del tweet che sto annotando e il numero totale di tweets annotati-->
    <div id="progress">
        @if(isset($day_annotation))
            <a>Today you have annotated {{$day_annotation}} tweets </a>
            <br>
        @endif
        @if(isset($total) && isset($progress))
            <a>In total you have annotated {{$progress}} tweets of {{$total}}</a>
        @endif
    </div>
    @endif

</div>

<script>

    $("input").on("click", function () {    // gestione dei click sui bottoni (no previous e next)

        var selected_btn = $(this).attr("id");
        var flag = $(this).attr("value");

        if($(this).attr("class") === "not-active"){
            if(document.getElementById("neutral[0,0]")){
                document.getElementById("neutral[0,0]").setAttribute("class", "not-active");
                document.getElementById("neutral[0,0]").setAttribute("id", "neutral");
            }

            $(this).attr("class", "active").prop('checked', true);

            if (flag === "true") {

                @foreach($config['grammar']['category'] as $category => $category) //'row_'
                    @foreach($config['grammar']['category'][$category]['buttons'] as $button => $button)
                        @foreach($config['grammar']['category'][$category]['buttons'][$button]['block']['by'] as $block => $block)
                            if ('{{ $block }}' === selected_btn) {
                                $({{ $button }}).attr("class", "not-active").prop('checked', false).prop("disabled", true);
                            }
                        @endforeach

                        @isset($config['grammar']['model']['block']['by'])
                        @foreach($config['grammar']['model']['block']['by'] as $block => $block)
                            if ('{{ $block }}' === selected_btn) {
                                d3.select('#model').selectAll(".active").attr("class", "not-active");
                                d3.selectAll('.text_active').attr("class", "text_not-active");
                                $('#model').css("pointer-events", "none");
                            }
                        @endforeach
                        @endisset
                    @endforeach
                @endforeach

            }
        }else{
            $(this).attr("class", "not-active").prop('checked', false);

            @foreach($config['grammar']['category'] as $category => $c)
                @foreach($config['grammar']['category'][$category]['buttons'] as $button => $b)
                    @foreach($config['grammar']['category'][$category]['buttons'][$button]['block']['by'] as $block => $block)
                        if ('{{ $block }}' === selected_btn) {
                            $({{ $button }}).prop("disabled", false);
                        }
                    @endforeach

                    @isset($config['grammar']['model'])
                    @foreach($config['grammar']['model']['block']['by'] as $block => $block)
                        if ('{{ $block }}' === selected_btn) {
                            $('#model').css("pointer-events", "initial");
                        }
                    @endforeach
                    @endisset

                @endforeach
            @endforeach
        }

    });

</script>
