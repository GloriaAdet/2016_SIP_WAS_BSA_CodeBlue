var jumping = false;
var yVel = 0;
var xVel = 5;
var gravity = 1.2; 
var list_platforms = [[0,520,750,30], [0,400,200,30]];
var ground = list_platforms[0][1] - 95;

// Create the canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 750;
canvas.height = 550;
document.body.appendChild(canvas);


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


// Reset the game when the player catches a monster
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = ground;

	// Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));

};

var platforms = function (x,y,width,height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	ctx.fillStyle = "grey";
	ctx.fillRect(this.x, this.y, this.width, this.height);
};




// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		jump();		
	}
	if (37 in keysDown) { // Player holding left
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		hero.x += hero.speed * modifier;
	}

	if (jumping){
		yVel += gravity;
        hero.y += yVel;

        //add for loop to check for new ground here *
        // for (i=0; i<list_platforms.length; i++){
        // 	if (list_platforms[i][])
        // }

        if (hero.y > ground){
        	yVel = 0;
        	jumping = false;
        }

	}

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


	// * for loop to create platforms objects
	for (i=0; i<list_platforms.length; i++){
		var platform1 = new platforms(list_platforms[i][0],list_platforms[i][1],list_platforms[i][2],list_platforms[i][3]);
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
	update(delta / 1000);
	render();

	then = now;
	// Request to do this again ASAP
	requestAnimationFrame(main);
};

function jump() {
	
  if (!jumping) {
	jumping = true;
	yVel = -20;
  }

}


// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!

var then = Date.now();
reset();
main();
