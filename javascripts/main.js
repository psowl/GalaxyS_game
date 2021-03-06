let music = new Audio('sounds/Lux-Aeterna-By-Clint-Mansell.mp3');
let youIdiot = new Audio('sounds/youIdiot.mp3');
let rocketSound = new Audio('sounds/rocketSound.mp3');
rocketSound.volume = 0.1;
let hitSound = new Audio('sounds/hitSound.mp3');
let endSound = new Audio('sounds/endSound.mp3');
let buttonSound = new Audio('sounds/buttonSound.mp3');

var globe = new Image();
globe.src = 'img/globe.png'
//to refacto
// var globeAnchorPointX =  (check photoshop)
// var globeAnchorPointY =  (check photoshop)

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
var oneDollar = new Image();
oneDollar.src = 'img/0dollars.png';
var twoDollars = new Image();
twoDollars.src = 'img/2dollars.png';
var threeDollars = new Image();
threeDollars.src = 'img/3dollars.png';
var fourDollars = new Image();
fourDollars.src = 'img/4dollars.png';
var fiveDollars = new Image();
fiveDollars.src = 'img/5dollars.png';

var boom;
var chancePoints;
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

//Render elements of canvas when the page loads
document.body.onload = function() {
  requestAnimationFrame(mainLoop);
  addRadar();
  newGame();
};

//Below sets up a canvas and using a main loop rotates the image. 
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


// function to rotate image
function drawImageRotated(img, x, y, anchorPointY, scale, rot, anchorPointX) {
  ctx.save(); // save the context
  ctx.translate(x, y); // position de l'image dans le context
  ctx.translate(anchorPointX, anchorPointY); // position du anchor point de l'image dans le context
  ctx.rotate(degtorad(rot));
  ctx.scale(scale, scale);
  ctx.translate(-(anchorPointX), -(anchorPointY));
  ctx.drawImage(img, 0, 0);
  // ctx.translate(-x, -y);
  ctx.restore(); // to set back initial state of the canvas with the image drawn
}

//another function because rockets move forward straight in y (--y) wherease sattelites rotate
function drawRocketRotated(img, x, y, anchorPointY, scale, rot, anchorPointX, opacity) {
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.translate(canvas.width/2-anchorPointX ,canvas.height/2 - anchorPointY); // position of the rocket is center of the canvas and at the anchorPoint of the rocket
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

//animation
function mainLoop() {
  // rotation1+=1;
  // rotation1 = rotation1%360;
  // rotation2-=0.5;
  // rotation2 = rotation2%360;
  // rotation3+=0.5;
  // rotation3 = rotation3%360;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(globe, canvas.width/2 - globe.width/2, canvas.height/2 - globe.height/2); // globe.width/2 should be anchorPoint X of the globe
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
        cs[4] += 0.10;
        cs[5] = 2;
        // TO DELETE SATELLITE
          // var lastRadar = radars[radars.length-1];
          // radars.splice(lastRadar,1);
      }
      // X := originX + cos(angle)*radius;
      // Y := originY + sin(angle)*radius;
    
    cs[6] += cs[5];
    cs[6] = (cs[6]+360) % 360;

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
    cr[2] -= cr[5]/2; // equivalent to y, to move forward is '-' and cr[5] is the angle step likely speed    
    if (cr[4]<1){ //tant que la taille est inférieur à la taille finale 1
      // cr[4] = EasingFunctions.easeInOutQuad(0.003) * 1;
      cr[4] += 0.030; //scale to grow by 0.030; every frame
    }
    if (cr[8] == false) {  // s'il n'est plus alive
    cr[2] -= cr[5]*5;
    if (cr[9] > 0) {
      cr[9] -= 0.01;
    } 

    if (cr[9] < 0) { // to avoid going below 0
      cr[9] = 0;
    }
  }

    drawRocketRotated(cr[0],cr[1],cr[2], cr[3],cr[4],cr[6], cr[7], cr[9]); 
    // example : drawImageRotated([satellite1, 423, 285, 165, 1, getRandomArbitrary(0.5, 1), 0]), 
    //which is (img, x, y, anchorPoint, scale, rotation speed randomly beetween 0.5-1, rot angle at 0)
    
  }
  // to start animation call RAF
  requestAnimationFrame(mainLoop); // set up the next frame
  
}
// function to apply to get random angle step (speed) 
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function addRadar(){
  radars.push([radar, 354, 192, 258, 1, 0.4, 0, 96]);
}

