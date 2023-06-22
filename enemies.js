class Enemy {
  constructor()
  {
    this.frameX = 0;
    this.frameY = 0;
    this.fps = 20;
    this.frameInterval = 1000/this.fps;
    this.frameTimer = 0;
  }
  update(deltaTime){
    // movement
    this.x -= this.speedX + this.game.speed;
    this.y += this.speedY;
    if (this.frameTimer > this.frameInterval){
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    } else {
      this.frameTimer += deltaTime;
    }
    // check if off screen
  }
  draw(ctx){
    if (this.game.debug) ctx.strokeRect(this.x, this.y, this.width / 3, this.height / 3);
    ctx.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width / 3, this.height / 3);
    // ctx.strokeRect(this.x, this.y, this.width / 3, this.height / 3);
  }
}

export class FlyingEnemy extends Enemy {
  constructor(game)
  {
    super();
    this.game = game;
    this.x = this.game.width;
    this.width = 293;
    this.height = 155;
    this.y = Math.random() * this.game.height * 0.5;
    this.speedX = Math.random() + 2;
    this.speedY = 0;
    this.maxFrame = 5;
    this.image = document.getElementById('enemy_fly');
    this.angle = 0;
    this.va = Math.random() * 0.1 + 0.1;
  }
  update(deltaTime){
    super.update(deltaTime);
    this.angle += this.va;
    this.y += Math.sin(this.angle);
  }
}

export class GroundEnemy extends Enemy {
  constructor(game){
    super();
    this.game = game;
    this.width = 213;
    this.height = 212;
    this.x = this.game.width;
    this.y = this.game.height - this.game.groundMargin - 70;
    this.image = document.getElementById('enemy_ground');
    this.speedX = 0;
    this.speedY = 0;
    this.maxFrame = 8;
  }
}

export class ClimbingEnemy extends Enemy {
  constructor(game){
    super();
    this.game = game;
    this.height = 177;
    this.width = 218;
    this.x = this.game.width;
    this.y = Math.random() * this.game.height * 0.5;
    this.image = document.getElementById('enemy_climb');
    this.speedX = 0;
    this.speedY = Math.random() > 0.5 ? 1 : -1;
    this.maxFrame = 5;
  }
  update(deltaTime){
    super.update(deltaTime);
    if (this.y > this.game.height - this.height) this.speedY *= -1;
  }
  draw(ctx){
    super.draw(ctx);
    ctx.beginPath();
    ctx.moveTo(this.x + this.width / 6.5, 0);
    ctx.lineTo(this.x + this.width / 6.5, this.y);
    ctx.stroke();
  }
}
