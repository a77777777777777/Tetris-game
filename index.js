var timerid=0,timercount=0,gamespeed;
var rowcompletestart,rowcompletedlast,animatecount; var isrowanimatecomplete;
var currenttheme,themecode="All";
var isStarted,isobjectmoving,nextobject=1,currentobject=1,currentangle,currentrow,currentcolumn;
var score;
var touchcount=0;
var size;
var themegrid=[];
var currentkey,keycount;
window.onload=()=>{
    document.getElementById("loading").style.display="none"; clearInterval(loadingid); initialize();
}

function initialize(){
    document.getElementById(themecode).classList.add("activebtn");
    currentkey="";keycount=10; themegrid=[];
    isStarted=false,isobjectmoving=false;
    resetgridboxsize();createGrid(20,10);
}


document.getElementById("floor").addEventListener("touchend",function(event){
    event.preventDefault();
});
document.getElementById("floor").addEventListener("touchmove",function(event){
    event.preventDefault();
});
document.getElementById("floor").addEventListener("dblclick",function(event){
    event.preventDefault();
});
document.getElementById("gamedisplay").addEventListener("touchend",function(event){
    event.preventDefault();
});
document.getElementById("gamedisplay").addEventListener("touchmove",function(event){
    event.preventDefault();
});
document.getElementById("gamedisplay").addEventListener("dblclick",function(event){
    event.preventDefault();
});


document.getElementById("hsokbtn").addEventListener("touchstart",function(event){
    event.preventDefault(); savescore('hsnameinput');
});
document.getElementById("highscore").addEventListener("touchstart",function(event){
    event.preventDefault(); showhighscore();
});
document.getElementById("reset").addEventListener("touchstart",function(event){
    event.preventDefault(); reset();
});
document.getElementById("btnleft").addEventListener("touchstart",function(event){
    event.preventDefault(); moveleft();
});
document.getElementById("btnright").addEventListener("touchstart",function(event){
    event.preventDefault(); moveright();
});
document.getElementById("btncc").addEventListener("touchstart",function(event){
    event.preventDefault(); rotatecc();
});
document.getElementById("btncw").addEventListener("touchstart",function(event){
    event.preventDefault(); rotatecw();
});
document.getElementById("btndown").addEventListener("touchstart",function(event){
    event.preventDefault(); movedown();
});


document.getElementById("gamegrid").addEventListener("dblclick",function(event){
    event.preventDefault();
});
document.querySelector("body").addEventListener("touchend",function(event){
    event.preventDefault();
});
document.querySelector("body").addEventListener("touchmove",function(event){
    event.preventDefault();
});
document.querySelector("body").addEventListener("dblclick",function(event){
    event.preventDefault();
});
document.querySelector("body").addEventListener("touchstart",function(event){
    event.preventDefault();
});

document.addEventListener("contextmenu",(e)=>{e.preventDefault();});
document.getElementById("gamegrid").addEventListener("click",function(e){
    e.preventDefault(); rotatecw();
    touchcount=1;
});
document.getElementById("gamegrid").addEventListener("touchstart",function(e){
    e.preventDefault(); console.log(e.target.id);
    touchcount=1;
});
document.getElementById("gamegrid").addEventListener("touchmove",function(e){
    e.preventDefault();
});
document.getElementById("gamegrid").addEventListener("touchend",function(e){
    e.preventDefault();
    if(touchcount===1)rotatecc();
    touchcount=0;
});
window.addEventListener("resize",()=>{
    resetgridboxsize();resizegamebox();
});

window.addEventListener("keyup",(event)=>{
    currentkey="";
});

window.addEventListener("keydown",(event)=>{
    var key;
    if(event.key==="ArrowUp" || event.key==="w"|| event.key==="W")key="ArrowUp";
    else if(event.key==="ArrowDown" || event.key==="S"|| event.key==="s")key="ArrowDown";
    else if(event.key==="ArrowRight" || event.key==="D"|| event.key==="d")key="ArrowRight";
    else if(event.key==="ArrowLeft" || event.key==="A"|| event.key==="a")key="ArrowLeft";
    else if(event.key===" ")key=" ";
    
    if(key===currentkey){
       if(keycount===2){
        if(currentkey==="ArrowUp") rotatecw();
        else if(currentkey==="ArrowDown") movedown();
        else if(currentkey==="ArrowRight") moveright();
        else if(currentkey==="ArrowLeft") moveleft();
        else if(currentkey===" ") rotatecc();
        keycount=0;
       }else keycount++;
    }
    else if(key==="ArrowUp"){keycount=2; currentkey="ArrowUp"; rotatecw();}
    else if(key==="ArrowDown"){keycount=2; currentkey="ArrowDown"; movedown();}
    else if(key==="ArrowRight"){keycount=2; currentkey="ArrowRight"; moveright();}
    else if(key==="ArrowLeft"){keycount=2; currentkey="ArrowLeft"; moveleft();}
    else if(key===" "){keycount=2; currentkey=" "; rotatecc();}
});

function resetgridboxsize(){
    if(window.innerHeight>window.innerWidth){
        size=window.innerWidth; size=Math.floor(size*94/100);
    if(navigator.userAgent.includes("Android") || navigator.userAgent.includes("Mobile")){ 
        console.log(navigator.userAgent)
        size=window.innerWidth; //size=Math.floor(size*/100);
        document.getElementById("btnleft").style.width=Math.floor(size*0.85/5)+"px";
        document.getElementById("btnright").style.width=Math.floor(size*0.85/5)+"px";
        document.getElementById("btncc").style.width=Math.floor(size*0.85/5)+"px";
        document.getElementById("btncw").style.width=Math.floor(size*0.85/5)+"px";
        document.getElementById("btndown").style.width=Math.floor(size*0.85/5)+"px";
        document.getElementById("floor").style.height=window.innerHeight-document.getElementById("controls").offsetHeight-document.getElementById("controls").offsetTop+"px";
    }
    }else{
        size=window.innerHeight; size=Math.floor(size*83/100);
    }
}
function resizegamebox(){
    var boxsize;
    if(navigator.userAgent.includes("Android") || navigator.userAgent.includes("Mobile")){ 
        boxsize=Math.floor(size/16)-2; if(boxsize>50) boxsize=50;
    }else { boxsize=Math.floor(size/20)-2; if(boxsize>48) boxsize=48; }

    document.getElementById("message").style.fontSize=boxsize*2.5+"px"; document.getElementById("message").style.width=boxsize*10+"px";
    document.getElementById("message").style.top=(boxsize*7+document.getElementById("gamegrid").offsetTop*1)+"px";
    document.getElementById("gamegrid").style.setProperty("width",(10*(boxsize))+"px");

    for(var a=0;a<20;a++)for(var b=0;b<10;b++){document.getElementById(a+","+b).style.width=boxsize+"px";document.getElementById(a+","+b).style.height=boxsize+"px";}
}

function createGrid(h,w){
    var boxsize;  var row=column="";
    
    if(navigator.userAgent.includes("Android") || navigator.userAgent.includes("Mobile")){ 
        boxsize=Math.floor(size/16)-2; if(boxsize>58) boxsize=58;
    }else { boxsize=Math.floor(size/20)-2; if(boxsize>48) boxsize=48; }

    var tempstring="<div id='message' style='display:none'>Pause</div>";;
    for(var a=0;a<h;a++){
        themegrid[a]=new Array(w);
        row=row+" 1fr"; column="";
        for(var b=0;b<w;b++){
            themegrid[a][b]="0";
            tempstring+="<button class='btnbox blue' id='"+a+","+b+"' style='height:"+boxsize+"px;width:"+boxsize+"px;'></button>";
            column=column+" 1fr";
        }
    }

    document.getElementById("gamegrid").innerHTML=tempstring;

    for(var a=0;a<h;a++)for(var b=0;b<w;b++)document.getElementById(a+","+b).disabled=true;
    
    document.getElementById("message").style.fontSize=boxsize*2.5+"px"; document.getElementById("message").style.width=boxsize*10+"px";
    document.getElementById("message").style.top=(boxsize*7+document.getElementById("gamegrid").offsetTop*1)+"px";
    document.getElementById("score").style.top=133+50+"px"; document.getElementById("score").style.left="8px";
    document.getElementById("gamegrid").style.setProperty("width",(10*(boxsize))+"px");

    document.getElementById("gamegrid").style.setProperty("grid-template-columns",column);
    document.getElementById("gamegrid").style.setProperty("grid-template-rows",row);
}

function clearGrid(){
    for(var a=0;a<20;a++){
        for(var b=0;b<10;b++){
            themegrid[a][b]="0";
            document.getElementById(a+","+b).disabled=true;
            removetheme(a,b);
        }
    }
}

function changetheme(themeid){
    if(themecode!=themeid){
        document.getElementById(themecode).classList.remove("activebtn");
        themecode=themeid;
        document.getElementById(themecode).classList.add("activebtn");
        if(themeid==="All"){
            for(var a=0;a<20;a++) for(var b=0;b<10;b++){
                if(!document.getElementById(a+","+b).disabled){ 
                    if(themegrid[a][b].length>1){ 
                        removetheme(a,b);
                        document.getElementById(a+","+b).classList.add(themegrid[a][b]);
                    }
                }
            }
            if(isobjectmoving){

                if(currentobject===7){// |-
                    if(currentangle===1){
                        if(currentrow===0){
                            removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme); 
                        }else if(currentrow===1){
                            removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                            removetheme((currentrow-1),(currentcolumn+1)); document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                            removetheme((currentrow-1),(currentcolumn)); document.getElementById((currentrow-1)+","+(currentcolumn)).classList.add(currenttheme);
                        }else{
                            removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                            removetheme((currentrow-1),(currentcolumn+1)); document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                            removetheme((currentrow-1),(currentcolumn)); document.getElementById((currentrow-1)+","+(currentcolumn)).classList.add(currenttheme);
                            removetheme((currentrow-2),(currentcolumn)); document.getElementById((currentrow-2)+","+(currentcolumn)).classList.add(currenttheme);
                        }
                    }else if(currentangle===2){ // T
                        if(currentrow===0){
                            if(currentcolumn===0){
                                removetheme((currentrow),(currentcolumn+1)); document.getElementById((currentrow)+","+(currentcolumn+1)).classList.add(currenttheme);
                            }else{
                                removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                            }
                        }else{
                            if(currentcolumn===0){
                                removetheme((currentrow),(currentcolumn+1)); document.getElementById((currentrow)+","+(currentcolumn+1)).classList.add(currenttheme);
                                removetheme((currentrow-1),(currentcolumn+1)); document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                                removetheme((currentrow-1),(currentcolumn)); document.getElementById((currentrow-1)+","+(currentcolumn)).classList.add(currenttheme);
                                removetheme((currentrow-1),(currentcolumn+2)); document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.add(currenttheme);
                            }else{
                                removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                                removetheme((currentrow-1),(currentcolumn+1)); document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                                removetheme((currentrow-1),(currentcolumn)); document.getElementById((currentrow-1)+","+(currentcolumn)).classList.add(currenttheme);
                                removetheme((currentrow-1),(currentcolumn-1)); document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.add(currenttheme);
                            }
                        }
                    }else if(currentangle===3){ // -|
                        if(currentrow===0){
                            removetheme((currentrow),(currentcolumn+1)); document.getElementById((currentrow)+","+(currentcolumn+1)).classList.add(currenttheme);
                        }else if(currentrow===1){
                            removetheme((currentrow),(currentcolumn+1)); document.getElementById((currentrow)+","+(currentcolumn+1)).classList.add(currenttheme);
                            removetheme((currentrow-1),(currentcolumn+1)); document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                            removetheme((currentrow-1),(currentcolumn)); document.getElementById((currentrow-1)+","+(currentcolumn)).classList.add(currenttheme);
                        }else{
                            removetheme((currentrow),(currentcolumn+1)); document.getElementById((currentrow)+","+(currentcolumn+1)).classList.add(currenttheme);
                            removetheme((currentrow-1),(currentcolumn+1));document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                            removetheme((currentrow-1),(currentcolumn));document.getElementById((currentrow-1)+","+(currentcolumn)).classList.add(currenttheme);
                            removetheme((currentrow-2),(currentcolumn+1)); document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.add(currenttheme);
                        }
                    }else{ // _|_
                        if(currentrow===0){
                            if(currentcolumn===0){
                                removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                                removetheme((currentrow),(currentcolumn+1));document.getElementById((currentrow)+","+(currentcolumn+1)).classList.add(currenttheme);
                                removetheme((currentrow),(currentcolumn+2));document.getElementById((currentrow)+","+(currentcolumn+2)).classList.add(currenttheme);
                            }else{
                                removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                                removetheme((currentrow),(currentcolumn+1)); document.getElementById((currentrow)+","+(currentcolumn+1)).classList.add(currenttheme);
                                removetheme((currentrow),(currentcolumn-1)); document.getElementById((currentrow)+","+(currentcolumn-1)).classList.add(currenttheme);
                            }
                        }else{
                            if(currentcolumn===0){
                                removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                                removetheme((currentrow),(currentcolumn+1)); document.getElementById((currentrow)+","+(currentcolumn+1)).classList.add(currenttheme);
                                removetheme((currentrow),(currentcolumn+2)); document.getElementById((currentrow)+","+(currentcolumn+2)).classList.add(currenttheme);
                                removetheme((currentrow-1),(currentcolumn+1)); document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                            }else{
                                removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                                removetheme((currentrow),(currentcolumn+1)); document.getElementById((currentrow)+","+(currentcolumn+1)).classList.add(currenttheme);
                                removetheme((currentrow),(currentcolumn-1)); document.getElementById((currentrow)+","+(currentcolumn-1)).classList.add(currenttheme);
                                removetheme((currentrow-1),(currentcolumn)); document.getElementById((currentrow-1)+","+(currentcolumn)).classList.add(currenttheme);
                            }
                        }
                    }
                }else if(currentobject===6){// |\
                    if(currentangle===1){
                        if(currentrow===0){
                            removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                        }else if(currentrow===1){
                            removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                            removetheme((currentrow-1),(currentcolumn+1)); document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                            removetheme((currentrow-1),(currentcolumn)); document.getElementById((currentrow-1)+","+(currentcolumn)).classList.add(currenttheme);
                        }else{
                            removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                            removetheme((currentrow-1),(currentcolumn+1)); document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                            removetheme((currentrow-1),(currentcolumn)); document.getElementById((currentrow-1)+","+(currentcolumn)).classList.add(currenttheme);
                            removetheme((currentrow-2),(currentcolumn+1)); document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.add(currenttheme);
                        }
                    }else{ // -_
                        if(currentrow===0){
                            if(currentcolumn===0){
                                removetheme((currentrow),(currentcolumn+1)); document.getElementById((currentrow)+","+(currentcolumn+1)).classList.add(currenttheme);
                                removetheme((currentrow),(currentcolumn+2)); document.getElementById((currentrow)+","+(currentcolumn+2)).classList.add(currenttheme);
                            }else{
                                removetheme((currentrow-1),(currentcolumn)); document.getElementById((currentrow-1)+","+(currentcolumn)).classList.add(currenttheme);
                                removetheme((currentrow-1),(currentcolumn+1)); document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                                removetheme((currentrow),(currentcolumn+1)); document.getElementById((currentrow)+","+(currentcolumn+1)).classList.add(currenttheme);
                                removetheme((currentrow),(currentcolumn+2)); document.getElementById((currentrow)+","+(currentcolumn+2)).classList.add(currenttheme);
                            }
                        }else{
                            if(currentcolumn===0){
                                removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                                removetheme((currentrow),(currentcolumn+1)); document.getElementById((currentrow)+","+(currentcolumn+1)).classList.add(currenttheme);
                            }else{
                                removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                                removetheme((currentrow),(currentcolumn+1)); document.getElementById((currentrow)+","+(currentcolumn+1)).classList.add(currenttheme);
                                removetheme((currentrow-1),(currentcolumn-1)); document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.add(currenttheme);
                                removetheme((currentrow-1),(currentcolumn)); document.getElementById((currentrow-1)+","+(currentcolumn)).classList.add(currenttheme);
                            }
                        }
                    }
                }else if(currentobject===5){// /|
                    if(currentangle===1){
                        if(currentrow===0){
                            removetheme((currentrow),(currentcolumn+1)); document.getElementById((currentrow)+","+(currentcolumn+1)).classList.add(currenttheme);
                        }else if(currentrow===1){
                            removetheme((currentrow),(currentcolumn+1)); document.getElementById((currentrow)+","+(currentcolumn+1)).classList.add(currenttheme);
                            removetheme((currentrow-1),(currentcolumn+1)); document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                            removetheme((currentrow-1),(currentcolumn)); document.getElementById((currentrow-1)+","+(currentcolumn)).classList.add(currenttheme);
                        }else{
                            removetheme((currentrow),(currentcolumn+1)); document.getElementById((currentrow)+","+(currentcolumn+1)).classList.add(currenttheme);
                            removetheme((currentrow-1),(currentcolumn+1)); document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                            removetheme((currentrow-1),(currentcolumn)); document.getElementById((currentrow-1)+","+(currentcolumn)).classList.add(currenttheme);
                            removetheme((currentrow-2),(currentcolumn)); document.getElementById((currentrow-2)+","+(currentcolumn)).classList.add(currenttheme);
                        }
                    }else{ // _-
                        if(currentrow===0){
                            if(currentcolumn===0){
                                removetheme((currentrow),(currentcolumn+1)); document.getElementById((currentrow)+","+(currentcolumn+1)).classList.add(currenttheme);
                                removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                            }else{
                                removetheme((currentrow-1),(currentcolumn+1)); document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                                removetheme((currentrow-1),(currentcolumn+2)); document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.add(currenttheme);
                                removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                                removetheme((currentrow),(currentcolumn+1)); document.getElementById((currentrow)+","+(currentcolumn+1)).classList.add(currenttheme);
                            }
                        }else{
                            if(currentcolumn===0){
                                removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                                removetheme((currentrow),(currentcolumn-1)); document.getElementById((currentrow)+","+(currentcolumn-1)).classList.add(currenttheme);
                            }else{
                                removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                                removetheme((currentrow),(currentcolumn-1)); document.getElementById((currentrow)+","+(currentcolumn-1)).classList.add(currenttheme);
                                removetheme((currentrow-1),(currentcolumn+1)); document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                                removetheme((currentrow-1),(currentcolumn)); document.getElementById((currentrow-1)+","+(currentcolumn)).classList.add(currenttheme);
                            }
                        }
                    }
                    
                }else if(currentobject===4){// _|
                    if(currentangle===1){
                        if(currentrow===0){
                            removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                            removetheme((currentrow),(currentcolumn+1)); document.getElementById((currentrow)+","+(currentcolumn+1)).classList.add(currenttheme);
                        }else if(currentrow===1){
                            removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                            removetheme((currentrow),(currentcolumn+1)); document.getElementById((currentrow)+","+(currentcolumn+1)).classList.add(currenttheme);
                            removetheme((currentrow-1),(currentcolumn+1)); document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                        }else{
                            removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                            removetheme((currentrow),(currentcolumn+1)); document.getElementById((currentrow)+","+(currentcolumn+1)).classList.add(currenttheme);
                            removetheme((currentrow-1),(currentcolumn+1)); document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                            removetheme((currentrow-2),(currentcolumn+1)); document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.add(currenttheme);
                        }
                    }else if(currentangle===2){ // |__
                        if(currentrow===0){
                            if(currentcolumn===0){
                                removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                                removetheme((currentrow),(currentcolumn+1)); document.getElementById((currentrow)+","+(currentcolumn+1)).classList.add(currenttheme);
                                removetheme((currentrow),(currentcolumn+2)); document.getElementById((currentrow)+","+(currentcolumn+2)).classList.add(currenttheme);
                            }else{
                                removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                                removetheme((currentrow),(currentcolumn+1)); document.getElementById((currentrow)+","+(currentcolumn+1)).classList.add(currenttheme);
                                removetheme((currentrow),(currentcolumn-1)); document.getElementById((currentrow)+","+(currentcolumn-1)).classList.add(currenttheme);
                            }
                        }else{
                            if(currentcolumn===0){
                                removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                                removetheme((currentrow),(currentcolumn+1)); document.getElementById((currentrow)+","+(currentcolumn+1)).classList.add(currenttheme);
                                removetheme((currentrow),(currentcolumn+2)); document.getElementById((currentrow)+","+(currentcolumn+2)).classList.add(currenttheme);
                                removetheme((currentrow-1),(currentcolumn)); document.getElementById((currentrow-1)+","+(currentcolumn)).classList.add(currenttheme);
                            }else{
                                removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                                removetheme((currentrow),(currentcolumn+1)); document.getElementById((currentrow)+","+(currentcolumn+1)).classList.add(currenttheme);
                                removetheme((currentrow),(currentcolumn-1)); document.getElementById((currentrow)+","+(currentcolumn-1)).classList.add(currenttheme);
                                removetheme((currentrow-1),(currentcolumn-1)); document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.add(currenttheme);
                            }
                        }
                    }else if(currentangle===3){ // |¯
                        if(currentrow===0){
                            removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                        }else if(currentrow===1){
                            removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                            removetheme((currentrow-1),(currentcolumn)); document.getElementById((currentrow-1)+","+(currentcolumn)).classList.add(currenttheme);
                        }else{
                            removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                            removetheme((currentrow-1),(currentcolumn)); document.getElementById((currentrow-1)+","+(currentcolumn)).classList.add(currenttheme);
                            removetheme((currentrow-2),(currentcolumn)); document.getElementById((currentrow-2)+","+(currentcolumn)).classList.add(currenttheme);
                            removetheme((currentrow-2),(currentcolumn+1)); document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.add(currenttheme);
                        }
                    }else{ // ¯¯¯|
                        if(currentrow===0){
                            if(currentcolumn===0){
                                removetheme((currentrow),(currentcolumn+2)); document.getElementById((currentrow)+","+(currentcolumn+2)).classList.add(currenttheme);
                            }else{
                                removetheme((currentrow),(currentcolumn+1)); document.getElementById((currentrow)+","+(currentcolumn+1)).classList.add(currenttheme);
                            }
                        }else{
                            if(currentcolumn===0){
                                removetheme((currentrow-1),(currentcolumn)); document.getElementById((currentrow-1)+","+(currentcolumn)).classList.add(currenttheme);
                                removetheme((currentrow-1),(currentcolumn+1)); document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                                removetheme((currentrow-1),(currentcolumn+2)); document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.add(currenttheme);
                                removetheme((currentrow),(currentcolumn+2)); document.getElementById((currentrow)+","+(currentcolumn+2)).classList.add(currenttheme);
                            }else{
                                removetheme((currentrow-1),(currentcolumn)); document.getElementById((currentrow-1)+","+(currentcolumn)).classList.add(currenttheme);
                                removetheme((currentrow-1),(currentcolumn+1)); document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                                removetheme((currentrow-1),(currentcolumn-1)); document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.add(currenttheme);
                                removetheme((currentrow),(currentcolumn+1)); document.getElementById((currentrow)+","+(currentcolumn+1)).classList.add(currenttheme);
                            }
                        }
                    }
                    
                }else if(currentobject===3){// |_
                    if(currentangle===1){
                        if(currentrow===0){
                            removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                            removetheme((currentrow),(currentcolumn+1)); document.getElementById((currentrow)+","+(currentcolumn+1)).classList.add(currenttheme);
                        }else if(currentrow===1){
                            removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                            removetheme((currentrow),(currentcolumn+1)); document.getElementById((currentrow)+","+(currentcolumn+1)).classList.add(currenttheme);
                            removetheme((currentrow-1),(currentcolumn)); document.getElementById((currentrow-1)+","+(currentcolumn)).classList.add(currenttheme);
                        }else{
                            removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                            removetheme((currentrow),(currentcolumn+1)); document.getElementById((currentrow)+","+(currentcolumn+1)).classList.add(currenttheme);
                            removetheme((currentrow-1),(currentcolumn)); document.getElementById((currentrow-1)+","+(currentcolumn)).classList.add(currenttheme);
                            removetheme((currentrow-2),(currentcolumn)); document.getElementById((currentrow-2)+","+(currentcolumn)).classList.add(currenttheme);
                        }
                    }else if(currentangle===2){ // |¯¯¯
                        if(currentrow===0){
                            if(currentcolumn===0){
                                removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                            }else{
                                removetheme((currentrow),(currentcolumn-1)); document.getElementById((currentrow)+","+(currentcolumn-1)).classList.add(currenttheme);
                            }
                        }else{
                            if(currentcolumn===0){
                                removetheme((currentrow-1),(currentcolumn)); document.getElementById((currentrow-1)+","+(currentcolumn)).classList.add(currenttheme);
                                removetheme((currentrow-1),(currentcolumn+1)); document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                                removetheme((currentrow-1),(currentcolumn+2)); document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.add(currenttheme);
                                removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                            }else{
                                removetheme((currentrow-1),(currentcolumn)); document.getElementById((currentrow-1)+","+(currentcolumn)).classList.add(currenttheme);
                                removetheme((currentrow-1),(currentcolumn+1)); document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                                removetheme((currentrow-1),(currentcolumn-1)); document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.add(currenttheme);
                                removetheme((currentrow),(currentcolumn-1)); document.getElementById((currentrow)+","+(currentcolumn-1)).classList.add(currenttheme);
                            }
                        }
                    }else if(currentangle===3){ // ¯|
                        if(currentrow===0){
                            removetheme((currentrow),(currentcolumn+1)); document.getElementById((currentrow)+","+(currentcolumn+1)).classList.add(currenttheme);
                        }else if(currentrow===1){
                            removetheme((currentrow),(currentcolumn+1)); document.getElementById((currentrow)+","+(currentcolumn+1)).classList.add(currenttheme);
                            removetheme((currentrow-1),(currentcolumn+1)); document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                        }else{
                            removetheme((currentrow),(currentcolumn+1)); document.getElementById((currentrow)+","+(currentcolumn+1)).classList.add(currenttheme);
                            removetheme((currentrow-1),(currentcolumn+1)); document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                            removetheme((currentrow-2),(currentcolumn)); document.getElementById((currentrow-2)+","+(currentcolumn)).classList.add(currenttheme);
                            removetheme((currentrow-2),(currentcolumn+1)); document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.add(currenttheme);
                        }
                    }else{ // __|
                        if(currentrow===0){
                            if(currentcolumn===0){
                                removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                                removetheme((currentrow),(currentcolumn+1)); document.getElementById((currentrow)+","+(currentcolumn+1)).classList.add(currenttheme);
                                removetheme((currentrow),(currentcolumn+2)); document.getElementById((currentrow)+","+(currentcolumn+2)).classList.add(currenttheme);
                            }else{
                                removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                                removetheme((currentrow),(currentcolumn+1)); document.getElementById((currentrow)+","+(currentcolumn+1)).classList.add(currenttheme);
                                removetheme((currentrow),(currentcolumn-1)); document.getElementById((currentrow)+","+(currentcolumn-1)).classList.add(currenttheme);
                            }
                        }else{
                            if(currentcolumn===0){
                                removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                                removetheme((currentrow),(currentcolumn+1)); document.getElementById((currentrow)+","+(currentcolumn+1)).classList.add(currenttheme);
                                removetheme((currentrow),(currentcolumn+2)); document.getElementById((currentrow)+","+(currentcolumn+2)).classList.add(currenttheme);
                                removetheme((currentrow-1),(currentcolumn+2)); document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.add(currenttheme);
                            }else{
                                removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                                removetheme((currentrow),(currentcolumn+1)); document.getElementById((currentrow)+","+(currentcolumn+1)).classList.add(currenttheme);
                                removetheme((currentrow),(currentcolumn-1)); document.getElementById((currentrow)+","+(currentcolumn-1)).classList.add(currenttheme);
                                removetheme((currentrow-1),(currentcolumn+1)); document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                            }
                        }
                    }
                    
                }else if(currentobject===2){// |+|
                    if(currentrow===0){
                        removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                        removetheme((currentrow),(currentcolumn+1)); document.getElementById((currentrow)+","+(currentcolumn+1)).classList.add(currenttheme);
                    }else{
                        removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                        removetheme((currentrow-1),(currentcolumn+1)); document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                        removetheme((currentrow-1),(currentcolumn)); document.getElementById((currentrow-1)+","+(currentcolumn)).classList.add(currenttheme);
                        removetheme((currentrow),(currentcolumn+1)); document.getElementById((currentrow)+","+(currentcolumn+1)).classList.add(currenttheme);
                    }
                }else if(currentobject===1){//----
                  if(currentangle===1){
                    if(currentcolumn===0){
                        removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                        removetheme((currentrow),(currentcolumn+1)); document.getElementById((currentrow)+","+(currentcolumn+1)).classList.add(currenttheme);
                        removetheme((currentrow),(currentcolumn+2)); document.getElementById((currentrow)+","+(currentcolumn+2)).classList.add(currenttheme);
                        removetheme((currentrow),(currentcolumn+3)); document.getElementById((currentrow)+","+(currentcolumn+3)).classList.add(currenttheme);
                    }else if(currentcolumn===8){
                        removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                        removetheme((currentrow),(currentcolumn+1)); document.getElementById((currentrow)+","+(currentcolumn+1)).classList.add(currenttheme);
                        removetheme((currentrow),(currentcolumn-1)); document.getElementById((currentrow)+","+(currentcolumn-1)).classList.add(currenttheme);
                        removetheme((currentrow),(currentcolumn-2)); document.getElementById((currentrow)+","+(currentcolumn-2)).classList.add(currenttheme);
                    }else if(currentcolumn===9){
                        removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                        removetheme((currentrow),(currentcolumn-3)); document.getElementById((currentrow)+","+(currentcolumn-3)).classList.add(currenttheme);
                        removetheme((currentrow),(currentcolumn-1)); document.getElementById((currentrow)+","+(currentcolumn-1)).classList.add(currenttheme);
                        removetheme((currentrow),(currentcolumn-2)); document.getElementById((currentrow)+","+(currentcolumn-2)).classList.add(currenttheme);
                    }else{
                        removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                        removetheme((currentrow),(currentcolumn+1)); document.getElementById((currentrow)+","+(currentcolumn+1)).classList.add(currenttheme);
                        removetheme((currentrow),(currentcolumn+2));document.getElementById((currentrow)+","+(currentcolumn+2)).classList.add(currenttheme);
                        removetheme((currentrow),(currentcolumn-1)); document.getElementById((currentrow)+","+(currentcolumn-1)).classList.add(currenttheme);
                    }
                  }else{
                    if(currentrow===0){
                        removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                    }else if(currentrow===1){
                        removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                        removetheme((currentrow-1),(currentcolumn)); document.getElementById((currentrow-1)+","+(currentcolumn)).classList.add(currenttheme);
                    }else if(currentrow===2){
                        removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                        removetheme((currentrow-1),(currentcolumn)); document.getElementById((currentrow-1)+","+(currentcolumn)).classList.add(currenttheme);
                        removetheme((currentrow-2),(currentcolumn)); document.getElementById((currentrow-2)+","+(currentcolumn)).classList.add(currenttheme);
                    }else{
                        removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                        removetheme((currentrow-1),(currentcolumn)); document.getElementById((currentrow-1)+","+(currentcolumn)).classList.add(currenttheme);
                        removetheme((currentrow-2),(currentcolumn)); document.getElementById((currentrow-2)+","+(currentcolumn)).classList.add(currenttheme);
                        removetheme((currentrow-3),(currentcolumn)); document.getElementById((currentrow-3)+","+(currentcolumn)).classList.add(currenttheme);
                    }
                  }
                }else{// -|
                    if(currentangle===1){
                        if(currentrow===0){
                            removetheme((currentrow),(currentcolumn+1)); document.getElementById((currentrow)+","+(currentcolumn+1)).classList.add(currenttheme);
                        }else if(currentrow===1){
                            removetheme((currentrow),(currentcolumn+1)); document.getElementById((currentrow)+","+(currentcolumn+1)).classList.add(currenttheme);
                            removetheme((currentrow-1),(currentcolumn+1)); document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                            removetheme((currentrow-1),(currentcolumn)); document.getElementById((currentrow-1)+","+(currentcolumn)).classList.add(currenttheme);
                        }else{
                            removetheme((currentrow),(currentcolumn+1)); document.getElementById((currentrow)+","+(currentcolumn+1)).classList.add(currenttheme);
                            removetheme((currentrow-1),(currentcolumn+1)); document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                            removetheme((currentrow-1),(currentcolumn)); document.getElementById((currentrow-1)+","+(currentcolumn)).classList.add(currenttheme);
                            removetheme((currentrow-2),(currentcolumn+1)); document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.add(currenttheme);
                        }
                    }else if(currentangle===2){ //  _|_
                        if(currentrow===0){
                            if(currentcolumn===0){
                                removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                                removetheme((currentrow),(currentcolumn+1)); document.getElementById((currentrow)+","+(currentcolumn+1)).classList.add(currenttheme);
                                removetheme((currentrow),(currentcolumn+2)); document.getElementById((currentrow)+","+(currentcolumn+2)).classList.add(currenttheme);
                            }else{
                                removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                                removetheme((currentrow),(currentcolumn+1)); document.getElementById((currentrow)+","+(currentcolumn+1)).classList.add(currenttheme);
                                removetheme((currentrow),(currentcolumn-1)); document.getElementById((currentrow)+","+(currentcolumn-1)).classList.add(currenttheme);
                            }
                        }else{
                            if(currentcolumn===0){
                                removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                                removetheme((currentrow),(currentcolumn+1)); document.getElementById((currentrow)+","+(currentcolumn+1)).classList.add(currenttheme);
                                removetheme((currentrow),(currentcolumn+2)); document.getElementById((currentrow)+","+(currentcolumn+2)).classList.add(currenttheme);
                                removetheme((currentrow-1),(currentcolumn+1)); document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                            }else{
                                removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                                removetheme((currentrow),(currentcolumn+1)); document.getElementById((currentrow)+","+(currentcolumn+1)).classList.add(currenttheme);
                                removetheme((currentrow),(currentcolumn-1)); document.getElementById((currentrow)+","+(currentcolumn-1)).classList.add(currenttheme);
                                removetheme((currentrow-1),(currentcolumn)); document.getElementById((currentrow-1)+","+(currentcolumn)).classList.add(currenttheme);
                            }
                        }
                    
                    }else if(currentangle===3){ // |-
                        if(currentrow===0){
                            removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                        }else if(currentrow===1){
                            removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                            removetheme((currentrow-1),(currentcolumn+1)); document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                            removetheme((currentrow-1),(currentcolumn)); document.getElementById((currentrow-1)+","+(currentcolumn)).classList.add(currenttheme);
                        }else{
                            removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                            removetheme((currentrow-1),(currentcolumn+1)); document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                            removetheme((currentrow-1),(currentcolumn)); document.getElementById((currentrow-1)+","+(currentcolumn)).classList.add(currenttheme);
                            removetheme((currentrow-2),(currentcolumn)); document.getElementById((currentrow-2)+","+(currentcolumn)).classList.add(currenttheme);
                        }
                    }else{ // T
                        if(currentrow===0){
                            if(currentcolumn===0){
                                removetheme((currentrow),(currentcolumn+1)); document.getElementById((currentrow)+","+(currentcolumn+1)).classList.add(currenttheme);
                            }else{
                                removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                            }
                        }else{
                            if(currentcolumn===0){
                                removetheme((currentrow),(currentcolumn+1)); document.getElementById((currentrow)+","+(currentcolumn+1)).classList.add(currenttheme);
                                removetheme((currentrow-1),(currentcolumn+1)); document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                                removetheme((currentrow-1),(currentcolumn)); document.getElementById((currentrow-1)+","+(currentcolumn)).classList.add(currenttheme);
                                removetheme((currentrow-1),(currentcolumn+2)); document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.add(currenttheme);
                            }else{
                                removetheme((currentrow),(currentcolumn)); document.getElementById((currentrow)+","+(currentcolumn)).classList.add(currenttheme);
                                removetheme((currentrow-1),(currentcolumn+1)); document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                                removetheme((currentrow-1),(currentcolumn)); document.getElementById((currentrow-1)+","+(currentcolumn)).classList.add(currenttheme);
                                removetheme((currentrow-1),(currentcolumn-1)); document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.add(currenttheme);
                            }
                        }
                    }
                }
            }
        }else{
            currenttheme=themeid;
            for(var a=0;a<20;a++) for(var b=0;b<10;b++){ 
                if(!document.getElementById(a+","+b).disabled){ removetheme(a,b); document.getElementById(a+","+b).classList.add(themeid);}
            }
        }
    }

}
function removetheme(w,h){
    document.getElementById(w+","+h).classList.forEach((theme,id)=>{
        if(theme!="btnbox")
        document.getElementById(w+","+h).classList.remove(theme);
    });
}

