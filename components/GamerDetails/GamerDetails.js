import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";

const GamersComponent = ({ gameTables }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Check if gameTables.gamers is defined, otherwise use an empty array
  const gamersArray = gameTables.gamers || [];

  // Calculate the index range to display based on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGamers = gamersArray.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(gamersArray.length / itemsPerPage);

  const handlePaginationChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      {currentGamers.length > 0 ? (
        <>
          <TableContainer className="px-6 mt-6" component={Paper}>
            <Table>
              <TableHead>
                <TableRow className="border">
                  <TableCell className="text-center font-semibold">#</TableCell>
                  <TableCell className="text-center font-semibold">
                    Game ID
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    Gamer Address
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    Result
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    Original Winner
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    Bet On
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    Start Time
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    End Time
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentGamers.map((gamer, index) => (
                  <TableRow
                    className={index % 2 ? "bg-white" : "bg-gray-200"}
                    key={indexOfFirstItem + index}
                  >
                    <TableCell>{indexOfFirstItem + index + 1}</TableCell>
                    <TableCell>{gamer._id}</TableCell>
                    <TableCell>{gamer.gamer_Address}</TableCell>
                    <TableCell className="text-center">
                      {gamer.result}
                    </TableCell>
                    <TableCell className="text-center">
                      {gamer.OriginalBetWin}
                    </TableCell>
                    <TableCell>{gamer.betOn}</TableCell>
                    <TableCell>{gamer.startTime}</TableCell>
                    <TableCell>{gamer.EndTime}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* Pagination */}
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePaginationChange}
            variant="outlined"
            shape="rounded"
            size="large"
            style={{
              marginTop: "34px",
              display: "flex",
              justifyContent: "center",
            }}
          />
        </>
      ) : (
        <div className="text-center mt-2 mx-2 md:w-2/12 mb-8 rounded-2xl md:mx-auto bg-gray-200 text-gray-500 py-2">
          No gamers data available
        </div>
      )}
    </div>
  );
};

export default GamersComponent;
