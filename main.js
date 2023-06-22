import {Player} from './player.js';
import {InputHandler} from './input.js';
import {Background} from './background.js';
import {FlyingEnemy, ClimbingEnemy, GroundEnemy} from './enemies.js';
import {UI} from './UI.js';

window.addEventListener('load', function(e){
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  canvas.width = 1500;
  canvas.height = 700;

class Game {
    constructor(width, height)
    {
      this.width = width;
      this.height = height;
      this.groundMargin = 117;
      this.speed = 0;
      this.maxSpeed = 4;
      this.background = new Background(this);
      this.player = new Player(this);
      this.input = new InputHandler(this);
      this.UI = new UI(this);
      this.enemies = [];
      this.enemyTimer = 0;
      this.enemyInterval = 1000;
      this.debug = true;
      this.score = 0;
      this.fontColor = 'black';
    }
    update(deltaTime)
    {
      this.background.update();

      this.player.update(this.input.keys, deltaTime);
      //handle enemies
      if (this.enemyTimer > this.enemyInterval){
        this.addEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltaTime;
      }
      this.enemies = this.enemies.filter(enemy => {
        enemy.update(deltaTime);

        return enemy.x + enemy.width > 0 && enemy.y > -enemy.height - 10;
      })
    }
    draw(ctx)
    {
      ctx.clearRect(0, 0, this.width, this.height);
      this.background.draw(ctx);
      this.player.draw(ctx);
      this.enemies.forEach(enemy => {
        enemy.draw(ctx);
      })
      this.UI.draw(ctx);
    }
    addEnemy(){
      if (this.speed > 0 && Math.random() < 0.5)
        this.enemies.push(new GroundEnemy(this));
      else if (this.speed > 0)
        this.enemies.push(new ClimbingEnemy(this));
      this.enemies.push(new FlyingEnemy(this));
      console.log(this.enemies);
    }
  }

  const game = new Game(canvas.width, canvas.height);

  let lastTime = 0;
  console.log(game.player.frameY);

  function animate(timestamp){
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    game.draw(ctx);
    game.update(deltaTime);
    requestAnimationFrame(animate);
  }

  animate(0);
});
