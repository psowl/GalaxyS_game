//with onload

// var canvas = document.getElementById('canvas');
// var ctx = canvas.getContext('2d');

// var globe = new Image();
// globe.src = './img/globe.png'
// globe.onload = function () {
//   ctx.drawImage(globe, canvas.width/2 - globe.width/2, canvas.height/2 - globe.height/2);
// }

// var anneau = new Image();
// anneau.src = './img/anneau.png'
// anneau.onload = function () {
//   ctx.drawImage(anneau, canvas.width/2 - anneau.width/2, canvas.height/2 - anneau.height/2);
// }

// var satellite1 = new Image();
// satellite1.src = './img/satellite1.png'
// satellite1.onload = function () {
//   ctx.drawImage(satellite1, 423, 285)
// }

// var satellite2 = new Image();
// satellite2.src = './img/satellite2.png'
// satellite2.onload = function () {
//   ctx.drawImage(satellite2, 423, 239)
// }

// var satellite3 = new Image();
// satellite3.src = './img/satellite3.png'
// satellite3.onload = function () {
//   ctx.drawImage(satellite3, 423, 193)
// }

var globe = new Image();
globe.src = './img/globe.png'
var anneau = new Image();
anneau.src = './img/anneau.png'
var satellite1 = new Image();
satellite1.src = './img/satellite1.png'
var satellite2 = new Image();
satellite2.src = './img/satellite2.png'
var satellite3 = new Image();
satellite3.src = './img/satellite3.png'
// var space = new Image();
// space.src = './img/space.png'


// space.onload = function () {
//   ctx.drawImage(space, 0, 0)
// }

//Rotate satellite around the center of canvas
document.body.onload = function() {
  requestAnimationFrame(mainLoop);
};

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

function drawImageRotated(img, x, y, anchorPoint, scale, rot) {
  ctx.save();
  ctx.translate(x, y);
  ctx.translate(img.width/2, anchorPoint);
  ctx.rotate(degtorad(rot));
  ctx.translate(-(img.width/2), -(anchorPoint));
  ctx.drawImage(img, 0, 0);
  ctx.translate(-x, -y);
  ctx.restore();
}

function degtorad (deg) {
  rad = deg * Math.PI / 180;
  return rad;
}

var rotation1 = 0;
var rotation2 = 0;
var rotation3 = 0;

function mainLoop() {
  // rotation1+=1;
  // rotation1 = rotation1%360;
  // rotation2-=0.5;
  // rotation2 = rotation2%360;
  // rotation3+=0.5;
  // rotation3 = rotation3%360;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(globe, canvas.width/2 - globe.width/2, canvas.height/2 - globe.height/2);
  ctx.drawImage(anneau, canvas.width/2 - anneau.width/2, canvas.height/2 - anneau.height/2);
  // drawImageRotated(satellite1,423, 285, 165, 1, rotation1);
  // drawImageRotated(satellite2,423, 239, 211, 1, rotation2);
  // drawImageRotated(satellite3,423, 193, 257, 1, rotation3);

  // for (var i=0; i<rotations.length; i++) {
  //   rotations[i] += speed[i];
  //   rotations[i] = rotations[i]%360;
  // }

  for (var i=0; i<satellites.length; i++) {
    var cs = satellites[i]; // current satellite
    cs[6] += cs[5];
    cs[6] = cs[6]%360;
    drawImageRotated(cs[0],cs[1],cs[2], cs[3], cs[4],cs[6]); 
    // example : drawImageRotated([satellite1, 423, 285, 165, 1, getRandomArbitrary(0.5, 1), 0]), 
    //which is (img, x, y, anchorPoint, scale, rotation speed randomly beetween 0.5-1, rot angle at 0)
  }
  requestAnimationFrame(mainLoop);
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

// var rotations = [];
// var speed = [];
var satellites = [];

// var rotations = [0,0,0];
// var speed = [getRandomArbitrary(0.5, 1),getRandomArbitrary(0.5, 1),getRandomArbitrary(0.1, 0.5)];
//var satellites = [[satellite1,423, 285, 165, 1],[satellite2,423, 239, 211, 1],[satellite3,423, 193, 257, 1]];

var button1 = document.getElementById("button1")
button1.onclick = function () {
  // rotations.push(0);
  // speed.push(getRandomArbitrary(0.5, 1));    
  satellites.push([satellite1, 423, 285, 165, 1, getRandomArbitrary(0.5, 1), 0]);
  displayScore(satellites);
};

var button2 = document.getElementById("button2")
button2.onclick = function () {
  // rotations.push(0);
  // speed.push(getRandomArbitrary(0.5, 1));
  satellites.push([satellite2, 423, 239, 211, 1, getRandomArbitrary(0.5, 1), 0]);
  displayScore(satellites);
};
 
var button3 = document.getElementById("button3")
button3.onclick = function () {
  // rotations.push(0);
  // speed.push(getRandomArbitrary(0.1, 0.5));
  satellites.push([satellite3, 423, 193, 257, 1,getRandomArbitrary(0.1, 0.5), 0]);
  displayScore(satellites);
};
  
function displayScore (array) {
  document.getElementById('score').innerHTML = `${array.length} satellites running around the globe!`;
}

function deleteRandomSatellite (){
    var randomIndex = Math.floor(Math.random()*satellites.length);
    satellites.splice(randomIndex, 1);
    // rotations.splice(randomIndex, 1);
    // speed.splice(randomIndex, 1);
    console.log(satellites);
}

var deleteButton = document.getElementById("buttonDelete")
deleteButton.onclick = function () {
deleteRandomSatellite(satellites);
displayScore(satellites);
}

var positionButton = document.getElementById("buttonPosition")
positionButton.onclick = function () {
  var satellitesPositionArray = [];
  for (var i=0; i<satellites.length; i++) {
  var eachSatellitesPosition = satellites[i][6]; 
  satellitesPositionArray.push(eachSatellitesPosition);
}  
alert(satellitesPositionArray);
}


