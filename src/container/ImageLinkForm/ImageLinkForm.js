import React from "react";
import "./ImageLinkForm.css";

export default function ImageLinkForm({ onInputChange, onPictureSubmit }) {
  return (
    <div>
      <p className="f3 ">
        This magic brain will detect faces in your pictures, Give it a try
      </p>
      <div className="pa4 br3 shadow-5 form">
        <input
          type="text"
          placeholder="enter image url(.png,.jpg,.jpeg,...)"
          className="f4 pa2"
          onChange={onInputChange}
        />
        <button
          className=" grow f4 link ph3 pv2 dib white bg-light-purple"
          onClick={onPictureSubmit}
        >
          Detect
        </button>
      </div>
    </div>
  );
}
