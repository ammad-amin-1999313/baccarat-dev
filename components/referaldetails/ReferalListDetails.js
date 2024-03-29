import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import SliceAccount from "../common/SliceAccount";
import SliceTexted from "../common/sliceText";

const ReferalListDetails = () => {
  const [referalData, setReferalDetails] = useState([]);
  const [rewardDetails, setRewardDetails] = useState(null);
  const [test, setTest] = useState(null);
  const fetchReferalData = async () => {
    try {
      const baseUrl = process.env.BASE_URL;
      if (!baseUrl) {
        console.error("Base Url is not defined in the .env file");
      }
      const response = await axios.get(`${baseUrl}/referal/list`);
      setReferalDetails(response.data.referrals);
    } catch (error) {
      console.error("Error fetching reference details", error);
    }
  };

  const fetchRewardDetails = async (referralAddress) => {
    try {
      const baseUrl = process.env.BASE_URL;
      if (!baseUrl) {
        console.error("Base Url is not defined in the .env file");
      }
      setTest(null);
      setRewardDetails(null);
      const response = await axios.get(
        `${baseUrl}/referal/details/${referralAddress}`
      );
      console.log(response.data);
      setRewardDetails(response.data);
      console.log(setRewardDetails);
    } catch (error) {
      console.error("Error fetching Referral Reward details", error);
    }
  };

  useEffect(() => {
    fetchReferalData();
  }, []);

  useEffect(() => {
    if (test) {
      fetchRewardDetails(test);
    }
  }, [test]);
  console.log("test", test);

  const referralCounts = {};
  const uniqueReferalAddresses = [];
  referalData.forEach((referal) => {
    const { MyReferalAddress } = referal;
    if (!uniqueReferalAddresses.includes(MyReferalAddress)) {
      uniqueReferalAddresses.push(MyReferalAddress);
    }
    referralCounts[MyReferalAddress] =
      (referralCounts[MyReferalAddress] || 0) + 1;
  });

  return (
    <>
      <Grid
        container
        gap={2}
        sx={{
          display: "flex",
          flexDirection: "row",
          padding: "20px 33px",
          justifyContent: "space-between",
          "@media (max-width: 600px)": {
            flexDirection: "column", // Change to column layout for small screens
          },
        }}
      >
        <Grid item xs={12} md={10} lg={6}>
          <Typography className="py-4 font-bold text-[22px]">
            Referal Details
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow className="bg-gray-400">
                  <TableCell className="border-t-2 font-bold">#</TableCell>
                  <TableCell className=" border-t-2 text-center font-bold">
                    MyReferalAddress
                  </TableCell>
                  <TableCell className=" border-t-2 text-center font-bold">
                    No. of User Register
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* \/           // Rendering table rows with unique referral addresses and counts */}
                {uniqueReferalAddresses.map((referralAddress, index) => (
                  <TableRow
                    key={index}
                    className={`${index % 2 ? "bg-white" : "bg-gray-100"} `}
                    onClick={() => setTest(referralAddress)}
                    style={{ cursor: "pointer" }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {typeof referralAddress === "string"
                        ? `${referralAddress.slice(
                            0,
                            6
                          )} ....... ${referralAddress.slice(-6)}`
                        : ""}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {referralCounts[referralAddress]}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        {/* ---------- */}
        <Grid item xs={12} md={10} lg={5}>
          <Typography className="py-4 font-bold text-[22px]">
            Referal Information
          </Typography>

          {rewardDetails ? (
            <>
              <Typography p={2} className="bg-gray-400">
                <span className="font-bold text-[16px]">
                  {" "}
                  Total Reward Wins:{"  "}
                </span>
                {/* <SliceTexted account={rewardDetails.totalReferralRewards} /> */}
                {rewardDetails && rewardDetails.totalReferralRewards}{" "}
                <span className="font-bold text-[16px]">Game Coins</span>
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow className="bg-gray-300">
                      <TableCell className="border-t-2 font-bold">
                        User Address
                      </TableCell>
                      <TableCell className="border-t-2  font-bold">
                        Rewards
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rewardDetails.organizedGameInfo.map((data, index) => (
                      <TableRow>
                        <TableCell
                          sx={{
                            padding: "24px 30px",
                            borderBottom: "1px solid #e0e0e0",
                          }}
                        >
                          <SliceTexted account={data.gamer_Address} />
                        </TableCell>
                        <TableCell>
                          <span key={index}>
                            <h1>{data.totalReferralRewards}</h1>
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ) : (
            <Typography className="py-4 font-regular text-[22px]">
              Click on Referal Address to get details
            </Typography>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default ReferalListDetails;
