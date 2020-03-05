import React from "react";

export class Timer extends React.Component {
  render() {
    return (
      <div className="row">
        <h2 id="timer-label" style={{ fontSize: "62px" }}>
          Session number: 1
        </h2>
        <h2
          id="time-left"
          className={this.props.min < 1 ? "blink_me" : ""}
          style={{
            fontSize: "42px",
            color: this.props.min < 1 ? "red" : "black"
          }}
        >
          {this.props.time}
        </h2>
        <br />
      </div>
    );
  }
}

export default Timer;
