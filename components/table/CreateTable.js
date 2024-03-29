import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TableForm = () => {
  const initialFormData = {
    table_ID: "",
    Stop_Loss: 0,
    Based_Token: 0,
    winners_Rewards: 0,
    bet_Size: 0,
    Bankers_Address: "",
    Region: "",
    per_Share_Cost: 0,
    total_Investor_Seats: 0,
    Minimum_Investment: "",
    Max_Investment: "",
    investor_ProfitPercentage: "",
    Referal_Percentage: "",
    EndTime: new Date(), // Initialize EndTime with the current date and time
  };

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      status: "active",
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      Running_Token: formData.Based_Token,
      EndTime: date,
    });
  };

  const handleSubmit = async (e) => {
    console.log('creating the table');
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const baseUrl = process.env.BASE_URL;
      if (!baseUrl) {
        throw new Error("BASE_URL is not defined in the .env file.");
      }
      const formDataWithStatus = { ...formData };
      const response = await axios.post(
        `${baseUrl}/game-table/create`,
        formDataWithStatus
      );
      setSuccessMessage(response.data.message);
      setFormData(initialFormData)
    } catch (error) {
      setError("Error creating table. Please check the console for details.");
      console.error("Error creating table:", error);
    } finally {
      setLoading(false);
    }
  };

  // Splitting fields into two arrays
  const fieldsLeft = Object.keys(initialFormData).slice(0, 7);
  const fieldsRight = Object.keys(initialFormData).slice(7);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "16px",
        }}
        className="bg-gray-300"
      >
        <div>
          <h1 className="font-bold text-md ">Create Table</h1>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100vh",
          }}
        >
          {/* --- left --- */}

          <div className="w-5/12">
            {fieldsLeft.map((key) => (
              <div key={key} className="flex flex-col flex-wrap">
                <label className="block mb-1 font-bold " htmlFor={key}>
                  {key.replace(/_/g, " ")}:
                </label>
                <div>
                  <input
                    type={
                      typeof initialFormData[key] === "number"
                        ? "number"
                        : "text"
                    }
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className="border  rounded-md p-2 w-[100%] "
                    required
                  />
                </div>
              </div>
            ))}
          </div>

          {/* --- right --- */}

          <div className="w-5/12">
            {fieldsRight.map((key) => (
              <div key={key} className="flex flex-col flex-wrap">
                <label className="block mb-1 font-bold" htmlFor={key}>
                  {key.replace(/_/g, " ")}:
                </label>
                <div>
                  {key === "EndTime" ? (
                    <DatePicker
                      selected={formData.EndTime}
                      onChange={handleDateChange}
                      showTimeSelect
                      dateFormat="yyyy-MM-dd HH:mm:ss"
                      className="border ] rounded-md p-2 w-full"
                      required
                    />
                  ) : (
                    <input
                      type={
                        typeof initialFormData[key] === "number"
                          ? "number"
                          : "text"
                      }
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      className="border  rounded-md p-2 w-[100%]"
                      required
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* ----button---- */}
        <div className="w-6/12  mx-auto">
          <button
          onClick={handleSubmit}
            type="submit"
            className="w-full text-black py-2 px-4 rounded-md bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring focus:border-blue-300 mt-8"
            disabled={loading}
          >
            {loading ? "Creating Table..." : "Create Table"}
          </button>
        </div>
      </div>
    </>
  );
};

export default TableForm;
