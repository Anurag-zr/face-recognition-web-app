import React from "react";

export default function Navigation({ onRouteChange }) {
  const navStyle = {
    display: "flex",
    justifyContent: "flex-end",
  };

  return (
    <nav style={navStyle}>
      <p
        onClick={() => onRouteChange("signin")}
        className="f3 link dim black underline pa3 pointer"
      >
        Sign Out
      </p>
    </nav>
  );
}
