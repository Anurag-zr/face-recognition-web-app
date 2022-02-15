import React from "react";

export default function Rank({ userName, userEntries }) {
  return (
    <div>
      <div className="white f3 mt5">{`${userName}, your current rank is...`}</div>
      <div className="white f1">#{userEntries}</div>
    </div>
  );
}
