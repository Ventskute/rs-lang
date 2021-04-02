import React from "react";

import "./Drop.scss";
import DropImg from "../../../assets/images/drop.png";

export default function Drop(props) {
  return (
    <div className="drop">
      <img
        src={DropImg}
        alt="drop"
        style={{ width: props.dropSize, height: props.dropSize }}
      />
    </div>
  );
}
