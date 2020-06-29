function load_images(){
	virus_image = new Image;
	virus_image.src = "game_img/v2.png";

	player_img = new Image;
	player_img.src = "game_img/528098.svg";

	gem_image = new Image;
	gem_image.src = "game_img/528101.svg";

}

function init(){

	canvas = document.getElementById("mycanvas");
	console.log(canvas);

	//Change the height and width of the canvas using Javascript
	W = 1150
	H = 520

	canvas.width = W
	canvas.height = H


	// try to work with canvas
	pen = canvas.getContext('2d');
	console.log(pen);

	score = 0;
	game_over = false;

// We want to create a box
// JSON Objects

	e1 = {
		x : 150,
		y : 50,
		w : 60,
		h : 60,
		speed : 20,
	};
	e2 = {
		x : 300,
		y : 150,
		w : 60,
		h : 60,
		speed : 30,
	};
	e3 = {
		x : 450,
		y : 20,
		w : 60,
		h : 60,
		speed : 40,
    };
    e4 = {
		x : 600,
		y : 160,
		w : 60,
		h : 60,
		speed : 50,
    };
    e5 = {
		x : 750,
		y : 100,
		w : 60,
		h : 60,
		speed : 60,
    };
    e6 = {
		x : 900,
		y : 120,
		w : 60,
		h : 60,
		speed : 70,
	};
	enemy = [e1,e2,e3,e4,e5,e6];

	player = {
		x : 20,
		y : H/2,
		w : 60,
		h : 60,
		speed : 20,
		moving : "false",
	}
	gem = {
		x : W-100,
		y : H/2,
		w : 60,
		h : 60,
	}
	//Create an event listener
	canvas.addEventListener('mousedown',function(){
		console.log("You pressed the mouse");
		player.moving = true;
	});
	canvas.addEventListener('mouseup',function(){
		console.log("You released the mouse");
		player.moving = false;
	});
	

}
// Game Loop
function draw(){

	//Clear the old screen (entire area)
	pen.clearRect(0,0,W,H);

	pen.fillStyle = "red";

	pen.drawImage(player_img,player.x,player.y,player.w,player.h);
	pen.drawImage(gem_image,gem.x,gem.y,gem.w,gem.h);

	for(let i=0;i<enemy.length;i++){
		pen.drawImage(virus_image,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);
	}
	pen.fillStyle = "white";
	pen.fillText("Score " + score,10,10);
}

function isColliding(b1,b2){
	if(Math.abs(b1.x - b2.x)<=30 && Math.abs(b1.y-b2.y)<=30){
		return true;
	}
	return false;
}

function update(){

	//player state
	if(player.moving==true){
		player.x += player.speed;
		score += 20;
	}
	//Looop check collision btw corona and player
	for(let i=0;i<enemy.length;i++){
		if(isColliding(enemy[i],player)){
			score -= i*100;
			if(score<0){
				game_over = true;
				alert("Game Over");
			}

		}
	}

	//collision gem and player
	if(isColliding(gem,player)){
		game_over = true;
		draw();
		alert("You score" +score);
	}

	for(let i=0;i<enemy.length;i++){
		enemy[i].y += enemy[i].speed;
		if(enemy[i].y >H - enemy[i].h || enemy[i].y<0 ){
			enemy[i].speed *= -1;
		}
	}
	
}

function gameloop(){
	if(game_over==true){
		clearInterval(frame);
	}
	draw();
	update();
}

//start of the game
load_images();
init();

//repeated call gameloop
var frame = setInterval(gameloop,100);