function timer(){
    
    timercount+=12;

    if(timercount>=gamespeed){ 
        timercount=0;
        if(isobjectmoving) movedown();
        else createobject();
    }

    //clearInterval(timerid); timerid=0;
}

function createobject(){
    hidenextobject(nextobject);
    currentobject=nextobject;
    currentangle=1; currentrow=0;currentcolumn=4;
    nextobject=Math.ceil(Math.random()*8); //7; // nextobject=1; // 
    if(themecode==="All") currenttheme=gettheme(Math.ceil(Math.random()*7));
    else currenttheme=themecode;
    shownextobject(nextobject);
    if(currentobject===7){
        if(document.getElementById("0,4").disabled===true){
            document.getElementById("0,4").disabled=false;
            document.getElementById("0,4").classList.add(currenttheme);
        }else{
            removetheme(0,4);
            document.getElementById("0,4").classList.add(currenttheme);
            gameover();
        }
    }else if(currentobject===6){
        if(document.getElementById("0,4").disabled===true){
            document.getElementById("0,4").disabled=false;
            document.getElementById("0,4").classList.add(currenttheme);
        }else{
            removetheme(0,4);
            document.getElementById("0,4").classList.add(currenttheme);
            gameover();
        }
    }else if(currentobject===5){
        if(document.getElementById("0,5").disabled===true){
            document.getElementById("0,5").disabled=false;
            document.getElementById("0,5").classList.add(currenttheme);
        }else{
            removetheme(0,5);
            document.getElementById("0,5").classList.add(currenttheme);
            gameover();
        }
    }else if(currentobject===4){
        if(document.getElementById("0,5").disabled===true && document.getElementById("0,4").disabled===true){
            document.getElementById("0,5").disabled=false;document.getElementById("0,4").disabled=false;
            document.getElementById("0,5").classList.add(currenttheme);document.getElementById("0,4").classList.add(currenttheme);
        }else{
            removetheme(0,5);removetheme(0,4);
            document.getElementById("0,5").disabled=false;document.getElementById("0,4").disabled=false;
            document.getElementById("0,5").classList.add(currenttheme);document.getElementById("0,4").classList.add(currenttheme);
            gameover();
        }
    }else if(currentobject===3){
        if(document.getElementById("0,5").disabled===true && document.getElementById("0,4").disabled===true){
            document.getElementById("0,5").disabled=false;document.getElementById("0,4").disabled=false;
            document.getElementById("0,5").classList.add(currenttheme);document.getElementById("0,4").classList.add(currenttheme);
        }else{
            removetheme(0,5);removetheme(0,4);
            document.getElementById("0,5").disabled=false;document.getElementById("0,4").disabled=false;
            document.getElementById("0,5").classList.add(currenttheme);document.getElementById("0,4").classList.add(currenttheme);
            gameover();
        }
    }else if(currentobject===2){
        if(document.getElementById("0,5").disabled===true && document.getElementById("0,4").disabled===true){
            document.getElementById("0,5").disabled=false;document.getElementById("0,4").disabled=false;
            document.getElementById("0,5").classList.add(currenttheme);document.getElementById("0,4").classList.add(currenttheme);
        }else{
            removetheme(0,5);removetheme(0,4);  
            document.getElementById("0,5").disabled=false;document.getElementById("0,4").disabled=false;
            document.getElementById("0,5").classList.add(currenttheme);document.getElementById("0,4").classList.add(currenttheme);
            gameover();
        }
    }else if(currentobject===1){
        if(document.getElementById("0,3").disabled===true && document.getElementById("0,4").disabled===true && document.getElementById("0,5").disabled===true && document.getElementById("0,6").disabled===true){
            document.getElementById("0,3").disabled=false;document.getElementById("0,6").disabled=false;document.getElementById("0,4").disabled=false;document.getElementById("0,5").disabled=false;
            document.getElementById("0,5").classList.add(currenttheme);document.getElementById("0,4").classList.add(currenttheme);document.getElementById("0,3").classList.add(currenttheme);document.getElementById("0,6").classList.add(currenttheme);
        }else{
            removetheme(0,3);removetheme(0,4);removetheme(0,5);removetheme(0,6); 
            document.getElementById("0,3").disabled=false;document.getElementById("0,6").disabled=false;document.getElementById("0,4").disabled=false;document.getElementById("0,5").disabled=false;
            document.getElementById("0,5").classList.add(currenttheme);document.getElementById("0,4").classList.add(currenttheme);document.getElementById("0,3").classList.add(currenttheme);document.getElementById("0,6").classList.add(currenttheme);
            gameover();
        }
    }else{
        if(document.getElementById("0,5").disabled===true){
            document.getElementById("0,5").disabled=false;
            document.getElementById("0,5").classList.add(currenttheme);
        }else{
            removetheme(0,5);
            document.getElementById("0,5").classList.add(currenttheme);
            gameover();
        }
    }
    
    isobjectmoving=true;
}

function hidenextobject(id){ 
    document.getElementById("preview"+id).style.display="none";
}

function shownextobject(id){
    document.getElementById("preview"+id).style.display="";
}

function rotatecc(){
    if(!isobjectmoving || timerid===0)return;
    if(currentobject===7){// |-
        if(currentangle===1){

        }else if(currentangle===2){ // T

        }else if(currentangle===3){ // -|

        }else{ // _|_

        }
    }else if(currentobject===6){// |\
        if(currentangle===1){
            
        }else{ // -_

        }
        
    }else if(currentobject===5){// /|
        if(currentangle===1){
            
        }else{ // _-

        }
        
    }else if(currentobject===4){// _|
        if(currentangle===1){
            
        }else if(currentangle===2){ // |__

        }else if(currentangle===3){ // |¯¯

        }else{ // ¯¯¯|

        }
        
    }else if(currentobject===3){// |_
        if(currentangle===1){
            
        }else if(currentangle===2){ // |¯¯¯

        }else if(currentangle===3){ // ¯|

        }else{ // __|

        }
        
    }else if(currentobject===2){// |+|
        
    }else if(currentobject===1){//----
      if(currentangle===1){

      }else{
        
      }
    }else{// -|
        if(currentangle===1){
            
        }else if(currentangle===2){ //  _|_

        }else if(currentangle===3){ // |-

        }else{ // T

        }
    }
}

