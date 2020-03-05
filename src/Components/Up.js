import React from "react";

import arrowUp from "../pics/buttonup.png";

const Up = props => {
  return (
    <div>
      <img
        src={arrowUp}
        id={props.type ? "break-increment" : "session-increment"}
        alt="up button"
        className="button"
        onClick={props.onClick}
      />
    </div>
  );
};

export default Up;
