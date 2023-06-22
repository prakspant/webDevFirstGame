const states = {
  SITTING: 5,
  RUNNING: 1,
  JUMPING: 2,
  FALLING: 3,
  STANDING: 0,
  ROLLING: 6,
  HIT: 4,
  DIVING: 6
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
      this.player.setState(states.RUNNING, 1);
    } else if(keys.includes('ArrowUp'))
    {
      this.player.setState(states.JUMPING, 1);
    }
    else if (keys.length === 0)
    {
      this.player.setState(states.STANDING, 0)
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
      this.player.setState(states.SITTING, 0);
    } else if(keys.includes('ArrowUp')){
      this.player.setState(states.JUMPING, 1);
    }
    else if (!keys.includes('ArrowDown') && !keys.includes('ArrowRight') && !keys.includes('ArrowLeft')){
      this.player.setState(states.STANDING, 0)
    }
  }
}

export class Jumping extends State{
  constructor(player) {
    super('JUMPING');
    this.player = player;
  }
  enter() {
    if (this.player.onGround()) this.player.vy = -31;
    this.player.frameY = 1;
    this.player.frameX = 0;
    this.player.maxFrame = 5;
  }
  handleInput(keys) {
    if (this.player.vy > 0)
    {
      this.player.setState(states.FALLING, 1);
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
      this.player.setState(states.RUNNING, 1);
    }
    else if (this.player.onGround() && keys.includes('ArrowDown'))
    {
      this.player.setState(states.SITTING, 0);
    }
    else if (this.player.onGround()){
      this.player.setState(states.STANDING, 0)
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
      this.player.setState(states.JUMPING, 1);
    }
    else if (keys.includes('ArrowDown'))
    {
      this.player.setState(states.SITTING, 0);
    }
    else if (keys.includes('ArrowRight') || keys.includes('ArrowLeft'))
    {
      this.player.setState(states.RUNNING, 1);
    }
  }
}


export class Rolling extends State{
  constructor(player) {
    super('ROLLING');
    this.player = player;
  }
  enter() {
    this.player.frameY = 6;
    this.player.frameX = 0;
    this.player.maxFrame = 5;
  }
  handleInput(keys) {
    if (!keys.includes('Enter') && this.player.onGround()){
      this.player.setState(states.RUNNING, 1);
    } else if(!keys.includes('Enter') && !this.player.onGround()){
      this.player.setState(states.FALLING, 1);
    }
  }
}
