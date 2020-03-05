import React from "react";

import Up from "./Up";
import Label from "./Label";
import Down from "./Down";

class ButtonColumn extends React.Component {
  render() {
    return (
      <div
        className="col-xs-3"
        style={{
          pointerEvents: this.props.isStarted ? "none" : "auto"
        }}
      >
        <Up type={this.props.type} onClick={this.props.onClick} />
        <Label type={this.props.type} num={this.props.num} />
        <Down type={this.props.type} onClick={this.props.onClick} />
      </div>
    );
  }
}

export default ButtonColumn;
