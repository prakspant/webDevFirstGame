import {Player} from './player.js';
import {InputHandler} from './input.js';

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
      this.groundMargin = 50;
      this.player = new Player(this);
      this.input = new InputHandler();
    }
    update(deltaTime)
    {
      this.player.update(this.input.keys, deltaTime);
    }
    draw(ctx)
    {
      ctx.clearRect(0, 0, this.width, this.height);
      this.player.draw(ctx);
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
