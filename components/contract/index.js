import React, { useState, useEffect } from "react";
import Web3 from "web3";
import BaccaratMultiTableABI from "../../utils/ContractABI.json";
import CreateTable from "./CreateTable";

const web3ProviderUrl = process.env.NEXT_PUBLIC_WEB3_PROVIDER_URL;
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;


const ContractIntegration = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        const currentWeb3 = new Web3(web3ProviderUrl);

       

        const currentContract = new currentWeb3.eth.Contract(
          BaccaratMultiTableABI,
          contractAddress
        );

        setWeb3(currentWeb3);
        setContract(currentContract);
      } catch (error) {
        console.error("Error initializing Web3:", error);
      }
    };

    initWeb3();
  }, []);

  return (
    <div>
      <h2>Contract Integration</h2>
      <CreateTable contract={contract} web3={web3} />
    </div>
  );
};

export default ContractIntegration;
