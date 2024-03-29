import { Chip } from "@mui/material";
import React from "react";

const GreetingIndex = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Chip label="Welcome to the Bacarat Game" />
    </div>
  );
};

export default GreetingIndex;
