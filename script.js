
let playerState = 'run';
const canvas = document.getElementById('canvas1');
// const dropdown = document.getElementById('animations')

let gameSpeed = 10;

// dropdown.addEventListener('change', function(e){
//   playerState = e.target.value;
// })
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;
const numberOfEnemies = 10;
const enemiesArray = [];
let explosions = [];



const playerImage = new Image();
playerImage.src = 'assets/shadow_dog.png';
const spriteWidth = 575;
const spriteHeight = 523;
const backgroundLayer1 = new Image();
backgroundLayer1.src = 'assets/layer-1.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = 'assets/layer-2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = 'assets/layer-3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = 'assets/layer-4.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src = 'assets/layer-5.png';

let gameFrame = 0;
const staggerFrames = 5;
const spriteAnimations = [];

// enemy1 = {
//   x: 0,
//   y: 0,
//   width: 200,
//   height: 200,
// }


const animationStates = [
  {
    name: 'idle',
    frames: 7,
    },
  {
    name: 'jump',
    frames: 7,
  },
  {
    name: 'fall',
    frames: 7,
  },
  {
    name: 'run',
    frames: 9,
  },
  {
    name: 'dizzy',
    frames: 11,
  },
  {
    name: 'sit',
    frames: 5,
  },
  {
    name: 'roll',
    frames: 7,
  },
  {
    name: 'bite',
    frames: 7,
  },
  {
    name: 'ko',
    frames: 12,
  },
  {
    name: 'getHit',
    frames: 7,
  }
]
animationStates.forEach((state, index) => {
  let frames = {
    loc: [],
  }
  for (let j = 0; j < state.frames; j++){
    let positionX = j * spriteWidth;
    let positionY = index * spriteHeight;
    frames.loc.push({x : positionX, y : positionY});
  }
  spriteAnimations[state.name] = frames;
});

class Game {
  constructor(ctx, width, height)
  {
    this.enemies = [];
    this.#addNewEnemy();
    console.log(this.enemies);
  }
  update()
  {
    this.enemies.forEach(enemy => enemy.update());
  }
  draw()
  {
    this.enemies.forEach(enemy => enemy.draw());
  }
  #addNewEnemy()
  {
    this.enemies.push(new Enemy());
  }
}

