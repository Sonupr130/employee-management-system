import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Barchart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchUserDataAndScores = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Error: No token found. Please log in.");
          return;
        }

        // Fetch user data using the token
        const userResponse = await axios.get("http://localhost:5000/get-user-data", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userId = userResponse.data?._id;
        if (!userId) {
          console.error("Error: User ID is missing.");
          return;
        }

        // Fetch appraisal scores using userId
        const response = await axios.get(
          `http://localhost:5000/user-appraisal-scores/${userId}`
        );

        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserDataAndScores();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="score" fill="#1D4ED8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Barchart;
