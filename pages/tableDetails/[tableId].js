import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import GamersComponent from "@/components/GamerDetails/GamerDetails";
import InvestorDetails from "@/components/InvestorsDetails/InvestorDetails";
import DataByDate from "@/components/PNL/DataByDate";
import CircularProgress from "@mui/material/CircularProgress";
// import Box from '@mui/material/Box';
import { Box } from "@mui/material";

const table_detail = () => {
  const router = useRouter();
  const { tableId } = router.query;
  const [gameTables, setGameTables] = useState("");
  const [investorData, setInvestorData] = useState("");
  const [panelData, setPanelData] = useState("");

  // table details
  const fetchGameTables = async (tableId) => {
    try {
      const baseUrl = process.env.BASE_URL;
      if (!baseUrl) {
        console.error("BASE_URL is not defined in the .env file.");
        return;
      }

      const response = await axios.get(`${baseUrl}/game-table/tablesDeatils`);
      const singleIdData = response.data.allGameTables.find(
        (table) => table._ID === tableId
      );
      setGameTables(singleIdData);
    } catch (error) {
      console.error("Error fetching game tables:", error);
    }
  };

  // fetch Investors Data

  const fetchImvestorsData = async (tableId) => {
    try {
      const baseUrl = process.env.BASE_URL;
      if (!baseUrl) {
        console.error("BASE_URL is not defined in the .env file.");
        return;
      }

      const response = await axios.get(
        `${baseUrl}/investor/TableRecords/${tableId}`
      );
      const singleInvestorData = response.data.investorRecords;
      setInvestorData(singleInvestorData);
    } catch (error) {
      console.error("Error fetching game tables:", error);
    }
  };

  useEffect(() => {
    if (tableId) {
      fetchGameTables(tableId);
      fetchImvestorsData(tableId);
      fetchingPnlData(tableId);
    }
  }, [tableId]);

  if (!tableId) {
    return <div>Loading...</div>;
  }

  //  fetching PNL data
  const fetchingPnlData = async (tableId) => {
    try {
      const baseUrl = process.env.BASE_URL;
      if (!baseUrl) {
        console.error("BASE_URL is not defined in the .env file.");
        return;
      }

      const response = await axios.get(`${baseUrl}/PNL/Details/${tableId}`);
      setPanelData(response.data);
    } catch (error) {
      console.error("Error fetching game tables:", error);
    }
  };
  console.log(panelData);
  return (
    <>
      {/* ---Tables and PNL Details */}
      <div className="flex flex-wrap md:flex-nowrap">
        {/* -----Tables__Details------ */}
        <div className="w-full md:w-6/12 p-2 md:p-6">
          <div className="py-4 font-bold">Table Details</div>
          {gameTables ? (
            <div>
              <h1>
                <span className="font-bold">Status</span>: {gameTables.Status}
              </h1>
              <h1>
                <span className="font-bold">Table ID:</span>{" "}
                {gameTables.table_ID}
              </h1>
              <h1>
                <span className="font-bold">Total Investor Shares</span>:{" "}
                {gameTables.total_Investor_Seats}
              </h1>
              <h1>
                <span className="font-bold">Remaining Shares</span>:{" "}
                {gameTables.RemaingShares}
              </h1>
              <h1>
                <span className="font-bold">Per Share Cost</span>:{" "}
                {gameTables.per_Share_Cost}
              </h1>
              <h1>
                <span className="font-bold">Winners Rewards</span>:{" "}
                {gameTables.winners_Rewards}
              </h1>
              <h1>
                <span className="font-bold">Bet Size</span>:{" "}
                {gameTables.bet_Size}
              </h1>
              <h1 className="">
                <span className="font-bold">Bankers Address</span>:{" "}
                {gameTables.Bankers_Address}
              </h1>
              <h1>
                <span className="font-bold">Region</span>: {gameTables.Region}
              </h1>
              <h1>
                <span className="font-bold">Winners Count</span>:{" "}
                {gameTables.winnerCount}
              </h1>
              <h1>
                <span className="font-bold">Losers Count</span>:{" "}
                {gameTables.losersCount}
              </h1>
            </div>
          ) : (
            <>
              <Box>
                <CircularProgress />
              </Box>
            </>
          )}
        </div>
        {/* ----PNL___Data------- */}
        <div className="w-full md:w-6/12 p-2 md:p-6">
          <div className="font-bold py-4">PNL Details</div>

          {!panelData || !panelData.gameTable ? (
            <Box>
              <CircularProgress />
            </Box>
          ) : (
            <div>
              <DataByDate className="datepicker" panelData={panelData} />
            </div>
          )}
        </div>
      </div>

      {/* ----Game Details--- */}

      <GamersComponent gameTables={gameTables} />

      {/* --- Investor Details --- */}

      <InvestorDetails investorData={investorData} />
    </>
  );
};

export default table_detail;