class Enemy {
  constructor() {
    this.x = 100;
    this.y = 100;
    this.width = 100;
    this.height = 100;
  }
  update()
  {
    this.x--;
  }
  draw()
  {
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

class Layer {
  constructor(image, speedModifier){
    this.x = 0;
    this.y = 0;
    this.width = 2400;
    this.height = 700;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = gameSpeed * this.speedModifier;
  }
  update(){
    this.speed = gameSpeed * this.speedModifier;
    if (this.x <= -this.width) this.x = 0;
    this.x -= this.speed;
  }
  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
  }
}

class Enemy1 {
  constructor(){
    this.enemy = new Image();
    this.enemy.src = 'assets/enemy1.png'
    this.speed = Math.random() * 4 - 2;
    this.spriteWidth = 293;
    this.spriteHeight = 155;
    this.width = this.spriteWidth / 3;
    this.height = this.spriteHeight / 3;
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.y = Math.random() * (canvas.height - this.height);
    this.x = Math.random() * (canvas.width - this.width);
  }
  update(){
    this.x += Math.random() * 5 - 2.5;
    this.y += Math.random() * 5 - 2.5;
    if (gameFrame % this.flapSpeed == 0)
      this.frame > 4 ? this.frame = 0 : this.frame++;
  }
  draw(){
    ctx.drawImage(this.enemy, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
  }
};

class Enemy2 {
  constructor(){
    this.enemy = new Image();
    this.enemy.src = 'assets/enemy2.png'
    this.speed = Math.random() * 4 + 1;
    this.spriteWidth = 266;
    this.spriteHeight = 188;
    this.width = this.spriteWidth / 3;
    this.height = this.spriteHeight / 3;
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.y = Math.random() * (canvas.height - this.height);
    this.x = Math.random() * (canvas.width - this.width);
  }
  update(){
    this.x -= this.speed;
    this.y += Math.random() * 5 - 2.5;
    if (this.x + this.width < 0) this.x = canvas.width;
    if (gameFrame % this.flapSpeed == 0)
      this.frame > 4 ? this.frame = 0 : this.frame++;
  }
  draw(){
    ctx.drawImage(this.enemy, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
  }
};
// console.log(window.getComputedStyle(document.getElementById('canvas1')).height);
// console.log(canvas.height);
class Enemy3 {
  constructor(){
    this.enemy = new Image();
    this.enemy.src = 'assets/enemy2.png'
    this.speed = Math.random() * 4 + 1;
    this.spriteWidth = 266;
    this.spriteHeight = 188;
    this.width = this.spriteWidth / 3;
    this.height = this.spriteHeight / 3;
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.y = Math.random() * (canvas.height - this.height);
    this.x = Math.random() * (canvas.width - this.width);
    this.angle = Math.random() * 2;
    this.angleSpeed = Math.random() * 0.2;
  }
  update(){
    this.x -= this.speed;
    this.y += Math.sin(this.angle) * (Math.random() * 20) + (Math.random() * 10 - 5);
    this.angle += 0.05;
    if (this.x + this.width < 0) this.x = canvas.width;
    if (this.y - this.height > canvas.height) this.y = 0;     // Make enemies appear from below if they go too high
    if (this.y + this.height < 0) this.y = canvas.height + this.height + 5;     // Make the enemies appear from above if they go too low
    if (gameFrame % this.flapSpeed == 0)
      this.frame > 4 ? this.frame = 0 : this.frame++;
  }
  draw(){
    ctx.drawImage(this.enemy, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
  }
};


class Enemy4 {
  constructor(){
    this.enemy = new Image();
    this.enemy.src = 'assets/enemy2.png'
    this.speed = Math.random() * 4 + 1;
    this.spriteWidth = 266;
    this.spriteHeight = 188;
    this.width = this.spriteWidth / 3;
    this.height = this.spriteHeight / 3;
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.y = Math.random() * (canvas.height - this.height);
    this.x = Math.random() * (canvas.width - this.width);
    this.angle = Math.random() * 2;
    this.angleSpeed = Math.random() * 0.2;
  }
  update(){
    this.x = Math.sin(this.angle * Math.Pi / 180);
    this.y += Math.sin(this.angle) * (Math.random() * 20) + (Math.random() * 10 - 5);
    this.angle += 0.05;
    if (this.x + this.width < 0) this.x = canvas.width;
    if (this.y - this.height > canvas.height) this.y = 0;     // Make enemies appear from below if they go too high
    if (this.y + this.height < 0) this.y = canvas.height + this.height + 5;     // Make the enemies appear from above if they go too low
    if (gameFrame % this.flapSpeed == 0)
      this.frame > 4 ? this.frame = 0 : this.frame++;
  }
  draw(){
    ctx.drawImage(this.enemy, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
  }
};

class Enemy5 {
  constructor(){
    this.enemy = new Image();
    this.enemy.src = 'assets/enemy2.png'
    this.speed = Math.random() * 4 + 1;
    this.spriteWidth = 266;
    this.spriteHeight = 188;
    this.width = this.spriteWidth / 3;
    this.height = this.spriteHeight / 3;
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.y = Math.random() * (canvas.height - this.height);
    this.x = Math.random() * (canvas.width - this.width);
    this.newX = Math.random() * (canvas.width - this.width);
    this.newY = Math.random() * (canvas.height - this.height);
    this.interval = Math.floor(Math.random() * 200 + 50);
  }
  update(){
    if (gameFrame % this.interval === 0){
      this.newX = Math.random() * (canvas.width - this.width);
      this.newY = Math.random() * (canvas.height - this.height);
    }
    let dx = this.x - this.newX;
    let dy = this.y - this.newY;
    this.x -= dx/70;
    this.y -= dy/70;
    this.angle += 0.05;
    if (this.x + this.width < 0) this.x = canvas.width;
    if (this.y - this.height > canvas.height) this.y = 0;     // Make enemies appear from below if they go too high
    if (this.y + this.height < 0) this.y = canvas.height + this.height + 5;     // Make the enemies appear from above if they go too low
    if (gameFrame % this.flapSpeed == 0)
      this.frame > 4 ? this.frame = 0 : this.frame++;
  }
  draw(){
    ctx.drawImage(this.enemy, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
  }
}

class Raven {
  constructor() {
    this.spriteWidth = 271;
    this.spriteHeight = 194;
    this.sizeModifier = Math.random() * 0.6 + 0.4;
    this.width = this.spriteWidth * this.sizeModifier;
    this.height = this.spriteHeight * this.sizeModifier;
    this.x = canvas.width;
    this.y = Math.random() * (canvas.height - this.height);
    this.directionX = Math.random() * 5 + 3;
    this.directionY = Math.random() * 5 - 2.5;
    this.image = new Image();
    this.image.src = 'assets/raven.png';
    this.frame = 0;
    this.maxFrame = 4;
    this.timeSinceFlap = 0;
    this.flapInterval = Math.random() * 50 + 50;
  }

