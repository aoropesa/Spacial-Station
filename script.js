window.onload = function(){
  const c = document.getElementById("scene");
  const ctximg = c.getContext("2d");
  const w = c.width;
  const h = c.height;
  const div = document.getElementById('container');
  const img1 = document.getElementById("galaxy");
  const img2 = document.getElementById('world');
  const img3 = document.getElementById('station');
  var arr = [];

  function name(){
    $.ajax({
      url: "http://api.open-notify.org/astros.json",
      dataType: 'jsonp',
      success: function(response){
        console.log(response);
        response.people.forEach(function(value){
          arr.push(value.name );
        })
      }
    })
  }
    name();

var i = 0;
var redraw = function() {
    ctximg.save();
    ctximg.drawImage(img1,0,0,1325,600);
    ctximg.drawImage(img2,550,200,200,200);

    // set origin to center
    ctximg.translate(w / 2, h / 2);

    // draw station

    // rotate + move along x
    ctximg.rotate(i / 100);

    // draw planet
    ctximg.drawImage(img3,250,0,50,50)
    ctximg.translate(300,0)
    ctximg.rotate(-i / 100);

    for(var j=0;j<arr.length;j++){
        ctximg.font = "10px Arial";
        ctximg.fillStyle = "#ffffff";
        ctximg.fillText(arr[j],0,j*25);
    }
    ctximg.restore();
    i++;
    window.requestAnimationFrame(redraw);
  }
  ctximg.clearRect(0,0,w,h);
  redraw();
 }