var satellitesRunning;
function displayScore (array) {
  satellitesRunning = array.length - boom;
  document.getElementById('score').innerHTML = `You have ${satellitesRunning} satellites running around the globe! You have ${chancePoints} chances! `;
}


function getradarPosition() {
  var radarCurrentPosition = radars[radars.length - 1][6]; 
  alert(radarCurrentPosition);
}

function addSatellite(position, randomPosition){
    var targetSatellite;
    var targetY;
    var targetAnchorpoint;
    var targetSpeed;
    var targetAngle;
    if (randomPosition == true) {
      targetAngle = getRandomArbitrary(0, 360); // random for the initial satellites running when starting game
    } else {
      targetAngle = rockets[rockets.length-1][6];  // follow rocket angle position
    }
    if(position == 1){
      targetSatellite = satellite1;
      targetY = satellite1Y;
      targetAnchorpoint = 165;
      targetSpeed = getRandomArbitrary(0.5, 1.3);
    } else if(position == 2){
      targetSatellite = satellite2;
      targetY = satellite2Y;
      targetAnchorpoint = 211;
      targetSpeed = getRandomArbitrary(0.4, 1.2);
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

function addseveralSatellites(position) {
  for (var i = 0 ; i < 5 ; i++) {
    addSatellite(1, true);
  } 
  for (var i = 0 ; i < 5 ; i++) {
    addSatellite(2, true);
  } 
  for (var i = 0 ; i < 5 ; i++) {
    addSatellite(3, true);
  } 
displayScore(satellites);
}

function addRocket() {
  var radarCurrentPosition = radars[radars.length-1][6];
  rockets.push([ariane, canvas.width/2 -rocketAnchorX, canvas.height/2 -rocketAnchorY, rocketAnchorY, 0.05, 0.4, radarCurrentPosition, rocketAnchorX, true, 1]);
  rocketSound.play();
}


var nextspacebarFunction = "goaddRocket";

//make satellite appear when space bar is pressed
document.onkeydown = function (e) {
  // alert('keydown');
  console.log('keydown');
  if(e.keyCode === 32) {
    music.play();
    onSpaceBarReleased();
  }
}

function onSpaceBarReleased() {
  // alert('onSpaceBarReleased');
if (nextspacebarFunction == "goaddRocket") {
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

//to refacto like example below all variable for whole code in the top of the code all together
//var zoneAnglemarginForPosition2 = 7;

function checkExistingSatellitesPositions(position) {
  //alert('checkExistingSatellitesPositions');

  // var rotLeft = 350;
  // var rotRight = 10;
  var rocketRotangle = rockets[rockets.length-1][6];
  var willCrash = false;
  var zoneAnglemargin = 7; // with created var above of the code it should be zoneAnglemargin = zoneAnglemarginForPosition2
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
      // alert('position satellite:' + testedSatellite[6] + ' position ariane:' + rockets[rockets.length-1][6]);
      //alert(testedSatellite[6]);
      if ((testedSatellite[6] <= angleLimitRight) && (testedSatellite[6] >= angleLimitLeft)) {
         // dans zone a risque
         if ((testedSatellite[2] == satellite1Y) && (position == 1)) {
          // alert('BOOM avec 1');
          //if (testedSatellite[5] === 0) {
          //  alert(`Hey tu m'avais déjà touché, je suis loin maintenant MAIS peut-être un autre satellite va bouger sinon, bravo, ça va créer un` );
          //} else {
            // testedSatellite[5] = 3 ; // to stop rotation on itself
            testedSatellite[8] = false;
            willCrash = true;
            displayAlert('You hit a satellite!');
            hitSound.play();
            break;
          //}
         } else if ((testedSatellite[2] == satellite2Y) && (position == 2)) {
          //  alert('BOOM avec 2');
          //  testedSatellite[5] = 0;
          testedSatellite[8] = false;
          willCrash = true;
          displayAlert('You hit a satellite!');
          hitSound.play();
          break;
         } else if ((testedSatellite[2] == satellite3Y) && (position == 3)) {
          //  alert('BOOM avec 3');
          // testedSatellite[5] = 0;
          testedSatellite[8] = false;
          willCrash = true;
          displayAlert('You hit a satellite!');
          hitSound.play();
          break;
         }
      }
    }
  } else if (angleLimitLeft > angleLimitRight) {
    // alert('à cheval sur 360');
    for (var i = 0; i<satellites.length; i++) {
      var testedSatellite = satellites[i];
      // alert('position satellite:' + testedSatellite[6] + ' position ariane:' + rockets[rockets.length-1][6]);
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
          displayAlert('You hit a satellite!');
          hitSound.play();
          break;
        } else if ((testedSatellite[2] == satellite2Y) && (position == 2)) {
          // alert('position' + testedSatellite[6]);
          // alert('BOOM avec 2');
          // testedSatellite[5] = 0;
          testedSatellite[8] = false;
          willCrash = true;
          displayAlert('You hit a satellite!');
          hitSound.play();
          break;
        } else if ((testedSatellite[2] == satellite3Y) && (position == 3)) {
          // alert('BOOM avec 3');
          // testedSatellite[5] = 0;
          testedSatellite[8] = false;
          willCrash = true;
          displayAlert('You hit a satellite!');
          hitSound.play();
          break;
        }
      }
    }
  }
  if (willCrash == false) {
    addSatellite(position, false); //false -> not random, angle de la fusée
  } else {
    looseSatellitePointsScore();
  
  }
}

