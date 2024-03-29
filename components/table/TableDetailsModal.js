// TableDetailsModal.js
import React from "react";
import Modal from "react-modal";

const TableDetailsModal = ({ isOpen, onClose, tableDetails }) => {
  if (!tableDetails) {
    return null;
  }

  const renderGamers = () => {
    return tableDetails.gamers.map((gamer) => (
      <div key={gamer._id}>
        <p>Game_ID: {gamer._id}</p>
        <p>Gamer Address: {gamer.gamer_Address}</p>
        <p>Result: {gamer.result}</p>
        <p>Orignal Winner: {gamer.OriginalBetWin}</p>
        <p>Bet On: {gamer.betOn}</p>
        <p>Start Time: {gamer.startTime}</p>
        <p>End Time: {gamer.EndTime}</p>
        <hr />
      </div>
    ));
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Table Details"
    >
      <button
        onClick={onClose}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
      >
        Close
      </button>
      <b>
        <h1>Table Details</h1>
        <p>Status: {tableDetails.status}</p>
        <p>Table ID: {tableDetails.table_ID}</p>
        <p>Total Investor Shares: {tableDetails.total_Investor_Seats}</p>
        <p>Remaining_Shares: {tableDetails.Remaining_Shares}</p>
        <p>Per Share Cost: {tableDetails.per_Share_Cost}</p>
        <p>Winners Rewards: {tableDetails.winners_Rewards}</p>
        <p>Bet Size: {tableDetails.bet_Size}</p>
        <p>Bankers Address: {tableDetails.Bankers_Address}</p>
        <p>Region: {tableDetails.Region}</p>
        <p>Winners Count: {tableDetails.winnersCount}</p>
        <p>Losers Count: {tableDetails.losersCount}</p>
      </b>
      <div class="grid grid-cols-1 divide-y divide-gray-900 ">
        <div></div>
        <b>
          {" "}
          <h2>Gamers:</h2>
        </b>
        {tableDetails.gamers.length > 0 ? (
          renderGamers()
        ) : (
          <p>No gamers for this table.</p>
        )}

        <b>
          <h3>Investors</h3>
        </b>
        {tableDetails.investors.length > 0 ? (
          <ul>
            {tableDetails.investors.map((investor) => (
              <li key={investor._id}>{investor.investor_Address}</li>
            ))}
          </ul>
        ) : (
          <p>No investors for this table.</p>
        )}
      </div>
    </Modal>
  );
};

export default TableDetailsModal;