function rotatecw(){
    if(!isobjectmoving || timerid===0)return;
    if(currentobject===7){// |-
        if(currentangle===1){
            if(currentcolumn===0){
                if(currentrow===0){
                    if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled){
                        document.getElementById(currentrow+","+currentcolumn).disabled=true;
                        document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                        currentangle=2;
                    }
                }
                else if(currentrow===1){
                    if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled){
                        document.getElementById(currentrow+","+currentcolumn).disabled=true;
                        document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=false;
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.add(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                        currentangle=2;
                    }
                }else{
                    if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled&& document.getElementById((currentrow-2)+","+(currentcolumn+2)).disabled){
                        document.getElementById(currentrow+","+currentcolumn).disabled=true;
                        document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById((currentrow-2)+","+currentcolumn).disabled=true;
                        document.getElementById((currentrow-2)+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=false;
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.add(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                        currentangle=2;
                    }
                }
            }else{
                if(currentrow===0){if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById(currentrow+","+(currentcolumn-1)).disabled)currentangle=2;}
                else if(currentrow===1){
                    if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled && document.getElementById(currentrow+","+(currentcolumn+1)).disabled){
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=false;
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.add(currenttheme);
                        currentangle=2;
                    }
                }else{
                    if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled && document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled){
                        document.getElementById((currentrow-2)+","+currentcolumn).disabled=true;
                        document.getElementById((currentrow-2)+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=false;
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.add(currenttheme);
                        currentangle=2;
                    }
                }
            }
        }else if(currentangle===2){ // T
            if(currentcolumn===0){
                if(currentrow===0){if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById(currentrow+","+currentcolumn).disabled)currentangle=3;}
                else if(currentrow===1){
                    if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById(currentrow+","+currentcolumn).disabled){
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.remove(currenttheme);
                        currentangle=3;
                    }
                }else{
                    if(document.getElementById((currentrow-2)+","+currentcolumn).disabled && document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled && document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById(currentrow+","+currentcolumn).disabled){
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.remove(currenttheme);
                        document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=false;
                        document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.add(currenttheme);
                        currentangle=3;
                    }
                }
            }else{
                if(currentrow===0){if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById(currentrow+","+(currentcolumn-1)).disabled){
                    document.getElementById(currentrow+","+currentcolumn).disabled=true;
                    document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                    currentangle=3;
                }}
                else if(currentrow===1){
                    if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById(currentrow+","+(currentcolumn-1)).disabled){
                        document.getElementById(currentrow+","+currentcolumn).disabled=true;
                        document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                        currentangle=3;
                    }
                }else{
                    if(document.getElementById((currentrow-2)+","+currentcolumn).disabled && document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled&& document.getElementById((currentrow-2)+","+(currentcolumn-1)).disabled && document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById(currentrow+","+(currentcolumn-1)).disabled){
                        document.getElementById(currentrow+","+currentcolumn).disabled=true;
                        document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                        document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                        document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.add(currenttheme);
                        currentangle=3;
                    }
                }
            }
        }else if(currentangle===3){ // -|
            if(currentcolumn===8){
                if(currentrow===0){
                    if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById(currentrow+","+currentcolumn).disabled){
                    document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                    document.getElementById(currentrow+","+currentcolumn).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                    document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                    currentangle=4;
                    }
                }
                else if(currentrow===1){
                    if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById(currentrow+","+currentcolumn).disabled){
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                        document.getElementById(currentrow+","+currentcolumn).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                        document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                        currentangle=4;
                        }
                }else{
                    if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById(currentrow+","+currentcolumn).disabled){
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=true;
                        document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                        document.getElementById(currentrow+","+currentcolumn).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                        document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                        currentangle=4;
                    }
                }
            }else{
                if(currentcolumn===0){
                    if(currentrow===0){
                        if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById(currentrow+","+currentcolumn).disabled){
                        document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                        document.getElementById(currentrow+","+currentcolumn).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                        document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                        currentangle=4;
                        }
                    }
                    else if(currentrow===1){
                        if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById(currentrow+","+currentcolumn).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled){
                        document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                        document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                        document.getElementById(currentrow+","+currentcolumn).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                        document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                        currentangle=4;
                    }
                    }else{
                        if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById(currentrow+","+currentcolumn).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-2)+","+currentcolumn).disabled&& document.getElementById((currentrow-2)+","+(currentcolumn+2)).disabled){
                        document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                        document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=true;
                        document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+currentcolumn).disabled=false;
                        document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                        currentangle=4;
                        }
                    }
                }else{
                    if(currentrow===0){
                        if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById(currentrow+","+currentcolumn).disabled){
                        document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                        document.getElementById(currentrow+","+currentcolumn).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                        document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                        currentangle=4;
                        }
                    }
                    else if(currentrow===1){
                        if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById(currentrow+","+currentcolumn).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled && document.getElementById(currentrow+","+(currentcolumn-1)).disabled){
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                        document.getElementById(currentrow+","+currentcolumn).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                        document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                        currentangle=4;
                    }
                    }else{
                        if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById(currentrow+","+currentcolumn).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled && document.getElementById(currentrow+","+(currentcolumn-1)).disabled&& document.getElementById((currentrow-2)+","+(currentcolumn+2)).disabled){
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=true;
                        document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+currentcolumn).disabled=false;
                        document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                        currentangle=4;
                        }
                    }
                }
            }
        }else{ // _|_
            if(currentcolumn===0){
                if(currentrow===0){
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+2)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+2)).classList.remove(currenttheme);
                    currentangle=1;
                }
                else if(currentrow===1){
                    if(document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-1)+","+currentcolumn).disabled){
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+2)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn+2)).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+currentcolumn).disabled=false;
                        document.getElementById((currentrow-1)+","+currentcolumn).classList.add(currenttheme);
                        currentangle=1;
                        }
                }else{
                    if(document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-1)+","+currentcolumn).disabled&& document.getElementById((currentrow-2)+","+currentcolumn).disabled){
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+2)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn+2)).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+currentcolumn).disabled=false;
                        document.getElementById((currentrow-1)+","+currentcolumn).classList.add(currenttheme);
                        document.getElementById((currentrow-2)+","+currentcolumn).disabled=false;
                        document.getElementById((currentrow-2)+","+currentcolumn).classList.add(currenttheme);
                        currentangle=1;
                        }
                }
            }else{
                if(currentrow===0){
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn-1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-1)).classList.remove(currenttheme);
                    currentangle=1;
                }
                else if(currentrow===1){
                    if(document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled){
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn-1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn-1)).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=false;
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                        currentangle=1;
                        }
                }else{
                    if(document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-2)+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-2)+","+currentcolumn).disabled){
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn-1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn-1)).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=false;
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                        document.getElementById((currentrow-2)+","+currentcolumn).disabled=false;
                        document.getElementById((currentrow-2)+","+currentcolumn).classList.add(currenttheme);
                        currentangle=1;
                        }
                }
            }
        }
    }else if(currentobject===6){// |\
        if(currentangle===1){
            if(currentcolumn===8){
                if(currentrow===0){
                    if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById(currentrow+","+(currentcolumn+1)).disabled){
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                    currentangle=2;
                    }
                }
                else{
                    if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled){
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.add(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                        currentangle=2;
                        if(currentrow>1){
                            document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=true;
                            document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.remove(currenttheme);
                        }
                    }
                }
            }else{
                if(currentcolumn===0){
                    if(currentrow===0){
                        if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById(currentrow+","+(currentcolumn+2)).disabled){
                            document.getElementById(currentrow+","+currentcolumn).disabled=true;
                            document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                            document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                            document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                            document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                            document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                            currentangle=2;
                        }
                    }else if(currentrow===1){
                        if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled){
                            document.getElementById(currentrow+","+currentcolumn).disabled=true;
                            document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                            document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                            document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                            document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                            document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                            currentangle=2;
                        }
                    }else{
                        if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-2)+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-2)+","+currentcolumn).disabled){
                            document.getElementById(currentrow+","+currentcolumn).disabled=true;
                            document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                            document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=true;
                            document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.remove(currenttheme);
                            document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                            document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                            document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                            document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                            currentangle=2;
                        }
                    }
                }else{
                    if(currentrow===0){
                        if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById(currentrow+","+(currentcolumn+2)).disabled){
                            document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                            document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                            currentangle=2;
                        }
                    }
                    else if(currentrow===1){
                        if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled && document.getElementById(currentrow+","+(currentcolumn-1)).disabled){
                            document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                            document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                            document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                            document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                            document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=false;
                            document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.add(currenttheme);
                            currentangle=2;
                    }
                    }else{
                        if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled && document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-2)+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-2)+","+currentcolumn).disabled){
                            document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                            document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                            document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=true;
                            document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.remove(currenttheme);
                            document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                            document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                            document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=false;
                            document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.add(currenttheme);
                            currentangle=2;
                        }
                    }
                }
            }
        }else{ // -_
            if(currentcolumn===0){
                if(currentrow===0){
                    if(document.getElementById(currentrow+","+currentcolumn).disabled){
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+2)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+2)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+currentcolumn).disabled=false;
                    document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                    currentangle=1;
                    }
                }
                else if(currentrow===1){
                    if(document.getElementById(currentrow+","+currentcolumn).disabled){
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn+2)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+2)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+currentcolumn).disabled=false;
                        document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                        currentangle=1;
                        }
                }else{
                    if(document.getElementById(currentrow+","+currentcolumn).disabled && document.getElementById((currentrow-2)+","+currentcolumn).disabled && document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled){
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn+2)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+2)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+currentcolumn).disabled=false;
                        document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                        document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=false;
                        document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.add(currenttheme);
                        currentangle=1;
                        }
                }
            }else{
                if(currentrow===0){
                    if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled){
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    currentangle=1;
                    }
                }
                else if(currentrow===1){
                    if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled){
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=false;
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                        currentangle=1;
                        }
                }else{
                    if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled && document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled && document.getElementById((currentrow-2)+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-2)+","+currentcolumn).disabled){
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=false;
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                        document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=false;
                        document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.add(currenttheme);
                        currentangle=1;
                        }
                }
            }
        }
        
    }else if(currentobject===5){// /|
        if(currentangle===1){
            if(currentcolumn===8){
                if(currentrow===0){
                    if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById(currentrow+","+currentcolumn).disabled){
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+currentcolumn).disabled=false;
                    document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                    currentangle=2;
                    }
                }
                else{
                    if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById(currentrow+","+currentcolumn).disabled){
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+currentcolumn).disabled=false;
                        document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                        currentangle=2;
                        if(currentrow>1){
                            document.getElementById((currentrow-2)+","+currentcolumn).disabled=true;
                            document.getElementById((currentrow-2)+","+currentcolumn).classList.remove(currenttheme);
                        }
                    }
                }
            }else{
                if(currentcolumn===0){
                    if(currentrow===0){
                        if(document.getElementById(currentrow+","+currentcolumn).disabled){
                            document.getElementById(currentrow+","+currentcolumn).disabled=false;
                            document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                            currentangle=2;
                        }
                    }else if(currentrow===1){
                        if(document.getElementById(currentrow+","+currentcolumn).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled){
                            document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                            document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                            document.getElementById(currentrow+","+currentcolumn).disabled=false;
                            document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                            document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=false;
                            document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.add(currenttheme);
                            currentangle=2;
                        }
                    }else{
                        if(document.getElementById(currentrow+","+currentcolumn).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-2)+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled){
                            document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                            document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                            document.getElementById((currentrow-2)+","+currentcolumn).disabled=true;
                            document.getElementById((currentrow-2)+","+currentcolumn).classList.remove(currenttheme);
                            document.getElementById(currentrow+","+currentcolumn).disabled=false;
                            document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                            document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=false;
                            document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.add(currenttheme);
                            currentangle=2;
                        }
                    }
                }else{
                    if(currentrow===0){
                        if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById(currentrow+","+currentcolumn).disabled){
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+currentcolumn).disabled=false;
                        document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                        currentangle=2;
                        }
                    }
                    else{
                        if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById(currentrow+","+currentcolumn).disabled){
                            document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                            document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                            document.getElementById(currentrow+","+currentcolumn).disabled=false;
                            document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                            document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                            document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                            currentangle=2;
                            if(currentrow>1){
                                document.getElementById((currentrow-2)+","+currentcolumn).disabled=true;
                                document.getElementById((currentrow-2)+","+currentcolumn).classList.remove(currenttheme);
                            }
                        }
                    }
                }
            }
        }else{ // _-
            if(currentcolumn===0){
                if(currentrow===0){
                    document.getElementById(currentrow+","+currentcolumn).disabled=true;
                    document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                    currentangle=1;
                }
                else if(currentrow===1){
                    if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-1)+","+currentcolumn).disabled){
                        document.getElementById(currentrow+","+currentcolumn).disabled=true;
                        document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+currentcolumn).disabled=false;
                        document.getElementById((currentrow-1)+","+currentcolumn).classList.add(currenttheme);
                        currentangle=1;
                        }
                }else{
                    if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-1)+","+currentcolumn).disabled && document.getElementById((currentrow-2)+","+currentcolumn).disabled && document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled){
                        document.getElementById(currentrow+","+currentcolumn).disabled=true;
                        document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+currentcolumn).disabled=false;
                        document.getElementById((currentrow-1)+","+currentcolumn).classList.add(currenttheme);
                        document.getElementById((currentrow-2)+","+currentcolumn).disabled=false;
                        document.getElementById((currentrow-2)+","+currentcolumn).classList.add(currenttheme);
                        currentangle=1;
                        }
                }
            }else{
                if(currentrow===0){
                    if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled){
                    document.getElementById(currentrow+","+currentcolumn).disabled=true;
                    document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn-1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                    currentangle=1;
                    }
                }
                else if(currentrow===1){
                    if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled){
                        document.getElementById(currentrow+","+currentcolumn).disabled=true;
                        document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn-1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn-1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                        currentangle=1;
                        }
                }else{
                    if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-2)+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-2)+","+currentcolumn).disabled){
                        document.getElementById(currentrow+","+currentcolumn).disabled=true;
                        document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn-1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn-1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                        document.getElementById((currentrow-2)+","+currentcolumn).disabled=false;
                        document.getElementById((currentrow-2)+","+currentcolumn).classList.add(currenttheme);
                        currentangle=1;
                        }
                }
            }
        }
        
    }else if(currentobject===4){// _|
        if(currentangle===1){
            if(currentcolumn===8){
                if(currentrow===0){
                    if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled){
                    document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                    currentangle=2;
                    }
                }
                else if(currentrow===1){
                    if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled){
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.add(currenttheme);
                        currentangle=2;
                        }
                }else{
                    if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled){
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=true;
                        document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.add(currenttheme);
                        currentangle=2;
                        }
                }
            }else{
                if(currentcolumn===0){
                    if(currentrow===0){
                        if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled){
                        document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                        currentangle=2;
                        }
                    }
                    else if(currentrow===1){
                        if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-1)+","+currentcolumn).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled){
                            document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                            document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                            document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                            document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                            document.getElementById((currentrow-1)+","+currentcolumn).disabled=false;
                            document.getElementById((currentrow-1)+","+currentcolumn).classList.add(currenttheme);
                            currentangle=2;
                        }
                    }else{
                        if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-1)+","+currentcolumn).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-2)+","+(currentcolumn+2)).disabled){
                            document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                            document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                            document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=true;
                            document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.remove(currenttheme);
                            document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                            document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                            document.getElementById((currentrow-1)+","+currentcolumn).disabled=false;
                            document.getElementById((currentrow-1)+","+currentcolumn).classList.add(currenttheme);
                            currentangle=2;
                        }
                    }
                }else{
                    if(currentrow===0){
                        if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById(currentrow+","+(currentcolumn+2)).disabled){
                        document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                        currentangle=2;
                        }
                    }
                    else if(currentrow===1){
                        if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled && document.getElementById(currentrow+","+(currentcolumn-1)).disabled){
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=false;
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.add(currenttheme);
                        currentangle=2;
                    }
                    }else{
                        if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled && document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-2)+","+(currentcolumn+2)).disabled){
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=true;
                        document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=false;
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.add(currenttheme);
                        currentangle=2;
                        }
                    }
                }
            }
        }else if(currentangle===2){ // |__
            if(currentcolumn===0){
                if(currentrow===0){
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+2)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+2)).classList.remove(currenttheme);
                    currentangle=3;
                }
                else if(currentrow===1){
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+2)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+2)).classList.remove(currenttheme);
                    currentangle=3;
                }else{
                    if(document.getElementById((currentrow-2)+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-2)+","+currentcolumn).disabled){
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn+2)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+2)).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+currentcolumn).disabled=false;
                        document.getElementById((currentrow-1)+","+currentcolumn).classList.add(currenttheme);
                        document.getElementById((currentrow-2)+","+currentcolumn).disabled=false;
                        document.getElementById((currentrow-2)+","+currentcolumn).classList.add(currenttheme);
                        document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=false;
                        document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.add(currenttheme);
                        currentangle=3;
                    }
                }
            }else{
                if(currentrow===0){
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn-1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-1)).classList.remove(currenttheme);
                    currentangle=3;
                }
                else if(currentrow===1){
                    if(document.getElementById((currentrow-1)+","+currentcolumn).disabled){
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn-1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn-1)).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+currentcolumn).disabled=false;
                        document.getElementById((currentrow-1)+","+currentcolumn).classList.add(currenttheme);
                        currentangle=3;
                        }
                }else{
                    if(document.getElementById((currentrow-1)+","+currentcolumn).disabled && document.getElementById((currentrow-2)+","+currentcolumn).disabled && document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled && document.getElementById((currentrow-2)+","+(currentcolumn-1)).disabled){
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn-1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn-1)).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+currentcolumn).disabled=false;
                        document.getElementById((currentrow-1)+","+currentcolumn).classList.add(currenttheme);
                        document.getElementById((currentrow-2)+","+currentcolumn).disabled=false;
                        document.getElementById((currentrow-2)+","+currentcolumn).classList.add(currenttheme);
                        document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=false;
                        document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.add(currenttheme);
                        currentangle=3;
                    }
                }
            }
        }else if(currentangle===3){ // |¯
            if(currentcolumn===8){
                if(currentrow===0){
                    if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled){
                    document.getElementById(currentrow+","+currentcolumn).disabled=true;
                    document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                    currentangle=4;
                    }
                }
                else if(currentrow===1){
                    if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled){
                        document.getElementById(currentrow+","+currentcolumn).disabled=true;
                        document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=false;
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=false;
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.add(currenttheme);
                        currentangle=4;
                        }
                }else{
                    if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled){
                        document.getElementById(currentrow+","+currentcolumn).disabled=true;
                        document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=true;
                        document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById((currentrow-2)+","+currentcolumn).disabled=true;
                        document.getElementById((currentrow-2)+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=false;
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=false;
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.add(currenttheme);
                        currentangle=4;
                        }
                }
            }else{
                if(currentcolumn===0){
                    if(currentrow===0){
                        if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled){
                        document.getElementById(currentrow+","+currentcolumn).disabled=true;
                        document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                        currentangle=4;
                        }
                    }
                    else if(currentrow===1){
                        if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled){
                            document.getElementById(currentrow+","+currentcolumn).disabled=true;
                            document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                            document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                            document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                            document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=false;
                            document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                            document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=false;
                            document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.add(currenttheme);
                            currentangle=4;
                        }
                    }else{
                        if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-2)+","+(currentcolumn+2)).disabled){
                            document.getElementById(currentrow+","+currentcolumn).disabled=true;
                            document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                            document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=true;
                            document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.remove(currenttheme);
                            document.getElementById((currentrow-2)+","+currentcolumn).disabled=true;
                            document.getElementById((currentrow-2)+","+currentcolumn).classList.remove(currenttheme);
                            document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                            document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                            document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=false;
                            document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                            document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=false;
                            document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.add(currenttheme);
                            currentangle=4;
                        }
                    }
                }else{
                    if(currentrow===0){
                        if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled){
                        document.getElementById(currentrow+","+currentcolumn).disabled=true;
                        document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                        currentangle=4;
                        }
                    }
                    else{
                        if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled){
                            document.getElementById(currentrow+","+currentcolumn).disabled=true;
                            document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                            document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                            document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                            document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=false;
                            document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                            document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=false;
                            document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.add(currenttheme);
                            currentangle=4;
                            if(currentrow>1){
                                document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=true;
                                document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.remove(currenttheme);
                                document.getElementById((currentrow-2)+","+currentcolumn).disabled=true;
                                document.getElementById((currentrow-2)+","+currentcolumn).classList.remove(currenttheme);
                            }
                        }
                    }
                }
            }
        }else{ // ¯¯¯|
            if(currentcolumn===0){
                if(currentrow===0){
                    if(document.getElementById(currentrow+","+currentcolumn).disabled && document.getElementById(currentrow+","+(currentcolumn+1)).disabled){
                        document.getElementById(currentrow+","+(currentcolumn+2)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn+2)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+currentcolumn).disabled=false;
                        document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                        currentangle=1;
                    }
                }
                else if(currentrow===1){
                    if(document.getElementById(currentrow+","+currentcolumn).disabled && document.getElementById(currentrow+","+(currentcolumn+1)).disabled){
                        document.getElementById(currentrow+","+(currentcolumn+2)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn+2)).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                        document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+currentcolumn).disabled=false;
                        document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                        currentangle=1;
                    }
                }else{
                    if(document.getElementById(currentrow+","+currentcolumn).disabled && document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById((currentrow-2)+","+currentcolumn).disabled && document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled){
                        document.getElementById(currentrow+","+(currentcolumn+2)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn+2)).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                        document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+currentcolumn).disabled=false;
                        document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                        document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=false;
                        document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.add(currenttheme);
                        currentangle=1;
                    }
                }
            }else{
                if(currentrow===0){
                    if(document.getElementById(currentrow+","+currentcolumn).disabled){
                        document.getElementById(currentrow+","+currentcolumn).disabled=false;
                        document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                        currentangle=1;
                    }
                }
                else if(currentrow===1){
                    if(document.getElementById(currentrow+","+currentcolumn).disabled){
                        document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                        document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+currentcolumn).disabled=false;
                        document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                        currentangle=1;
                    }
                }else{
                    if(document.getElementById(currentrow+","+currentcolumn).disabled && document.getElementById((currentrow-2)+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-2)+","+currentcolumn).disabled && document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled){
                        document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                        document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+currentcolumn).disabled=false;
                        document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                        document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=false;
                        document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.add(currenttheme);
                        currentangle=1;
                    }
                }
            }
        }
        
    }else if(currentobject===3){// |_
        if(currentangle===1){
                if(currentcolumn===0){
                    if(currentrow===0){
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                        currentangle=2;
                    }
                    else if(currentrow===1){
                        if(document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled){
                            document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                            document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                            document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=false;
                            document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                            document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=false;
                            document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.add(currenttheme);
                            currentangle=2;
                        }
                    }else{
                        if(document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled && document.getElementById((currentrow-2)+","+(currentcolumn+2)).disabled){
                            document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                            document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                            document.getElementById((currentrow-2)+","+currentcolumn).disabled=true;
                            document.getElementById((currentrow-2)+","+currentcolumn).classList.remove(currenttheme);
                            document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=false;
                            document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                            document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=false;
                            document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.add(currenttheme);
                            currentangle=2;
                        }
                    }
                }else{
                    if(currentrow===0){
                        if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled){
                            document.getElementById(currentrow+","+currentcolumn).disabled=true;
                            document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                            document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                            document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                            document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                            document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                            currentangle=2;
                        }
                    }
                    else if(currentrow===1){
                        if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled){
                            document.getElementById(currentrow+","+currentcolumn).disabled=true;
                            document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                            document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                            document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                            document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                            document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                            document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=false;
                            document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.add(currenttheme);
                            document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=false;
                            document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                            currentangle=2;
                        }
                    }else{
                        if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled && document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled){
                            document.getElementById(currentrow+","+currentcolumn).disabled=true;
                            document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                            document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                            document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                            document.getElementById((currentrow-2)+","+currentcolumn).disabled=true;
                            document.getElementById((currentrow-2)+","+currentcolumn).classList.remove(currenttheme);
                            document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                            document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                            document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=false;
                            document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.add(currenttheme);
                            document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=false;
                            document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                            currentangle=2;
                        }
                    }
                }
        }else if(currentangle===2){ // |¯¯¯
            if(currentcolumn===0){
                if(currentrow===0){
                    if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById(currentrow+","+(currentcolumn+2)).disabled){
                        document.getElementById(currentrow+","+currentcolumn).disabled=true;
                        document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                        currentangle=3;
                    }
                }
                else if(currentrow===1){
                    if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById(currentrow+","+(currentcolumn+2)).disabled){
                        document.getElementById(currentrow+","+currentcolumn).disabled=true;
                        document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                        document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                        currentangle=3;
                    }
                }else{
                    if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-2)+","+currentcolumn).disabled && document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled){
                        document.getElementById(currentrow+","+currentcolumn).disabled=true;
                        document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                        document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                        document.getElementById((currentrow-2)+","+currentcolumn).disabled=false;
                        document.getElementById((currentrow-2)+","+currentcolumn).classList.add(currenttheme);
                        document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=false;
                        document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.add(currenttheme);
                        currentangle=3;
                    }
                }
            }else{
                if(currentrow===0){
                    if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled){
                        document.getElementById(currentrow+","+(currentcolumn-1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn-1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                        currentangle=3;
                    }
                }
                else if(currentrow===1){
                    if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled){
                        document.getElementById(currentrow+","+(currentcolumn-1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn-1)).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                        document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                        currentangle=3;
                    }
                }else{
                    if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById((currentrow-2)+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-2)+","+currentcolumn).disabled && document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled){
                        document.getElementById(currentrow+","+(currentcolumn-1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn-1)).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                        document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                        document.getElementById((currentrow-2)+","+currentcolumn).disabled=false;
                        document.getElementById((currentrow-2)+","+currentcolumn).classList.add(currenttheme);
                        document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=false;
                        document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.add(currenttheme);
                        currentangle=3;
                    }
                }
            }
        }else if(currentangle===3){ // ¯|
            if(currentcolumn===0){
                if(currentrow===0){
                    if(document.getElementById(currentrow+","+currentcolumn).disabled && document.getElementById(currentrow+","+(currentcolumn+2)).disabled){
                        document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                        document.getElementById(currentrow+","+currentcolumn).disabled=false;
                        document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                        currentangle=4;
                    }
                }
                else if(currentrow===1){
                    if(document.getElementById(currentrow+","+currentcolumn).disabled && document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled){
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                        document.getElementById(currentrow+","+currentcolumn).disabled=false;
                        document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=false;
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.add(currenttheme);
                        currentangle=4;
                    }
                }else{
                    if(document.getElementById(currentrow+","+currentcolumn).disabled && document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-2)+","+(currentcolumn+2)).disabled){
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById((currentrow-2)+","+currentcolumn).disabled=true;
                        document.getElementById((currentrow-2)+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=true;
                        document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                        document.getElementById(currentrow+","+currentcolumn).disabled=false;
                        document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=false;
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.add(currenttheme);
                        currentangle=4;
                    }
                }
            }else{
                    if(document.getElementById(currentrow+","+currentcolumn).disabled && document.getElementById(currentrow+","+(currentcolumn-1)).disabled){
                        document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                        document.getElementById(currentrow+","+currentcolumn).disabled=false;
                        document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                        currentangle=4;
                        if(currentrow>1){
                            document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=true;
                            document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.remove(currenttheme);
                            document.getElementById((currentrow-2)+","+currentcolumn).disabled=true;
                            document.getElementById((currentrow-2)+","+currentcolumn).classList.remove(currenttheme);
                        }
                    }
            }
        }else{ // __|
            if(currentcolumn===0){
                if(currentrow===0){
                        document.getElementById(currentrow+","+(currentcolumn+2)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn+2)).classList.remove(currenttheme);
                        currentangle=1;
                    
                }
                else if(currentrow===1){
                    if(document.getElementById((currentrow-1)+","+currentcolumn).disabled){
                        document.getElementById(currentrow+","+(currentcolumn+2)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn+2)).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+currentcolumn).disabled=false;
                        document.getElementById((currentrow-1)+","+currentcolumn).classList.add(currenttheme);
                        currentangle=1;
                    }
                }else{
                    if(document.getElementById((currentrow-1)+","+currentcolumn).disabled && document.getElementById((currentrow-2)+","+currentcolumn).disabled){
                        document.getElementById(currentrow+","+(currentcolumn+2)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn+2)).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+currentcolumn).disabled=false;
                        document.getElementById((currentrow-1)+","+currentcolumn).classList.add(currenttheme);
                        document.getElementById((currentrow-2)+","+currentcolumn).disabled=false;
                        document.getElementById((currentrow-2)+","+currentcolumn).classList.add(currenttheme);
                        currentangle=1;
                    }
                }
            }else{
                if(currentrow===0){
                        document.getElementById(currentrow+","+(currentcolumn-1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn-1)).classList.remove(currenttheme);
                        currentangle=1;
                }
                else if(currentrow===1){
                    if(document.getElementById((currentrow-1)+","+currentcolumn).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled){
                        document.getElementById(currentrow+","+(currentcolumn-1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn-1)).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+currentcolumn).disabled=false;
                        document.getElementById((currentrow-1)+","+currentcolumn).classList.add(currenttheme);
                        currentangle=1;
                    }
                }else{
                    if(document.getElementById((currentrow-1)+","+currentcolumn).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-2)+","+currentcolumn).disabled){
                        document.getElementById(currentrow+","+(currentcolumn-1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn-1)).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+currentcolumn).disabled=false;
                        document.getElementById((currentrow-1)+","+currentcolumn).classList.add(currenttheme);
                        document.getElementById((currentrow-2)+","+currentcolumn).disabled=false;
                        document.getElementById((currentrow-2)+","+currentcolumn).classList.add(currenttheme);
                        currentangle=1;
                    }
                }
            }
        }
        
    }else if(currentobject===2){// |+|
        
    }else if(currentobject===1){//----
      if(currentangle===1){
        if(currentcolumn===9){
            if(currentrow===0){
                document.getElementById(currentrow+","+(currentcolumn-1)).disabled=true;
                document.getElementById(currentrow+","+(currentcolumn-1)).classList.remove(currenttheme);
                document.getElementById(currentrow+","+(currentcolumn-2)).disabled=true;
                document.getElementById(currentrow+","+(currentcolumn-2)).classList.remove(currenttheme);
                document.getElementById(currentrow+","+(currentcolumn-3)).disabled=true;
                document.getElementById(currentrow+","+(currentcolumn-3)).classList.remove(currenttheme);
                currentangle=2;
                
            }
            else if(currentrow===1){
                if(document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-1)+","+currentcolumn).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-2)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-3)).disabled){
                    document.getElementById(currentrow+","+(currentcolumn-1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn-1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-2)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn-2)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-3)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn-3)).classList.remove(currenttheme);
                    document.getElementById((currentrow-1)+","+currentcolumn).disabled=false;
                    document.getElementById((currentrow-1)+","+currentcolumn).classList.add(currenttheme);
                    currentangle=2;
                    }
            }else  if(currentrow===2){
                if(document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-1)+","+currentcolumn).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-2)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-3)).disabled && document.getElementById((currentrow-2)+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-2)+","+currentcolumn).disabled && document.getElementById((currentrow-2)+","+(currentcolumn-2)).disabled && document.getElementById((currentrow-2)+","+(currentcolumn-3)).disabled){
                    document.getElementById(currentrow+","+(currentcolumn-1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn-1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-2)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn-2)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-3)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn-3)).classList.remove(currenttheme);
                    document.getElementById((currentrow-1)+","+currentcolumn).disabled=false;
                    document.getElementById((currentrow-1)+","+currentcolumn).classList.add(currenttheme);
                    document.getElementById((currentrow-2)+","+currentcolumn).disabled=false;
                    document.getElementById((currentrow-2)+","+currentcolumn).classList.add(currenttheme);
                    currentangle=2;
                }
            }else{
                if(document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-1)+","+currentcolumn).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-2)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-3)).disabled && document.getElementById((currentrow-2)+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-2)+","+currentcolumn).disabled && document.getElementById((currentrow-2)+","+(currentcolumn-2)).disabled && document.getElementById((currentrow-2)+","+(currentcolumn-3)).disabled && document.getElementById((currentrow-3)+","+currentcolumn).disabled){
                    document.getElementById(currentrow+","+(currentcolumn-1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn-1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-2)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn-2)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-3)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn-3)).classList.remove(currenttheme);
                    document.getElementById((currentrow-1)+","+currentcolumn).disabled=false;
                    document.getElementById((currentrow-1)+","+currentcolumn).classList.add(currenttheme);
                    document.getElementById((currentrow-2)+","+currentcolumn).disabled=false;
                    document.getElementById((currentrow-2)+","+currentcolumn).classList.add(currenttheme);
                    document.getElementById((currentrow-3)+","+currentcolumn).disabled=false;
                    document.getElementById((currentrow-3)+","+currentcolumn).classList.add(currenttheme);
                    currentangle=2;
                }
            }
        }else if(currentcolumn===8){
            if(currentrow===0){
                document.getElementById(currentrow+","+(currentcolumn-1)).disabled=true;
                document.getElementById(currentrow+","+(currentcolumn-1)).classList.remove(currenttheme);
                document.getElementById(currentrow+","+(currentcolumn-2)).disabled=true;
                document.getElementById(currentrow+","+(currentcolumn-2)).classList.remove(currenttheme);
                document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                currentangle=2;
                
            }
            else if(currentrow===1){
                if(document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-1)+","+currentcolumn).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-2)).disabled){
                    document.getElementById(currentrow+","+(currentcolumn-1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn-1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-2)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn-2)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById((currentrow-1)+","+currentcolumn).disabled=false;
                    document.getElementById((currentrow-1)+","+currentcolumn).classList.add(currenttheme);
                    currentangle=2;
                    }
            }else  if(currentrow===2){
                if(document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-1)+","+currentcolumn).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-2)).disabled && document.getElementById((currentrow-2)+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-2)+","+currentcolumn).disabled && document.getElementById((currentrow-2)+","+(currentcolumn-2)).disabled){
                    document.getElementById(currentrow+","+(currentcolumn-1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn-1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-2)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn-2)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById((currentrow-1)+","+currentcolumn).disabled=false;
                    document.getElementById((currentrow-1)+","+currentcolumn).classList.add(currenttheme);
                    document.getElementById((currentrow-2)+","+currentcolumn).disabled=false;
                    document.getElementById((currentrow-2)+","+currentcolumn).classList.add(currenttheme);
                    currentangle=2;
                }
            }else{
                if(document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-1)+","+currentcolumn).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-2)).disabled && document.getElementById((currentrow-2)+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-2)+","+currentcolumn).disabled && document.getElementById((currentrow-2)+","+(currentcolumn-2)).disabled && document.getElementById((currentrow-3)+","+currentcolumn).disabled){
                    document.getElementById(currentrow+","+(currentcolumn-1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn-1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-2)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn-2)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById((currentrow-1)+","+currentcolumn).disabled=false;
                    document.getElementById((currentrow-1)+","+currentcolumn).classList.add(currenttheme);
                    document.getElementById((currentrow-2)+","+currentcolumn).disabled=false;
                    document.getElementById((currentrow-2)+","+currentcolumn).classList.add(currenttheme);
                    document.getElementById((currentrow-3)+","+currentcolumn).disabled=false;
                    document.getElementById((currentrow-3)+","+currentcolumn).classList.add(currenttheme);
                    currentangle=2;
                }
            }
        }else if(currentcolumn===0){
            if(currentrow===0){
                document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                document.getElementById(currentrow+","+(currentcolumn+2)).disabled=true;
                document.getElementById(currentrow+","+(currentcolumn+2)).classList.remove(currenttheme);
                document.getElementById(currentrow+","+(currentcolumn+3)).disabled=true;
                document.getElementById(currentrow+","+(currentcolumn+3)).classList.remove(currenttheme);
                currentangle=2;
                
            }
            else if(currentrow===1){
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+2)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+2)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+3)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+3)).classList.remove(currenttheme);
                    document.getElementById((currentrow-1)+","+currentcolumn).disabled=false;
                    document.getElementById((currentrow-1)+","+currentcolumn).classList.add(currenttheme);
                    currentangle=2;
            }else  if(currentrow===2){
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+2)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+2)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+3)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+3)).classList.remove(currenttheme);
                    document.getElementById((currentrow-1)+","+currentcolumn).disabled=false;
                    document.getElementById((currentrow-1)+","+currentcolumn).classList.add(currenttheme);
                    document.getElementById((currentrow-2)+","+currentcolumn).disabled=false;
                    document.getElementById((currentrow-2)+","+currentcolumn).classList.add(currenttheme);
                    currentangle=2;
            }else{
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+2)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+2)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+3)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+3)).classList.remove(currenttheme);
                    document.getElementById((currentrow-1)+","+currentcolumn).disabled=false;
                    document.getElementById((currentrow-1)+","+currentcolumn).classList.add(currenttheme);
                    document.getElementById((currentrow-2)+","+currentcolumn).disabled=false;
                    document.getElementById((currentrow-2)+","+currentcolumn).classList.add(currenttheme);
                    document.getElementById((currentrow-3)+","+currentcolumn).disabled=false;
                    document.getElementById((currentrow-3)+","+currentcolumn).classList.add(currenttheme);
                    currentangle=2;
                
            }
        }else{
            if(currentrow===0){
                document.getElementById(currentrow+","+(currentcolumn-1)).disabled=true;
                document.getElementById(currentrow+","+(currentcolumn-1)).classList.remove(currenttheme);
                document.getElementById(currentrow+","+(currentcolumn+2)).disabled=true;
                document.getElementById(currentrow+","+(currentcolumn+2)).classList.remove(currenttheme);
                document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                currentangle=2;
            }
            else if(currentrow===1){
                if(document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-1)+","+currentcolumn).disabled){
                    document.getElementById(currentrow+","+(currentcolumn-1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn-1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+2)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+2)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById((currentrow-1)+","+currentcolumn).disabled=false;
                    document.getElementById((currentrow-1)+","+currentcolumn).classList.add(currenttheme);
                    currentangle=2;
                    }
            }else  if(currentrow===2){
                if(document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-1)+","+currentcolumn).disabled && document.getElementById((currentrow-2)+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-2)+","+currentcolumn).disabled){
                    document.getElementById(currentrow+","+(currentcolumn-1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn-1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+2)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+2)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById((currentrow-1)+","+currentcolumn).disabled=false;
                    document.getElementById((currentrow-1)+","+currentcolumn).classList.add(currenttheme);
                    document.getElementById((currentrow-2)+","+currentcolumn).disabled=false;
                    document.getElementById((currentrow-2)+","+currentcolumn).classList.add(currenttheme);
                    currentangle=2;
                }
            }else{
                if(document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-1)+","+currentcolumn).disabled && document.getElementById((currentrow-2)+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-2)+","+currentcolumn).disabled && document.getElementById((currentrow-3)+","+currentcolumn).disabled){
                    document.getElementById(currentrow+","+(currentcolumn-1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn-1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+2)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+2)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById((currentrow-1)+","+currentcolumn).disabled=false;
                    document.getElementById((currentrow-1)+","+currentcolumn).classList.add(currenttheme);
                    document.getElementById((currentrow-2)+","+currentcolumn).disabled=false;
                    document.getElementById((currentrow-2)+","+currentcolumn).classList.add(currenttheme);
                    document.getElementById((currentrow-3)+","+currentcolumn).disabled=false;
                    document.getElementById((currentrow-3)+","+currentcolumn).classList.add(currenttheme);
                    currentangle=2;
                }
            }
        }
      }else{ //  |
        if(currentcolumn===9){
            if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById(currentrow+","+(currentcolumn-2)).disabled && document.getElementById(currentrow+","+(currentcolumn-3)).disabled){
                document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                document.getElementById(currentrow+","+(currentcolumn-2)).disabled=false;
                document.getElementById(currentrow+","+(currentcolumn-2)).classList.add(currenttheme);
                document.getElementById(currentrow+","+(currentcolumn-3)).disabled=false;
                document.getElementById(currentrow+","+(currentcolumn-3)).classList.add(currenttheme);
                currentangle=1;
                if(currentrow>=1){
                    document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                    if(currentrow>=2){
                        document.getElementById((currentrow-2)+","+currentcolumn).disabled=true;
                        document.getElementById((currentrow-2)+","+currentcolumn).classList.remove(currenttheme);
                    }
                    if(currentrow>=3){
                        document.getElementById((currentrow-3)+","+currentcolumn).disabled=true;
                        document.getElementById((currentrow-3)+","+currentcolumn).classList.remove(currenttheme);
                    }
                }
            }
        }else if(currentcolumn===8){
            if(currentrow===0){
                if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById(currentrow+","+(currentcolumn-2)).disabled && document.getElementById(currentrow+","+(currentcolumn+1)).disabled){
                    document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-2)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn-2)).classList.add(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                    currentangle=1;
                }
            }
            else if(currentrow===1){
                if(document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled && document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById(currentrow+","+(currentcolumn-2)).disabled && document.getElementById(currentrow+","+(currentcolumn+1)).disabled){
                    document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-2)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn-2)).classList.add(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                    currentangle=1;
                    }
            }else  if(currentrow===2){
                if(document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled && document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled && document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById(currentrow+","+(currentcolumn-2)).disabled && document.getElementById(currentrow+","+(currentcolumn+1)).disabled){
                    document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-2)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn-2)).classList.add(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById((currentrow-2)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-2)+","+currentcolumn).classList.remove(currenttheme);
                    currentangle=1;
                }
            }else{
                if(document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled && document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled && document.getElementById((currentrow-3)+","+(currentcolumn+1)).disabled && document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById(currentrow+","+(currentcolumn-2)).disabled && document.getElementById(currentrow+","+(currentcolumn+1)).disabled){
                    document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-2)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn-2)).classList.add(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById((currentrow-2)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-2)+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById((currentrow-3)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-3)+","+currentcolumn).classList.remove(currenttheme);
                    currentangle=1;
                }
            }
        }else if(currentcolumn===0){
            if(currentrow===0){
                if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById(currentrow+","+(currentcolumn+3)).disabled){
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+3)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+3)).classList.add(currenttheme);
                    currentangle=1;
                }
            }
            else if(currentrow===1){
                if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById(currentrow+","+(currentcolumn+3)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled&& document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled&& document.getElementById((currentrow-1)+","+(currentcolumn+3)).disabled){
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+3)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+3)).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                    currentangle=1;
                }
            }else  if(currentrow===2){
                if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById(currentrow+","+(currentcolumn+3)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled&& document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled&& document.getElementById((currentrow-1)+","+(currentcolumn+3)).disabled && document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled&& document.getElementById((currentrow-2)+","+(currentcolumn+2)).disabled&& document.getElementById((currentrow-2)+","+(currentcolumn+3)).disabled){
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+3)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+3)).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById((currentrow-2)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-2)+","+currentcolumn).classList.remove(currenttheme);
                    currentangle=1;
                }
            }else{
                if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById(currentrow+","+(currentcolumn+3)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled&& document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled&& document.getElementById((currentrow-1)+","+(currentcolumn+3)).disabled && document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled&& document.getElementById((currentrow-2)+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-2)+","+(currentcolumn+3)).disabled  && document.getElementById((currentrow-3)+","+(currentcolumn+1)).disabled&& document.getElementById((currentrow-3)+","+(currentcolumn+2)).disabled){
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+3)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+3)).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById((currentrow-2)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-2)+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById((currentrow-3)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-3)+","+currentcolumn).classList.remove(currenttheme);
                    currentangle=1;
                }
            }
        }else{
            if(currentrow===0){
                if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById(currentrow+","+(currentcolumn-1)).disabled){
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                    currentangle=1;
                }
            }
            else if(currentrow===1){
                if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled&& document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled){
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                    currentangle=1;
                }
            }else  if(currentrow===2){
                if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled&& document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled && document.getElementById((currentrow-2)+","+(currentcolumn+2)).disabled){
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById((currentrow-2)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-2)+","+currentcolumn).classList.remove(currenttheme);
                    currentangle=1;
                }
            }else{
                if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled&& document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled&& document.getElementById((currentrow-2)+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-3)+","+(currentcolumn+1)).disabled&& document.getElementById((currentrow-3)+","+(currentcolumn+2)).disabled){
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById((currentrow-2)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-2)+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById((currentrow-3)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-3)+","+currentcolumn).classList.remove(currenttheme);
                    currentangle=1;
                }
            }
        }
      }
    }else{// -|
        if(currentangle===1){ // -|
            if(currentcolumn===8){
                if(currentrow===0){
                    if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById(currentrow+","+currentcolumn).disabled){
                    document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                    document.getElementById(currentrow+","+currentcolumn).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                    document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                    currentangle=2;
                    }
                }
                else if(currentrow===1){
                    if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById(currentrow+","+currentcolumn).disabled){
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                        document.getElementById(currentrow+","+currentcolumn).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                        document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                        currentangle=2;
                        }
                }else{
                    if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById(currentrow+","+currentcolumn).disabled){
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=true;
                        document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                        document.getElementById(currentrow+","+currentcolumn).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                        document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                        currentangle=2;
                    }
                }
            }else{
                if(currentcolumn===0){
                    if(currentrow===0){
                        if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById(currentrow+","+currentcolumn).disabled){
                        document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                        document.getElementById(currentrow+","+currentcolumn).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                        document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                        currentangle=2;
                        }
                    }
                    else if(currentrow===1){
                        if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById(currentrow+","+currentcolumn).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled){
                        document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                        document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                        document.getElementById(currentrow+","+currentcolumn).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                        document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                        currentangle=2;
                    }
                    }else{
                        if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById(currentrow+","+currentcolumn).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-2)+","+currentcolumn).disabled&& document.getElementById((currentrow-2)+","+(currentcolumn+2)).disabled){
                        document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                        document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=true;
                        document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+currentcolumn).disabled=false;
                        document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                        currentangle=2;
                        }
                    }
                }else{
                    if(currentrow===0){
                        if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById(currentrow+","+currentcolumn).disabled){
                        document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                        document.getElementById(currentrow+","+currentcolumn).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                        document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                        currentangle=2;
                        }
                    }
                    else if(currentrow===1){
                        if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById(currentrow+","+currentcolumn).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled && document.getElementById(currentrow+","+(currentcolumn-1)).disabled){
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                        document.getElementById(currentrow+","+currentcolumn).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                        document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                        currentangle=2;
                    }
                    }else{
                        if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById(currentrow+","+currentcolumn).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled && document.getElementById(currentrow+","+(currentcolumn-1)).disabled&& document.getElementById((currentrow-2)+","+(currentcolumn+2)).disabled){
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=true;
                        document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+currentcolumn).disabled=false;
                        document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                        currentangle=2;
                        }
                    }
                }
            }
        }else if(currentangle===2){ //  _|_
            if(currentcolumn===0){
                if(currentrow===0){
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+2)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+2)).classList.remove(currenttheme);
                    currentangle=3;
                }
                else if(currentrow===1){
                    if(document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-1)+","+currentcolumn).disabled){
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+2)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn+2)).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+currentcolumn).disabled=false;
                        document.getElementById((currentrow-1)+","+currentcolumn).classList.add(currenttheme);
                        currentangle=3;
                        }
                }else{
                    if(document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-1)+","+currentcolumn).disabled&& document.getElementById((currentrow-2)+","+currentcolumn).disabled){
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+2)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn+2)).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+currentcolumn).disabled=false;
                        document.getElementById((currentrow-1)+","+currentcolumn).classList.add(currenttheme);
                        document.getElementById((currentrow-2)+","+currentcolumn).disabled=false;
                        document.getElementById((currentrow-2)+","+currentcolumn).classList.add(currenttheme);
                        currentangle=3;
                        }
                }
            }else{
                if(currentrow===0){
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn-1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-1)).classList.remove(currenttheme);
                    currentangle=3;
                }
                else if(currentrow===1){
                    if(document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled){
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn-1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn-1)).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=false;
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                        currentangle=3;
                        }
                }else{
                    if(document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-2)+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-2)+","+currentcolumn).disabled){
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn-1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn-1)).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=false;
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                        document.getElementById((currentrow-2)+","+currentcolumn).disabled=false;
                        document.getElementById((currentrow-2)+","+currentcolumn).classList.add(currenttheme);
                        currentangle=3;
                        }
                }
            }
        }else if(currentangle===3){ // |-

            if(currentcolumn===0){
                if(currentrow===0){
                    if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled){
                        document.getElementById(currentrow+","+currentcolumn).disabled=true;
                        document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                        currentangle=4;
                    }
                }
                else if(currentrow===1){
                    if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled){
                        document.getElementById(currentrow+","+currentcolumn).disabled=true;
                        document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=false;
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.add(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                        currentangle=4;
                    }
                }else{
                    if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled&& document.getElementById((currentrow-2)+","+(currentcolumn+2)).disabled){
                        document.getElementById(currentrow+","+currentcolumn).disabled=true;
                        document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById((currentrow-2)+","+currentcolumn).disabled=true;
                        document.getElementById((currentrow-2)+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=false;
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.add(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                        currentangle=4;
                    }
                }
            }else{
                if(currentrow===0){if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById(currentrow+","+(currentcolumn-1)).disabled)currentangle=4;}
                else if(currentrow===1){
                    if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled && document.getElementById(currentrow+","+(currentcolumn+1)).disabled){
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=false;
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.add(currenttheme);
                        currentangle=4;
                    }
                }else{
                    if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled && document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled){
                        document.getElementById((currentrow-2)+","+currentcolumn).disabled=true;
                        document.getElementById((currentrow-2)+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=false;
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.add(currenttheme);
                        currentangle=4;
                    }
                }
            }
        }else{ // T
            if(currentcolumn===0){
                if(currentrow===0){if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById(currentrow+","+currentcolumn).disabled)currentangle=1;}
                else if(currentrow===1){
                    if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById(currentrow+","+currentcolumn).disabled){
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.remove(currenttheme);
                        currentangle=1;
                    }
                }else{
                    if(document.getElementById((currentrow-2)+","+currentcolumn).disabled && document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled && document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById(currentrow+","+currentcolumn).disabled){
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.remove(currenttheme);
                        document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=false;
                        document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.add(currenttheme);
                        currentangle=1;
                    }
                }
            }else{
                if(currentrow===0){if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById(currentrow+","+(currentcolumn-1)).disabled){
                    document.getElementById(currentrow+","+currentcolumn).disabled=true;
                    document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                    currentangle=1;
                }}
                else if(currentrow===1){
                    if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById(currentrow+","+(currentcolumn-1)).disabled){
                        document.getElementById(currentrow+","+currentcolumn).disabled=true;
                        document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                        currentangle=1;
                    }
                }else{
                    if(document.getElementById((currentrow-2)+","+currentcolumn).disabled && document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled&& document.getElementById((currentrow-2)+","+(currentcolumn-1)).disabled && document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById(currentrow+","+(currentcolumn-1)).disabled){
                        document.getElementById(currentrow+","+currentcolumn).disabled=true;
                        document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                        document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                        document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.add(currenttheme);
                        currentangle=1;
                    }
                }
            }
        }
    }
}

