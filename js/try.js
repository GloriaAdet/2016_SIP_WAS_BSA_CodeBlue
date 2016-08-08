var jumping = false;
var yVel = 0;
var xVel = 5;
var gravity = 1.2; 
var list_platforms = [[0,520,750,30], [0,420,280,15],  [600,400,100,12], [400,350,120,15], [0,270,185,10]];
var ground = list_platforms[0];
var movement = false; 
var currplat = list_platforms[0];

var list_syntax = [[200,290, 'integers', 'Integers are a type of data.'], [100,100, ' string' ], [300, 300, '  input'], [400,400, 'output'], [100,200, '    >'] ];

var heroheight = 75; 

// Create the canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 750;
canvas.height = 550;
document.body.appendChild(canvas);

canvas.addEventListener("mousedown", getPosition, false);

function getPosition(event)
{
  var x = event.x;
  var y = event.y;

  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;

  alert("x:" + x + " y:" + y);
}

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


// syntax image
var syntaxReady = true;
var syntaxImage = new Image();
syntaxImage.src = "images/script.png";


//speech bubble
var bubble = new Image();
bubble.src = "images/speechbubble.png";


// Game objects
var hero = {
	speed: 250 // movement in pixels per second
};
var syntax = {};
var syntaxsCaught = 0;


// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);


// Reset the game when the player catches a syntax
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = ground[1]-heroheight;

	// Throw the syntax somewhere on the screen randomly

};

var platforms = function (x,y,width,height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	ctx.fillStyle = "grey";
	ctx.fillRect(this.x, this.y, this.width, this.height);
};

// var syntax = function (x,y, text) {
// 	this.x = x;
// 	this.y = y;
// 	this.text = text;

// };

var check_horiz = function() {
	console.log('enter checkhoriz');
	if (((currplat[0] >= (hero.x+2)) || ((currplat[0]+ currplat[2])<= (hero.x+25))) & (hero.y >= (currplat[1]-heroheight))){
		console.log('inside if checkhoriz');
		check_ground();
		console.log(currplat[1]);
		fall();
	}
};

var fall = function () {
	yVel = 30;
	while (hero.y < ground[1]-heroheight){
		hero.y += yVel;
		yVel += gravity;
	}
};

var check_ground = function(){
	var check = 0; 
	for (i=1; i<list_platforms.length; i++){
        		if (hero.y+heroheight >= list_platforms[i][1]) {
        			if (hero.x >= list_platforms[i][0]) {
        				if (hero.x<= (list_platforms[i][0]+list_platforms[i][2])) {							
	        				currplat = list_platforms[i];
	        				//console.log('before1'); 
	        				check = 1; 
	        				break;
	        			}
	        		}
	        		// else if ((hero.y+100 >= list_platforms[i][1]) && (!((hero.x >= list_platforms[i][0]) || (hero.x<= (list_platforms[i][0]+list_platforms[i][2]))))) {
	        		// 	console.log('well uh');
	        		// 	currplat = ground;
	        		// }
	        	}
	        	//dont recomment
	        	else if ((i>0) && (hero.y>= list_platforms[(i-1)][1])){
	        				currplat = list_platforms[(i-1)][1];
	        				console.log(currplat);
	        				console.log('another');
	        			}
	        	else if ((i<0) && (hero.y>= list_platforms[(i-1)][1])){ 
	        			currplat = list_platforms[(i-1)][1];
	        			console.log(ground);
	        			console.log('another');
		        	}
	        		}

	if (check==0){
		currplat = ground;
		console.log('help me!');
	}


};


var check_syntax = function () {
	for (i=0; i<list_syntax.length; i++){
		if (
			(hero.x <= (list_syntax[i][0]+100)) &&
			(hero.x >= (list_syntax[i][0]-20)) &&
			(hero.y <= (list_syntax[i][1]-90)) &&
			(hero.y <= (list_syntax[i][1] +100))
			) {
				console.log('touching syntax');
			pause();
				break;
		}
	}
};

var pause = function () {
	var check_pause = true;
	if (check_pause){
		ctx.drawImage(bubble, list_syntax[i][0], list_syntax[i][1]);
		ctx.textAlign= "center";
		ctx.fillText(list_syntax[i][2], list_syntax[i][0], list_syntax[i][1]);
		setTimeout(pause, 1000);

	}
};



// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		jump();		
	}
	if (37 in keysDown) { // Player holding left
		hero.x -= hero.speed * modifier;
		check_horiz();
	}
	if (39 in keysDown) { // Player holding right
		hero.x += hero.speed * modifier;
		check_horiz();
	}


	if (jumping){
		yVel += gravity;
    	hero.y += yVel;
    	// check_ground();
    	if (hero.y >= (currplat[1]-heroheight-100)){
    		console.log('ground');
        	yVel = 0;
        	jumping = false;
        	
        }
        else if (hero.y == 420){
        	yVel = 0;
        	jumping = false;
        }
	}
		

	// Are they touching?
	if (
		hero.x <= (syntax.x + 100)
		&& syntax.x <= (hero.x + 50)
		&& hero.y <= (syntax.y + 32)
		&& syntax.y <= (hero.y + 75)
	) {
		++syntaxsCaught;
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

		for (i=0; i < list_syntax.length; i++){
			ctx.drawImage(syntaxImage, list_syntax[i][0], list_syntax[i][1]);
			ctx.fillStyle = "white";
			ctx.font = "16px Helvetica";
			ctx.textBaseline = "top";

			ctx.fillText(list_syntax[i][2], list_syntax[i][0]+25, list_syntax[i][1]+5);
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
	ctx.fillText("Syntax caught: " + syntaxsCaught, 32, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;
	var tempy = hero.y;
	check_ground();
	check_syntax();
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