import {Sitting, Running, Jumping, Falling, Standing} from './playerStates.js';

export class Player {
  constructor(game)
  {
    this.game = game;
    this.width = 573;
    this.height = 523;
    this.widthInCanvas = 100;
    this.heightInCanvas = 100;
    this.x = 0;
    this.y = this.game.height - this.heightInCanvas;
    this.weight = 1;
    this.vy = 0;
    this.image = document.getElementById('player');
    this.maxFrame = 5;
    this.fps = 20;
    this.frameInterval = 1000/this.fps;
    this.frameX = 0;
    this.frameY = 0;
    this.speed = 0;
    this.maxSpeed = 10;
    this.states = [new Sitting(this), new Running(this), new Jumping(this), new Falling(this), 0, new Standing(this)];
    this.currentState = this.states[5];
  }
  update(keys, deltaTime)
  {
    this.currentState.handleInput(keys);
    // Horizontal movement
    this.x += this.speed;
    if (keys.includes('ArrowRight')) this.speed = this.maxSpeed;
    else if (keys.includes('ArrowLeft')) this.speed = -this.maxSpeed;
    else this.speed = 0;
    if (this.x < 0) this.x = 1
    if (this.x > this.game.width - this.widthInCanvas) this.x = this.game.width - this.widthInCanvas;
    // Vertical movement
    this.y += this.vy;
    if (!this.onGround()) this.vy += this.weight;
    else this.vy = 0;
    //sprite Animation
    if (this.frameX < this.maxFrame) this.frameX++;
    else this.frameX = 0;
  }
  draw(ctx)
  {
    ctx.fillStyle = 'red';
    ctx.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.widthInCanvas, this.heightInCanvas);
  }
  onGround()
  {
    return this.y >= this.game.height - this.heightInCanvas;
  }
  setState(state)
  {
    this.currentState = this.states[state];
    this.currentState.enter(state);
  }
}