function moveright(){
    if(currentcolumn===9 || !isobjectmoving || timerid===0)return;
    if(currentobject===7){// |-
        if(currentangle===1){ if(currentcolumn===8)return;
            if(currentrow===0){
                if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled){
                    document.getElementById(currentrow+","+currentcolumn).disabled=true;
                    document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                    currentcolumn++;
                }
            }else if(currentrow===1){
                if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled){
                    document.getElementById(currentrow+","+currentcolumn).disabled=true;
                    document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=false;
                    document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.add(currenttheme);
                    currentcolumn++;
                }
            }else{
                if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled){
                    document.getElementById(currentrow+","+currentcolumn).disabled=true;
                    document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById((currentrow-2)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-2)+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=false;
                    document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.add(currenttheme);
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=false;
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.add(currenttheme);
                    currentcolumn++;
                }
            }
        }else if(currentangle===2){// T
            if(currentcolumn===8) return;
            if(currentcolumn===0){
                if(currentrow===0){
                    if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled){
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                        currentcolumn+=2;
                    }
                }
                else{
                    if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+3)).disabled){
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                        document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn+3)).disabled=false;
                        document.getElementById((currentrow-1)+","+(currentcolumn+3)).classList.add(currenttheme);
                        currentcolumn+=2;
                    }
                }
            }else{
                if(currentrow===0){
                    if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled){
                        document.getElementById(currentrow+","+currentcolumn).disabled=true;
                        document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                        currentcolumn++;
                    }
                }
                else{
                    if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled){
                        document.getElementById(currentrow+","+currentcolumn).disabled=true;
                        document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=false;
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.add(currenttheme);
                        currentcolumn++;
                    }
                }
            }
            
        }else if(currentangle===3){ // -|
            if(currentcolumn===8)return;
            if(currentrow===0){
                if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled){
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                    currentcolumn++;
                }
            }else if(currentrow===1){
                if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled){
                    document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=false;
                    document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.add(currenttheme);
                    currentcolumn++;
                }
            }else{
                if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled&& document.getElementById((currentrow-2)+","+(currentcolumn+2)).disabled){
                    document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=true;
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=false;
                    document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.add(currenttheme);
                    document.getElementById((currentrow-2)+","+(currentcolumn+2)).disabled=false;
                    document.getElementById((currentrow-2)+","+(currentcolumn+2)).classList.add(currenttheme);
                    currentcolumn++;
                }
            }
        }else{ // _|_
            if(currentcolumn===8) return;
            if(currentcolumn===0){
                if(currentrow===0){
                    if(document.getElementById(currentrow+","+(currentcolumn+3)).disabled){
                        document.getElementById(currentrow+","+(currentcolumn)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+3)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+3)).classList.add(currenttheme);
                        currentcolumn+=2;
                    }
                }
                else{
                    if(document.getElementById(currentrow+","+(currentcolumn+3)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled){
                        document.getElementById(currentrow+","+(currentcolumn)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+3)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+3)).classList.add(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+3)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+3)).classList.add(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=false;
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.add(currenttheme);
                        currentcolumn+=2;
                    }
                }
            }else{
                if(currentrow===0){
                    if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled){
                        document.getElementById(currentrow+","+(currentcolumn-1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn-1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                        currentcolumn++;
                    }
                }
                else{
                    if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled){
                        document.getElementById(currentrow+","+(currentcolumn-1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn-1)).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                        document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=false;
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                        currentcolumn++;
                    }
                }
            }
        }
    }else if(currentobject===6){// |\
        if(currentangle===1){
        if(currentcolumn===8)return;
        if(currentrow===0){
            if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled){
                document.getElementById(currentrow+","+currentcolumn).disabled=true;
                document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                currentcolumn++;
            }
        }else if(currentrow===1){
            if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled){
                document.getElementById(currentrow+","+currentcolumn).disabled=true;
                document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=false;
                document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.add(currenttheme);
                currentcolumn++;
            }
        }else{
            if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-2)+","+(currentcolumn+2)).disabled){
                document.getElementById(currentrow+","+currentcolumn).disabled=true;
                document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=true;
                document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.remove(currenttheme);
                document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=false;
                document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.add(currenttheme);
                document.getElementById((currentrow-2)+","+(currentcolumn+2)).disabled=false;
                document.getElementById((currentrow-2)+","+(currentcolumn+2)).classList.add(currenttheme);
                currentcolumn++;
            }
        }
        }else{ // -_
            if(currentcolumn===8)return;
            if(currentcolumn===0){
                if(currentrow===0){
                    if(document.getElementById(currentrow+","+(currentcolumn+3)).disabled){
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+3)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+3)).classList.add(currenttheme);
                        currentcolumn+=2;
                    }
                }else{
                    if(document.getElementById(currentrow+","+(currentcolumn+3)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled){
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                        document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+3)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+3)).classList.add(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=false;
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.add(currenttheme);
                        currentcolumn+=2;
                    }
                }
            }else{
                if(currentrow===0){
                    if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled){
                        document.getElementById(currentrow+","+currentcolumn).disabled=true;
                        document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                        currentcolumn++;
                    }
                }else{
                    if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled){
                        document.getElementById(currentrow+","+currentcolumn).disabled=true;
                        document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=false;
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                        currentcolumn++;
                    }
                }
            }
        }
    }else if(currentobject===5){// /|
        if(currentangle===1){
            if(currentcolumn===8)return;
            if(currentrow===0){
                if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled){
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                    currentcolumn++;
                }
            }else if(currentrow===1){
                if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled){
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=false;
                    document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.add(currenttheme);
                    currentcolumn++;
                }
            }else{
                if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled){
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById((currentrow-2)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-2)+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=false;
                    document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.add(currenttheme);
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=false;
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.add(currenttheme);
                    currentcolumn++;
                }
            }
        }else{ // _-
            if(currentcolumn===8)return;
            if(currentcolumn===0){
                if(currentrow===0){
                    if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled){
                        document.getElementById(currentrow+","+currentcolumn).disabled=true;
                        document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                        currentcolumn+=2;
                    }
                }else{
                    if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+3)).disabled){
                        document.getElementById(currentrow+","+currentcolumn).disabled=true;
                        document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn+3)).disabled=false;
                        document.getElementById((currentrow-1)+","+(currentcolumn+3)).classList.add(currenttheme);
                        currentcolumn+=2;
                    }
                }
            }else{
                if(currentrow===0){
                    if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled){
                        document.getElementById(currentrow+","+(currentcolumn-1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn-1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                        currentcolumn++;
                    }
                }else{
                    if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled){
                        document.getElementById(currentrow+","+(currentcolumn-1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn-1)).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                        document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=false;
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.add(currenttheme);
                        currentcolumn++;
                    }
                }
            }
        }
    }else if(currentobject===4){// _|
        if(currentangle===1){
            if(currentcolumn===8)return;
            if(currentrow===0){
                if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled){
                    document.getElementById(currentrow+","+currentcolumn).disabled=true;
                    document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                    currentcolumn++;
                }
            }else if(currentrow===1){
                if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled){
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+currentcolumn).disabled=true;
                    document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=false;
                    document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.add(currenttheme);
                    currentcolumn++;
                }
            }else{
                if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled&& document.getElementById((currentrow-2)+","+(currentcolumn+2)).disabled){
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=true;
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+currentcolumn).disabled=true;
                    document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=false;
                    document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.add(currenttheme);
                    document.getElementById((currentrow-2)+","+(currentcolumn+2)).disabled=false;
                    document.getElementById((currentrow-2)+","+(currentcolumn+2)).classList.add(currenttheme);
                    currentcolumn++;
                }
            }
        }else if(currentangle===2){ // |__
            if(currentcolumn===8)return;
            if(currentcolumn===0){
                if(currentrow===0){
                    if(document.getElementById(currentrow+","+(currentcolumn+3)).disabled){
                        document.getElementById(currentrow+","+currentcolumn).disabled=true;
                        document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+3)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+3)).classList.add(currenttheme);
                        currentcolumn+=2;
                    }
                }else{
                    if(document.getElementById(currentrow+","+(currentcolumn+3)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled){
                        document.getElementById(currentrow+","+currentcolumn).disabled=true;
                        document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+3)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+3)).classList.add(currenttheme);
                        document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                        document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=false;
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                        currentcolumn+=2;
                    }
                }
            }else{
                if(currentrow===0){
                    if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled){
                        document.getElementById(currentrow+","+(currentcolumn-1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn-1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                        currentcolumn++;
                    }
                }else{
                    if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-1)+","+currentcolumn).disabled){
                        document.getElementById(currentrow+","+(currentcolumn-1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn-1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+currentcolumn).disabled=false;
                        document.getElementById((currentrow-1)+","+currentcolumn).classList.add(currenttheme);
                        currentcolumn++;
                    }
                }
            }
        }else if(currentangle===3){ // |¯
            if(currentcolumn===8)return;
            if(currentrow===0){
                if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled){
                    document.getElementById(currentrow+","+currentcolumn).disabled=true;
                    document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                    currentcolumn++;
                }
            }else if(currentrow===1){
                if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled){
                    document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+currentcolumn).disabled=true;
                    document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=false;
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                    currentcolumn++;
                }
            }else{
                if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled && document.getElementById((currentrow-2)+","+(currentcolumn+2)).disabled){
                    document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById((currentrow-2)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-2)+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+currentcolumn).disabled=true;
                    document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=false;
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                    document.getElementById((currentrow-2)+","+(currentcolumn+2)).disabled=false;
                    document.getElementById((currentrow-2)+","+(currentcolumn+2)).classList.add(currenttheme);
                    currentcolumn++;
                }
            }
        }else{ // ¯¯¯|
            if(currentcolumn===8)return;
            if(currentcolumn===0){
                if(currentrow===0){
                    if(document.getElementById(currentrow+","+(currentcolumn+3)).disabled){
                        document.getElementById(currentrow+","+(currentcolumn+2)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn+2)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+3)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+3)).classList.add(currenttheme);
                        currentcolumn+=2;
                    }
                }else{
                    if(document.getElementById(currentrow+","+(currentcolumn+3)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+3)).disabled){
                        document.getElementById(currentrow+","+(currentcolumn+2)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn+2)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+3)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+3)).classList.add(currenttheme);
                        document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                        document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn+3)).disabled=false;
                        document.getElementById((currentrow-1)+","+(currentcolumn+3)).classList.add(currenttheme);
                        currentcolumn+=2;
                    }
                }
            }else{
                if(currentrow===0){
                    if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled){
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                        currentcolumn++;
                    }
                }else{
                    if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled){
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=false;
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.add(currenttheme);
                        currentcolumn++;
                    }
                }
            }
        }
        
    }else if(currentobject===3){// |_
        if(currentangle===1){
            if(currentcolumn===8)return;
            if(currentrow===0){
                if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled){
                    document.getElementById(currentrow+","+currentcolumn).disabled=true;
                    document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                    currentcolumn++;
                }
            }else if(currentrow===1){
                if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled){
                    document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+currentcolumn).disabled=true;
                    document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=false;
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                    currentcolumn++;
                }
            }else{
                if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled && document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled){
                    document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById((currentrow-2)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-2)+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+currentcolumn).disabled=true;
                    document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=false;
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=false;
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.add(currenttheme);
                    currentcolumn++;
                }
            }
        }else if(currentangle===2){ // |¯¯¯
            if(currentcolumn===8)return;
            if(currentcolumn===0){
                if(currentrow===0){
                    if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled){
                        document.getElementById(currentrow+","+currentcolumn).disabled=true;
                        document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                        currentcolumn+=2;
                    }
                }else{
                    if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+3)).disabled){
                        document.getElementById(currentrow+","+currentcolumn).disabled=true;
                        document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                        document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                        document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn+3)).disabled=false;
                        document.getElementById((currentrow-1)+","+(currentcolumn+3)).classList.add(currenttheme);
                        currentcolumn+=2;
                    }
                }
            }else{
                if(currentrow===0){
                    if(document.getElementById(currentrow+","+currentcolumn).disabled){
                        document.getElementById(currentrow+","+(currentcolumn-1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn-1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+currentcolumn).disabled=false;
                        document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                        currentcolumn++;
                    }
                }else{
                    if(document.getElementById(currentrow+","+currentcolumn).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled){
                        document.getElementById(currentrow+","+(currentcolumn-1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn-1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+currentcolumn).disabled=false;
                        document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=false;
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.add(currenttheme);
                        currentcolumn++;
                    }
                }
            }
        }else if(currentangle===3){ // ¯|
            if(currentcolumn===8)return;
            if(currentrow===0){
                if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled){
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                    currentcolumn++;
                }
            }else if(currentrow===1){
                if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled){
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=false;
                    document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.add(currenttheme);
                    currentcolumn++;
                }
            }else{
                if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled&& document.getElementById((currentrow-2)+","+(currentcolumn+2)).disabled){
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById((currentrow-2)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-2)+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=false;
                    document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.add(currenttheme);
                    document.getElementById((currentrow-2)+","+(currentcolumn+2)).disabled=false;
                    document.getElementById((currentrow-2)+","+(currentcolumn+2)).classList.add(currenttheme);
                    currentcolumn++;
                }
            }
        }else{ // __|
            if(currentcolumn===8)return;
            if(currentcolumn===0){
                if(currentrow===0){
                    if(document.getElementById(currentrow+","+(currentcolumn+3)).disabled){
                        document.getElementById(currentrow+","+currentcolumn).disabled=true;
                        document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+3)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+3)).classList.add(currenttheme);
                        currentcolumn+=2;
                    }
                }else{
                    if(document.getElementById(currentrow+","+(currentcolumn+3)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+3)).disabled){
                        document.getElementById(currentrow+","+currentcolumn).disabled=true;
                        document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+3)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+3)).classList.add(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn+3)).disabled=false;
                        document.getElementById((currentrow-1)+","+(currentcolumn+3)).classList.add(currenttheme);
                        currentcolumn+=2;
                    }
                }
            }else{
                if(currentrow===0){
                    if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled){
                        document.getElementById(currentrow+","+(currentcolumn-1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn-1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                        currentcolumn++;
                    }
                }else{
                    if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled){
                        document.getElementById(currentrow+","+(currentcolumn-1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn-1)).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=false;
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.add(currenttheme);
                        currentcolumn++;
                    }
                }
            }
        }
    }else if(currentobject===2){// |+|
        if(currentcolumn===8)return;
        if(currentrow===0){
            if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled){
                document.getElementById(currentrow+","+currentcolumn).disabled=true;
                document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                currentcolumn++;
            }
        }else{
            if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled){
                document.getElementById(currentrow+","+currentcolumn).disabled=true;
                document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=false;
                document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.add(currenttheme);
                currentcolumn++;
            }
        }
    }else if(currentobject===1){    //----
      if(currentangle===1){ if(currentcolumn>=7)return;
        if(currentcolumn===0){
            if(document.getElementById(currentrow+","+(currentcolumn+4)).disabled){
                document.getElementById(currentrow+","+currentcolumn).disabled=true;
                document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                document.getElementById(currentrow+","+(currentcolumn+4)).disabled=false;
                document.getElementById(currentrow+","+(currentcolumn+4)).classList.add(currenttheme);
                currentcolumn+=2;
            }
        }else {
            if(document.getElementById(currentrow+","+(currentcolumn+3)).disabled){
                document.getElementById(currentrow+","+(currentcolumn-1)).disabled=true;
                document.getElementById(currentrow+","+(currentcolumn-1)).classList.remove(currenttheme);
                document.getElementById(currentrow+","+(currentcolumn+3)).disabled=false;
                document.getElementById(currentrow+","+(currentcolumn+3)).classList.add(currenttheme);
                currentcolumn++;
            }
        }
      }else{
        if(currentrow===0){
            if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled){
                document.getElementById(currentrow+","+currentcolumn).disabled=true;
                document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                currentcolumn++;
            }
        }else if(currentrow===1){
            if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled){
                document.getElementById(currentrow+","+currentcolumn).disabled=true;
                document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=false;
                document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                currentcolumn++;
            }
        }else if(currentrow===2){
            if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled && document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled){
                document.getElementById(currentrow+","+currentcolumn).disabled=true;
                document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                document.getElementById((currentrow-2)+","+currentcolumn).disabled=true;
                document.getElementById((currentrow-2)+","+currentcolumn).classList.remove(currenttheme);
                document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=false;
                document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=false;
                document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.add(currenttheme);
                currentcolumn++;
            }
        }else{
            if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled && document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled && document.getElementById((currentrow-3)+","+(currentcolumn+1)).disabled){
                document.getElementById(currentrow+","+currentcolumn).disabled=true;
                document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                document.getElementById((currentrow-2)+","+currentcolumn).disabled=true;
                document.getElementById((currentrow-2)+","+currentcolumn).classList.remove(currenttheme);
                document.getElementById((currentrow-3)+","+currentcolumn).disabled=true;
                document.getElementById((currentrow-3)+","+currentcolumn).classList.remove(currenttheme);
                document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=false;
                document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=false;
                document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.add(currenttheme);
                document.getElementById((currentrow-3)+","+(currentcolumn+1)).disabled=false;
                document.getElementById((currentrow-3)+","+(currentcolumn+1)).classList.add(currenttheme);
                currentcolumn++;
            }
        }
      }
    }else{// -|
        if(currentangle===1){
            if(currentcolumn===8)return;
            if(currentrow===0){
                if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled){
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                    currentcolumn++;
                }
            }else if(currentrow===1){
                if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled){
                    document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=false;
                    document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.add(currenttheme);
                    currentcolumn++;
                }
            }else{
                if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled&& document.getElementById((currentrow-2)+","+(currentcolumn+2)).disabled){
                    document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=true;
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=false;
                    document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.add(currenttheme);
                    document.getElementById((currentrow-2)+","+(currentcolumn+2)).disabled=false;
                    document.getElementById((currentrow-2)+","+(currentcolumn+2)).classList.add(currenttheme);
                    currentcolumn++;
                }
            }
        }else if(currentangle===2){ //  _|_
            if(currentcolumn===8) return;
            if(currentcolumn===0){
                if(currentrow===0){
                    if(document.getElementById(currentrow+","+(currentcolumn+3)).disabled){
                        document.getElementById(currentrow+","+(currentcolumn)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+3)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+3)).classList.add(currenttheme);
                        currentcolumn+=2;
                    }
                }
                else{
                    if(document.getElementById(currentrow+","+(currentcolumn+3)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled){
                        document.getElementById(currentrow+","+(currentcolumn)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+3)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+3)).classList.add(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+3)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+3)).classList.add(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=false;
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.add(currenttheme);
                        currentcolumn+=2;
                    }
                }
            }else{
                if(currentrow===0){
                    if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled){
                        document.getElementById(currentrow+","+(currentcolumn-1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn-1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                        currentcolumn++;
                    }
                }
                else{
                    if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled){
                        document.getElementById(currentrow+","+(currentcolumn-1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn-1)).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                        document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=false;
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                        currentcolumn++;
                    }
                }
            }
        }else if(currentangle===3){ // |- 
            if(currentcolumn===8)return;
            if(currentrow===0){
                if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled){
                    document.getElementById(currentrow+","+currentcolumn).disabled=true;
                    document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                    currentcolumn++;
                }
            }else if(currentrow===1){
                if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled){
                    document.getElementById(currentrow+","+currentcolumn).disabled=true;
                    document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=false;
                    document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.add(currenttheme);
                    currentcolumn++;
                }
            }else{
                if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled){
                    document.getElementById(currentrow+","+currentcolumn).disabled=true;
                    document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById((currentrow-2)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-2)+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=false;
                    document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.add(currenttheme);
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=false;
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.add(currenttheme);
                    currentcolumn++;
                }
            }
        }else{ // T
            if(currentcolumn===8) return;
            if(currentcolumn===0){
                if(currentrow===0){
                    if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled){
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                        currentcolumn+=2;
                    }
                }
                else{
                    if(document.getElementById(currentrow+","+(currentcolumn+2)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+3)).disabled){
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                        document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn+3)).disabled=false;
                        document.getElementById((currentrow-1)+","+(currentcolumn+3)).classList.add(currenttheme);
                        currentcolumn+=2;
                    }
                }
            }else{
                if(currentrow===0){
                    if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled){
                        document.getElementById(currentrow+","+currentcolumn).disabled=true;
                        document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                        currentcolumn++;
                    }
                }
                else{
                    if(document.getElementById(currentrow+","+(currentcolumn+1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled){
                        document.getElementById(currentrow+","+currentcolumn).disabled=true;
                        document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=false;
                        document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.add(currenttheme);
                        currentcolumn++;
                    }
                }
            }
        }
    }
}

