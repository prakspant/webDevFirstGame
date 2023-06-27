import {Dust, Fire} from './particles.js';

const states = {
  SITTING: 5,
  RUNNING: 1,
  JUMPING: 2,
  FALLING: 3,
  STANDING: 0,
  ROLLING: 6,
  HIT: 4,
  DIVING: 7
}

class State {
  constructor(state, game)
  {
    this.state = states[state];
    this.game = game;
  }
}

export class Sitting extends State{
  constructor(game) {
    super('SITTING', game);
    this.game.player = player;
  }
  enter() {
    this.game.player.frameY = 5;
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 4;
  }
  handleInput(keys) {
    if (keys.includes('ArrowLeft') || keys.includes('ArrowRight'))
    {
      this.game.player.setState(states.RUNNING, 1);
    } else if(keys.includes('Enter'))
    {
      this.game.player.setState(states.RUNNING, 2);
    }
  }
}

export class Running extends State{
  constructor(game) {
    super('RUNNING', game);
    this.game.player = player;
  }
  enter() {
    this.game.player.frameY = 3;
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 8;
  }
  handleInput(keys) {
    this.game.particles.push(new Dust(this.game, this.game.player.x, this.game.player.y))
    if (keys.includes('ArrowDown'))
    {
      this.game.player.setState(states.SITTING, 0);
    } else if(keys.includes('ArrowUp')){
      this.game.player.setState(states.JUMPING, 1);
    } else if(keys.includes('Enter'))
    {
      this.game.player.setState(states.ROLLING, 2);
    }
  }
}

export class Jumping extends State{
  constructor(game) {
    super('JUMPING', game);
    this.game.player = player;
  }
  enter() {
    if (this.game.player.onGround()) this.game.player.vy = -31;
    this.game.player.frameY = 1;
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 5;
  }
  handleInput(keys) {
    if (this.game.player.vy > 0)
    {
      this.game.player.setState(states.FALLING, 1);
    } else if(keys.includes('Enter'))
    {
      this.game.player.setState(states.ROLLING, 2);
    } else if (keys.includes('ArrowDown')){
      this.game.player.setState(states.ROLLING, 0);
    }
  }
}

export class Falling extends State{
  constructor(game) {
    super('FALLING', game);
    this.game.player = player;
  }
  enter() {
    this.game.player.frameY = 2;
    this.game.player.frameX = 0;
  }
  handleInput(keys) {
    if (this.game.player.onGround())
    {
      this.game.player.setState(states.RUNNING, 1);
    } else if (keys.includes('ArrowDown')){
      this.game.player.setState(states.ROLLING, 0);
    }
  }
}


export class Standing extends State{
  constructor(game) {
    super('STANDING', game);
    this.game.player = player;
  }
  enter() {
    this.game.player.frameY = 0;
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 5;
  }
  handleInput(keys) {
    if (this.game.player.onGround() && keys.includes('ArrowUp'))
    {
      this.game.player.setState(states.JUMPING, 1);
    }
    else if (keys.includes('ArrowDown'))
    {
      this.game.player.setState(states.SITTING, 0);
    }
    else if (keys.includes('ArrowRight') || keys.includes('ArrowLeft'))
    {
      this.game.player.setState(states.RUNNING, 1);
    }
  }
}


export class Rolling extends State{
  constructor(game) {
    super('ROLLING', game);
    this.game.player = player;
  }
  enter() {
    this.game.player.frameY = 6;
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 5;
  }
  handleInput(keys) {
    this.game.particles.push(new Fire(this.game, this.game.player.x, this.game.player.y))
    if (!keys.includes('Enter') && this.game.player.onGround()){
      this.game.player.setState(states.RUNNING, 1);
    } else if(!keys.includes('Enter') && !this.game.player.onGround()){
      this.game.player.setState(states.FALLING, 1);
    } else if (keys.includes('Enter') && keys.includes('ArrowUp') && this.game.player.onGround()){
      this.game.player.setState(states.JUMPING, 1)
    } else if (keys.includes('ArrowDown')){
      this.game.player.setState(states.ROLLING, 0);
    }
  }
}

export class Diving extends State{
  constructor(game) {
    super('DIVING', game);
    this.game.player = player;
  }
  enter() {
    this.game.player.frameY = 6;
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 5;
    this.game.player.vy = 100;
  }
  handleInput(keys) {
    this.game.particles.push(new Fire(this.game, this.game.player.x, this.game.player.y))
    if (this.game.player.onGround()){
      this.game.player.setState(states.RUNNING, 1);
    } else if(keys.includes('Enter') && this.game.player.onGround()){
      this.game.player.setState(states.ROLLING, 2);
    }
  }
}

export class Hit extends State {
  constructor(game) {
    super('HIT', game);
    this.game.player = player;
  }
  enter() {
    this.game.player.frameY = 4;
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 10;
  }
  handleInput(keys) {
    if (this.game.player.frameX >= 10 && this.game.player.onGround()){
      this.game.player.setState(states.RUNNING, 1);
    } else if(this.game.player.frameX >= 10 && !this.game.player.onGround()){
      this.game.player.setState(states.FALLING, 1);
    }
  }
}
