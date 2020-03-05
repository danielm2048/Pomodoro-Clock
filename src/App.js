import React from "react";
import "./App.css";

import Title from "./Components/Title";
import Timer from "./Components/Timer";
import ControlBox from "./Components/ControlBox";
import MadeBy from "./Components/MadeBy";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakNum: 5,
      sessionNum: 25,
      sessionCount: 1,
      isStarted: false,
      isPaused: false,
      time: "25:00",
      turnSession: true
    };
    this.onClick = this.onClick.bind(this);
    this.timer = this.timer.bind(this);
    this.handleInterval = "";
    this.secondsRemaining = 0;
    this.min = 1;
    this.sec = 1;
  }
  onClick(event) {
    // eslint-disable-next-line
    switch (event.target.id) {
      case "break-increment":
        if (this.state.breakNum + 1 !== 61) {
          this.setState({
            breakNum: this.state.breakNum + 1
          });
        }
        break;
      case "break-decrement":
        if (this.state.breakNum - 1 !== 0) {
          this.setState({
            breakNum: this.state.breakNum - 1
          });
        }
        break;
      case "session-increment":
        if (this.state.sessionNum + 1 !== 61) {
          this.setState({
            sessionNum: this.state.sessionNum + 1,
            time: parseInt(this.state.sessionNum + 1) + ":00"
          });
        }
        break;
      case "session-decrement":
        if (this.state.sessionNum - 1 !== 0) {
          this.setState({
            sessionNum: this.state.sessionNum - 1,
            time: parseInt(this.state.sessionNum - 1) + ":00"
          });
        }
        break;
      case "start_stop":
        if (!this.state.isStarted) {
          this.handleInterval = setInterval(this.timer, 1000);
          this.secondsRemaining = this.state.sessionNum * 60 - 1;
          this.setState({
            isStarted: true
          });
        } else {
          if (!document.getElementById("beep").onpause) {
            document.getElementById("beep").pause();
          }
          this.setState({
            isPaused: !this.state.isPaused
          });
        }
        break;
      case "reset":
        this.setState({
          breakNum: 5,
          sessionNum: 25,
          sessionCount: 1,
          isStarted: false,
          isPaused: false,
          time: "25:00",
          turnSession: true
        });
        clearInterval(this.handleInterval);
        document.getElementById("timer-label").innerHTML = "Session number: 1";
        this.min = 1;
        if (!document.getElementById("beep").onpause) {
          document.getElementById("beep").pause();
          document.getElementById("beep").currentTime = 0;
        }
        break;
    }
  }
  timer() {
    if (!this.state.isPaused) {
      this.min = Math.floor(this.secondsRemaining / 60);
      this.sec = this.secondsRemaining - this.min * 60;
      if (this.sec < 10) {
        this.sec = "0" + this.sec;
      }
      if (this.min < 10) {
        this.min = "0" + this.min;
      }
      this.setState({
        time: this.min + ":" + this.sec
      });
      if (this.sec === "00" && this.min === "00") {
        if (this.state.turnSession) {
          this.setState({
            turnSession: false,
            sessionCount: this.state.sessionCount + 1
          });
          this.secondsRemaining = this.state.breakNum * 60 + 1;
          document.getElementById("timer-label").innerHTML = "TAKE A BREAK!!!";
        } else {
          this.setState({
            turnSession: true
          });
          this.secondsRemaining = this.state.sessionNum * 60 + 1;
          document.getElementById("timer-label").innerHTML =
            "Session number: " + this.state.sessionCount;
        }
        document.getElementById("beep").play();
      }
      this.secondsRemaining--;
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="container-fluid">
            <Title />
            <Timer time={this.state.time} min={this.min} />
            <ControlBox
              onClick={this.onClick}
              isStarted={this.state.isStarted}
              breakNum={this.state.breakNum}
              sessionNum={this.state.sessionNum}
            />
            <MadeBy />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
