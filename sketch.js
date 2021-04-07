var bg,bg_image
var ghost,ghostjump,ghoststand;
var gamestate="play"
var door,door_image;
var climber,iclimber,climber_image,climber_group
var mclimber_group
var sound1
function preload(){
  bg_image=loadImage("tower.png")
  ghostjump=loadImage("ghost-jumping.png")
  ghoststand=loadImage("ghost-standing.png")
  door_image=loadImage("door.png")
  climber_image=loadImage("climber.png")
  sound1=loadSound("spooky.wav")
}




 function setup(){
  createCanvas(400,600)
  background("white")
  
   sound1.loop();
   climber_group= new Group();
   mclimber_group= new Group();
   
   door_group=new Group();
   
   
   
   
  bg=createSprite(200,300,400,600)
  
  bg.addImage("bg",bg_image)
  bg.scale=0.7
  ghost=createSprite(200,300,20,20)
  ghost.addImage("ghostjump",ghostjump)
  ghost.debug=false
   ghost.setCollider("rectangle",1,20,250,250)
  ghost.addImage("ghoststand",ghoststand)
  ghost.scale=0.3
 }

 function draw(){
   if(gamestate==="play"){
     bg.velocityY=-2
 if(bg.y<150){
 bg.y=300
 }
     
     
     
 ghost.velocityY=5
     
     createDoor()
 if(ghost.velocityY===5){
 ghost.changeImage("ghoststand",ghoststand)
 }
 ghostMove()
   
  ghost.bounceOff(climber_group)
   if(ghost.isTouching(mclimber_group)||ghost.y>600){
   gamestate="end"
   }
   }
      
   
console.log(gamestate)
   drawSprites();
   if(gamestate === "end"){
   
   door_group.destroyEach();
   ghost.destroy();

   mclimber_group.destroyEach();
   bg.velocityY=0
   fill("red")
   textSize(30)
   text("YOU LOSE",150,300)
     
   }

 }
function ghostMove(){
  
if(keyDown("SPACE")){
ghost.y=ghost.y-10
ghost.changeImage("ghostjump",ghostjump)
}
  
if(keyDown(LEFT_ARROW)){
ghost.x=ghost.x-2
}
  if(keyDown(RIGHT_ARROW)){
ghost.x=ghost.x+2
}
  
  
}
function createDoor(){
if(frameCount%200===0){
door=createSprite(Math.round(random(50,350)),-50,20,5)
door.velocityY=2
door.addImage("door",door_image)
climber=createSprite(door.x,door.y+60,20,20)
climber.addImage("climber",climber_image)
climber.velocityY=2
climber.debug=false
climber.setCollider("rectangle",1,7,100,10)
iclimber=createSprite(door.x,door.y+53,100,5)
iclimber.velocityY=2
iclimber.visible=false
iclimber.debug=false
  climber_group.add(iclimber)
  mclimber_group.add(climber)
  door_group.add(door)
}
  
  
  
  
  
}
  
  