  update(deltaTime){
    if (this.y < 0 || this.y > canvas.height - this.height)
    {
      this.directionY = -this.directionY;
    }
    this.x -= this.directionX;
    this.y += this.directionY;
    if (this.frame > this.maxFrame) this.frame = 0;
    this.timeSinceFlap += deltaTime;
    if (this.timeSinceFlap > this.flapInterval){
      if (this.frame > this.maxFrame) this.frame = 0;
      else this.frame++;
      this.timeSinceFlap = 0;
    }
  }

  draw() {
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
  }
}

const game = new Game(ctx, canvas.width, canvas.height);

const layer1 = new Layer(backgroundLayer1, 0.2);
const layer2 = new Layer(backgroundLayer2, 0.4);
const layer3 = new Layer(backgroundLayer3, 0.6);
const layer4 = new Layer(backgroundLayer4, 0.8);
const layer5 = new Layer(backgroundLayer5, 1);

const layers = [layer1, layer2, layer3, layer4, layer5];

const slider = document.getElementById('slider');
slider.value = gameSpeed;
const showGameSpeed = document.getElementById('showGameSpeed');
showGameSpeed.innerHTML = gameSpeed;
slider.addEventListener('change', function(e){
  gameSpeed = e.target.value;
  showGameSpeed.innerHTML = gameSpeed;
})

for (let i = 0; i < numberOfEnemies; i++)
{
  enemiesArray.push(new Enemy5());
}
class Explosion {
  constructor(x, y){
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.width = this.spriteWidth * 0.7;
    this.height = this.spriteHeight * 0.7;
    this.x = x - this.width / 2;
    this.y = y - this.height / 2;
    this.image = new Image();
    this.image.src = 'assets/boom.png';
    this.frame = 0;
    this.timer = 0;
    this.angle = Math.random() * 6.2;
    this.sound = new Audio();
    this.sound.src = "assets/boom.wav";
  }
  update(){
    if (this.frame === 0) this.sound.play();
      this.timer++;
    if (this.timer % 10 === 0)
      this.frame++;
  }
  draw()
  {
    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.rotate(this.angle);
    ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight, -this.width / 2, -this.height / 2, this.width, this.height);
    ctx.restore();
  }
}

function createAnimation(e) {
  let rect = canvas.getBoundingClientRect();
  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;
  // console.log(x, y);
  explosions.push(new Explosion(x - 25, y - 25));
}

let timeToNextRaven = 0;
let ravenInterval = 500;
let lastTime = 0;
let score = 0;

let ravens = []

ctx.font = '50px Impact';

function drawScore() {
  ctx.fillStyle = 'black';
  ctx.fillText('Score: ' + score, 50, 75);
  ctx.fillStyle = 'white';
  ctx.fillText('Score: ' + score, 55, 80);
}

window.addEventListener('click', function(e) {
  var rect = canvas.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;
  for (i = ravens.length - 1; i >= 0; i--)
  {
    if ((x > ravens[i].x && x < ravens[i].x + ravens[i].width) && (y > ravens[i].y && y < ravens[i].y + ravens[i].height))
    {
      console.log(x, y, ravens[i].x, ravens[i].y);
      ravens.splice(i, 1);
      score++;
      break;
    }
  }
  createAnimation(e);
})

function animate(timestamp)
{
  if (typeof timestamp === 'undefined') {
    timestamp = 0;
  }
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  for (let i = 0; i < layers.length; i++)
  {
    layers[i].update();
    layers[i].draw();
  }
  // enemiesArray.forEach(enemy => {
  //   enemy.draw();
  //   enemy.update();
  // });
  drawScore();
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  timeToNextRaven += deltaTime;
  if (timeToNextRaven > ravenInterval)
  {
    ravens.push(new Raven());
    timeToNextRaven = 0;
  }
  ravens = ravens.filter(raven => {
    raven.update(deltaTime);
    raven.draw();
    return raven.x > -raven.width;
  })
  explosions = explosions.filter(explosion => {
    explosion.update();
    explosion.draw();
    return explosion.frame <= 5;
  });


  game.update();
  game.draw();
  gameFrame++;

  ctx.fillStyle = 'red';
  requestAnimationFrame(animate);
};



animate(0);