function moveleft(){
    if(currentcolumn===0 || !isobjectmoving || timerid===0) return;
    if(currentobject===7){// |-
        if(currentangle===1){
            if(currentrow===0){
                if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled){
                    document.getElementById(currentrow+","+currentcolumn).disabled=true;
                    document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                    currentcolumn--;
                }
            }else if(currentrow===1){
                if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled){
                    document.getElementById(currentrow+","+currentcolumn).disabled=true;
                    document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=false;
                    document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.add(currenttheme);
                    currentcolumn--;
                }
            }else{
                if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-2)+","+(currentcolumn-1)).disabled){
                    document.getElementById(currentrow+","+currentcolumn).disabled=true;
                    document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById((currentrow-2)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-2)+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=false;
                    document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.add(currenttheme);
                    document.getElementById((currentrow-2)+","+(currentcolumn-1)).disabled=false;
                    document.getElementById((currentrow-2)+","+(currentcolumn-1)).classList.add(currenttheme);
                    currentcolumn--;
                }
            }
        }else if(currentangle===2){ // T
            if(currentcolumn<=1) return;
            if(currentrow===0){
                if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled){
                    document.getElementById(currentrow+","+currentcolumn).disabled=true;
                    document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                    currentcolumn--;
                }
            }
            else{
                if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-2)).disabled){
                    document.getElementById(currentrow+","+currentcolumn).disabled=true;
                    document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn-2)).disabled=false;
                    document.getElementById((currentrow-1)+","+(currentcolumn-2)).classList.add(currenttheme);
                    currentcolumn--;
                }
            }
        }else if(currentangle===3){ // -|
            if(currentrow===0){
                if(document.getElementById(currentrow+","+currentcolumn).disabled){
                    document.getElementById(currentrow+","+currentcolumn).disabled=false;
                    document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    currentcolumn--;
                }
            }else if(currentrow===1){
                if(document.getElementById(currentrow+","+currentcolumn).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled){
                    document.getElementById(currentrow+","+currentcolumn).disabled=false;
                    document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=false;
                    document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.add(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                    currentcolumn--;
                }
            }else{
                if(document.getElementById(currentrow+","+currentcolumn).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-2)+","+currentcolumn).disabled){
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=true;
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+currentcolumn).disabled=false;
                    document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=false;
                    document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.add(currenttheme);
                    document.getElementById((currentrow-2)+","+currentcolumn).disabled=false;
                    document.getElementById((currentrow-2)+","+currentcolumn).classList.add(currenttheme);
                    currentcolumn--;
                }
            }
        }else{ // _|_
            if(currentcolumn<=1) return;
            if(currentrow===0){
                if(document.getElementById(currentrow+","+(currentcolumn-2)).disabled){
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-2)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn-2)).classList.add(currenttheme);
                    currentcolumn--;
                }
            }
            else{
                if(document.getElementById(currentrow+","+(currentcolumn-2)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled){
                    document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-2)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn-2)).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=false;
                    document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.add(currenttheme);
                    currentcolumn--;
                }
            }
        }
    }else if(currentobject===6){// |\
        if(currentangle===1){
        if(currentrow===0){
            if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled){
                document.getElementById(currentrow+","+currentcolumn).disabled=true;
                document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                currentcolumn--;
            }
        }else if(currentrow===1){
            if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled){
                document.getElementById(currentrow+","+currentcolumn).disabled=true;
                document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=false;
                document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.add(currenttheme);
                currentcolumn--;
            }
        }else{
            if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-2)+","+currentcolumn).disabled){
                document.getElementById(currentrow+","+currentcolumn).disabled=true;
                document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=false;
                document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.add(currenttheme);
                document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=true;
                document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.remove(currenttheme);
                document.getElementById((currentrow-2)+","+currentcolumn).disabled=false;
                document.getElementById((currentrow-2)+","+currentcolumn).classList.add(currenttheme);
                currentcolumn--;
            }
        }
        }else{ // -_
            if(currentcolumn<=1) return;
            if(currentrow===0){
                if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled){
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                    currentcolumn--;
                }
            }else{
                if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-2)).disabled){
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);

                    document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn-2)).disabled=false;
                    document.getElementById((currentrow-1)+","+(currentcolumn-2)).classList.add(currenttheme);
                    currentcolumn--;
                }
            }
        }
    }else if(currentobject===5){// /|
            if(currentangle===1){
            if(currentrow===0){
                if(document.getElementById(currentrow+","+currentcolumn).disabled){
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+currentcolumn).disabled=false;
                    document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                    currentcolumn--;
                }
            }else if(currentrow===1){
                if(document.getElementById(currentrow+","+currentcolumn).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled){
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+currentcolumn).disabled=false;
                    document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=false;
                    document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.add(currenttheme);
                    currentcolumn--;
                }
            }else{
                if(document.getElementById(currentrow+","+currentcolumn).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-2)+","+(currentcolumn-1)).disabled){
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+currentcolumn).disabled=false;
                    document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=false;
                    document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.add(currenttheme);
                    document.getElementById((currentrow-2)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-2)+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById((currentrow-2)+","+(currentcolumn-1)).disabled=false;
                    document.getElementById((currentrow-2)+","+(currentcolumn-1)).classList.add(currenttheme);
                    currentcolumn--;
                }
            }
            }else{ // _-
                if(currentcolumn<=1) return;
                if(currentrow===0){
                    if(document.getElementById(currentrow+","+(currentcolumn-2)).disabled){
                        document.getElementById(currentrow+","+currentcolumn).disabled=true;
                        document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn-2)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn-2)).classList.add(currenttheme);
                        currentcolumn--;
                    }
                }else{
                    if(document.getElementById(currentrow+","+(currentcolumn-2)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled){
                        document.getElementById(currentrow+","+currentcolumn).disabled=true;
                        document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                        document.getElementById(currentrow+","+(currentcolumn-2)).disabled=false;
                        document.getElementById(currentrow+","+(currentcolumn-2)).classList.add(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                        document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=false;
                        document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.add(currenttheme);
                        currentcolumn--;
                    }
                }
            }
    }else if(currentobject===4){// _|
        if(currentangle===1){
            if(currentrow===0){
                if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled){
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                    currentcolumn--;
                }
            }else if(currentrow===1){
                if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-1)+","+currentcolumn).disabled){
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById((currentrow-1)+","+currentcolumn).disabled=false;
                    document.getElementById((currentrow-1)+","+currentcolumn).classList.add(currenttheme);
                    currentcolumn--;
                }
            }else{
                if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-1)+","+currentcolumn).disabled && document.getElementById((currentrow-2)+","+currentcolumn).disabled){
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=true;
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById((currentrow-1)+","+currentcolumn).disabled=false;
                    document.getElementById((currentrow-1)+","+currentcolumn).classList.add(currenttheme);
                    document.getElementById((currentrow-2)+","+currentcolumn).disabled=false;
                    document.getElementById((currentrow-2)+","+currentcolumn).classList.add(currenttheme);
                    currentcolumn--;
                }
            }
        }else if(currentangle===2){ // |__
            if(currentcolumn<=1) return;
            if(currentrow===0){
                if(document.getElementById(currentrow+","+(currentcolumn-2)).disabled){
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-2)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn-2)).classList.add(currenttheme);
                    currentcolumn--;
                }
            }else{
                if(document.getElementById(currentrow+","+(currentcolumn-2)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-2)).disabled){
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-2)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn-2)).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=true;
                    document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.remove(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn-2)).disabled=false;
                    document.getElementById((currentrow-1)+","+(currentcolumn-2)).classList.add(currenttheme);
                    currentcolumn--;
                }
            }
        }else if(currentangle===3){ // |¯¯
            if(currentrow===0){
                if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled){
                    document.getElementById(currentrow+","+currentcolumn).disabled=true;
                    document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                    currentcolumn--;
                }
            }else if(currentrow===1){
                if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled){
                    document.getElementById(currentrow+","+currentcolumn).disabled=true;
                    document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=false;
                    document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.add(currenttheme);
                    currentcolumn--;
                }
            }else{
                if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-2)+","+(currentcolumn-1)).disabled){
                    document.getElementById(currentrow+","+currentcolumn).disabled=true;
                    document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=true;
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=false;
                    document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.add(currenttheme);
                    document.getElementById((currentrow-2)+","+(currentcolumn-1)).disabled=false;
                    document.getElementById((currentrow-2)+","+(currentcolumn-1)).classList.add(currenttheme);
                    currentcolumn--;
                }
            }
        }else{ // ¯¯¯|
            if(currentcolumn<=1) return;
            if(currentrow===0){
                if(document.getElementById(currentrow+","+currentcolumn).disabled){
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+currentcolumn).disabled=false;
                    document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                    currentcolumn--;
                }
            }else{
                if(document.getElementById(currentrow+","+currentcolumn).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-2)).disabled){
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+currentcolumn).disabled=false;
                    document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn-2)).disabled=false;
                    document.getElementById((currentrow-1)+","+(currentcolumn-2)).classList.add(currenttheme);
                    currentcolumn--;
                }
            }
        }
    }else if(currentobject===3){// |_
        if(currentangle===1){
            if(currentrow===0){
                if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled){
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                    currentcolumn--;
                }
            }else if(currentrow===1){
                if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled){
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=false;
                    document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.add(currenttheme);
                    currentcolumn--;
                }
            }else{
                if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-2)+","+(currentcolumn-1)).disabled){
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById((currentrow-2)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-2)+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=false;
                    document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.add(currenttheme);
                    document.getElementById((currentrow-2)+","+(currentcolumn-1)).disabled=false;
                    document.getElementById((currentrow-2)+","+(currentcolumn-1)).classList.add(currenttheme);
                    currentcolumn--;
                }
            }
        }else if(currentangle===2){ // |¯¯¯
            if(currentcolumn<=1) return;
            if(currentrow===0){
                if(document.getElementById(currentrow+","+(currentcolumn-2)).disabled){
                    document.getElementById(currentrow+","+(currentcolumn-1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn-1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-2)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn-2)).classList.add(currenttheme);
                    currentcolumn--;
                }
            }else{
                if(document.getElementById(currentrow+","+(currentcolumn-2)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-2)).disabled){
                    document.getElementById(currentrow+","+(currentcolumn-1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn-1)).classList.remove(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-2)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn-2)).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn-2)).disabled=false;
                    document.getElementById((currentrow-1)+","+(currentcolumn-2)).classList.add(currenttheme);
                    currentcolumn--;
                }
            }
        }else if(currentangle===3){ // ¯|
            if(currentrow===0){
                if(document.getElementById(currentrow+","+currentcolumn).disabled){
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+currentcolumn).disabled=false;
                    document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                    currentcolumn--;
                }
            }else if(currentrow===1){
                if(document.getElementById(currentrow+","+currentcolumn).disabled && document.getElementById((currentrow-1)+","+currentcolumn).disabled){
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+currentcolumn).disabled=false;
                    document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById((currentrow-1)+","+currentcolumn).disabled=false;
                    document.getElementById((currentrow-1)+","+currentcolumn).classList.add(currenttheme);
                    currentcolumn--;
                }
            }else{
                if(document.getElementById(currentrow+","+currentcolumn).disabled && document.getElementById((currentrow-1)+","+currentcolumn).disabled && document.getElementById((currentrow-2)+","+(currentcolumn-1)).disabled){
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+currentcolumn).disabled=false;
                    document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=true;
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById((currentrow-1)+","+currentcolumn).disabled=false;
                    document.getElementById((currentrow-1)+","+currentcolumn).classList.add(currenttheme);
                    document.getElementById((currentrow-2)+","+(currentcolumn-1)).disabled=false;
                    document.getElementById((currentrow-2)+","+(currentcolumn-1)).classList.add(currenttheme);
                    currentcolumn--;
                }
            }
        }else{ // __|
            if(currentcolumn<=1) return;
            if(currentrow===0){
                if(document.getElementById(currentrow+","+(currentcolumn-2)).disabled){
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-2)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn-2)).classList.add(currenttheme);
                    currentcolumn--;
                }
            }else{
                if(document.getElementById(currentrow+","+(currentcolumn-2)).disabled && document.getElementById((currentrow-1)+","+currentcolumn).disabled){
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById((currentrow-1)+","+currentcolumn).disabled=false;
                    document.getElementById((currentrow-1)+","+currentcolumn).classList.add(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-2)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn-2)).classList.add(currenttheme);
                    currentcolumn--;
                }
            }
        }
        
    }else if(currentobject===2){// |+|
        if(currentrow===0){
            if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled){
                document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                currentcolumn--;
            }
        }else{
            if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled){
                document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=false;
                document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.add(currenttheme);
                currentcolumn--;
            }
        }
    }else if(currentobject===1){//----
        if(currentangle===1){if(currentcolumn<=1)return;
            if(currentcolumn===8){
                if(document.getElementById(currentrow+","+(currentcolumn-3)).disabled){
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-3)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn-3)).classList.add(currenttheme);
                    currentcolumn-=2;
                }
            } 
            else if(currentcolumn===9){
                if(document.getElementById(currentrow+","+(currentcolumn-4)).disabled){
                    document.getElementById(currentrow+","+currentcolumn).disabled=true;
                    document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-4)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn-4)).classList.add(currenttheme);
                    currentcolumn-=3;
                }
            }
            else{
              if(document.getElementById(currentrow+","+(currentcolumn-2)).disabled){
                  document.getElementById(currentrow+","+(currentcolumn+2)).disabled=true;
                  document.getElementById(currentrow+","+(currentcolumn+2)).classList.remove(currenttheme);
                  document.getElementById(currentrow+","+(currentcolumn-2)).disabled=false;
                  document.getElementById(currentrow+","+(currentcolumn-2)).classList.add(currenttheme);
                  currentcolumn--;
              }
            }
        }else{
          if(currentrow===0){
              if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled){
                  document.getElementById(currentrow+","+currentcolumn).disabled=true;
                  document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                  document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                  document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                  currentcolumn--;
              }
          }else if(currentrow===1){
              if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled){
                  document.getElementById(currentrow+","+currentcolumn).disabled=true;
                  document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                  document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                  document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                  document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                  document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                  document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=false;
                  document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.add(currenttheme);
                  currentcolumn--;
              }
          }else if(currentrow===2){
              if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-2)+","+(currentcolumn-1)).disabled){
                  document.getElementById(currentrow+","+currentcolumn).disabled=true;
                  document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                  document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                  document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                  document.getElementById((currentrow-2)+","+currentcolumn).disabled=true;
                  document.getElementById((currentrow-2)+","+currentcolumn).classList.remove(currenttheme);
                  document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                  document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                  document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=false;
                  document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.add(currenttheme);
                  document.getElementById((currentrow-2)+","+(currentcolumn-1)).disabled=false;
                  document.getElementById((currentrow-2)+","+(currentcolumn-1)).classList.add(currenttheme);
                  currentcolumn--;
              }
          }else{
              if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-2)+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-3)+","+(currentcolumn-1)).disabled){
                  document.getElementById(currentrow+","+currentcolumn).disabled=true;
                  document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                  document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                  document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                  document.getElementById((currentrow-2)+","+currentcolumn).disabled=true;
                  document.getElementById((currentrow-2)+","+currentcolumn).classList.remove(currenttheme);
                  document.getElementById((currentrow-3)+","+currentcolumn).disabled=true;
                  document.getElementById((currentrow-3)+","+currentcolumn).classList.remove(currenttheme);
                  document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                  document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                  document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=false;
                  document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.add(currenttheme);
                  document.getElementById((currentrow-2)+","+(currentcolumn-1)).disabled=false;
                  document.getElementById((currentrow-2)+","+(currentcolumn-1)).classList.add(currenttheme);
                  document.getElementById((currentrow-3)+","+(currentcolumn-1)).disabled=false;
                  document.getElementById((currentrow-3)+","+(currentcolumn-1)).classList.add(currenttheme);
                  currentcolumn--;
              }
          }
        }
    }else{// -|
        if(currentangle===1){
            if(currentrow===0){
                if(document.getElementById(currentrow+","+currentcolumn).disabled){
                    document.getElementById(currentrow+","+currentcolumn).disabled=false;
                    document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    currentcolumn--;
                }
            }else if(currentrow===1){
                if(document.getElementById(currentrow+","+currentcolumn).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled){
                    document.getElementById(currentrow+","+currentcolumn).disabled=false;
                    document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=false;
                    document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.add(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                    currentcolumn--;
                }
            }else{
                if(document.getElementById(currentrow+","+currentcolumn).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-2)+","+currentcolumn).disabled){
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=true;
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+currentcolumn).disabled=false;
                    document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=false;
                    document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.add(currenttheme);
                    document.getElementById((currentrow-2)+","+currentcolumn).disabled=false;
                    document.getElementById((currentrow-2)+","+currentcolumn).classList.add(currenttheme);
                    currentcolumn--;
                }
            }
        }else if(currentangle===2){ //  _|_
            if(currentcolumn<=1) return;
            if(currentrow===0){
                if(document.getElementById(currentrow+","+(currentcolumn-2)).disabled){
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-2)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn-2)).classList.add(currenttheme);
                    currentcolumn--;
                }
            }
            else{
                if(document.getElementById(currentrow+","+(currentcolumn-2)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled){
                    document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn+1)).disabled=true;
                    document.getElementById(currentrow+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-2)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn-2)).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=false;
                    document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.add(currenttheme);
                    currentcolumn--;
                }
            }
        }else if(currentangle===3){ // |-
            if(currentrow===0){
                if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled){
                    document.getElementById(currentrow+","+currentcolumn).disabled=true;
                    document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                    currentcolumn--;
                }
            }else if(currentrow===1){
                if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled){
                    document.getElementById(currentrow+","+currentcolumn).disabled=true;
                    document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=false;
                    document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.add(currenttheme);
                    currentcolumn--;
                }
            }else{
                if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-2)+","+(currentcolumn-1)).disabled){
                    document.getElementById(currentrow+","+currentcolumn).disabled=true;
                    document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById((currentrow-2)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-2)+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=false;
                    document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.add(currenttheme);
                    document.getElementById((currentrow-2)+","+(currentcolumn-1)).disabled=false;
                    document.getElementById((currentrow-2)+","+(currentcolumn-1)).classList.add(currenttheme);
                    currentcolumn--;
                }
            }
        }else{ // T
            if(currentcolumn<=1) return;
            if(currentrow===0){
                if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled){
                    document.getElementById(currentrow+","+currentcolumn).disabled=true;
                    document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                    currentcolumn--;
                }
            }
            else{
                if(document.getElementById(currentrow+","+(currentcolumn-1)).disabled && document.getElementById((currentrow-1)+","+(currentcolumn-2)).disabled){
                    document.getElementById(currentrow+","+currentcolumn).disabled=true;
                    document.getElementById(currentrow+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                    document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                    document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                    document.getElementById((currentrow-1)+","+(currentcolumn-2)).disabled=false;
                    document.getElementById((currentrow-1)+","+(currentcolumn-2)).classList.add(currenttheme);
                    currentcolumn--;
                }
            }
        }
    }
}

