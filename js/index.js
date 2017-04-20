 /*****倒计时******************/
 function GetRTime(){
    var EndTime= new Date('2017/04/21 00:00:00');
    var NowTime = new Date();
    var t =EndTime.getTime() - NowTime.getTime();
    var d=0;
    var h=0;
    var m=0;
    var s=0;
    if(t>=0){
      d=Math.floor(t/1000/60/60/24);
      h=Math.floor(t/1000/60/60%24);
      m=Math.floor(t/1000/60%60);
      s=Math.floor(t/1000%60);
    }
     document.getElementById("r_h").innerHTML=h;
     document.getElementById("r_m").innerHTML=m;
     document.getElementById("r_s").innerHTML=s;
}
setInterval(GetRTime,1000);

/********图片轮播**************/
function getStyle(obj,name){
         if(obj.currentStyle){
             return obj.currentStyle[name];    
         } else{
             return getComputedStyle(obj,false)[name];
         }
     }
 
 function startMove(obj, json, fnEnd) {
     clearInterval(obj.timer);
     obj.timer = setInterval(function() {
         var bStop = true;
         for (var attr in json) {
             var cur = 0;
             if (attr == "opacity") {
                 cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
             } else {
                 cur = parseInt(getStyle(obj, attr))
             }
             var speed = (json[attr] - cur) / 10;
             speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
             if (cur !== json[attr]) {
                 bStop = false;
             };
             if (attr == "opacity") {
                 obj.style.opacity = (speed + cur) / 100;
                 obj.style.filter = 'alpha(opacity:' + (speed + cur) + ')';
             } else {
                 obj.style[attr] = cur + speed + 'px';
             }
         }
         if (bStop) {
             clearInterval(obj.timer);
             if (fnEnd) fnEnd();
         }
      }, 30)
}
 function play() {
         for (var j = 0; j < aLi.length; j++) {
             aLi[j].className = '';
         }
         aLi[now].className = 'active';
 
         // this.index = now;                         //反过来写就不对了大兄弟
         // content.style.left = -400 * this.index + 'px';
         startMove(content, {
             left: -790 * now, //你还真别说，json格式就是这么写的
         });
     }
 
     function autoPlay() {
         now++;
         if (now == aLi.length) {
             now = 0;
         }
         play();
     }
 
     var timer = setInterval(autoPlay, 2000);
     wrap.onmouseover = function(){                  //这里如果把事件绑定到ul上的话，那么鼠标移入，下面对饮的li会不起作用，
         clearInterval(timer);                       //因为li的层级比较高，所以应该把事件绑定到大的div上
     }
     wrap.onmouseout = function(){
         timer = setInterval(autoPlay,2000);
         //setInterval(autoPlay,2000);   不能这么写，凡是开的定时器，必须得赋值，要不然总会多开一个定时器，导致速度加快
     }

