// components/Layout.js
import React, { useEffect, useState } from "react";
import MetaMaskPopup from "../MetaMaskPopup/index";
import web3 from "../../utils/web3";

import ResponsiveAppBar from "./AppBar";

const Layout = ({ children }) => {
  const [account, setAccount] = useState("");
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);

  useEffect(() => {
    const loadAccount = async () => {
      try {
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        setIsMetaMaskConnected(accounts.length > 0);
      } catch (error) {
        console.error("Error loading MetaMask account:", error);
      }
    };

    loadAccount();
  }, []);

  const connectMetaMask = async () => {
    try {
      await window.ethereum.enable();
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      setIsMetaMaskConnected(true);
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };

  return (
    <div>
      <ResponsiveAppBar
        account={account}
        pages={[
          "Home",
          "Create Table",
          "View tables",
          "WithDrawal Request",
          "Referal Details",
        ]}
        pageLinks={[
          "/",
          "/create-table",
          "/view-table",
          "withdraw-request",
          "/referalList",
        ]}
      />

      {children}

      {!isMetaMaskConnected && (
        <>
          <MetaMaskPopup
            isConnected={isMetaMaskConnected}
            connectMetaMask={connectMetaMask}
          />
        </>
      )}
    </div>
  );
};

export default Layout;
