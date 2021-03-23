<div class="col" id="tweet">
    <div id="home">
        <a href="/">Home</a>
    </div>
    @if($config['list_previous_tweets'] == 'true') <!-- se è true dal file di conf visualizzo il link dei tweet precedenti -->
        <div id="list_previous">
            <a href="/previousList/{{ $id }}">List previous tweets</a>
        </div>
    @endif

    <blockquote class="twitter-tweet">
        <p lang="it" dir="ltr" id="sentence" name="sentence">{{ $sentence }}</p>   <!-- tweet da annotare -->
    </blockquote>

    @if($config['images']['flag'] == 'true') <!-- se è true dal file di conf visualizzo le immagini -->
        <div class="col" id="multimedia">
            <img src="{{ $config['images']['url'] }}sonic.gif">
        </div>
    @endif
</div>