function looseSatellitePointsScore() {
  boom += 1;
  looseChancePoints();
  }


function updateDollar (cp){
    document.getElementById('chancePointsImage').src = 'img/' + cp + 'dollars.png';
}


function looseChancePoints() {
  chancePoints -= 1; 

  // to add : if chancePoints < 0 so chancePoints = 0;

  updateDollar(chancePoints);
  // alert('chancePoint = ' + chancePoints)
  displayScore(satellites);
  if (chancePoints == 0) {
    gameOver();
  }
}

function gameOver() {
    // alert(`YOU LOST! Your score is ${satellitesRunning}, try to beat it next time!`);
    document.getElementById('gameOverText').innerHTML = `YOU LOST! Your score is ${satellitesRunning}, try to beat it next time!`;
    document.getElementById('gameOver').style.display = "block";
    endSound.play();
    // displayNewgame();
    // newGame();
}

function displayNewgame() {
  alert('new game');
  
}

var buttonNewgame = document.getElementById('newGame');
buttonNewgame.onclick = function(){
  newGame();
  document.getElementById('gameOver').style.display = "none";
}

// var button1 = document.getElementById("button1")
// button1.onclick = function () {
//   // rotations.push(0);
//   // speed.push(getRandomArbitrary(0.5, 1));    


function newGame() {
  // alert('to new game');
  satellites = [];
  rockets = [];
  boom = 0;
  chancePoints = 5;
  addseveralSatellites();
  document.getElementById('alert').style.display = "none";
  buttonSound.play();
  updateDollar(5);
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
  rockets[rockets.length-1][8] = false;

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
    // alert("too early");
    displayAlert(`Oh no too early! You are wasting money!`);
    looseChancePoints(); 
    youIdiot.play();
  } else {
    // alert("too late");
    displayAlert(`Too late! You are wasting money!`);
    looseChancePoints();
    youIdiot.play();
  }
  //alert('y = ' + y);
}

var ret;
function displayAlert(message) {
  // if (chancePoints > 0) {
  if (ret) {
    clearTimeout(ret);
  }
  // document.getElementById('alert').style.display = "block";
  document.getElementById('alert').innerHTML = message;
  document.getElementById('alert').style.display = "block";
  ret = setTimeout(function() {
    document.getElementById('alert').style.display = "none";
  }, 3000);
  // }
}

//BUTTONS

// var buttonStart = document.getElementById("buttonStart");
// buttonStart.onclick = function () {
//   addRadar();
// };
//(img, x, y, anchorPoint, scale, rotation speed randomly beetween 0.5-1, rot angle at 0, anchorPointX)


// var buttonSpacebar = document.getElementById("buttonSpacebar")
// buttonSpacebar.onclick = function () {
//   onSpaceBarReleased();
//   /*if (nextspacebarFunction == "goaddRadar") {
//     addRadar();
//     nextspacebarFunction = "goaddRocket";
//   } else if (nextspacebarFunction == "goaddRocket") {
//     addRocket();
//     nextspacebarFunction = "goaddSatellite";
//   } else if(nextspacebarFunction == "goaddSatellite") {
//     var lastRocket = rockets[rockets.length-1];
//     var lastRocketY = lastRocket[2];
//     var lastRocketScale = lastRocket[4];
//     var rocketAnchorPoint = lastRocket[3];
//     checkaddSatellitevsRocketPosition(lastRocketY, lastRocketScale, rocketAnchorPoint);
//     nextspacebarFunction = "goaddRocket";
//   }*/
// };

