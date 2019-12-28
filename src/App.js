import React from 'react';
import './App.css';
import arrowUp from './pics/buttonup.png';
import arrowDown from './pics/buttondown.png';
import tomato from './pics/tomato.jpg';
import beep from './beep.mp3';

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
				}
				else {
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
			this.sec = this.secondsRemaining - (this.min * 60);
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
				}
				else {
					this.setState({
						turnSession: true
					});
					this.secondsRemaining = this.state.sessionNum * 60 + 1;
					document.getElementById("timer-label").innerHTML = "Session number: " + this.state.sessionCount;
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
						<h1 style={{ fontSize: "82px" }}>Pomodoro <img src={tomato} alt="tomato" /> Clock</h1>
						<div className="row">
							<h2 id="timer-label" style={{ fontSize: "62px" }}>Session number: 1</h2>
							<h2 id="time-left" style={{ fontSize: "42px", color: this.min < 1 ? "red" : "white" }}>{this.state.time}</h2>
							<br />
						</div>
						<div className="row box">
							<div className="col-xs-3" style={{ pointerEvents: this.state.isStarted ? "none" : "auto" }}>
								<div className="">
									<img src={arrowUp} id="break-increment" alt="break up" className="button" onClick={this.onClick} />
								</div>
								<div className="">
									<h5 id="break-label" style={{ fontSize: "32px" }}>Break Length</h5>
								</div>
								<div>
									<h5 id="break-length" style={{ fontSize: "32px" }}>{this.state.breakNum}</h5>
								</div>
								<div className="">
									<img src={arrowDown} id="break-decrement" alt="break down" className="button" onClick={this.onClick} />
								</div>
							</div>
							<div className="col-xs-6 action">
								<audio id="beep">
									<source src={beep} type="audio/mpeg" />
								</audio>
								<div>
									<i className="fas fa-step-forward fa-2x" id="start_stop" onClick={this.onClick}></i>
									<i className="fas fa-undo fa-2x" id="reset" onClick={this.onClick}></i>
								</div>
							</div>
							<div className="col-xs-3" style={{ pointerEvents: this.state.isStarted ? "none" : "auto" }}>
								<div>
									<img src={arrowUp} id="session-increment" alt="session up" className="button" onClick={this.onClick} />
								</div>
								<div>
									<h5 id="session-label" style={{ fontSize: "32px" }}>Session Length</h5>
								</div>
								<div>
									<h5 id="session-length" style={{ fontSize: "32px" }}>{this.state.sessionNum}</h5>
								</div>
								<div>
									<img src={arrowDown} id="session-decrement" alt="session down" className="button" onClick={this.onClick} />
								</div>
							</div>
						</div>
						<div>
							<br />
							<h5 style={{ fontSize: "32px" }}>Made with <i class="far fa-heart fa-xs"></i> by Daniel Mimoun</h5>
						</div>
					</div>
				</header>
			</div>
		);
	}
}

export default App;
