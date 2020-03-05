import React from "react";

import beep from "../beep.mp3";

class PlayPause extends React.Component {
  render() {
    return (
      <div className="col-xs-6 action">
        <audio id="beep">
          <source src={beep} type="audio/mpeg" />
        </audio>
        <div>
          <i
            className="fas fa-step-forward fa-2x"
            id="start_stop"
            onClick={this.props.onClick}
          ></i>
          <i
            className="fas fa-undo fa-2x"
            id="reset"
            onClick={this.props.onClick}
          ></i>
        </div>
      </div>
    );
  }
}

export default PlayPause;
