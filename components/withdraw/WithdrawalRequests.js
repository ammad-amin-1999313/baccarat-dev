import axios from "axios";
import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

const WithdrawalRequests = () => {
  const [statusFilter, setStatusFilter] = useState("approved");
  const [withdrawalRequests, setWithdrawalRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const baseUrl = process.env.BASE_URL;
  if (!baseUrl) {
    throw new Error("BASE_URL is not defined in the .env file.");
  }

  useEffect(() => {
    fetchWithdrawalRequests();
  }, [statusFilter]);

  const fetchWithdrawalRequests = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${baseUrl}/withdraw/withdrawalRequests/${statusFilter}`
      );

      const data = response.data;
      if (data.success) {
        setWithdrawalRequests(data.withdrawalRequests);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching withdrawal requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const approveRequest = async (requestId) => {
    try {
      const response = await axios.post(
        `${baseUrl}/withdraw/approveWithdrawalRequest/`,
        {
          requestId,
        }
      );
      const data = await response.json();

      if (data.success) {
        fetchWithdrawalRequests();
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error approving withdrawal request:", error);
    }
  };

  console.log(withdrawalRequests);

  return (
    <div className="mb-14 mt-4">
      <h1 className="py-2 px-7 font-semibold">Withdrawal Requests</h1>
      <div className="pb-4 px-7 font-semibold ">
        <label htmlFor="statusFilter">Filter by Status:</label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ outline: "none", borderRadius: "5px" }}
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
        </select>
      </div>
      <div className="overflow-x-auto px-4">
        {loading ? (
          <Box sx={{ width: "10%", margin: "0 auto" }}>
            <CircularProgress />
          </Box>
        ) : withdrawalRequests.length > 0 ? (
          <table className="border-collapse border border-gray-400">
            {/* Table headers */}
            <thead>
              <tr className="bg-gray-500 text-white">
                <th className="font-bold px-2 border border-gray-400">ID</th>
                <th className="font-semibold px-2 border border-gray-400">
                  Address
                </th>
                <th className="font-semibold px-2 border border-gray-400">
                  Date
                </th>
                <th className="font-semibold px-2 border border-gray-400">
                  Withdraw Game Coins
                </th>
                <th className="font-semibold px-2 border border-gray-400">
                  Status
                </th>
                <th className="font-semibold px-2 border border-gray-400">
                  Admin Address
                </th>
                <th className="font-semibold px-2 border border-gray-400">
                  Action
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {withdrawalRequests.map((request, index) => (
                <tr
                  key={request._id}
                  className={index % 2 ? "bg-white" : "bg-gray-200"}
                >
                  {/* Table data */}
                  <td className="px-2 py-2 border border-gray-400">
                    {request._id}
                  </td>
                  <td className="px-2 py-2 border border-gray-400">
                    {request.address}
                  </td>
                  <td className="px-2 py-2 border border-gray-400 text-center">
                    {new Date(request.date).toLocaleString()}
                  </td>
                  <td className="px-2 py-2 border border-gray-400 text-center">
                    {request.withdrawGameCoins}
                  </td>
                  <td className="px-2 py-2 border border-gray-400">
                    {request.status}
                  </td>
                  <td className="px-2 py-2 border border-gray-400">
                    {request.adminAddress || "-"}
                  </td>
                  <td className="px-2 py-2 border border-gray-400">
                    {request.status === "pending" && (
                      <button
                        className="bg-blue-500 text-white py-2 px-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                        onClick={() => approveRequest(request._id)}
                      >
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="w-3/12 my-16 text-center rounded-3xl mx-auto">
            No withdrawal requests {statusFilter === "pending" ? "pending" : ""}
            .
          </div>
        )}
      </div>
    </div>
  );
};

export default WithdrawalRequests;