function movedown(){ if(!isobjectmoving || timerid===0)return;
    if(currentrow===19){
        clearInterval(timerid);
        isobjectmoving=false; 
        storetheme();
        validategridforscore();
        return;
    }
    if(isobjectcollide()){
        if(currentrow===0) { isobjectmoving=false; gameover(); return}
        clearInterval(timerid);
        isobjectmoving=false;
        storetheme();
        validategridforscore();
        return; 
    }
    currentrow++;
    if(currentobject===7){// |-
        if(currentangle===1){
            if(currentrow===1){
            document.getElementById(currentrow+","+currentcolumn).disabled=false;
            document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
            document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=false;
            document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
            }else{
            document.getElementById(currentrow+","+currentcolumn).disabled=false;
            document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
            document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=false;
            document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
            document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=true; removetheme((currentrow-2),(currentcolumn+1));
            if(currentrow>2){
                document.getElementById((currentrow-3)+","+currentcolumn).disabled=true; removetheme((currentrow-3),currentcolumn);}
            }
        }else if(currentangle===2){ // T
            if(currentcolumn===0){
                document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=false;
                document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.add(currenttheme);
                document.getElementById((currentrow-1)+","+currentcolumn).disabled=false;
                document.getElementById((currentrow-1)+","+currentcolumn).classList.add(currenttheme);
                if(currentrow>1){
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=true;
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById((currentrow-2)+","+(currentcolumn+2)).disabled=true;
                    document.getElementById((currentrow-2)+","+(currentcolumn+2)).classList.remove(currenttheme);
                    document.getElementById((currentrow-2)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-2)+","+currentcolumn).classList.remove(currenttheme);
                }
            }else{
                document.getElementById(currentrow+","+currentcolumn).disabled=false;
                document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=false;
                document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=false;
                document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.add(currenttheme);
                if(currentrow>1){
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=true;
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById((currentrow-2)+","+(currentcolumn-1)).disabled=true;
                    document.getElementById((currentrow-2)+","+(currentcolumn-1)).classList.remove(currenttheme);
                    document.getElementById((currentrow-2)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-2)+","+currentcolumn).classList.remove(currenttheme);
                }
            }
        }else if(currentangle===3){ // -|
            if(currentrow===1){
            document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
            document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
            document.getElementById((currentrow-1)+","+currentcolumn).disabled=false;
            document.getElementById((currentrow-1)+","+currentcolumn).classList.add(currenttheme);
            }else{
            document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
            document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
            document.getElementById((currentrow-1)+","+currentcolumn).disabled=false;
            document.getElementById((currentrow-1)+","+currentcolumn).classList.add(currenttheme);

            document.getElementById((currentrow-2)+","+currentcolumn).disabled=true;
            document.getElementById((currentrow-2)+","+currentcolumn).classList.remove(currenttheme);
                if(currentrow>2){
                    document.getElementById((currentrow-3)+","+(currentcolumn+1)).disabled=true;
                    document.getElementById((currentrow-3)+","+(currentcolumn+1)).classList.remove(currenttheme);
                }
            }
        }else{ // _|_
            document.getElementById(currentrow+","+currentcolumn).disabled=false;
            document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
            document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
            document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
            if(currentcolumn===0){
                document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=true;
                document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.remove(currenttheme);
                if(currentrow>1){
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=true;
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.remove(currenttheme);
                }
            }else{
                document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=true;
                document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.remove(currenttheme);
                document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                if(currentrow>1){
                    document.getElementById((currentrow-2)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-2)+","+currentcolumn).classList.remove(currenttheme);
                }
            }
        }
    }else if(currentobject===6){// |\
        if(currentangle===1){
            if(currentrow===1){
                document.getElementById(currentrow+","+currentcolumn).disabled=false;
                document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=false;
                document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                }else{
                document.getElementById(currentrow+","+currentcolumn).disabled=false;
                document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=false;
                document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                document.getElementById((currentrow-2)+","+currentcolumn).disabled=true; removetheme((currentrow-2),currentcolumn);
                if(currentrow>2){
                    document.getElementById((currentrow-3)+","+(currentcolumn+1)).disabled=true; removetheme((currentrow-3),(currentcolumn+1));}
            }
        }else{ // -_
            if(currentcolumn===0){
                document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=true;
                document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.remove(currenttheme);
                document.getElementById((currentrow-1)+","+currentcolumn).disabled=false;
                document.getElementById((currentrow-1)+","+currentcolumn).classList.add(currenttheme);
                document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                if(currentrow>1){
                    document.getElementById((currentrow-2)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-2)+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=true;
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.remove(currenttheme);
                }
            }else{
                document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=false;
                document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.add(currenttheme);
                document.getElementById(currentrow+","+currentcolumn).disabled=false;
                document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                if(currentrow>1){
                    document.getElementById((currentrow-2)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-2)+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById((currentrow-2)+","+(currentcolumn-1)).disabled=true;
                    document.getElementById((currentrow-2)+","+(currentcolumn-1)).classList.remove(currenttheme);
                }
            }
        }
        
    }else if(currentobject===5){// /|
        if(currentangle===1){
            if(currentrow<=1){
                document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                document.getElementById((currentrow-1)+","+currentcolumn).disabled=false;
                document.getElementById((currentrow-1)+","+currentcolumn).classList.add(currenttheme);
            }else{
                document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                document.getElementById((currentrow-1)+","+currentcolumn).disabled=false;
                document.getElementById((currentrow-1)+","+currentcolumn).classList.add(currenttheme);
                document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=true; removetheme((currentrow-2),(currentcolumn+1));
                if(currentrow>2){
                    document.getElementById((currentrow-3)+","+currentcolumn).disabled=true; removetheme((currentrow-3),currentcolumn);
                }
            }
        }else{ // _-
            if(currentcolumn===0){
                document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=false;
                document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.add(currenttheme);
                document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                document.getElementById(currentrow+","+currentcolumn).disabled=false;
                document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                if(currentrow>1){
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=true;
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById((currentrow-2)+","+(currentcolumn+2)).disabled=true;
                    document.getElementById((currentrow-2)+","+(currentcolumn+2)).classList.remove(currenttheme);
                }
            }else{
                document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=true;
                document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.remove(currenttheme);
                document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=false;
                document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                document.getElementById(currentrow+","+currentcolumn).disabled=false;
                document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                if(currentrow>1){
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=true;
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById((currentrow-2)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-2)+","+currentcolumn).classList.remove(currenttheme);
                }
            }
        }
        
    }else if(currentobject===4){// _|
        if(currentangle===1){
            if(currentrow===1){
                document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                document.getElementById(currentrow+","+currentcolumn).disabled=false;
                document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                document.getElementById((currentrow-1)+","+currentcolumn).disabled=true; removetheme((currentrow-1),currentcolumn);
            }else{
                document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                document.getElementById(currentrow+","+currentcolumn).disabled=false;
                document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                document.getElementById((currentrow-1)+","+currentcolumn).disabled=true; removetheme((currentrow-1),currentcolumn);
                if(currentrow>2){
                    document.getElementById((currentrow-3)+","+(currentcolumn+1)).disabled=true; removetheme((currentrow-3),(currentcolumn+1));
                }
            }
        }else if(currentangle===2){ // |__
            document.getElementById(currentrow+","+currentcolumn).disabled=false;
            document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
            document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
            document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
            if(currentcolumn===0){
                document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=true;
                document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.remove(currenttheme);
                if(currentrow>1){
                    document.getElementById((currentrow-2)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-2)+","+currentcolumn).classList.remove(currenttheme);
                }
            }else{
                document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                if(currentrow>1){
                    document.getElementById((currentrow-2)+","+(currentcolumn-1)).disabled=true;
                    document.getElementById((currentrow-2)+","+(currentcolumn-1)).classList.remove(currenttheme);
                }
            }
        }else if(currentangle===3){ // |¯¯
            if(currentrow===1){
                document.getElementById(currentrow+","+currentcolumn).disabled=false;
                document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
            }else{
                document.getElementById(currentrow+","+currentcolumn).disabled=false;
                document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=false;
                document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.add(currenttheme);
                if(currentrow>2){
                    document.getElementById((currentrow-3)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-3)+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById((currentrow-3)+","+(currentcolumn+1)).disabled=true;
                    document.getElementById((currentrow-3)+","+(currentcolumn+1)).classList.remove(currenttheme);
                }
            }
        }else{ // ¯¯¯|
            if(currentcolumn===0){
                document.getElementById((currentrow-1)+","+currentcolumn).disabled=false;
                document.getElementById((currentrow-1)+","+currentcolumn).classList.add(currenttheme);
                document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=false;
                document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                if(currentrow>1){
                    document.getElementById((currentrow-2)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-2)+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=true;
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById((currentrow-2)+","+(currentcolumn+2)).disabled=true;
                    document.getElementById((currentrow-2)+","+(currentcolumn+2)).classList.remove(currenttheme);
                }
            }else{
                document.getElementById((currentrow-1)+","+currentcolumn).disabled=false;
                document.getElementById((currentrow-1)+","+currentcolumn).classList.add(currenttheme);
                document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=false;
                document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.add(currenttheme);
                if(currentrow>1){
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=true;
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById((currentrow-2)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-2)+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById((currentrow-2)+","+(currentcolumn-1)).disabled=true;
                    document.getElementById((currentrow-2)+","+(currentcolumn-1)).classList.remove(currenttheme);
                }
            }
        }
        
    }else if(currentobject===3){// |_
        if(currentangle===1){
            if(currentrow===1){
                document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                document.getElementById(currentrow+","+currentcolumn).disabled=false;
                document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true; removetheme((currentrow-1),(currentcolumn+1));
            }else{
                document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                document.getElementById(currentrow+","+currentcolumn).disabled=false;
                document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true; removetheme((currentrow-1),(currentcolumn+1));
                if(currentrow>2){
                    document.getElementById((currentrow-3)+","+currentcolumn).disabled=true; removetheme((currentrow-3),currentcolumn);
                }
            }
        }else if(currentangle===2){ // |¯¯¯
            if(currentcolumn===0){
                document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=false;
                document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=false;
                document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.add(currenttheme);
                document.getElementById(currentrow+","+currentcolumn).disabled=false;
                document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                if(currentrow>1){
                    document.getElementById((currentrow-2)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-2)+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=true;
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById((currentrow-2)+","+(currentcolumn+2)).disabled=true;
                    document.getElementById((currentrow-2)+","+(currentcolumn+2)).classList.remove(currenttheme);
                }
            }else{
                document.getElementById((currentrow-1)+","+currentcolumn).disabled=false;
                document.getElementById((currentrow-1)+","+currentcolumn).classList.add(currenttheme);
                document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=false;
                document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                if(currentrow>1){
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=true;
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById((currentrow-2)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-2)+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById((currentrow-2)+","+(currentcolumn-1)).disabled=true;
                    document.getElementById((currentrow-2)+","+(currentcolumn-1)).classList.remove(currenttheme);
                }
            }
        }else if(currentangle===3){ // ¯|
            if(currentrow<=1){
                document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
            }else{
                document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                document.getElementById((currentrow-2)+","+currentcolumn).disabled=false;
                document.getElementById((currentrow-2)+","+currentcolumn).classList.add(currenttheme);
                if(currentrow>2){
                    document.getElementById((currentrow-3)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-3)+","+currentcolumn).classList.remove(currenttheme);
                    document.getElementById((currentrow-3)+","+(currentcolumn+1)).disabled=true;
                    document.getElementById((currentrow-3)+","+(currentcolumn+1)).classList.remove(currenttheme);
                }
            }
        }else{ // __|
            document.getElementById(currentrow+","+currentcolumn).disabled=false;
            document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
            document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
            document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
            if(currentcolumn===0){
                document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                if(currentrow>1){
                    document.getElementById((currentrow-2)+","+(currentcolumn+2)).disabled=true;
                    document.getElementById((currentrow-2)+","+(currentcolumn+2)).classList.remove(currenttheme);
                }
            }else{
                document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=true;
                document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.remove(currenttheme);
                if(currentrow>1){
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=true;
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.remove(currenttheme);
                }
            }
        }
    }else if(currentobject===2){// |+|
        if(currentrow<=1){
            document.getElementById(currentrow+","+currentcolumn).disabled=false;
            document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
            document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
            document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
            }else{
            document.getElementById(currentrow+","+currentcolumn).disabled=false;
            document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
            document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
            document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
            document.getElementById((currentrow-2)+","+currentcolumn).disabled=true; removetheme((currentrow-2),currentcolumn);
            document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=true; removetheme((currentrow-2),(currentcolumn+1));
        }
    }else if(currentobject===1){// ----
      if(currentangle===1){
        if(currentcolumn===0){
        document.getElementById(currentrow+","+currentcolumn).disabled=false;
        document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
        document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
        document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
        document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
        document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
        document.getElementById(currentrow+","+(currentcolumn+3)).disabled=false;
        document.getElementById(currentrow+","+(currentcolumn+3)).classList.add(currenttheme);
        
        document.getElementById((currentrow-1)+","+currentcolumn).disabled=true; removetheme((currentrow-1),currentcolumn);
        document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;removetheme((currentrow-1),(currentcolumn+1));
        document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=true;removetheme((currentrow-1),(currentcolumn+2));
        document.getElementById((currentrow-1)+","+(currentcolumn+3)).disabled=true;removetheme((currentrow-1),(currentcolumn+3));
        }else if(currentcolumn===9){
            document.getElementById(currentrow+","+currentcolumn).disabled=false;
            document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
            document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
            document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
            document.getElementById(currentrow+","+(currentcolumn-2)).disabled=false;
            document.getElementById(currentrow+","+(currentcolumn-2)).classList.add(currenttheme);
            document.getElementById(currentrow+","+(currentcolumn-3)).disabled=false;
            document.getElementById(currentrow+","+(currentcolumn-3)).classList.add(currenttheme);
            
            document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
            document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
            document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=true;
            document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.remove(currenttheme);
            document.getElementById((currentrow-1)+","+(currentcolumn-2)).disabled=true;
            document.getElementById((currentrow-1)+","+(currentcolumn-2)).classList.remove(currenttheme);
            document.getElementById((currentrow-1)+","+(currentcolumn-3)).disabled=true;
            document.getElementById((currentrow-1)+","+(currentcolumn-3)).classList.remove(currenttheme);
        }else if(currentcolumn===8){
            document.getElementById(currentrow+","+currentcolumn).disabled=false;
            document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
            document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
            document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
            document.getElementById(currentrow+","+(currentcolumn-2)).disabled=false;
            document.getElementById(currentrow+","+(currentcolumn-2)).classList.add(currenttheme);
            document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
            document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
            
            document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
            document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
            document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=true;
            document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.remove(currenttheme);
            document.getElementById((currentrow-1)+","+(currentcolumn-2)).disabled=true;
            document.getElementById((currentrow-1)+","+(currentcolumn-2)).classList.remove(currenttheme);
            document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
            document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
        }else{
            document.getElementById(currentrow+","+currentcolumn).disabled=false;
            document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
            document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
            document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
            document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
            document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
            document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
            document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
            
            document.getElementById((currentrow-1)+","+currentcolumn).disabled=true; removetheme((currentrow-1),currentcolumn);
            document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;removetheme((currentrow-1),(currentcolumn+1));
            document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=true;removetheme((currentrow-1),(currentcolumn+2));
            document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=true;removetheme((currentrow-1),(currentcolumn-1));
        }

      }else{
        if(currentrow<=3){
            document.getElementById(currentrow+","+currentcolumn).disabled=false;
            document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
        }else{
            document.getElementById(currentrow+","+currentcolumn).disabled=false;
            document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
            
            document.getElementById((currentrow-4)+","+currentcolumn).disabled=true;
            document.getElementById((currentrow-4)+","+currentcolumn).classList.remove(currenttheme);
        }
      }
    }else{// -|
        if(currentangle===1){
            if(currentrow===1){
            document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
            document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
            document.getElementById((currentrow-1)+","+currentcolumn).disabled=false;
            document.getElementById((currentrow-1)+","+currentcolumn).classList.add(currenttheme);
            }else{
            document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
            document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
            document.getElementById((currentrow-1)+","+currentcolumn).disabled=false;
            document.getElementById((currentrow-1)+","+currentcolumn).classList.add(currenttheme);

            document.getElementById((currentrow-2)+","+currentcolumn).disabled=true;
            document.getElementById((currentrow-2)+","+currentcolumn).classList.remove(currenttheme);
                if(currentrow>2){
                    document.getElementById((currentrow-3)+","+(currentcolumn+1)).disabled=true;
                    document.getElementById((currentrow-3)+","+(currentcolumn+1)).classList.remove(currenttheme);
                }
            }
        }else if(currentangle===2){ //  _|_
            document.getElementById(currentrow+","+currentcolumn).disabled=false;
            document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
            document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
            document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
            if(currentcolumn===0){
                document.getElementById(currentrow+","+(currentcolumn+2)).disabled=false;
                document.getElementById(currentrow+","+(currentcolumn+2)).classList.add(currenttheme);
                document.getElementById((currentrow-1)+","+currentcolumn).disabled=true;
                document.getElementById((currentrow-1)+","+currentcolumn).classList.remove(currenttheme);
                document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=true;
                document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.remove(currenttheme);
                if(currentrow>1){
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=true;
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.remove(currenttheme);
                }
            }else{
                document.getElementById(currentrow+","+(currentcolumn-1)).disabled=false;
                document.getElementById(currentrow+","+(currentcolumn-1)).classList.add(currenttheme);
                document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=true;
                document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.remove(currenttheme);
                document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=true;
                document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.remove(currenttheme);
                if(currentrow>1){
                    document.getElementById((currentrow-2)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-2)+","+currentcolumn).classList.remove(currenttheme);
                }
            }
        }else if(currentangle===3){ // |-
            if(currentrow===1){
            document.getElementById(currentrow+","+currentcolumn).disabled=false;
            document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
            document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=false;
            document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
            }else{
            document.getElementById(currentrow+","+currentcolumn).disabled=false;
            document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
            document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=false;
            document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
            document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=true; removetheme((currentrow-2),(currentcolumn+1));
            if(currentrow>2){
                document.getElementById((currentrow-3)+","+currentcolumn).disabled=true; removetheme((currentrow-3),currentcolumn);}
            }
        }else{ // T
            if(currentcolumn===0){
                document.getElementById(currentrow+","+(currentcolumn+1)).disabled=false;
                document.getElementById(currentrow+","+(currentcolumn+1)).classList.add(currenttheme);
                document.getElementById((currentrow-1)+","+(currentcolumn+2)).disabled=false;
                document.getElementById((currentrow-1)+","+(currentcolumn+2)).classList.add(currenttheme);
                document.getElementById((currentrow-1)+","+currentcolumn).disabled=false;
                document.getElementById((currentrow-1)+","+currentcolumn).classList.add(currenttheme);
                if(currentrow>1){
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=true;
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById((currentrow-2)+","+(currentcolumn+2)).disabled=true;
                    document.getElementById((currentrow-2)+","+(currentcolumn+2)).classList.remove(currenttheme);
                    document.getElementById((currentrow-2)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-2)+","+currentcolumn).classList.remove(currenttheme);
                }
            }else{
                document.getElementById(currentrow+","+currentcolumn).disabled=false;
                document.getElementById(currentrow+","+currentcolumn).classList.add(currenttheme);
                document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled=false;
                document.getElementById((currentrow-1)+","+(currentcolumn+1)).classList.add(currenttheme);
                document.getElementById((currentrow-1)+","+(currentcolumn-1)).disabled=false;
                document.getElementById((currentrow-1)+","+(currentcolumn-1)).classList.add(currenttheme);
                if(currentrow>1){
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).disabled=true;
                    document.getElementById((currentrow-2)+","+(currentcolumn+1)).classList.remove(currenttheme);
                    document.getElementById((currentrow-2)+","+(currentcolumn-1)).disabled=true;
                    document.getElementById((currentrow-2)+","+(currentcolumn-1)).classList.remove(currenttheme);
                    document.getElementById((currentrow-2)+","+currentcolumn).disabled=true;
                    document.getElementById((currentrow-2)+","+currentcolumn).classList.remove(currenttheme);
                }
            }
        }
    }
}

