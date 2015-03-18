var canvasSize = 200,
    centre = canvasSize/2,
    radius = canvasSize*0.8/2,
    s = Snap('#svg'),
    path = "",
    circles = s.circle(centre, centre, radius),
    arc = s.path(path),    
    startY = centre-radius,
    runBtn = document.getElementById('run'),
    percDiv = document.getElementById('percent'),
    input = document.getElementById('input');

    circles.attr({
    	stroke: "rgba(61,160,141, 0.1)",
    	fill: "none",
    	strokeWidth: 3
    });


input.onkeyup = function(evt) {
    if(isNaN(input.value)) {
      input.value = '';
    }
};

var oldVal = 0;
runBtn.onclick = function() {
  run(input.value/100);
  window.scrollTo(0, 100);
};

function run(percent) {
    var endpoint = percent*360;
    Snap.animate(oldVal, endpoint,   function (val) {
        arc.remove();

        var d = val,
            dr = d-90;
            radians = Math.PI*(dr)/180,
            endx = centre + radius*Math.cos(radians),
            endy = centre + radius * Math.sin(radians),
            largeArc = d>180 ? 1 : 0;  
            path = "M"+centre+","+startY+" A"+radius+","+radius+" 0 "+largeArc+",1 "+endx+","+endy;
  
        arc = s.path(path);
        arc.attr({
          stroke: '#3da08d',
          fill: 'none',
          strokeWidth: 3
        });
        percDiv.innerHTML =    Math.round(val/360*100) +'%';

    }, 2000, mina.easeinout);  
    oldVal = endpoint;
}

run(input.value/100);

var scrollOld = 0;


  runBtn.addEventListener('touchmove', function(event) {
    var touch = event.targetTouches[0];
 
    // Place element where the finger is
    runBtn.style.left = touch.pageX-25 + 'px';
    runBtn.style.top = touch.pageY-25 + 'px';
    event.preventDefault();
  }, false);
/* */