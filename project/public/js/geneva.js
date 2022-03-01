$(document).ready(function() {
    show_model();
    $("div.not-active").click(active);
    $("div.active").click(active);

});

function emotion(array) {
    if(array.length===0){
        throw new Error("no emotion insert");
        return -1;
    }
    var res= $("<div class=\"circle\"></div>");
    array.forEach(element => {
        res.append($("<div class='li'> <div class=\"ext-circle\">" +
            "<div class='not-active1'><div class='not-active' id="+element+"1></div></div>" +
            "<div class='not-active2'><div class='not-active' id="+element+"2></div></div>" +
            "<div class='not-active3'><div class='not-active' id="+element+"3></div></div>" +
            "<div class='not-active4'><div class='not-active' id="+element+"4></div></div>" +
            "<div class='not-active5'><div class='not-active' id="+element+"5></div></div></div> </div> </div>"));
    });
    return res;
}

function show_model() {
    var emotion1= ["Interest", "Laughter", "Pride", "Joy", "Pleasure", "Contentment", "Love",
        "Admiration", "Relief", "Pity", "Sadness", "Guilt", "Regret", "Shame", "Frustration", "Fear", "Disgust", "Contempt", "Hate", "Anger"];
    var res= $('<div id="circle"></div>');
    var res1= $('<div class="hr"></div>');
    var res2= $('<div class="hrv"></div>');
    var res3= $('<div class="not-active" id="neutral" title="Neutral"></div>');
    var modal= $("<div id=\"myModal\" class=\"modal\">\n" +
        "\n" +
        "  <!-- Modal content -->\n" +
        "  <div class=\"modal-content\">\n" +
        "    <div class=\"modal-header\">Enter emotion\n" +
        "      <span class=\"close\">&times;</span>\n" +
        "    </div>\n" +
        "    <div class=\"modal-body\">\n" +
        "    <input type='text' id='emotionText' maxlength=\"20\"> " +
        "    <div id='modalButton'><button id='deleteEmotion'>Delete</button> " +
        "    <button id='submitEmotion'>conferma</button></div>" +
        "    </div>\n" +
        "    " +
        "  </div>\n" +
        "\n" +
        "</div>\n");
    var res4= $('<div class="not-active" id="other" title="other">Other</div>');
    $("#model").append(res1);
    $("#model").append(res2);
    $("#model").append(res3);
    $("#model").append(modal);
    $("#model").append(res4);
    $("#model").append(res);
    var text=  $("<div id=\"texture\"></div>");
    var circle1= $("<div class='circle1'></div>");
    emotion1.forEach(element=>{
        circle1.append($("<div class='li'><div class='ext-circle'><div class='text'>"+element+"</div></div></div>"));
    });
    text.append(circle1);
    $("#model").append(text);
    res.append(emotion(emotion1));
    $("#model").append(res);
}
/*
d3.select('#model').selectAll(".active").attr("class", "not-active");
d3.selectAll('.text_active').attr("class", "text_not-active");
$('#model').css("pointer-events", "none");
*/
function active() {
    var cordX;
    var cordY;
    var offset = $("#circle").offset();
    var x = ((Math.floor(((event.pageX - (offset.left)) / $("#circle").width() * 10000)/100))-49);
    var y = (-(Math.floor(((event.pageY - offset.top) / $("#circle").height() * 10000)/100))+49);
    cordX=x;
    cordY=y;
    var e = document.getElementById(this.id);
    if(this.className==="not-active" && this.id === 'other'){
        document.getElementById('emotionText').value = "";
        var modal = document.getElementById("myModal");
        var span = document.getElementsByClassName("close")[0];
        var button = document.getElementById("submitEmotion");
        button.onclick = function(){
            var text = document.getElementById('emotionText').value;
            var e = document.getElementById("other");
            e.id = e.id + '[' +text + ']';
            e.className="active";
            modal.style.display = "none";
            var n= document.getElementById("neutral[0,0]");
            if(n){
                if (n.className === "active"){
                    n.id= "neutral";
                    n.className= "";
                    n.className="not-active"
                }
            }
        }
        document.getElementById('deleteEmotion').onclick = function () {
            document.getElementById("emotionText").value = "";
            document.getElementById("myModal").style.display = "none";
            e.id = "other";
            e.className = "not-active";
        }
        modal.style.display = "block";
        span.onclick = function() {
            modal.style.display = "none";
        }
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

    }else if(this.className==="not-active"){
        if(e.id === "neutral"){
            d3.select('.container-fluid').selectAll(".active").attr('id', function(d, i) {
                return d3.select(this).attr('id').split('[')[0];
            });
            d3.select('.container-fluid').selectAll(".active").attr("class", "not-active").property('checked', false);
            this.className="active";
            e.id = this.id+"[0,0]";
        }else{
            var n= document.getElementById("neutral[0,0]");
            if(n){
                if (n.className === "active"){
                    n.id= "neutral";
                    n.className= "";
                    n.className="not-active"
                }
            }
            var i=0;
            while(i<5){
                var sib=(this.parentNode).parentNode.children.item(i).children.item(0);
                if(sib){
                    if(sib.className === "active"){
                        sib.classList.remove("active");
                        sib.classList.add("not-active");
                        sib.id= sib.id.split("[")[0];
                    }
                    i++;
                }
            }
            this.className="active";
            e.id = this.id+"["+cordX+", "+ cordY+"]";
        }
    }else{
        if(this.id.split("[")[0] === "other"){
            document.getElementById('deleteEmotion').onclick = function () {
                document.getElementById("emotionText").value = "";
                document.getElementById("myModal").style.display = "none";
                e.id = "other";
                e.className = "not-active";
            }
            var emotion = this.id.split("[")[1];
            var modal = document.getElementById("myModal");
            var span = document.getElementsByClassName("close")[0];
            var button = document.getElementById("submitEmotion");
            var text = document.getElementById('emotionText');
            var other = document.getElementById(this.id);
            text.value = emotion.split("]")[0];
            button.onclick = function(){
                var text = document.getElementById('emotionText').value;
                if(text ===""){
                    other.id = "other";
                    other.className = "not-active";
                }else{
                    other.id = 'other[' +text + ']';
                    e.className="active";
                }
                modal.style.display = "none";
            }
            modal.style.display = "block";
            span.onclick = function() {
                modal.style.display = "none";
            }
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }

        }else{
            var e = document.getElementById(this.id);
            e.id = this.id.split("[")[0];
            this.className="not-active";
        }

    }
}
