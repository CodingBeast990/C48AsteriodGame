var bg, bgImg;
var earth, earthImg;
var plane, planeImg;
var rocket, rocketImg;
var asteriod, asteriodImg;
var rocketGrp, asteriodGrp;

var asteriodSpeed = 3;
var gameState = "play";

function preload(){
	bgImg = loadImage("spaceBg.jpg");
	earthImg = loadImage("EarthImageEdited.png");
	planeImg = loadImage("jetplane.png");
	rocketImg = loadImage("rocket.png");
	asteriodImg = loadImage("asteriod.png");
}

function setup() {
	createCanvas(530, 870);
	
	bg = createSprite(100,100);
	bg.addImage(bgImg);
	bg.scale = 0.6;

	earth = createSprite(270, 950);
	earth.addImage(earthImg);
	earth.scale = 2;

	plane = createSprite(270, 580);
	plane.addImage(planeImg);
	plane.scale = 0.7;

	rocketGrp = new Group();
	asteriodGrp = new Group();
}

function draw() {
	background(0);
	drawSprites();
	
	// Sort code into game states
	if (gameState === "play") {
		// Move plane with mouse
		plane.x = World.mouseX; 

		// Shoot rocket on space key press
		if (keyWentDown("SPACE")) {
			rocket = createSprite(plane.x, plane.y - 90, 20, 20);
			rocket.addImage(rocketImg);
			rocket.scale = 0.1;
			rocket.velocityY = -20;
			rocketGrp.add(rocket);	
		}

		// Spawn asteroids
		spawnAsteriods();

		// Rockets destroy asteroids
		if (asteriodGrp.isTouching(rocketGrp)) {
			for (var i = 0; i < asteriodGrp.length; i++) {
				if (asteriodGrp[i].isTouching(rocketGrp)) {
					asteriodGrp[i].destroy();
					rocketGrp.destroyEach();
					asteriodSpeed += 1;
				}
			}
		}

		// Plane gets hit
		if (asteriodGrp.isTouching(plane)) {
			gameState = "end";
		}
	}

	// Game over state
	if (gameState === "end") {
		asteriodGrp.setVelocityYEach(0);
		rocketGrp.setVelocityYEach(0);

		fill("white");
		textSize(30);
		text("Game Over", 200, 400);

	}

}

function spawnAsteriods() {
	if(frameCount % 60 === 0) {
		asteriod = createSprite(random(130, 470), -950, 20,20);
		asteriod.addImage(asteriodImg);
		asteriod.velocityY = asteriodSpeed * 1.5;
		asteriod.scale = 0.5;
		asteriodGrp.add(asteriod);
	}
}