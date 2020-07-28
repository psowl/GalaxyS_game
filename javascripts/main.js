var globe = new Image();
globe.src = 'img/globe.png'
var anneau = new Image();
anneau.src = 'img/anneau.png'
var satellite1 = new Image();
satellite1.src = 'img/satellite1.png'
var satellite2 = new Image();
satellite2.src = 'img/satellite2.png'
var satellite3 = new Image();
satellite3.src = 'img/satellite3.png'
var ariane = new Image();
ariane.src = 'img/ariane.png'
var radar = new Image();
radar.src = 'img/radar.png'

// var satellite1_crashed = new Image();
// satellite1_crashed.src = './img/satellite1_crashed.png'

var boom;
var chancePoints;


//Rotate satellite around the center of canvas
document.body.onload = function() {
  requestAnimationFrame(mainLoop);
};

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

function drawImageRotated(img, x, y, anchorPointY, scale, rot, anchorPointX) {
  ctx.save();
  ctx.translate(x, y);
  ctx.translate(anchorPointX, anchorPointY);
  ctx.rotate(degtorad(rot));
  ctx.scale(scale, scale);
  ctx.translate(-(anchorPointX), -(anchorPointY));
  ctx.drawImage(img, 0, 0);
  // ctx.translate(-x, -y);
  ctx.restore();
}

function drawRocketRotated(img, x, y, anchorPointY, scale, rot, anchorPointX) {
  ctx.save();
  ctx.translate(canvas.width/2-anchorPointX ,canvas.height/2 - anchorPointY);
  //ctx.translate(x, y);
  ctx.translate(anchorPointX, anchorPointY);
  ctx.rotate(degtorad(rot));
  ctx.scale(scale, scale);
  ctx.translate(0, y-(canvas.height/2 - anchorPointY));
  ctx.translate(-(anchorPointX), -(anchorPointY));
  ctx.drawImage(img, 0, 0);
  // ctx.translate(-x, -y);
  ctx.restore();
}


function degtorad (deg) {
  rad = deg * Math.PI / 180;
  return rad;
}

// var rotation1 = 0;
// var rotation2 = 0;
// var rotation3 = 0;

