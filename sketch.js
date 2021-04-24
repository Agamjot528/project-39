var bluecarimage,greencarimage,redcarimage,bikeimage,roadimage,gameOverimage,restartimage;
var road,bike;
var score=0;
var life=10;
var car;
var carGroup;
var gameState="PLAY";

function preload(){
  bluecarimage=loadImage("blue car.png");
  greencarimage=loadImage("green car.png");
  redcarimage=loadImage("red car.png");
  roadimage=loadImage("road.png");
  bikeimage=loadImage("bike.png");
  gameOverimage=loadImage("game over.png");
  restartimage=loadImage("ReStart.png");
}


function setup() {
  createCanvas(600,200);
  road = createSprite(300,180,300,10);
  road.scale=1;
  road.addImage(roadimage);
  road.velocityX=-5;
  
  bike = createSprite(300,100,10,10);
  bike.scale=0.15;
  bike.debug=false;
  bike.setCollider("rectangle", 50, 0, 600, 200);
  bike.addImage(bikeimage);
  
  gameover=createSprite(300,30,5,5);
  gameover.addImage(gameOverimage);
  gameover.scale=0.3;
  
  restart=createSprite(300,100,5,5);
  restart.addImage(restartimage);
  restart.scale=0.23;

  
  carGroup= new Group();
  
}

function draw() {
  background("black");
  
  if (gameState==="PLAY"){
    
    car();
    gameover.visible=false;
    restart.visible=false;
    
    if (bike.x>600 || bike.x<0 || bike.y>200 || bike.y<0){
      life=life-1;
      bike.x=300;
      bike.y=100;
      carGroup.destroyEach();
    }
   
  if(keyDown("up")){
      bike.y=bike.y-3;
    }

    if(keyDown("up")){
      bike.y=bike.y-3;
    }
    
    if(keyDown("down")){
      bike.y=bike.y+3;
    }
    
    if(keyDown("left")){
      bike.x=bike.x-3;
    }
    
    if(keyDown("right")){
      bike.x=bike.x+3;
    }
    
    if(road.x<0){
      road.x=road.width/2;
    }
    
    if(carGroup.isTouching(bike)){
      life=life-1;
      carGroup.destroyEach();
    }
    
    if(life===0){
      gameState="END";
    }
    score = score + Math.round(getFrameRate()/60);

  }
  
 if(gameState==="END"){
   gameover.visible=true;
   restart.visible=true;
   road.visible=false;
   bike.visible=false;
   
   if(mousePressedOver(restart) ) {
      reset();
    }
 } 
  
 camera.position.x=bike.x;
 camera.position.y=100; 
  
  drawSprites();
  
  stroke("white")
  textSize(22);
  fill("white");
  text("life: "+life,bike.x-280,30);
  text("score: "+score,bike.x+200,30);
}


function car(){
  if (frameCount % 40 === 0 ){
 var car = createSprite(650,Math.round(random(25,175)),10,10);
  car.velocityX=-5;
  car.scale=0.5;
  car.lifetime=140;
 //   car.debug=true;
    car.setCollider("rectangle", 0, 3, 230, 100);
    
  carimage=Math.round(random(1,3))
  switch (carimage){
  
    case 1: car.addImage(bluecarimage);
       break;
       
    case 2: car.addImage(greencarimage);
       break;
     
    case 3: car.addImage(redcarimage);  
    }
     carGroup.add(car);
  }
}

function reset(){
  gameState="PLAY";
  road.visible=true;
  bike.visible=true;
  carGroup.destroyEach();
  score=0;
  life=10;
}
