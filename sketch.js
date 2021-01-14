var dog, dogImg, happyDog, happyDogImg;
var database;
var foodS, foodStock;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
	//load images here
}

function setup() {
  createCanvas(800, 700);

  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value", readStock, showError);
  
  dog = createSprite(400,400,10,10);
  dog.addImage(dogImg)
  dog.scale = 0.2;
}


function draw() { 
  background(46, 139, 87); 

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  if(keyWentUp(UP_ARROW)){
    dog.addImage(dogImg);
  }

  drawSprites();
  //add styles here

  fill("black")
  textSize(30)
  text("Food Available:" + foodS,225,200)
  fill("black")
  textSize(30)
  text("Press the Up arrow to feed the Dog",170,100)

}

function writeStock(x){
  if(x<=0){
    x = 0;
  } else {
    x = x-1
  }
  database.ref('/').update({
    Food: x
  })
}
function readStock(data){
  foodS = data.val()
}

function showError(){
  console.log("error")
}