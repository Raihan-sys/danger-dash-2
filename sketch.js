var boy,boyImg1,boyImg;
var bg,bgImg;
var bg1,bgImg1;
var button,buttonImg;
var PLAY = 0,START = 1,END = 2;
var gameState = PLAY;
var jumpImg;
var invisibleGround;
var rockImg,rock1Img,rockGroup;
var rock2Img;
var score = 0;
var boyImg2;
var gameOver,gameOverImg;
var restart,restartImg;
var music;
var jump,die,restartSound;

function preload(){
  bgImg = loadImage("pg2.png");
  boyImg1 = loadAnimation("a.png","b.png","c.png","d.png","e.png","f.png","g.png","h.png","i.png","j.png");
  boyImg = loadAnimation("a.png");
  buttonImg = loadImage("button1.png");
  jumpImg = loadAnimation("c.png");
  rockImg=loadImage("rock.png");
  rock1Img=loadImage("rock1.png");
  rock2Img = loadImage("rock2.png");
  boyImg2 = loadAnimation("e.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  jump = loadSound("preview.mp3");
  die = loadSound("die.mp3.wav");
  restartSound = loadSound("restart.mp3");

}

function setup() {
  
  createCanvas(windowWidth,windowHeight);
  
  bg = createSprite(250,225,1400,500);
  bg.addImage(bgImg);
  boy = createSprite(-50,320);
  boy.addAnimation("boyStanting",boyImg);
  invisibleGround = createSprite(50,380,200,10);
  invisibleGround.visible = false;
  button = createSprite(250,225);
  button.addImage(buttonImg);
  gameOver = createSprite(250,100);
  gameOver.addImage("gameOver",gameOverImg);
  gameOver.visible = false;
  restart = createSprite(250,225);
  restart.addImage("restart",restartImg);
  restart.visible = false;

  rockGroup = new Group();
  
}

function draw() {
  background("green");
  stroke("black");
  strokeWeight("5");
  fill("white");
  textSize(30);
  text("Score: "+ score, 300,25);
  if (gameState === PLAY) {
    restart.visible = false;
    gameOver.visible = false;
    button.visible = true;
  }

  if(touches.lenght>0 || keyDown("space") && gameState === PLAY){
    start();
    restartSound.play();
    touches = [];
  }
  
  if (touches.lenght>0 || keyDown("space") && gameState === END) {
    gameState = PLAY;
    score = 0;
    boy.x = -50;
    boy.visible = true;
    bg.visible = true;
    touches = [];
    
  }

  if(gameState === START){

    boy.velocityX = 10;

    if (boy.x === 50) {
      boy.velocityX = 0;
    }

    score = score + Math.round(getFrameRate()/60);
    bg.velocityX = -8;

    if(touches.lenght>0 || keyDown("space") && boy.y >= 330){
    jump.play();
    boy.velocityY = -15; 
    touches = [];
    
    }
    
    if(boy.y<330){
      boy.addAnimation("boyRunning",boyImg1);
      boy.changeAnimation("boyRunning");
    }
    
    boy.velocityY = boy.velocityY+0.8; 
    
    if(bg.x<0){
        bg.x = bg.width/2;
      }
    boy.collide(invisibleGround);
    spawnRock(); 
      
    if(rockGroup.isTouching(boy)){
          gameState = END;
          die.play();
          bg.visible = false;
          boy.visible = false;
      } 
  } 
  if(gameState === END) {
    
    gameOver.visible = true;
    restart.visible = true;
    //set velcity of each game object to 0
    bg.velocityX = 0;
    boy.velocityY = 0;
    rockGroup.setVelocityXEach(0);
    rockGroup.destroyEach();
    boy.addAnimation("boyStoped",boyImg2);
    boy.changeAnimation("boyStoped");

    rockGroup.setLifetimeEach(-1);

    textSize(40);
    stroke("black");
    strokeWeight(20);
    fill("white");      
    text("You Got "+score+" Point",80,380);
    

  }  
  
  drawSprites();
}

function start(){
  
  gameState = START;
  
  button.destroy();
    
  boy.addAnimation("boyRunning",boyImg1);
  boy.changeAnimation("boyRunning");
  
}

function spawnRock() {
  if(frameCount % 60 === 0) {
    var rock = createSprite(2000,345,10,40);
    rock.scale = 2;
    rock.velocityX = -8;
    
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: rock.addImage(rockImg);
              break;
              
      case 2: rock.addImage(rock1Img);
        break;

      case 3: rock.addImage(rock2Img);
        break;

      default: break;
    }
    
    rock.scale = 1;
    rock.lifetime = 300;
    //add each obstacle to the group
    rockGroup.add(rock);
  }
}

function getRestart(){

  gameState = PLAY;
  restart.visible = false;
  
}