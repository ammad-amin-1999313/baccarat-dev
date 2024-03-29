// components/CreateTable.js
import React, { useState } from "react";
import { Wallet } from "ethers";

const CreateTable = ({ contract, web3 }) => {
  const [createTableResult, setCreateTableResult] = useState(null);
  const [investmentSeats, setInvestmentSeats] = useState(0);
  const [investmentCostPerSeat, setInvestmentCostPerSeat] = useState(0);
  const [winnersReturnMultiplier, setWinnersReturnMultiplier] = useState(0);
  const [betSize, setBetSize] = useState(0);
  const [bankerAddress, setBankerAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  const handleCreateTable = async () => {
    try {
      const accounts = web3.eth.accounts;
      if (!accounts || accounts.length === 0) {
        console.error("No accounts available.");
        return;
      }

      const wallet = new Wallet(privateKey, web3.currentProvider);

      await contract.methods
        .createTable(
          investmentSeats,
          investmentCostPerSeat,
          winnersReturnMultiplier,
          betSize,
          bankerAddress
        )
        .send({ from: wallet.address });

      setInvestmentSeats(0);
      setInvestmentCostPerSeat(0);
      setWinnersReturnMultiplier(0);
      setBetSize(0);
      setBankerAddress("");

      setCreateTableResult("Table created successfully!");
    } catch (error) {
      console.error("Error creating table:", error);
      setCreateTableResult(`Error creating table: ${error.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-md shadow-md">
      <h3 className="text-2xl font-semibold mb-4">Create Table</h3>

      <div className="mb-4">
        <label className="block text-gray-600 text-sm font-semibold mb-2">
          Investment Seats:
        </label>
        <input
          type="number"
          value={investmentSeats}
          onChange={(e) => setInvestmentSeats(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-600 text-sm font-semibold mb-2">
          Investment Cost Per Seat:
        </label>
        <input
          type="number"
          value={investmentCostPerSeat}
          onChange={(e) => setInvestmentCostPerSeat(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-600 text-sm font-semibold mb-2">
          Winners Return Multiplier:
        </label>
        <input
          type="number"
          value={winnersReturnMultiplier}
          onChange={(e) => setWinnersReturnMultiplier(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-600 text-sm font-semibold mb-2">
          Bet Size:
        </label>
        <input
          type="number"
          value={betSize}
          onChange={(e) => setBetSize(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-600 text-sm font-semibold mb-2">
          Banker Address:
        </label>
        <input
          type="text"
          value={bankerAddress}
          onChange={(e) => setBankerAddress(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-600 text-sm font-semibold mb-2">
          Private Key:
        </label>
        <input
          type="text"
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      <button
        onClick={handleCreateTable}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
      >
        Create Table
      </button>
      {createTableResult && <p className="mt-4">{createTableResult}</p>}
    </div>
  );
};

export default CreateTable;
