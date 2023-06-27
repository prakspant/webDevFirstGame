class Particle {
  constructor(game){
    this.game = game;
  }
  update(){
    this.x -= this.speedX + this.game.speed;
    this.y -= this.speedY;
    this.size *= 0.95;
    // Got to delete the particle if this.size < 0.5
  }
}


export class Dust extends Particle {
  constructor(game, x, y){
    super(game);
    this.size = Math.random() * 10 + 10;
    this.x = x;
    this.y = y;
    this.speedX = Math.random();
    this.speedY = Math.random();
    this.color = 'black';
  };
  draw(ctx){
    ctx.beginPath();
    ctx.arc(this.x + this.game.player.widthInCanvas / 2, this.y + this.game.player.heightInCanvas, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

export class Splash extends Particle {

}

export class Fire extends Particle {
  constructor(game, x, y){
    super(game);
    this.image = document.getElementById('fire');
    this.size = Math.random() * 100 + 50;
    this.x = x;
    this.y = y;
    this.speedX = 1;
    this.speedY = 1;
    this.angle = 0;
    this.va = Math.random() * 0.2 - 0.1;
  }
  update(){
    super.update();
    this.angle += this.va;
  }
  draw(ctx){
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.drawImage(this.image, 0, 0, this.size, this.size);
    ctx.restore();
  }
}
