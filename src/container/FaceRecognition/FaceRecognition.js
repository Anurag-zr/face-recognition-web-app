import React from "react";
import "./FaceRecognition.css";

export default function FaceRecognition({ imageUrl, box }) {
  return (
    <div
      className="mt2"
      style={{ display: "inline-block", position: "relative" }}
    >
      <img
        id="inputImg"
        src={imageUrl}
        alt="img"
        style={{ width: "500px", height: "auto" }}
      />
      <div
        className="bounding-box"
        style={{
          top: box.topRow,
          right: box.rightCol,
          bottom: box.bottomRow,
          left: box.leftCol,
        }}
      ></div>
    </div>
  );
}
