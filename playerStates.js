const states = {
  SITTING: 5,
  RUNNING: 1,
  JUMPING: 2,
  FALLING: 3,
  STANDING: 0
}

class State {
  constructor(state)
  {
    this.state = states[state];
  }
}

export class Sitting extends State{
  constructor(player) {
    super('SITTING');
    this.player = player;
  }
  enter() {
    this.player.frameY = 5;
    this.player.frameX = 0;
    this.player.maxFrame = 4;
  }
  handleInput(keys) {
    if (keys.includes('ArrowLeft') || keys.includes('ArrowRight'))
    {
      this.player.setState(states.RUNNING);
    } else if(keys.includes('ArrowUp'))
    {
      this.player.setState(states.JUMPING);
    }
    else if (keys.length === 0)
    {
      this.player.setState(states.STANDING)
    }
  }
}

export class Running extends State{
  constructor(player) {
    super('RUNNING');
    this.player = player;
  }
  enter() {
    this.player.frameY = 3;
    this.player.frameX = 0;
    this.player.maxFrame = 8;
  }
  handleInput(keys) {
    if (keys.includes('ArrowDown') && !keys.includes('ArrowRight') && !keys.includes('ArrowLeft'))
    {
      this.player.setState(states.SITTING);
    } else if(keys.includes('ArrowUp')){
      this.player.setState(states.JUMPING);
    }
    else if (!keys.includes('ArrowDown') && !keys.includes('ArrowRight') && !keys.includes('ArrowLeft')){
      this.player.setState(states.STANDING)
    }
  }
}

export class Jumping extends State{
  constructor(player) {
    super('JUMPING');
    this.player = player;
  }
  enter() {
    if (this.player.onGround()) this.player.vy = -33;
    this.player.frameY = 1;
    this.player.frameX = 0;
    this.player.maxFrame = 5;
  }
  handleInput(keys) {
    if (this.player.vy > 0)
    {
      this.player.setState(states.FALLING);
    }
  }
}

export class Falling extends State{
  constructor(player) {
    super('FALLING');
    this.player = player;
  }
  enter() {
    this.player.frameY = 2;
    this.player.frameX = 0;
  }
  handleInput(keys) {
    if (this.player.onGround() && (keys.includes('ArrowRight') || keys.includes('ArrowLeft')))
    {
      this.player.setState(states.RUNNING);
    }
    else if (this.player.onGround() && keys.includes('ArrowDown'))
    {
      this.player.setState(states.SITTING);
    }
    else if (this.player.onGround()){
      this.player.setState(states.STANDING)
    }
  }
}


export class Standing extends State{
  constructor(player) {
    super('STANDING');
    this.player = player;
  }
  enter() {
    this.player.frameY = 0;
    this.player.frameX = 0;
    this.player.maxFrame = 5;
  }
  handleInput(keys) {
    if (this.player.onGround() && keys.includes('ArrowUp'))
    {
      this.player.setState(states.JUMPING);
    }
    else if (keys.includes('ArrowDown'))
    {
      this.player.setState(states.SITTING);
    }
    else if (keys.includes('ArrowRight') || keys.includes('ArrowLeft'))
    {
      this.player.setState(states.RUNNING);
    }
  }
}
