import React from "react";
import Tilt from "react-tilt";
import "./Logo.css";
import brain from "./brain.png";

export default function Logo() {
  return (
    <div className="ma4 mt0 logo">
      <Tilt
        className="Tilt b2 shadow-2"
        options={{ max: 55 }}
        style={{ height: 100, width: 100 }}
      >
        <div className="Tilt-inner pa3">
          <img
            src={brain}
            alt="logo"
            style={{ paddingTop: "73px", transform: "translateY(-50%)" }}
          />
        </div>
      </Tilt>
    </div>
  );
}