//draw the images and turn in rotation
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
  // ctx.drawImage(ariane, canvas.width/2- ariane.width/2,canvas.height/2 - ariane.height/2, (90/310)*200, 200);

  // drawImageRotated(satellite1,423, 285, 165, 1, rotation1);
  // drawImageRotated(satellite2,423, 239, 211, 1, rotation2);
  // drawImageRotated(satellite3,423, 193, 257, 1, rotation3);

  // for (var i=0; i<rotations.length; i++) {
  //   rotations[i] += speed[i];
  //   rotations[i] = rotations[i]%360;
  // }
  


  for (var i=0; i<satellites.length; i++) {
    var cs = satellites[i]; // current satellite
    if (cs[8] == false) {  // s'il n'est plus alive
        cs[4] += 0.15;
        cs[5] = 3;
        // TO DELETE SATELLITE
          // var lastRadar = radars[radars.length-1];
          // radars.splice(lastRadar,1);
      }
      // X := originX + cos(angle)*radius;
      // Y := originY + sin(angle)*radius;
    
    cs[6] += cs[5];
    cs[6] = cs[6]%360;

    drawImageRotated(cs[0],cs[1],cs[2], cs[3], cs[4],cs[6], cs[7], cs[8]); 
    // example : drawImageRotated([satellite1, 423, 285, 165, 1, getRandomArbitrary(0.5, 1), 0]), 
    //which is (img, x, y, anchorPointY, scale, rotation speed randomly beetween 0.5-1, rot angle at 0,anchorPointX, isAlive)
  }

  for (var i=0; i<radars.length; i++) {
    var cRadar = radars[i]; // current radar
    cRadar[6] += cRadar[5];
    cRadar[6] = cRadar[6]%360;
    drawImageRotated(cRadar[0], cRadar[1], cRadar[2], cRadar[3], cRadar[4], cRadar[6], cRadar[7]); 
    // example : drawImageRotated([satellite1, 423, 285, 165, 1, getRandomArbitrary(0.5, 1), 0]), 
    //which is (img, x, y, anchorPoint, scale, rotation speed randomly beetween 0.5-1, rot angle at 0)
  }


  for (var i=0; i<rockets.length; i++) {
    var cr = rockets[i]; // current rocket
    // cr[1] += cr[5];
    cr[2] -= cr[5]/2;
    if (cr[4]<1){
      // cr[4] = EasingFunctions.easeInOutQuad(0.003) * 1;
      cr[4] += 0.030;
    }
    
    drawRocketRotated(cr[0],cr[1],cr[2], cr[3],cr[4],cr[6], cr[7]); 
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
var satellites;
var rockets;
var radars = [];
var satellite1Y= 285;
var satellite2Y = 239;
var satellite3Y = 193;
var rocketAnchorX = 18;
var rocketAnchorY = 123;


// var rotations = [0,0,0];
// var speed = [getRandomArbitrary(0.5, 1),getRandomArbitrary(0.5, 1),getRandomArbitrary(0.1, 0.5)];
//var satellites = [[satellite1,423, 285, 165, 1],[satellite2,423, 239, 211, 1],[satellite3],423, 193, 257, 1]];

var buttonStart = document.getElementById("buttonStart");
buttonStart.onclick = function () {
  addRadar();
};
//(img, x, y, anchorPoint, scale, rotation speed randomly beetween 0.5-1, rot angle at 0, anchorPointX)

function addRadar(){
  radars.push([radar, 354, 192, 258, 1, 0.4, 0, 96]);
}

// var nextspacebarFunction = "goaddRadar";

function onSpaceBarReleased() {
  // alert('onSpaceBarReleased');
  if (nextspacebarFunction == "goaddRadar") {
    addRadar();
    nextspacebarFunction = "goaddRocket";
  } else if (nextspacebarFunction == "goaddRocket") {
      addRocket();
      // deleteLastRadar();
      nextspacebarFunction = "goaddSatellite";
    } else if(nextspacebarFunction == "goaddSatellite") {
      var lastRocket = rockets[rockets.length-1];
      var lastRocketY = lastRocket[2];
      var lastRocketScale = lastRocket[4];
      var rocketAnchorPointY = lastRocket[3];
      //alert(lastRocketY);
      checkaddSatellitevsRocketPosition(lastRocketY, lastRocketScale, rocketAnchorPointY);
      //addSatellite();
      nextspacebarFunction = "goaddRocket";
    }
  
}

var buttonSpacebar = document.getElementById("buttonSpacebar")
buttonSpacebar.onclick = function () {
  onSpaceBarReleased();
  /*if (nextspacebarFunction == "goaddRadar") {
    addRadar();
    nextspacebarFunction = "goaddRocket";
  } else if (nextspacebarFunction == "goaddRocket") {
    addRocket();
    nextspacebarFunction = "goaddSatellite";
  } else if(nextspacebarFunction == "goaddSatellite") {
    var lastRocket = rockets[rockets.length-1];
    var lastRocketY = lastRocket[2];
    var lastRocketScale = lastRocket[4];
    var rocketAnchorPoint = lastRocket[3];
    checkaddSatellitevsRocketPosition(lastRocketY, lastRocketScale, rocketAnchorPoint);
    nextspacebarFunction = "goaddRocket";
  }*/
};

// function getRandomOrientedSatellite() {

//   for (var i = 0 ; i < 10 ; i++) {
//     var speed = getRandomArbitrary(0.5, 1);
//     var orientation = getRandomArbitrary(0, 2);
//     if (orientation < 1) {
//       speed = -speed;
//     }
//     satellites.push([satellite1, 423, satellite1Y, 165, 1, speed, getRandomArbitrary(0, 360), 27]);
//   }
//   displayScore(satellites);
// }

var button1 = document.getElementById("button1")
button1.onclick = function () {
  // rotations.push(0);
  // speed.push(getRandomArbitrary(0.5, 1));    

  // satellites.push([satellite1, 423, satellite1Y, 165, 1, getRandomArbitrary(0.5, 1), 0, 27]);
  
  for (var i = 0 ; i < 10 ; i++) {
    var speed = getRandomArbitrary(0.5, 1);
    var orientation = getRandomArbitrary(0, 2);
    if (orientation < 1) {
      speed = -speed;
    }
    
    satellites.push([satellite1, 423, satellite1Y, 165, 1, speed, getRandomArbitrary(0, 360), 27]);
  }
  
  displayScore(satellites);
};

var button2 = document.getElementById("button2")
button2.onclick = function () {
  // rotations.push(0);
  // speed.push(getRandomArbitrary(0.5, 1));
  satellites.push([satellite2, 423, satellite2Y, 211, 1, getRandomArbitrary(0.5, 1), getRandomArbitrary(0, 360), 27]);
  displayScore(satellites);
};
 
var button3 = document.getElementById("button3")
button3.onclick = function () {
  // rotations.push(0);
  // speed.push(getRandomArbitrary(0.1, 0.5));
  satellites.push([satellite3, 423, satellite3Y, 257, 1,getRandomArbitrary(0.1, 0.5), 0, 27]);
  displayScore(satellites);
};

var satellitesRunning;
function displayScore (array) {
  satellitesRunning = array.length - boom;
  document.getElementById('score').innerHTML = `You have ${satellitesRunning} satellites running around the globe! You have ${chancePoints} chances! `;
}

function deleteRandomSatellite (){
    var randomIndex = Math.floor(Math.random()*satellites.length);
    satellites.splice(randomIndex, 1);
    // rotations.splice(randomIndex, 1);
    // speed.splice(randomIndex, 1);
    console.log(satellites);
}

function deleteLastRadar () {
  var lastRadar = radars[radars.length-1];
  radars.splice(lastRadar,1);
}

var buttonDeleteRadar = document.getElementById("buttonDeleteRadar")
buttonDeleteRadar.onclick = function () {
  deleteLastRadar();
}

var deleteButton = document.getElementById("buttonDelete")
deleteButton.onclick = function () {
deleteRandomSatellite(satellites);
displayScore(satellites);
}

var positionButton = document.getElementById("buttonPosition")
positionButton.onclick = function () {
  getSatellitePositions();
}

function getSatellitePositions(){
  var satellitesPositionArray = [];
  for (var i=0; i<satellites.length; i++) {
  var eachSatellitesPosition = satellites[i][6]; 
  satellitesPositionArray.push(eachSatellitesPosition);
}  
alert(satellitesPositionArray);
};

var positionRocketButton = document.getElementById("buttonRocketsPosition");
positionRocketButton.onclick = function () {
  getRocketPositions();
};

function getRocketPositions(){
  var rocketsPositionArray = [];
  for (var i=0; i<rockets.length; i++) {
  // var eachRocketPositionX = rockets[i][[1]]
  // var eachRocketPositionY = rockets[i][[2]]
  var eachRocketPositionX = rockets[i][1];
  var eachRocketPositionY = rockets[i][2];
  var eachRocketPositionOrientation = rockets[i][6];
  rocketsPositionArray.push(`X=${eachRocketPositionX}`, `Y=${eachRocketPositionY}`, `Orientation=${eachRocketPositionOrientation}` );
}  
alert(rocketsPositionArray);
};

var positionRadarButton = document.getElementById("buttonRadarPosition")
positionRadarButton.onclick = function () {
  getradarPosition();
}  


// function getradarPositionArray() {
//   var radarPositionArray = [];
//   for (var i=0; i<radars.length; i++) {
//   var eachRadarPosition = radars[i][6]; 
//   radarPositionArray.push(eachRadarPosition);
// }
// alert(radarPositionArray);
// };

function getradarPosition() {
  var radarCurrentPosition = radars[radars.length - 1][6]; 
  alert(radarCurrentPosition);
}


// for (var i = 0 ; i < 10 ; i++) {
//   var speed = getRandomArbitrary(0.5, 1);
//   var orientation = getRandomArbitrary(0, 2);
//   if (orientation < 1) {
//     speed = -speed;
//   }
//   satellites.push([satellite1, 423, satellite1Y, 165, 1, speed, getRandomArbitrary(0, 360), 27]);

function addSatellite(position){
    var targetSatellite;
    var targetY;
    var targetAnchorpoint;
    var targetSpeed;
    var targetAngle= rockets[rockets.length-1][6]; 
    if(position == 1){
      targetSatellite = satellite1;
      targetY = satellite1Y;
      targetAnchorpoint = 165;
      targetSpeed = getRandomArbitrary(0.5, 1.3);
    } else if(position == 2){
      targetSatellite = satellite2;
      targetY = satellite2Y;
      targetAnchorpoint = 211;
      targetSpeed = getRandomArbitrary(0.4, 1.5);
    } else if(position == 3){
      targetSatellite = satellite3;
      targetY = satellite3Y;
      targetAnchorpoint = 257;
      targetSpeed = getRandomArbitrary(0.4, 0.8);
    }
      var orientation = getRandomArbitrary(0, 2);
      if (orientation < 1) {
        targetSpeed = -targetSpeed;
      }
    satellites.push([targetSatellite, 423, targetY, targetAnchorpoint, 1, targetSpeed, targetAngle, 27, true]);
    // (img, x, y, anchorPointY, scale, rotation speed randomly beetween 0.5-1, rot angle at 0,anchorPointX, isAlive);
    displayScore(satellites);
  }


function addRocket() {
  var radarCurrentPosition = radars[radars.length-1][6];
  //rockets.push([ariane, canvas.width/2- ariane.width/2,canvas.height/2 - ariane.height/2, 250, 0, 0.4, 0]);
  rockets.push([ariane, canvas.width/2 -rocketAnchorX, canvas.height/2 -rocketAnchorY, rocketAnchorY, 0.05, 0.4, radarCurrentPosition, rocketAnchorX, true]);
}

var buttonAriane = document.getElementById("buttonAriane")
buttonAriane.onclick = function () {
  addRocket();
}

var nextspacebarFunction = "goaddRocket";

//make satellite appear when space bar is pressed
document.onkeydown = function (e) {
  console.log('keydown');
  if(e.keyCode === 32) {
    /*if (nextspacebarFunction == "goaddRocket") {
      addRocket();
      nextspacebarFunction = "goaddSatellite";
    } else if(nextspacebarFunction == "goaddSatellite") {
      var lastRocket = rockets[rockets.length-1];
      var lastRocketY = lastRocket[2];
      var lastRocketScale = lastRocket[4];
      var rocketAnchorPoint = lastRocket[3];
      //alert(lastRocketY);
      checkaddSatellitevsRocketPosition(lastRocketY, lastRocketScale, rocketAnchorPoint);
      //addSatellite();
      nextspacebarFunction = "goaddRocket";
    }*/
    onSpaceBarReleased();
  }
}


function checkExistingSatellitesPositions(position) {
  //alert('checkExistingSatellitesPositions');

  // var rotLeft = 350;
  // var rotRight = 10;
  var rocketRotangle = rockets[rockets.length-1][6];
  var willCrash = false;
  var zoneAnglemargin = 7;
  if (position == 1) {
    zoneAnglemargin = 9;
  } else if (position == 3) {
    zoneAnglemargin = 6;
  }

  var angleLimitLeft = (rocketRotangle - zoneAnglemargin)%360;
  var angleLimitRight = (rocketRotangle + zoneAnglemargin)%360;

  // alert('rocketRotangle = ' + rocketRotangle + ' / zoneAnglemargin = ' + zoneAnglemargin + ' / angleLimitLeft = ' + angleLimitLeft + ' / angleLimitRight = ' + angleLimitRight);

  if(angleLimitRight > angleLimitLeft) {
    // alert('pas à cheval sur 360');
    for (var i = 0; i<satellites.length; i++) {
      //if((position >= rotLeft) && (position <= rotRight)) {
      var testedSatellite = satellites[i];
      //alert(testedSatellite[6]);
      if ((testedSatellite[6] <= angleLimitRight) && (testedSatellite[6] >= angleLimitLeft)) {
         // dans zone a risque
         if ((testedSatellite[2] == satellite1Y) && (position == 1)) {
          alert('BOOM avec 1');
          //if (testedSatellite[5] === 0) {
          //  alert(`Hey tu m'avais déjà touché, je suis loin maintenant MAIS peut-être un autre satellite va bouger sinon, bravo, ça va créer un` );
          //} else {
            // testedSatellite[5] = 3 ; // to stop rotation on itself
            testedSatellite[8] = false;
            willCrash = true;
            break;
          //}
         } else if ((testedSatellite[2] == satellite2Y) && (position == 2)) {
          //  alert('BOOM avec 2');
          //  testedSatellite[5] = 0;
          testedSatellite[8] = false;
          willCrash = true;
          break;
         } else if ((testedSatellite[2] == satellite3Y) && (position == 3)) {
          //  alert('BOOM avec 3');
          // testedSatellite[5] = 0;
          testedSatellite[8] = false;
          willCrash = true;
          break;
         }
      }
    }
  } else if (angleLimitLeft > angleLimitRight) {
    // alert('à cheval sur 360');
    for (var i = 0; i<satellites.length; i++) {
      var testedSatellite = satellites[i];
      //alert(testedSatellite[6]);
      //if ((testedSatellite[6] >= angleLimitRight) && (testedSatellite[6] <= angleLimitLeft)) {
      if (((testedSatellite[6] >= angleLimitLeft) && (testedSatellite[6] <= 360)) || ((testedSatellite[6] <= angleLimitRight) && (testedSatellite[6] >= 0))) {
        // dans zone a risque
        if ((testedSatellite[2] == satellite1Y) && (position == 1)) {
          // alert(`BOOM avec 1` );
          // testedSatellite[5] = 0;
          // testedSatellite[1] = satellite1_crashed;
          // testedSatellite[4] = 2;
          testedSatellite[8] = false;
          willCrash = true;
          break;
        } else if ((testedSatellite[2] == satellite2Y) && (position == 2)) {
          // alert('BOOM avec 2');
          // testedSatellite[5] = 0;
          testedSatellite[8] = false;
          willCrash = true;
          break;
        } else if ((testedSatellite[2] == satellite3Y) && (position == 3)) {
          // alert('BOOM avec 3');
          // testedSatellite[5] = 0;
          testedSatellite[8] = false;
          willCrash = true;
          break;
        }
      }
    }
  }
  if (willCrash == false) {
    addSatellite(position);
  } else {
    boom += 1;
    // alert(`boom: ${boom}`)
    chancePoints -= 1;
    // alert('chancePoint = ' + chancePoints)
    displayScore(satellites);
    if (chancePoints == 0) {
      gameOver();
    }
  }
}

function gameOver() {
    alert(`YOU LOST! Your score is ${satellitesRunning}, try to beat it next time!`);
    newGame();
}

function newGame() {
  satellites = [];
  rockets = [];
  boom = 0;
  chancePoints = 5;
  displayScore(satellites);
}

function checkaddSatellitevsRocketPosition(y, scale, anchorPoint) {
//si la position Y de la fusée est = 250
// alors addSatellite(2);
  var rocketOffset = anchorPoint-(anchorPoint*scale);
  y += rocketOffset;
  var borderBetween1And2 = 280;
  var borderBetween2And3 = 233;
  var borderLowest = 325;
  var borderHighest = 185;

  if ((y <= borderBetween2And3) && (y >= borderHighest)) {
    checkExistingSatellitesPositions(3);
    //addSatellite(3);
  }
  else if ((y <= borderBetween1And2) && (y >= borderBetween2And3)) {
    checkExistingSatellitesPositions(2);
    //addSatellite(2);
  }
  else if ((y >= borderBetween1And2) && (y <= borderLowest)) {
    checkExistingSatellitesPositions(1);
    //addSatellite(1);
  } else if (y >= borderLowest) {
    alert("too early");
  } else {
    alert("too late");
  }
  //alert('y = ' + y);
}


// EasingFunctions = {
//   linear: function (t) {
//       return t
//   },
//   easeInQuad: function (t) {
//       return t * t
//   },
//   easeOutQuad: function (t) {
//       return t * (2 - t)
//   },
//   easeInOutQuad: function (t) {
//       return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t
//   },
//   easeInCubic: function (t) {
//       return t * t * t
//   },
//   easeOutCubic: function (t) {
//       return (--t) * t * t + 1
//   },
//   easeInOutCubic: function (t) {
//       return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
//   },
//   easeInQuart: function (t) {
//       return t * t * t * t
//   },
//   easeOutQuart: function (t) {
//       return 1 - (--t) * t * t * t
//   },
//   easeInOutQuart: function (t) {
//       return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t
//   },
//   easeInQuint: function (t) {
//       return t * t * t * t * t
//   },
//   easeOutQuint: function (t) {
//       return 1 + (--t) * t * t * t * t
//   },
//   easeInOutQuint: function (t) {
//       return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t
//   }
// }

newGame();