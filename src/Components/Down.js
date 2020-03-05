import React from "react";

import arrowDown from "../pics/buttondown.png";

const Down = props => {
  return (
    <div>
      <img
        src={arrowDown}
        id={props.type ? "break-decrement" : "session-decrement"}
        alt="down button"
        className="button"
        onClick={props.onClick}
      />
    </div>
  );
};

export default Down;
