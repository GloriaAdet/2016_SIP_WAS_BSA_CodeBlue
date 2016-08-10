var jumping = false;
var yVel = 0;
var xVel = 5;
var gravity = 1.2; 
<<<<<<< HEAD
var ground = 280;
=======
var list_platforms = [[0,520,750,30], [250,470,90,10], [0,410,180,15], [200,340,90,15], [600,400,100,12], [400,350,120,15], [0,270,285,10]];
var ground = list_platforms[0][1];
var movement = false; 

>>>>>>> 20c156d0ba46a7bf128424931f5b44e6482b2f1a
// Create the canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.width = 600;
canvas.height = 400;
// canvas.style.padding = 40;
// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/bluebricks.jpg";
// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/bluesiren.png";
// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/script.png";
// Game objects
var hero = {
	speed: 250 // movement in pixels per second
};
var monster = {};
var monstersCaught = 0;
// Handle keyboard controls
var keysDown = {};
addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);
addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);
window.addEventListener("resize", OnResizeCalled, false);
// function OnResizeCalled() {
//     canvas.style.width = window.innerWidth + 'px';
//     canvas.style.height = window.innerHeight + 'px';
// }
// Reset the game when the player catches a monster
var reset = function () {
	hero.x = canvas.width / 2;
<<<<<<< HEAD
	hero.y = 280;
=======
	hero.y = ground-100;

>>>>>>> 20c156d0ba46a7bf128424931f5b44e6482b2f1a
	// Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
};
var platforms = function (x,y,width,height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
<<<<<<< HEAD
	fillRect(this.x, this.y, this.width, this.height);
}
=======
	ctx.fillStyle = "grey";
	ctx.fillRect(this.x, this.y, this.width, this.height);
};

var currplat = list_platforms[0][1]

var check_ground = function(){
	console.log('checking ground');
	for (i=0; i<list_platforms.length; i++){
        		if ((hero.y+100) == list_platforms[i][1]){
        			if (hero.x >= list_platforms[i][0]){
	        			if (hero.x<= (list_platforms[i][0]+list_platforms[i][2])){

	        				currplat = list_platforms[i][1]; 
	        				console.log(ground);
	        			}
	        			else if ((i>0) && (hero.y>= list_platforms[(i-1)][1])){
	        				ground = list_platforms[(i-1)][1];
	        				console.log(ground);
	        				console.log('another');
	        			}
	        		else if ((i<0) && (hero.y>= list_platforms[(i-1)][1])){ 
	        			ground = list_platforms[(i-1)][1];
	        			console.log(ground);
	        			console.log('another');
		        	}
	        		}
        		}
    }
};


>>>>>>> 20c156d0ba46a7bf128424931f5b44e6482b2f1a
// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		jump();	
		movement = true;	
	}
	if (37 in keysDown) { // Player holding left
		hero.x -= hero.speed * modifier;
		movement = true;
	}
	if (39 in keysDown) { // Player holding right
		hero.x += hero.speed * modifier;
		movement = true; 
	}
<<<<<<< HEAD
	if (jumping){
		yVel += gravity;
        hero.y += yVel;
        if (hero.y > ground){
        	yVel = 0;
        	jumping = false;
        }
	}
=======

	// if (movement){
		if (jumping){
			yVel += gravity;
        	hero.y += yVel;
        	// check_ground();
        	if (hero.y > currplat-100){
        		console.log(currplat);
	        	yVel = 0;
	        	jumping = false;
	        	hero.y = currplat-100;
	        }
	        else if (hero.y == 420){
	        	yVel = 0;
	        	jumping = false;
	        }
		}
		else {
			// check_ground();
			hero.y = ground-100;
		}
		movement = false; 		
	//}

	// // if (jumping){
	// // 	yVel += gravity;
 // //        hero.y += yVel;

 //        //add for loop to check for new ground here *
 //        // for (i=0; i<list_platforms.length; i++){

 //        // 	if ((hero.y+100) == list_platforms[i][1]){
 //        // 		if (hero.x >= list[i][0]){
 //        // 			if (hero.x<= (list_platforms[i][0]+list_platforms[i][2])){

 //        // 				ground = list_platforms[i][1]; 
 //        // 				console.log(ground);
 //        // 			}
 //        // 			else if ((i>0) && (hero.y>= list_platforms[(i-1)][1])){
 //        // 				ground = list_platforms[(i-1)][1];
 //        // 			}

 //        // 		}
 //        // 	}

 //        	// if ((list_platforms[i][0]<= hero.x) && (hero.x <= (list_platforms[i][0]+ list_platforms[i][2])) && (list_platforms[i][1] >= (hero.y + 100))){
 //        	// 	ground = list_platforms[i][1]; 
 //        	// 	i= list_platforms.length;
 //        	// }
 //        	// else if ((i>0) && (list_platforms[i][1] <= (hero.y + 100)) && (list_platforms[(i-1)][1] >= (hero.y + 100))){
 //        	// 	ground = list_platforms[(i-1)][1];
 //        	// 	// alert('hi');
 //        	// }
 //        	// else {
 //        	// 	console.log('hi');
 //        	// }
 //        	// console.log(ground);
 //        }


 //        // if (hero.y > ground-100){
 //        // 	yVel = 0;
 //        // 	jumping = false;
 //        // 	hero.y = ground - 100;

 //        // }
 //        // else if (hero.y == 420){
 //        // 	yVel = 0;
 //        // 	jumping = false;
 //        // }


	// }

>>>>>>> 20c156d0ba46a7bf128424931f5b44e6482b2f1a
	// Are they touching?
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		++monstersCaught;
		reset();
	}
};
// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}
	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}
	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}
	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Syntax caught: " + monstersCaught, 32, 32);
};
// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;
	var tempy = hero.y;
	check_ground();
	update(delta / 1000);
	render();
	then = now;
	// Request to do this again ASAP
	requestAnimationFrame(main);
};
function jump() {
	
  if (!jumping) {
	jumping = true;
	yVel = -15;
  }
}
// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
// Let's play this game!
var then = Date.now();
reset();
main();