import React from 'react';
import './App.css';
const firstSoundsGroup = [
{
  keyCode: 81,
  key: 'Q',
  id: 'Heater-1',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
},
{
  keyCode: 87,
  key: 'W',
  id: 'Heater-2',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
},
{
  keyCode: 69,
  key: 'E',
  id: 'Heater-3',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
},
{
  keyCode: 65,
  key: 'A',
  id: 'Heater-4',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
},
{
  keyCode: 83,
  key: 'S',
  id: 'Clap',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
},
{
  keyCode: 68,
  key: 'D',
  id: 'Open-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
},
{
  keyCode: 90,
  key: 'Z',
  id: "Kick-n'-Hat",
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
},
{
  keyCode: 88,
  key: 'X',
  id: 'Kick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
},
{
  keyCode: 67,
  key: 'C',
  id: 'Closed-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
}
];

const secondSoundsGroup = [
{
  keyCode: 81,
  key: 'Q',
  id: 'Chord-1',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
},
{
  keyCode: 87,
  key: 'W',
  id: 'Chord-2',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
},
{
  keyCode: 69,
  key: 'E',
  id: 'Chord-3',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
},
{
  keyCode: 65,
  key: 'A',
  id: 'Shaker',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
},
{
  keyCode: 83,
  key: 'S',
  id: 'Open-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
},
{
  keyCode: 68,
  key: 'D',
  id: 'Closed-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
},
{
  keyCode: 90,
  key: 'Z',
  id: 'Punchy-Kick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
},
{
  keyCode: 88,
  key: 'X',
  id: 'Side-Stick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
},
{
  keyCode: 67,
  key: 'C',
  id: 'Snare',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
}
];



class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      volume: 0.3,
       display: ''
    };
  }

  handleDisplay = (id) => { // New handler for updating the display
    this.setState({display: id});
  }

  handleVolumeChange = (e) => {
    this.setState({volume: e.target.value});
  }

  render() {
    return (
      <div id="drum-machine">
        <div id="display">
          <Keyboard soundKeys={firstSoundsGroup} volume={this.state.volume} handleDisplay={this.handleDisplay}/>
          <p>{this.state.display}</p>
        </div>
        <div id="controls">
          <p>Volume: {Math.round(this.state.volume * 100)}</p>
          <input type="range" min="0" max="1" step="0.01" value={this.state.volume}
            onChange={this.handleVolumeChange} />
        </div>
      </div>
    );
  }
}

class Keyboard extends React.Component {

  playSound = (soundObj) => {
    const audio = document.getElementById(soundObj.key);
    audio.volume = this.props.volume;
    audio.play().catch(e => console.log(e));
    this.props.handleDisplay(soundObj.id);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress = (event) => {
    const key = event.key.toUpperCase();
    const sound = this.props.soundKeys.find(sound => sound.key === key);

    if (sound) {
      this.playSound(sound);
    }
  }

  render() {
    const {soundKeys} = this.props;

    return (
      <div>
        {soundKeys.map((sound, index) =>
          <button className="drum-pad" id={index} onClick={() => this.playSound(sound)}>
            {sound.key}
            <audio src={sound.url} id={sound.key} className="clip"></audio>
          </button>
        )}
      </div>
    );
  }
}


export default DrumMachine;
