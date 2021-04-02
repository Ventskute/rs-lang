import React from "react";

import "./LivesCounter.scss";

export default function LivesCounter(props) {
  return (
    <div
      className="lives-counter"
      style={{ width: props.livesCount * 40 }}
    ></div>
  );
}
