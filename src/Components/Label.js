import React from "react";

const Label = props => {
  return (
    <div>
      {/* If props.type equals true it's break else it's session */}
      <h5 id={props.type ? "break-label" : "session-label"}>
        {props.type ? "Break Length" : "Session Length"}
      </h5>
      <h5 id={props.type ? "break-length" : "session-length"}>{props.num}</h5>
    </div>
  );
};

export default Label;