function storetheme(){
    if(currentobject===7){// |-
        if(currentangle===1){
            if(currentrow===0){
                themegrid[currentrow][currentcolumn]=currenttheme;
            }else if(currentrow===1){
                themegrid[currentrow][currentcolumn]=currenttheme;
                themegrid[currentrow-1][currentcolumn+1]=currenttheme;
                themegrid[currentrow-1][currentcolumn]=currenttheme;
            }else{
                themegrid[currentrow][currentcolumn]=currenttheme;
                themegrid[currentrow-1][currentcolumn+1]=currenttheme;
                themegrid[currentrow-1][currentcolumn]=currenttheme;
                themegrid[currentrow-2][currentcolumn]=currenttheme;
            }
        }else if(currentangle===2){ // T
            if(currentrow===0){
                if(currentcolumn===0){
                    themegrid[currentrow][currentcolumn+1]=currenttheme;
                }else{
                    themegrid[currentrow][currentcolumn]=currenttheme;
                }
            }else{
                if(currentcolumn===0){
                    themegrid[currentrow][currentcolumn+1]=currenttheme;
                    themegrid[currentrow-1][currentcolumn+1]=currenttheme;
                    themegrid[currentrow-1][currentcolumn]=currenttheme;
                    themegrid[currentrow-1][currentcolumn+2]=currenttheme;
                }else{
                    themegrid[currentrow][currentcolumn]=currenttheme;
                    themegrid[currentrow-1][currentcolumn+1]=currenttheme;
                    themegrid[currentrow-1][currentcolumn]=currenttheme;
                    themegrid[currentrow-1][currentcolumn-1]=currenttheme;
                }
            }
        }else if(currentangle===3){ // -|
            if(currentrow===0){
                themegrid[currentrow][currentcolumn+1]=currenttheme;
            }else if(currentrow===1){
                themegrid[currentrow][currentcolumn+1]=currenttheme;
                themegrid[currentrow-1][currentcolumn+1]=currenttheme;
                themegrid[currentrow-1][currentcolumn]=currenttheme;
            }else{
                themegrid[currentrow][currentcolumn+1]=currenttheme;
                themegrid[currentrow-1][currentcolumn+1]=currenttheme;
                themegrid[currentrow-1][currentcolumn]=currenttheme;
                themegrid[currentrow-2][currentcolumn+1]=currenttheme;
            }
        }else{ // _|_
            if(currentrow===0){
                if(currentcolumn===0){
                    themegrid[currentrow][currentcolumn]=currenttheme;
                    themegrid[currentrow][currentcolumn+1]=currenttheme;
                    themegrid[currentrow][currentcolumn+2]=currenttheme;
                }else{
                    themegrid[currentrow][currentcolumn]=currenttheme;
                    themegrid[currentrow][currentcolumn+1]=currenttheme;
                    themegrid[currentrow][currentcolumn-1]=currenttheme;
                }
            }else{
                if(currentcolumn===0){
                    themegrid[currentrow][currentcolumn]=currenttheme;
                    themegrid[currentrow][currentcolumn+1]=currenttheme;
                    themegrid[currentrow][currentcolumn+2]=currenttheme;
                    themegrid[currentrow-1][currentcolumn+1]=currenttheme;
                }else{
                    themegrid[currentrow][currentcolumn]=currenttheme;
                    themegrid[currentrow][currentcolumn+1]=currenttheme;
                    themegrid[currentrow][currentcolumn-1]=currenttheme;
                    themegrid[currentrow-1][currentcolumn]=currenttheme;
                }
            }
        }
    }else if(currentobject===6){// |\
        if(currentangle===1){
            if(currentrow===0){
                themegrid[currentrow][currentcolumn]=currenttheme;
            }else if(currentrow===1){
                themegrid[currentrow][currentcolumn]=currenttheme;
                themegrid[currentrow-1][currentcolumn+1]=currenttheme;
                themegrid[currentrow-1][currentcolumn]=currenttheme;
            }else{
                themegrid[currentrow][currentcolumn]=currenttheme;
                themegrid[currentrow-1][currentcolumn+1]=currenttheme;
                themegrid[currentrow-1][currentcolumn]=currenttheme;
                themegrid[currentrow-2][currentcolumn+1]=currenttheme;
            }
        }else{ // -_
            if(currentrow===0){
                if(currentcolumn===0){
                    themegrid[currentrow][currentcolumn+1]=currenttheme;
                    themegrid[currentrow][currentcolumn+2]=currenttheme;
                }else{
                    themegrid[currentrow-1][currentcolumn]=currenttheme;
                    themegrid[currentrow-1][currentcolumn+1]=currenttheme;
                    themegrid[currentrow][currentcolumn+1]=currenttheme;
                    themegrid[currentrow][currentcolumn+2]=currenttheme;
                }
            }else{
                if(currentcolumn===0){
                    themegrid[currentrow][currentcolumn]=currenttheme;
                    themegrid[currentrow][currentcolumn+1]=currenttheme;
                }else{
                    themegrid[currentrow][currentcolumn]=currenttheme;
                    themegrid[currentrow][currentcolumn+1]=currenttheme;
                    themegrid[currentrow-1][currentcolumn-1]=currenttheme;
                    themegrid[currentrow-1][currentcolumn]=currenttheme;
                }
            }
        }
    }else if(currentobject===5){// /|
        if(currentangle===1){
            if(currentrow===0){
                themegrid[currentrow][currentcolumn+1]=currenttheme;
            }else if(currentrow===1){
                themegrid[currentrow][currentcolumn+1]=currenttheme;
                themegrid[currentrow-1][currentcolumn+1]=currenttheme;
                themegrid[currentrow-1][currentcolumn]=currenttheme;
            }else{
                themegrid[currentrow][currentcolumn+1]=currenttheme;
                themegrid[currentrow-1][currentcolumn+1]=currenttheme;
                themegrid[currentrow-1][currentcolumn]=currenttheme;
                themegrid[currentrow-2][currentcolumn]=currenttheme;
            }
        }else{ // _-
            if(currentrow===0){
                if(currentcolumn===0){
                    themegrid[currentrow][currentcolumn+1]=currenttheme;
                    themegrid[currentrow][currentcolumn]=currenttheme;
                }else{
                    themegrid[currentrow-1][currentcolumn+1]=currenttheme;
                    themegrid[currentrow-1][currentcolumn+2]=currenttheme;
                    themegrid[currentrow][currentcolumn]=currenttheme;
                    themegrid[currentrow][currentcolumn+1]=currenttheme;
                }
            }else{
                if(currentcolumn===0){
                    themegrid[currentrow][currentcolumn]=currenttheme;
                    themegrid[currentrow][currentcolumn-1]=currenttheme;
                }else{
                    themegrid[currentrow][currentcolumn]=currenttheme;
                    themegrid[currentrow][currentcolumn-1]=currenttheme;
                    themegrid[currentrow-1][currentcolumn+1]=currenttheme;
                    themegrid[currentrow-1][currentcolumn]=currenttheme;
                }
            }
        }
        
    }else if(currentobject===4){// _|
        if(currentangle===1){
            if(currentrow===0){
                themegrid[currentrow][currentcolumn]=currenttheme;
                themegrid[currentrow][currentcolumn+1]=currenttheme;
            }else if(currentrow===1){
                themegrid[currentrow][currentcolumn]=currenttheme;
                themegrid[currentrow][currentcolumn+1]=currenttheme;
                themegrid[currentrow-1][currentcolumn+1]=currenttheme;
            }else{
                themegrid[currentrow][currentcolumn]=currenttheme;
                themegrid[currentrow][currentcolumn+1]=currenttheme;
                themegrid[currentrow-1][currentcolumn+1]=currenttheme;
                themegrid[currentrow-2][currentcolumn+1]=currenttheme;
            }
        }else if(currentangle===2){ // |__
            if(currentrow===0){
                if(currentcolumn===0){
                    themegrid[currentrow][currentcolumn]=currenttheme;
                    themegrid[currentrow][currentcolumn+1]=currenttheme;
                    themegrid[currentrow][currentcolumn+2]=currenttheme;
                }else{
                    themegrid[currentrow][currentcolumn]=currenttheme;
                    themegrid[currentrow][currentcolumn+1]=currenttheme;
                    themegrid[currentrow][currentcolumn-1]=currenttheme;
                }
            }else{
                if(currentcolumn===0){
                    themegrid[currentrow][currentcolumn]=currenttheme;
                    themegrid[currentrow][currentcolumn+1]=currenttheme;
                    themegrid[currentrow][currentcolumn+2]=currenttheme;
                    themegrid[currentrow-1][currentcolumn]=currenttheme;
                }else{
                    themegrid[currentrow][currentcolumn]=currenttheme;
                    themegrid[currentrow][currentcolumn+1]=currenttheme;
                    themegrid[currentrow][currentcolumn-1]=currenttheme;
                    themegrid[currentrow-1][currentcolumn-1]=currenttheme;
                }
            }
        }else if(currentangle===3){ // |¯
            if(currentrow===0){
                themegrid[currentrow][currentcolumn]=currenttheme;
            }else if(currentrow===1){
                themegrid[currentrow][currentcolumn]=currenttheme;
                themegrid[currentrow-1][currentcolumn]=currenttheme;
            }else{
                themegrid[currentrow][currentcolumn]=currenttheme;
                themegrid[currentrow-1][currentcolumn]=currenttheme;
                themegrid[currentrow-2][currentcolumn]=currenttheme;
                themegrid[currentrow-2][currentcolumn+1]=currenttheme;
            }
        }else{ // ¯¯¯|
            if(currentrow===0){
                if(currentcolumn===0){
                    themegrid[currentrow][currentcolumn+2]=currenttheme;
                }else{
                    themegrid[currentrow][currentcolumn+1]=currenttheme;
                }
            }else{
                if(currentcolumn===0){
                    themegrid[currentrow-1][currentcolumn]=currenttheme;
                    themegrid[currentrow-1][currentcolumn+1]=currenttheme;
                    themegrid[currentrow-1][currentcolumn+2]=currenttheme;
                    themegrid[currentrow][currentcolumn+2]=currenttheme;
                }else{
                    themegrid[currentrow-1][currentcolumn]=currenttheme;
                    themegrid[currentrow-1][currentcolumn+1]=currenttheme;
                    themegrid[currentrow-1][currentcolumn-1]=currenttheme;
                    themegrid[currentrow][currentcolumn+1]=currenttheme;
                }
            }
        }
        
    }else if(currentobject===3){// |_
        if(currentangle===1){
            if(currentrow===0){
                themegrid[currentrow][currentcolumn]=currenttheme;
                themegrid[currentrow][currentcolumn+1]=currenttheme;
            }else if(currentrow===1){
                themegrid[currentrow][currentcolumn]=currenttheme;
                themegrid[currentrow][currentcolumn+1]=currenttheme;
                themegrid[currentrow-1][currentcolumn]=currenttheme;
            }else{
                themegrid[currentrow][currentcolumn]=currenttheme;
                themegrid[currentrow][currentcolumn+1]=currenttheme;
                themegrid[currentrow-1][currentcolumn]=currenttheme;
                themegrid[currentrow-2][currentcolumn]=currenttheme;
            }
        }else if(currentangle===2){ // |¯¯¯
            if(currentrow===0){
                if(currentcolumn===0){
                    themegrid[currentrow][currentcolumn]=currenttheme;
                }else{
                    themegrid[currentrow][currentcolumn-1]=currenttheme;
                }
            }else{
                if(currentcolumn===0){
                    themegrid[currentrow-1][currentcolumn]=currenttheme;
                    themegrid[currentrow-1][currentcolumn+1]=currenttheme;
                    themegrid[currentrow-1][currentcolumn+2]=currenttheme;
                    themegrid[currentrow][currentcolumn]=currenttheme;
                }else{
                    themegrid[currentrow-1][currentcolumn]=currenttheme;
                    themegrid[currentrow-1][currentcolumn+1]=currenttheme;
                    themegrid[currentrow-1][currentcolumn-1]=currenttheme;
                    themegrid[currentrow][currentcolumn-1]=currenttheme;
                }
            }
        }else if(currentangle===3){ // ¯|
            if(currentrow===0){
                themegrid[currentrow][currentcolumn+1]=currenttheme;
            }else if(currentrow===1){
                themegrid[currentrow][currentcolumn+1]=currenttheme;
                themegrid[currentrow-1][currentcolumn+1]=currenttheme;
            }else{
                themegrid[currentrow][currentcolumn+1]=currenttheme;
                themegrid[currentrow-1][currentcolumn+1]=currenttheme;
                themegrid[currentrow-2][currentcolumn]=currenttheme;
                themegrid[currentrow-2][currentcolumn+1]=currenttheme;
            }
        }else{ // __|
            if(currentrow===0){
                if(currentcolumn===0){
                    themegrid[currentrow][currentcolumn]=currenttheme;
                    themegrid[currentrow][currentcolumn+1]=currenttheme;
                    themegrid[currentrow][currentcolumn+2]=currenttheme;
                }else{
                    themegrid[currentrow][currentcolumn]=currenttheme;
                    themegrid[currentrow][currentcolumn+1]=currenttheme;
                    themegrid[currentrow][currentcolumn-1]=currenttheme;
                }
            }else{
                if(currentcolumn===0){
                    themegrid[currentrow][currentcolumn]=currenttheme;
                    themegrid[currentrow][currentcolumn+1]=currenttheme;
                    themegrid[currentrow][currentcolumn+2]=currenttheme;
                    themegrid[currentrow-1][currentcolumn+2]=currenttheme;
                }else{
                    themegrid[currentrow][currentcolumn]=currenttheme;
                    themegrid[currentrow][currentcolumn+1]=currenttheme;
                    themegrid[currentrow][currentcolumn-1]=currenttheme;
                    themegrid[currentrow-1][currentcolumn+1]=currenttheme;
                }
            }
        }
        
    }else if(currentobject===2){// |+|
        if(currentrow===0){
            themegrid[currentrow][currentcolumn]=currenttheme;
            themegrid[currentrow][currentcolumn+1]=currenttheme;
        }else{
            themegrid[currentrow][currentcolumn]=currenttheme;
            themegrid[currentrow-1][currentcolumn+1]=currenttheme;
            themegrid[currentrow-1][currentcolumn]=currenttheme;
            themegrid[currentrow][currentcolumn+1]=currenttheme;
        }
    }else if(currentobject===1){//----
      if(currentangle===1){
        if(currentcolumn===0){
            themegrid[currentrow][currentcolumn]=currenttheme;
            themegrid[currentrow][currentcolumn+1]=currenttheme;
            themegrid[currentrow][currentcolumn+2]=currenttheme;
            themegrid[currentrow][currentcolumn+3]=currenttheme;
        }else if(currentcolumn===8){
            themegrid[currentrow][currentcolumn]=currenttheme;
            themegrid[currentrow][currentcolumn+1]=currenttheme;
            themegrid[currentrow][currentcolumn-1]=currenttheme;
            themegrid[currentrow][currentcolumn-2]=currenttheme;
        }else if(currentcolumn===9){
            themegrid[currentrow][currentcolumn]=currenttheme;
            themegrid[currentrow][currentcolumn-3]=currenttheme;
            themegrid[currentrow][currentcolumn-1]=currenttheme;
            themegrid[currentrow][currentcolumn-2]=currenttheme;
        }else{
            themegrid[currentrow][currentcolumn]=currenttheme;
            themegrid[currentrow][currentcolumn+1]=currenttheme;
            themegrid[currentrow][currentcolumn+2]=currenttheme;
            themegrid[currentrow][currentcolumn-1]=currenttheme;
        }
      }else{
        if(currentrow===0){
            themegrid[currentrow][currentcolumn]=currenttheme;
        }else if(currentrow===1){
            themegrid[currentrow][currentcolumn]=currenttheme;
            themegrid[currentrow-1][currentcolumn]=currenttheme;
        }else if(currentrow===2){
            themegrid[currentrow][currentcolumn]=currenttheme;
            themegrid[currentrow-1][currentcolumn]=currenttheme;
            themegrid[currentrow-2][currentcolumn]=currenttheme;
        }else{
            themegrid[currentrow][currentcolumn]=currenttheme;
            themegrid[currentrow-1][currentcolumn]=currenttheme;
            themegrid[currentrow-2][currentcolumn]=currenttheme;
            themegrid[currentrow-3][currentcolumn]=currenttheme;
        }
      }
    }else{// -|
        if(currentangle===1){
            if(currentrow===0){
                themegrid[currentrow][currentcolumn+1]=currenttheme;
            }else if(currentrow===1){
                themegrid[currentrow][currentcolumn+1]=currenttheme;
                themegrid[currentrow-1][currentcolumn+1]=currenttheme;
                themegrid[currentrow-1][currentcolumn]=currenttheme;
            }else{
                themegrid[currentrow][currentcolumn+1]=currenttheme;
                themegrid[currentrow-1][currentcolumn+1]=currenttheme;
                themegrid[currentrow-1][currentcolumn]=currenttheme;
                themegrid[currentrow-2][currentcolumn+1]=currenttheme;
            }
        }else if(currentangle===2){ //  _|_
            if(currentrow===0){
                if(currentcolumn===0){
                    themegrid[currentrow][currentcolumn]=currenttheme;
                    themegrid[currentrow][currentcolumn+1]=currenttheme;
                    themegrid[currentrow][currentcolumn+2]=currenttheme;
                }else{
                    themegrid[currentrow][currentcolumn]=currenttheme;
                    themegrid[currentrow][currentcolumn+1]=currenttheme;
                    themegrid[currentrow][currentcolumn-1]=currenttheme;
                }
            }else{
                if(currentcolumn===0){
                    themegrid[currentrow][currentcolumn]=currenttheme;
                    themegrid[currentrow][currentcolumn+1]=currenttheme;
                    themegrid[currentrow][currentcolumn+2]=currenttheme;
                    themegrid[currentrow-1][currentcolumn+1]=currenttheme;
                }else{
                    themegrid[currentrow][currentcolumn]=currenttheme;
                    themegrid[currentrow][currentcolumn+1]=currenttheme;
                    themegrid[currentrow][currentcolumn-1]=currenttheme;
                    themegrid[currentrow-1][currentcolumn]=currenttheme;
                }
            }
        
        }else if(currentangle===3){ // |-
            if(currentrow===0){
                themegrid[currentrow][currentcolumn]=currenttheme;
            }else if(currentrow===1){
                themegrid[currentrow][currentcolumn]=currenttheme;
                themegrid[currentrow-1][currentcolumn+1]=currenttheme;
                themegrid[currentrow-1][currentcolumn]=currenttheme;
            }else{
                themegrid[currentrow][currentcolumn]=currenttheme;
                themegrid[currentrow-1][currentcolumn+1]=currenttheme;
                themegrid[currentrow-1][currentcolumn]=currenttheme;
                themegrid[currentrow-2][currentcolumn]=currenttheme;
            }
        }else{ // T
            if(currentrow===0){
                if(currentcolumn===0){
                    themegrid[currentrow][currentcolumn+1]=currenttheme;
                }else{
                    themegrid[currentrow][currentcolumn]=currenttheme;
                }
            }else{
                if(currentcolumn===0){
                    themegrid[currentrow][currentcolumn+1]=currenttheme;
                    themegrid[currentrow-1][currentcolumn+1]=currenttheme;
                    themegrid[currentrow-1][currentcolumn]=currenttheme;
                    themegrid[currentrow-1][currentcolumn+2]=currenttheme;
                }else{
                    themegrid[currentrow][currentcolumn]=currenttheme;
                    themegrid[currentrow-1][currentcolumn+1]=currenttheme;
                    themegrid[currentrow-1][currentcolumn]=currenttheme;
                    themegrid[currentrow-1][currentcolumn-1]=currenttheme;
                }
            }
        }
    }
}

