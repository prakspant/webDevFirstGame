export class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 30;
    this.fontFamily = 'Helvetica';
  }
  draw(ctx)
  {
    ctx.font = this.fontSize + 'px ' + this.fontFamily;
    ctx.textAlign = 'left';
    ctx.fillStyle = this.game.fontColor;
    ctx.fillText('Score: ' + this.game.score, 20, 50);
    ctx.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
    ctx.fillText('Time: ' + this.game.time, 20, 80);
    if (this.game.gameOver){
      ctx.textAlign = 'center';
      if (this.game.score > 20){
        ctx.font = this.fontSize * 2 + 'px ' + this.fontFamily;
        ctx.fillText('Boo-yah', this.game.width * 0.5, this.game.height * 0.5 - 20);
      } else {
      ctx.font = this.fontSize * 2 + 'px ' + this.fontFamily;
      ctx.fillText('Loser', this.game.width * 0.5, this.game.height * 0.5 + 20);
      }
    }

  }
}
