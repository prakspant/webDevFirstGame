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
      this.particles = [];
      this.collisions = [];
      this.enemyTimer = 0;
      this.enemyInterval = 1000;
      this.debug = true;
      this.score = 0;
      this.fontColor = 'black';
      this.time = 0;
      this.maxTime = 60000;
      this.gameOver = false;
      this.player.currentState = this.player.states[0];
      this.player.currentState.enter();
    }
    update(deltaTime)
    {
      this.time += deltaTime;
      this.background.update();

      this.player.update(this.input.keys, deltaTime);
      //handle enemies
      if (this.enemyTimer > this.enemyInterval){
        this.addEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltaTime;
      }
      this.collisions = this.collisions.filter(collision => {
        collision.update(deltaTime);
        return collision.frameX < collision.maxFrame;
      })
      this.enemies = this.enemies.filter(enemy => {
        enemy.update(deltaTime);

        return enemy.x + enemy.width > 0 && enemy.y > -enemy.height - 10;
      });
      if(this.time > this.maxTime) this.gameOver = true;
    }
    draw(ctx)
    {
      ctx.clearRect(0, 0, this.width, this.height);
      this.background.draw(ctx);
      this.player.draw(ctx);
      this.enemies.forEach(enemy => {
        enemy.draw(ctx);
      })
      this.particles = this.particles.filter(particle => {
        particle.update();
        particle.draw(ctx);
        return particle.size > 0.5;
      })
      this.collisions = this.collisions.filter(collision => {
        collision.draw(ctx);
        return collision.frameX < collision.maxFrame;
      })
      this.UI.draw(ctx);
    }
    addEnemy(){
      if (this.speed > 0 && Math.random() < 0.5)
        this.enemies.push(new GroundEnemy(this));
      else if (this.speed > 0)
        this.enemies.push(new ClimbingEnemy(this));
      this.enemies.push(new FlyingEnemy(this));
    }
  }

  const game = new Game(canvas.width, canvas.height);

  let lastTime = 0;
  function animate(timestamp){
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    game.update(deltaTime);
    game.draw(ctx);
    if (!game.gameOver)
      requestAnimationFrame(animate);
  }


  animate(0);
});
