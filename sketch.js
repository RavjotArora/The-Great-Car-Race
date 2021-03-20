var road, roadImg;
var Distancetravelled=0;
var Position=22;
var mainCar, MaincarImg;
var oppcar, oppcar1Img, oppcar2Img;
var oppcar3Img, oppcar4Img;
var obstacle, obstacle1Img;
var obstacle2Img;
var Game_over, GameoverImg;
var CarSound;
var CheerSound;
var Gamestate = "play";



function preload(){
  roadImg = loadImage("Road2.png");
  MaincarImg = loadImage("maincar.png");
  oppcar1Img = loadImage("car1.png");
  oppcar2Img = loadImage("car2.png");
  oppcar3Img = loadImage("car3.png");
  oppcar4Img = loadImage("car4.png");
  obstacle1Img = loadImage("obstacle1.png");
  obstacle2Img = loadImage("obstacle2.png");
  GameoverImg = loadImage("gameOver.png");
  
  CarSound = loadSound("F1Sound.mp3");
  CheerSound = loadSound("Big-crowd-cheering.mp3")

}

function setup() {
 createCanvas(500, 800);
  
  road = createSprite(250,350,20,20);
  road.addImage(roadImg);
  road.velocityY=(18 + 3*Distancetravelled/100);
  
  mainCar = createSprite(250,680,20,20);
  mainCar.addImage(MaincarImg);
  mainCar.scale=1.3;
  
  Game_over=createSprite(250,380);
  Game_over.addImage(GameoverImg);
  Game_over.scale=0.9;
  Game_over.visible=false;
  
  oppCarG=new Group();
  obstacleG=new Group();
 
}

function draw() {
  background(220);
  
   drawSprites();
  
  if(Gamestate === "play"){
  
  if(road.y > 600 ){
    road.y = width/2;
  }
  
  Distancetravelled = Distancetravelled + Math.round(getFrameRate()/60);
  
  if(Distancetravelled>0 && Distancetravelled%500 === 0){
     CheerSound.play();
     }
    
  
  
  if(keyDown("SPACE")){
     CarSound.play();
     }
  
  mainCar.x = World.mouseX;
  
 if(oppCarG.isTouching(mainCar)||obstacleG.isTouching(mainCar)){
       Gamestate="end";
    
    
       
      }
    
    createoppCar();
    createObstacles();
  }
  
  if(Gamestate === "end"){
    
    textSize(20);
    fill(0);
    text(" Press Up Arrow to restart! ",145,430); 
    
    
    road.velocityY=0;
    
    
    
    Game_over.visible=true;
     
    obstacleG.destroyEach();
    obstacleG.setVelocityYEach(0);
    
    oppCarG.destroyEach();
    oppCarG.setVelocityYEach(0);
    
    mainCar.visible=false;
    
   if(keyDown("UP_ARROW")){
      reset();
      }
  
  }

 
  
  
  
  textSize(20);
  fill(255);
  text("Distance: "+ Distancetravelled ,350,30);
  
  
}


function reset(){
    Gamestate= "play";
   
   Game_over.visible=false;
   
   oppCarG.destroyEach();
   obstacleG.destroyEach();
   
   road.velocityY = (18 + 3*Distancetravelled/100);
  
   Distancetravelled=0;
  
  mainCar.visible=true;
  
}

function createoppCar(){
  if (frameCount % 100 == 0) {
    oppcar = createSprite(Math.round(random(50, 350),40, 10, 10));
    
   var rand = Math.round(random(1,4)); 
   switch(rand) {
      case 1:oppcar.addImage(oppcar1Img);   
             break;
      case 2:oppcar.addImage(oppcar2Img);   
             break;
      case 3:oppcar.addImage(oppcar3Img);   
             break;
      case 4:oppcar.addImage(oppcar4Img);   
             break;
      default: break; 
   }
    
    
    oppcar.scale=1.3;
    oppcar.velocityY=(18 + 3*Distancetravelled/100) ;
    oppcar.lifetime=300;
    oppCarG.add(oppcar);
  }
}

function createObstacles(){
  if (frameCount % 120 == 0) {
    obstacle = createSprite(Math.round(random(50, 350),40, 10, 10));
    
   var rand = Math.round(random(1,2)); 
   switch(rand) {
      case 1:obstacle.addImage(obstacle1Img);   
            break;
      case 2:obstacle.addImage(obstacle2Img);   
             break;
      default:break;
    }
    
    obstacle.scale=0.13;
    obstacle.velocityY=(18 + 3*Distancetravelled/100) ;
    obstacle.lifetime=300;
    obstacleG.add(obstacle);
  
  }
   }