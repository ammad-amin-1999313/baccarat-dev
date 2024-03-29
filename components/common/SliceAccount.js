import React, { useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Button } from "@mui/material";
const TruncatedAccount = ({ account }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    const textField = document.createElement("textarea");
    textField.innerText = account;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    document.body.removeChild(textField);

    setIsCopied(!isCopied);
  };

  return (
    <div>
      {isCopied ? (
        <Button
          onClick={handleCopyClick}
          disabled={!isCopied}
          variant="outlined"
        >
          Addr &nbsp;Copied
        </Button>
      ) : (
        <Button
          onClick={handleCopyClick}
          disabled={isCopied}
          variant="outlined"
        >
          {/* {account.slice(0, 4)} ... {account.slice(-4)} */}
          {typeof account === "string"
            ? `${account.slice(0, 4)} ... ${account.slice(-4)}`
            : ""}
        </Button>
      )}
    </div>
  );
};

export default TruncatedAccount;