// var nextspacebarFunction = "goaddRadar";


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

// var button1 = document.getElementById("button1")
// button1.onclick = function () {
//   // rotations.push(0);
//   // speed.push(getRandomArbitrary(0.5, 1));    

//   // satellites.push([satellite1, 423, satellite1Y, 165, 1, getRandomArbitrary(0.5, 1), 0, 27]);
  
//   for (var i = 0 ; i < 10 ; i++) {
//     var speed = getRandomArbitrary(0.5, 1);
//     var orientation = getRandomArbitrary(0, 2);
//     if (orientation < 1) {
//       speed = -speed;
//     }
    
//     satellites.push([satellite1, 423, satellite1Y, 165, 1, speed, getRandomArbitrary(0, 360), 27]);
//   }
  
//   displayScore(satellites);
// };


// var button2 = document.getElementById("button2")
// button2.onclick = function () {
//   // rotations.push(0);
//   // speed.push(getRandomArbitrary(0.5, 1));
//    satellites.push([satellite2, 423, satellite2Y, 211, 1, getRandomArbitrary(0.5, 1), getRandomArbitrary(0, 360), 27]);
//   // satellites.push([satellite2, 423, satellite2Y, 211, 1, -0.8, getRandomArbitrary(0, 360), 27]) // test anti clock wise
//   displayScore(satellites);
// };
 
// var button3 = document.getElementById("button3")
// button3.onclick = function () {
//   // rotations.push(0);
//   // speed.push(getRandomArbitrary(0.1, 0.5));
//   satellites.push([satellite3, 423, satellite3Y, 257, 1,getRandomArbitrary(0.1, 0.5), 0, 27]);
//   displayScore(satellites);
// };

// function deleteRandomSatellite (){
//   var randomIndex = Math.floor(Math.random()*satellites.length);
//   satellites.splice(randomIndex, 1);
//   // rotations.splice(randomIndex, 1);
//   // speed.splice(randomIndex, 1);
//   console.log(satellites);
// }

// function deleteLastRadar () {
// var lastRadar = radars[radars.length-1];
// radars.splice(lastRadar,1);
// }

// var buttonDeleteRadar = document.getElementById("buttonDeleteRadar")
// buttonDeleteRadar.onclick = function () {
// deleteLastRadar();
// }

// var deleteButton = document.getElementById("buttonDelete")
// deleteButton.onclick = function () {
// deleteRandomSatellite(satellites);
// displayScore(satellites);
// }

// var positionButton = document.getElementById("buttonPosition")
// positionButton.onclick = function () {
// getSatellitePositions();
// }

// function getSatellitePositions(){
// var satellitesPositionArray = [];
// for (var i=0; i<satellites.length; i++) {
// var eachSatellitesPosition = satellites[i][6]; 
// satellitesPositionArray.push(eachSatellitesPosition);
// }  
// alert(satellitesPositionArray);
// };

// var positionRocketButton = document.getElementById("buttonRocketsPosition");
// positionRocketButton.onclick = function () {
// getRocketPositions();
// };

// function getRocketPositions(){
// var rocketsPositionArray = [];
// for (var i=0; i<rockets.length; i++) {
// // var eachRocketPositionX = rockets[i][[1]]
// // var eachRocketPositionY = rockets[i][[2]]
// var eachRocketPositionX = rockets[i][1];
// var eachRocketPositionY = rockets[i][2];
// var eachRocketPositionOrientation = rockets[i][6];
// rocketsPositionArray.push(`X=${eachRocketPositionX}`, `Y=${eachRocketPositionY}`, `Orientation=${eachRocketPositionOrientation}` );
// }  
// alert(rocketsPositionArray);
// };

// var positionRadarButton = document.getElementById("buttonRadarPosition")
// positionRadarButton.onclick = function () {
// getradarPosition();
// }  

// var buttonAriane = document.getElementById("buttonAriane")
// buttonAriane.onclick = function () {
//   addRocket();
// }

// function getradarPositionArray() {
//   var radarPositionArray = [];
//   for (var i=0; i<radars.length; i++) {
//   var eachRadarPosition = radars[i][6]; 
//   radarPositionArray.push(eachRadarPosition);
// }
// alert(radarPositionArray);
// };

//fading out animation
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

