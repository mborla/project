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
            "<div class='ext-p'>" +
            "<div class='not-active1'><div class='not-active' id="+element+"1></div></div>" +
            "<div class='not-active2'><div class='not-active' id="+element+"2></div></div>" +
            "<div class='not-active3'><div class='not-active' id="+element+"3></div></div>" +
            "<div class='not-active4'><div class='not-active' id="+element+"4></div></div> </div> </div>"));
    });
    return res;
}

function show_model() {
    var emotion1= ["Pride", "Elation", "Joy", "Satisfaction", "Relief", "Hope", "Interest", "Surprise", "Sadness", "Fear", "Shame", "Guilt", "Envy", "Disgust", "Contempt", "Anger"];
    var res= $('<div id="circle"></div>');
    var res1= $('<div class="hr"></div>');
    var res2= $('<div class="hrv"></div>');
    var res3= $('<div class="not-active" id="neutrale" title="Neutral"></div>');
    $("#model").append(res1);
    $("#model").append(res2);
    $("#model").append(res3);
    $("#model").append(res);
    var text=  $("<div id=\"texture\"></div>");
    var circle1= $("<div class='circle1'></div>");
    emotion1.forEach(element=>{
        circle1.append($("<div class='li'><div class='ext-circle'><div class='ext-p'><div class='text'>"+element+"</div></div></div></div>"));
    });
    text.append(circle1);
    $("#model").append(text);
    res.append(emotion(emotion1));
    $("#model").append(res);
}

function active() {
    var cordX;
    var cordY;
    var offset = $("#circle").offset();
    var x = ((Math.floor(((event.pageX - (offset.left)) / $("#circle").width() * 10000)/100))-49);
    var y = (-(Math.floor(((event.pageY - offset.top) / $("#circle").height() * 10000)/100))+49);
    cordX=x;
    cordY=y;
    var e = document.getElementById(this.id);
    if(this.className==="not-active"){
        this.className="active";
        if(e.id === "neutrale"){
            var f = document.getElementsByClassName("active");
            var i=0;
            while(i<f.length){
                if(f.item(0).id !== "neutrale"){
                    f.item(0).id =  f.item(0).id.split("[")[0];
                    (f.item(0)).classList.add("not-active");
                    f.item(0).classList.remove("active");
                }else{
                    f.item(0).classList.remove("active");
                }
            }
            this.className="active";
            e.id = this.id+"[0,0]";
        }else{
            var n= document.getElementById("neutrale[0,0]");
            if(n){
                if (n.className === "active"){
                    n.id= "neutrale";
                    n.className= "";
                    n.className="not-active"
                }
            }
            this.className="active";
            e.id = this.id+"["+cordX+", "+ cordY+"]";
        }
    }else{
        var e = document.getElementById(this.id);
        e.id = this.id.split("[")[0];
        this.className="not-active";
    }
}
