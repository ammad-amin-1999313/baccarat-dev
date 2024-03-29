import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  Paper,
} from "@mui/material";

const InvestorDetails = ({ investorData }) => {
  // const [currentPage, setCurrentPage] = useState(0);
  // const itemsPerPage = 4;

  return (
    <div>
      {investorData.length > 0 ? (
        <>
          <TableContainer className="px-6 my-14" component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="font-semibold ">Address</TableCell>
                  <TableCell className="font-semibold">
                    InvestedShares
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {investorData.map((invest, index) => (
                  <TableRow
                    // className={index % 2 ? "bg-white" : "bg-gray-200"}
                    key={index}
                  >
                    <TableCell>{invest.address}</TableCell>
                    <TableCell>{invest.InvestedShares}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <div className="text-center mt-2 mx-2 md:w-2/12 mb-8 rounded-2xl md:mx-auto bg-gray-200 text-gray-500 py-2">
          No Investors data available
        </div>
      )}
    </div>
  );
};

export default InvestorDetails;
