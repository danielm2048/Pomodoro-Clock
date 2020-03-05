import React from "react";

import ButtonColumn from "./ButtonColumn";
import PlayPause from "./PlayPause";

class ControlBox extends React.Component {
  render() {
    return (
      <div className="row box">
        <ButtonColumn
          type={true}
          onClick={this.props.onClick}
          isStarted={this.props.isStarted}
          num={this.props.breakNum}
        />
        <PlayPause onClick={this.props.onClick} />
        <ButtonColumn
          type={false}
          onClick={this.props.onClick}
          isStarted={this.props.isStarted}
          num={this.props.sessionNum}
        />
      </div>
    );
  }
}

export default ControlBox;
