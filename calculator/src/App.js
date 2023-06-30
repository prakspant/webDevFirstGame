import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      display: '0'
    }

    this.setDisplay = this.setDisplay.bind(this);
    this.handleNumber = this.handleNumber.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.clearScreen = this.clearScreen.bind(this);
    this.handleEqual = this.handleEqual.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
  }

  setDisplay(value) {
    this.setState({display: value});
  }

  handleNumber(event) {
    if (this.state.display === '0')
      this.setDisplay(event.target.textContent);
    else
      this.setDisplay(this.state.display + event.target.textContent);
  }

  handleOperator(event) {
    this.setDisplay(this.state.display + ' ' + event.target.textContent + ' ')  ;
  }

  clearScreen(event) {
    this.setDisplay('0');
  }

  handleEqual(event) {
    this.setDisplay(eval(this.state.display));
  }

  handleDecimal(event) {
    var myArr = this.state.display.split(' ');
    console.log(myArr[myArr.length - 1]);
    if (!myArr[myArr.length - 1].includes('.') && Number.isInteger(parseInt(myArr[myArr.length - 1]))){
      this.setDisplay(this.state.display + '.');
    }
  }

  render() {
    return (
      <div id="container">
        <div className="calculator">
          <div id="display" className="row">{this.state.display}</div>
          <div id="clear" className="row" onClick={this.clearScreen}>AC</div>
          <div id="divide" onClick={this.handleOperator}>/</div>
          <div id="multiply" onClick={this.handleOperator}>*</div>
          <div id="seven" onClick={this.handleNumber}>7</div>
          <div id="eight" onClick={this.handleNumber}>8</div>
          <div id="nine" onClick={this.handleNumber}>9</div>
          <div id="subtract" onClick={this.handleOperator}>-</div>
          <div id="four" onClick={this.handleNumber}>4</div>
          <div id="five" onClick={this.handleNumber}>5</div>
          <div id="six" onClick={this.handleNumber}>6</div>
          <div id="add" onClick={this.handleOperator}>+</div>
          <div id="one" onClick={this.handleNumber}>1</div>
          <div id="two" onClick={this.handleNumber}>2</div>
          <div id="three" onClick={this.handleNumber}>3</div>
          <div id="equals" onClick={this.handleEqual}>=</div>
          <div id="zero" onClick={this.handleNumber}>0</div>
          <div id="decimal" onClick={this.handleDecimal}>.</div>
        </div>
      </div>
    );
  }
}

export default App;
