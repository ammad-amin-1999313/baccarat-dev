import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DataByDate = ({ panelData }) => {
  const defaultDate = new Date("2024-01-26"); // Set default date
  const [selectedDate, setSelectedDate] = useState(defaultDate);

  // useEffect(() => {
  //   setSelectedDate(defaultDate); // Set default date when panelData changes
  // }, [panelData, defaultDate]);

  console.log("Default Date:", selectedDate); // Log default date to check

  // Function to format date object into YYYY-MM-DD string
  const formatDate = (date) => {
    return date.toISOString().slice(0, 10);
  };

  // Function to render data for selected date or message if no data exists
  const renderDataForSelectedDate = () => {
    const selectedDateString = formatDate(selectedDate);
    const selectedDateData =
      panelData.gameTable.winnersLosersByDate[selectedDateString];

    if (selectedDateData) {
      return (
        <div>
          {/* <h2>Data for {selectedDateString}</h2> */}
          <p>
            {" "}
            <span className="font-bold">Winners Count: </span>{" "}
            {selectedDateData.winnersCount}
          </p>
          <p>
            {" "}
            <span className="font-bold">Losers Count:</span>{" "}
            {selectedDateData.losersCount}
          </p>
          <p>
            {" "}
            <span className="font-bold">Total Games: </span>{" "}
            {selectedDateData.totalGames}
          </p>
          <p>
            {" "}
            <span className="font-bold">Total Win: </span>{" "}
            {selectedDateData.totalWin}
          </p>
          <p>
            {" "}
            <span className="font-bold">Total Loss:</span>{" "}
            {selectedDateData.totalLoss}
          </p>
          <p>
            {" "}
            <span className="font-bold">Total Amount Win:</span>{" "}
            {selectedDateData.totalAmountWin}
          </p>
          <p>
            {" "}
            <span className="font-bold">Total Amount Loss:</span>{" "}
            {selectedDateData.totalAmountLoss}
          </p>
          <p>
            <span className="font-bold">Total Winner Amount By Reward: </span>
            {selectedDateData.totalWinnerAmountByReward}
          </p>
          <p>
            <span className="font-bold">Total PNL: </span>{" "}
            {selectedDateData.totalPNL}
          </p>
        </div>
      );
    } else {
      return <div>No data available for the selected date.</div>;
    }
  };

  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        className="custom-datepicker"
      />

      {renderDataForSelectedDate()}
    </div>
  );
};

export default DataByDate;
