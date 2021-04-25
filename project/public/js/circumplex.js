$(document).ready(function() {
    $("head").append($('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">'));
    show_model();
    $(".li").click(active);
    var ob=new MutationObserver(function () {
        var actives= document.getElementsByClassName("active");
        i=0;
        var id= "icon-"+actives[i].id.split("[")[0];
        if(actives.length===1 && document.getElementById(id)){
            ob.disconnect();
        }else{
            while (i<actives.length){
                var id= "icon-"+actives[i].id.split("[")[0];
                var cordX= (actives[i].id.split("[")[1]).split(",")[0];
                var cordY= (actives[i].id.split("[")[1]).split(",")[1].split("]")[0];
                var icon= $("<i class=\"fa fa-asterisk\" id="+id+" aria-hidden=\"true\"></i>");
                $(".circle").append(icon);
                with(document.getElementById(id)) {
                    style.position= "absolute";
                    style.right = (49-(cordX))+"%";
                    style.top = 48-(cordY)+"%";
                }
                i++;
            }
            ob.disconnect();
        }
    });
    var obs= document.getElementsByClassName("li");
    var i=0;
    while(i<obs.length){
        ob.observe(obs[i].firstElementChild, { attributes: true, attributeFilter: ["class"]});
        i++;
    }

    /*

        var resizeId;
        var resizeId2;
        $(window).resize(function() {
            clearTimeout(resizeId);
            resizeId = setTimeout(doneResizing, 500);
            resizeId2 = setTimeout(doneResizing2, 0);
        });

        function doneResizing2() {
            var circle= document.getElementById("circle");
            var height=circle.getAttribute("height");
            var width=circle.getAttribute("width");
            circle.style.width=width;
            circle.style.height=height;
        }

        function doneResizing(){
            var circle= document.getElementById("circle");
            circle.style.width="40vw";
            circle.style.height="40vw";
        }

     */




});

function emotion(array) {
    if(array.length===0){
        throw new Error("no emotion insert");
        return -1;
    }
    var res= $("<div class=\"circle\"></div>");
    array.forEach(element => {
        res.append($("<div class='li'> <div class=\"not-active\" id="+element+"><div class='ext-p'> <p><label>"+element+"</label></p></div> </div> </div>"));
    });
    return res;

}


function show_model() {
    var emotion1= ["rage", "exited", "elated", "happy", "contented", "serene", "relaxed", "calm", "bored", "depressed", "sad", "upset", "stressed", "nervous", "tense"];
    var res= $('<div id="circle"></div>');
    var res1= $('<div class="hr"></div>');
    var res2= $('<div class="hrv"></div>');
    var res3= $('<div class="li" id="neutr"><div class="not-active" id="neutrale" title="Neutral"></div></div>');
    $("#model").append(res1);
    $("#model").append(res2);
    $("#model").append(res3);
    $("#model").append(res);
    $("#model").append($("<div id='activation'><p>Activation</p></div>"));
    $("#model").append($("<div id='unpleasant'><p>Unpleasant</p></div>"));
    $("#model").append($("<div id='pleasant'><p>Pleasant</p></div>"));
    res.append(emotion(emotion1));
    $("#model").append($("<div id='deactivation'><p>Deactivation</p></div>"));
    $("#model").append(res);
}

function active() {
    var child= this.firstElementChild;
    var cordX;
    var cordY;
    var offset = $("#circle").offset();
    var x = (((((event.pageX - (offset.left)) / $("#circle").width() * 10000)/100))-50);
    var y = (-((((event.pageY - offset.top) / $("#circle").height() * 10000)/100))+50);
    cordX=x;
    cordY=y;
    var e = document.getElementById(child.id);
    if(child.className==="not-active"){
        child.className="active";
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
            var temp=document.getElementsByClassName("fa fa-asterisk");
            while (i<temp.length){
                temp.item(0).remove();
            }
            child.className="active";
            e.id = child.id+"[0,0]";
        }else{
            var id= "icon-"+child.id;
            var icon= $("<i class=\"fa fa-asterisk\" id="+id+" aria-hidden=\"true\"></i>");
            $(".circle").append(icon);
            with(document.getElementById(id)) {
                style.position= "absolute";
                style.right = (48-(cordX))+"%";
                style.top = 48-(cordY)+"%";
            }
            var n= document.getElementById("neutrale[0,0]");
            if(n){
                if (n.className === "active"){
                    n.id= "neutrale";
                    n.className= "";
                    n.className="not-active"
                }
            }
            child.className="active";
            e.id = child.id+"["+cordX+", "+ cordY+"]";
        }
    }else{

        var e = document.getElementById(child.id);
        e.id = child.id.split("[")[0];
        var id= "icon-"+child.id;
        var rem=document.getElementById(id);
        if(rem){
            rem.remove();
        }
        child.className="not-active";
    }
}
