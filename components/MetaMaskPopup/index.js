// components/MetaMaskPopup.js
import React from "react";

const MetaMaskPopup = ({ isConnected, connectMetaMask }) => {
  if (isConnected) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
      <div className="relative bg-white p-8 rounded-xl shadow-lg">
        <p className="text-lg mb-4 text-black">
          Connect to MetaMask to access the full functionality of this app.
        </p>
        <button
          onClick={connectMetaMask}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Connect to MetaMask
        </button>
      </div>
    </div>
  );
};

export default MetaMaskPopup;