function isobjectcollide(){
    if(currentobject===7){// |-
        if(currentangle===1){
            if(!document.getElementById((currentrow+1)+","+currentcolumn).disabled || !document.getElementById(currentrow+","+(currentcolumn+1)).disabled) return true;
        }else if(currentangle===2){ // T
            if(currentcolumn===0){
                if(!document.getElementById((currentrow+1)+","+(currentcolumn+1)).disabled || !document.getElementById(currentrow+","+currentcolumn).disabled || !document.getElementById(currentrow+","+(currentcolumn+2)).disabled) return true;
            }else{
                if(!document.getElementById((currentrow+1)+","+currentcolumn).disabled || !document.getElementById(currentrow+","+(currentcolumn-1)).disabled || !document.getElementById(currentrow+","+(currentcolumn+1)).disabled) return true;
            }
        }else if(currentangle===3){ // -|
            if(!document.getElementById((currentrow+1)+","+(currentcolumn+1)).disabled || !document.getElementById(currentrow+","+currentcolumn).disabled) return true;
        }else{ // _|_
            if(currentcolumn===0){
                if(!document.getElementById((currentrow+1)+","+currentcolumn).disabled || !document.getElementById((currentrow+1)+","+(currentcolumn+1)).disabled || !document.getElementById((currentrow+1)+","+(currentcolumn+2)).disabled) return true;
            }else{
                if(!document.getElementById((currentrow+1)+","+currentcolumn).disabled || !document.getElementById((currentrow+1)+","+(currentcolumn-1)).disabled || !document.getElementById((currentrow+1)+","+(currentcolumn+1)).disabled) return true;
            }
        }
    }else if(currentobject===6){// |\
        if(currentangle===1){
            if(!document.getElementById((currentrow+1)+","+currentcolumn).disabled || !document.getElementById(currentrow+","+(currentcolumn+1)).disabled) return true;
        }else{ // -_
            if(currentcolumn===0){
                if(!document.getElementById(currentrow+","+currentcolumn).disabled || !document.getElementById((currentrow+1)+","+(currentcolumn+1)).disabled || !document.getElementById((currentrow+1)+","+(currentcolumn+2)).disabled) return true;
            }else {
                if(!document.getElementById(currentrow+","+(currentcolumn-1)).disabled || !document.getElementById((currentrow+1)+","+(currentcolumn+1)).disabled || !document.getElementById((currentrow+1)+","+currentcolumn).disabled) return true;
            }
        }
    }else if(currentobject===5){// /|
        if(currentangle===1){
            if(!document.getElementById((currentrow+1)+","+(currentcolumn+1)).disabled || !document.getElementById(currentrow+","+currentcolumn).disabled) return true;
        }else{ // _-
            if(currentcolumn===0){
                if(!document.getElementById(currentrow+","+(currentcolumn+2)).disabled || !document.getElementById((currentrow+1)+","+currentcolumn).disabled || !document.getElementById((currentrow+1)+","+(currentcolumn+1)).disabled) return true;
            }else {
                if(!document.getElementById(currentrow+","+(currentcolumn+1)).disabled || !document.getElementById((currentrow+1)+","+currentcolumn).disabled || !document.getElementById((currentrow+1)+","+(currentcolumn-1)).disabled) return true;
            }
        
        }
    }else if(currentobject===4){// _|
        if(currentangle===1){
            if(!document.getElementById((currentrow+1)+","+(currentcolumn+1)).disabled || !document.getElementById((currentrow+1)+","+currentcolumn).disabled) return true;
        }else if(currentangle===2){ // |__
            if(currentcolumn===0){
                if(!document.getElementById((currentrow+1)+","+currentcolumn).disabled || !document.getElementById((currentrow+1)+","+(currentcolumn+1)).disabled || !document.getElementById((currentrow+1)+","+(currentcolumn+2)).disabled) return true;
            }else{
                if(!document.getElementById((currentrow+1)+","+currentcolumn).disabled || !document.getElementById((currentrow+1)+","+(currentcolumn-1)).disabled || !document.getElementById((currentrow+1)+","+(currentcolumn+1)).disabled) return true;
            }
        }else if(currentangle===3){ // |¯
            if(currentrow===0){
                if(!document.getElementById((currentrow+1)+","+currentcolumn).disabled) return true;    
            }else{
                if(!document.getElementById((currentrow+1)+","+currentcolumn).disabled || !document.getElementById((currentrow-1)+","+(currentcolumn+1)).disabled) return true;
            }
        }else{ // ¯¯¯|
            if(currentcolumn===0){
                if(!document.getElementById((currentrow+1)+","+(currentcolumn+2)).disabled || !document.getElementById(currentrow+","+currentcolumn).disabled || !document.getElementById(currentrow+","+(currentcolumn+1)).disabled) return true;
            }else{
                if(!document.getElementById((currentrow+1)+","+(currentcolumn+1)).disabled || !document.getElementById(currentrow+","+currentcolumn).disabled || !document.getElementById(currentrow+","+(currentcolumn-1)).disabled) return true;
            }
        }
    }else if(currentobject===3){// |_
        if(currentangle===1){
            if(!document.getElementById((currentrow+1)+","+(currentcolumn+1)).disabled || !document.getElementById((currentrow+1)+","+currentcolumn).disabled) return true;
        }else if(currentangle===2){ // |¯¯¯
            if(currentcolumn===0){
                if(!document.getElementById((currentrow+1)+","+currentcolumn).disabled || !document.getElementById(currentrow+","+(currentcolumn+1)).disabled || !document.getElementById(currentrow+","+(currentcolumn+2)).disabled) return true;
            }else{
                if(!document.getElementById((currentrow+1)+","+(currentcolumn-1)).disabled || !document.getElementById(currentrow+","+currentcolumn).disabled || !document.getElementById(currentrow+","+(currentcolumn+1)).disabled) return true;
            }
        }else if(currentangle===3){ // ¯|
            if(currentrow===0){
                if(!document.getElementById((currentrow+1)+","+(currentcolumn+1)).disabled) return true;    
            }else{
                if(!document.getElementById((currentrow+1)+","+(currentcolumn+1)).disabled || !document.getElementById((currentrow-1)+","+currentcolumn).disabled) return true;    
            }
        }else{ // __|
            if(currentcolumn===0){
                if(!document.getElementById((currentrow+1)+","+currentcolumn).disabled || !document.getElementById((currentrow+1)+","+(currentcolumn+1)).disabled || !document.getElementById((currentrow+1)+","+(currentcolumn+2)).disabled) return true;
            }else{
                if(!document.getElementById((currentrow+1)+","+currentcolumn).disabled || !document.getElementById((currentrow+1)+","+(currentcolumn-1)).disabled || !document.getElementById((currentrow+1)+","+(currentcolumn+1)).disabled) return true;
            }
        }
        
    }else if(currentobject===2){// |+|
        if(!document.getElementById((currentrow+1)+","+(currentcolumn+1)).disabled || !document.getElementById((currentrow+1)+","+currentcolumn).disabled) return true;
    }else if(currentobject===1){//----
      if(currentangle===1){
        if(currentcolumn===0){
            if(!document.getElementById((currentrow+1)+","+(currentcolumn+3)).disabled ||!document.getElementById((currentrow+1)+","+(currentcolumn+2)).disabled ||!document.getElementById((currentrow+1)+","+(currentcolumn+1)).disabled || !document.getElementById((currentrow+1)+","+currentcolumn).disabled) return true;
        }else if(currentcolumn===9){
            if(!document.getElementById((currentrow+1)+","+(currentcolumn-3)).disabled ||!document.getElementById((currentrow+1)+","+(currentcolumn-2)).disabled ||!document.getElementById((currentrow+1)+","+(currentcolumn-1)).disabled || !document.getElementById((currentrow+1)+","+currentcolumn).disabled) return true;
        }else if(currentcolumn===8){
            if(!document.getElementById((currentrow+1)+","+(currentcolumn-1)).disabled ||!document.getElementById((currentrow+1)+","+(currentcolumn-2)).disabled ||!document.getElementById((currentrow+1)+","+(currentcolumn+1)).disabled || !document.getElementById((currentrow+1)+","+currentcolumn).disabled) return true;
        }else{
            if(!document.getElementById((currentrow+1)+","+(currentcolumn-1)).disabled ||!document.getElementById((currentrow+1)+","+(currentcolumn+2)).disabled ||!document.getElementById((currentrow+1)+","+(currentcolumn+1)).disabled || !document.getElementById((currentrow+1)+","+currentcolumn).disabled) return true;
        }
      }else{
        if(!document.getElementById((currentrow+1)+","+currentcolumn).disabled) return true;
      }
    }else{// -|
        if(currentangle===1){
            if(!document.getElementById((currentrow+1)+","+(currentcolumn+1)).disabled ||!document.getElementById(currentrow+","+currentcolumn).disabled) return true;
        }else if(currentangle===2){ //  _|_
            if(currentcolumn===0){
                if(!document.getElementById((currentrow+1)+","+currentcolumn).disabled || !document.getElementById((currentrow+1)+","+(currentcolumn+1)).disabled || !document.getElementById((currentrow+1)+","+(currentcolumn+2)).disabled) return true;
            }else{
                if(!document.getElementById((currentrow+1)+","+currentcolumn).disabled || !document.getElementById((currentrow+1)+","+(currentcolumn-1)).disabled || !document.getElementById((currentrow+1)+","+(currentcolumn+1)).disabled) return true;
            }
        }else if(currentangle===3){ // |-
            if(!document.getElementById((currentrow+1)+","+currentcolumn).disabled || !document.getElementById(currentrow+","+(currentcolumn+1)).disabled) return true;
        }else{ // T
            if(currentcolumn===0){
                if(!document.getElementById((currentrow+1)+","+(currentcolumn+1)).disabled || !document.getElementById(currentrow+","+currentcolumn).disabled || !document.getElementById(currentrow+","+(currentcolumn+2)).disabled) return true;
            }else{
                if(!document.getElementById((currentrow+1)+","+currentcolumn).disabled || !document.getElementById(currentrow+","+(currentcolumn-1)).disabled || !document.getElementById(currentrow+","+(currentcolumn+1)).disabled) return true;
            }
        }
    }
    //return true;
}
function reset(){
    if(!isStarted){
        gamespeed=700; timercount=0; score=0;
        document.getElementById("score").innerText="0";
        currentkey="";keycount=10;isobjectmoving=false;
        clearGrid();
        hidenextobject(nextobject);
        nextobject=Math.ceil(Math.random()*8);
        hidenextobject(currentobject);
        shownextobject(nextobject);
        currentangle=1;
        //createobject();isStarted=true;
        timerid=setInterval(timer,10); isStarted=true;
        document.getElementById("reset").innerText="Pause";
        document.getElementById("message").innerText="Pause";
        document.getElementById("message").style.display="none";
    }else{
        if(document.getElementById("reset").innerText==="Pause"){
            document.getElementById("reset").innerText="Resume";
            document.getElementById("message").style.display="";
            if(timerid>0){clearInterval(timerid); timerid=0;}
        }else{
            document.getElementById("reset").innerText="Pause";
            document.getElementById("message").style.display="none";
            timerid=setInterval(timer,10);
            //createobject();
        }
    }
    document.getElementById("reset").blur();
}
function validategridforscore(){
    var isrowcomplete=false; rowcompletestart=-1,rowcompletedlast;
    for(var a=19;a>=0;a--){
        if(!isrowcomplete){ isrowcomplete=true; }else{ rowcompletestart=(a+1); break; }
        for(var b=0;b<10;b++){ if(document.getElementById(a+","+b).disabled){ isrowcomplete=false; break; } }
    }
    if(rowcompletestart>-1){
        isrowcomplete=true;
        rowcompletedlast=0;
        if(rowcompletestart>0)
        for(var a=(rowcompletestart-1);a>=0;a--){
            if(!isrowcomplete)break;
                for(var b=0;b<10;b++){ if(document.getElementById(a+","+b).disabled){rowcompletedlast=(a+1); isrowcomplete=false; break; } }
        }
        console.log(rowcompletestart+":"+rowcompletedlast)
        isrowanimatecomplete=false; animatecount=4;
        setTimeout(() => {
            animaterow();
        }, 100);
    }else timerid=setInterval(timer,10);  
}

function gridrefresh(){
    rowcompletedlast--;
    if(rowcompletedlast>=0){
        for(var a=rowcompletedlast;a>=0;a--){
            for(var b=0;b<10;b++){
                document.getElementById(rowcompletestart+","+b).disabled=document.getElementById(a+","+b).disabled;
                if(document.getElementById(a+","+b).disabled){
                    removetheme(rowcompletestart,b);
                    themegrid[rowcompletestart][b]="";
                }else{
                    document.getElementById(rowcompletestart+","+b).classList.add(themegrid[a][b]); themegrid[rowcompletestart][b]=themegrid[a][b];
                }
                document.getElementById(a+","+b).disabled=true; removetheme(a,b);
            }
            rowcompletestart--;
        }
    }
    for(var a=rowcompletestart;a>=0;a--){
        for(var b=0;b<10;b++){
            document.getElementById(a+","+b).disabled=true; removetheme(a,b);
            themegrid[a][b]="";
        }
    }
}

function extracttheme(w,h){
    document.getElementById(w+","+h).classList.forEach((theme,id)=>{
        if(theme!="btnbox"){
            if(theme==="blue") return "blue";
            else if(theme==="red") return "red";
            else if(theme==="green") return "green";
            else if(theme==="purp") return "purp";
            else if(theme==="white") return "white";
            else if(theme==="greenlight") return "greenlight";
            else if(theme==="black") return "black";
        }
    });
}

function animaterow(){
    if(animatecount>=0){
        for(var a=rowcompletestart;a>=rowcompletedlast;a--){
                removetheme(a,animatecount);
                if(animatecount===4){document.getElementById(a+","+(animatecount+1)).disabled=true;removetheme(a,(animatecount+1));themegrid[a][animatecount+1]="";} 
                else if(animatecount===3){document.getElementById(a+","+(animatecount+3)).disabled=true; removetheme(a,(animatecount+3));themegrid[a][animatecount+3]="";}
                else if(animatecount===2){document.getElementById(a+","+(animatecount+5)).disabled=true;removetheme(a,(animatecount+5));themegrid[a][animatecount+5]="";}
                else if(animatecount===1){document.getElementById(a+","+(animatecount+7)).disabled=true;removetheme(a,(animatecount+7));themegrid[a][animatecount+7]="";}
                else {document.getElementById(a+","+(animatecount+9)).disabled=true;removetheme(a,(animatecount+9));themegrid[a][animatecount+9]="";}
                document.getElementById(a+","+animatecount).disabled=true;
                themegrid[a][animatecount]="";
        }
        score+=animatecount*(rowcompletestart-rowcompletedlast+1);
        document.getElementById("score").innerText=score;
        animatecount--;
        setTimeout(() => {
            animaterow();
        }, 100);
    }else{
        gridrefresh();
        gamespeed=700-(Math.floor(score/100)*10);
        if(gamespeed<100) gamespeed=100;
        timerid=setInterval(timer,10);    
    }
}

function gameover(){
    isStarted=false;
    validatehighscore(score,7);
    document.getElementById("message").innerText="Game Over!";
    document.getElementById("reset").innerText="Start";
    document.getElementById("message").style.display="";
    if(timerid>0){clearInterval(timerid); timerid=0;}
}

function gettheme(id){
 if(id===1) return "blue";
 else if(id===2) return "red";
 else if(id===3) return "green";
 else if(id===4) return "purp";
 else if(id===5) return "white";
 else if(id===6) return "greenlight";
 else if(id===7) return "black";
}
