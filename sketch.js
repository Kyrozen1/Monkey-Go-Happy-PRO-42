var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana, bananaImg;
var stone, stoneImg;
var FoodGroup, ObstacleGroup;
var score = 0;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImg = loadImage("banana.png");
  stoneImg = loadImage("stone.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,50,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,330,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  FoodGroup = new Group();
  ObstacleGroup = new Group();
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
    if(backgr.x<100){
      backgr.x=backgr.width/2;
    }
  
    if(keyDown("space") ) {
      player.velocityY = -14;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    spawnfood();
    spawnobstacle();

    if(FoodGroup.isTouching(player)){
      FoodGroup.destroyEach();
      score = score+2;
      player.scale += + 0.02;
    }
    if(ObstacleGroup.isTouching(player)){
      gameState = END;
    }
  }else if(gameState === END){
      backgr.velocityX = 0;
      player.visible = false;
      backgr.visible = false;
      FoodGroup.destroyEach();
      ObstacleGroup.destroyEach();

      textSize(30);
      fill(255);
      text("Game Over!", 290, 200);
      textSize(25);
      fill(255);
      text("Score:" + score, 330, 150);
  }
  drawSprites();
}

function spawnfood(){
  if(frameCount%160===0){
    banana = createSprite(800,250,40,10);
    banana.y = random(120,200);
    banana.addImage("banana",bananaImg);
    banana.scale = 0.05;
    banana.velocityX = -9;
    banana.lifetime = 250;
    player.depth = banana.depth+1;
    FoodGroup.add(banana);
  }
}

function spawnobstacle(){
  if(frameCount%260===0){
  stone = createSprite(800,330,40,40);
  stone.addImage("stone",stoneImg);
  stone.scale=0.2;
  stone.velocityX=-9;
  stone.lifetime=300;
  stone.depth = ground.depth+1;
  ObstacleGroup.add(stone);
  }
}