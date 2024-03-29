import React from "react";

const SliceTexted = ({ account }) => {
  return (
    <div>
      {typeof account === "string"
        ? `${account.slice(0, 6)} ... ${account.slice(-6)}`
        : ""}
    </div>
  );
};

export default SliceTexted;
