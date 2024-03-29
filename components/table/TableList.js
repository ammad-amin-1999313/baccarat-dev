import React, { useState, useEffect } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import axios from "axios";
import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import SliceAccount from "../common/SliceAccount";
import TableDetailsModal from "./TableDetailsModal";
import { useRouter } from "next/router";

const TableList = () => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gameTables, setGameTables] = useState([]);

  const router = useRouter();

  const handleViewDetails = (tableId) => {
    router.push(`/tableDetails/${tableId}`);
  };

  const openModal = async (tableId) => {
    try {
      const baseUrl = process.env.BASE_URL;
      if (!baseUrl) {
        console.error("BASE_URL is not defined in the .env file.");
        return;
      }

      const response = await axios.get(
        `${baseUrl}/game-table/getDetails/${tableId}`
      );
      setSelectedTable(response.data.gameTable);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching table details:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchGameTables = async () => {
    try {
      const baseUrl = process.env.BASE_URL;
      if (!baseUrl) {
        console.error("BASE_URL is not defined in the .env file.");
        return;
      }

      const response = await axios.get(`${baseUrl}/game-table/tablesDeatils`);
      setGameTables(response.data.allGameTables);
    } catch (error) {
      console.error("Error fetching game tables:", error);
    }
  };

  useEffect(() => {
    fetchGameTables();
  }, []);

  const handleRefresh = () => {
    fetchGameTables();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",
        justifyContent: "flex-start",
        // minHeight: "calc(100vh - 64px)",

        paddingTop: "20px",
      }}
    >
      <Typography variant="h6" sx={{ paddingBottom: "10px" }} className="">
        <b className="px-7 mt-4">Game Tables</b>
        &nbsp;
        {/* <IconButton aria-label="delete" onClick={handleRefresh}>
          <RefreshIcon style={{ color: "black" }} />
        </IconButton> */}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow className="bg-gray-400">
              <TableCell className="text-center font-semibold border-t-2">
                Table ID
              </TableCell>
              <TableCell className="text-center  font-semibold border-t-2">
                Total Investor Seats
              </TableCell>
              <TableCell className="text-center  font-semibold border-t-2">
                Winners Rewards
              </TableCell>
              <TableCell className="text-center font-semibold border-t-2">
                Bet Size
              </TableCell>
              <TableCell className=" font-semibold border-t-2">
                Bankers Address
              </TableCell>
              <TableCell className="text-center > font-semibold border-t-2">
                Region
              </TableCell>
              <TableCell className="text-center > font-semibold border-t-2">
                Status
              </TableCell>
              <TableCell className="text-center > font-semibold border-t-2">
                More Details
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gameTables.map((table, index) => (
              <TableRow
                className={index % 2 ? "bg-white" : "bg-gray-200"}
                key={table._ID}
              >
                <TableCell className="text-center text-black">
                  {table.table_ID}
                </TableCell>
                <TableCell className="text-center text-black">
                  {table.total_Investor_Seats}
                </TableCell>
                <TableCell className="text-center text-black">
                  {table.winners_Rewards}
                </TableCell>
                <TableCell className="text-center text-black]">
                  {table.bet_Size}
                </TableCell>
                <TableCell>
                  <SliceAccount account={table.Bankers_Address} />
                </TableCell>
                <TableCell className="text-center text-black">
                  {table.Region}
                </TableCell>
                <TableCell>
                  <span
                    className={
                      table.Status === "active"
                        ? "bg-black text-white"
                        : "bg-red-700 text-white"
                    }
                    style={{ padding: "4px 8px", borderRadius: "5px" }}
                  >
                    {table.Status}
                  </span>
                </TableCell>
                <TableCell className="text-center text-black">
                  <Button
                    onClick={() => handleViewDetails(table._ID)}
                    color="secondary"
                    // variant="outlined"
                  >
                    View Details ({table._ID})
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TableDetailsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        tableDetails={selectedTable}
      />
    </div>
  );
};

export default TableList;
