import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MyBarChart from "./MyBarChart";
import MyLineChart from "./MyLineChart";
import "./History.scss";

const Weekly = () => {
  return (
    <Box className="weekly">
      <Box className="calories chart_item">
        <Typography className="title">Calories</Typography>
        <Box className="chart_wrap">
          <MyBarChart />
        </Box>
      </Box>
      <Box className="water chart_item">
        <Typography className="title">Water</Typography>
        <Box className="chart_wrap">
          <MyBarChart />
        </Box>
      </Box>
      <Box className="weight chart_item ">
        <Typography className="title">Weight</Typography>
        <Box className="chart_wrap">
          <MyLineChart/>
        </Box>
      </Box>
      <Box className="BMI chart_item ">
        <Typography className="title">BMI</Typography>
        <Box className="chart_wrap">
          <MyLineChart />
        </Box>
      </Box>
    </Box>
  );
};

const Daliy = () => {
  return <Box className="daliy">Daliy</Box>;
};

export default function History() {
  // hooks
  const [activeIndex, setActiveIndex] = useState("daliy");

  const handleChangeTab = (type: string) => {
    setActiveIndex(type);
  };

  return (
    <Box className="history">
      <Box className="tab_wrap">
        <Box className="tab">
          <Typography
            className={`tab_item ${activeIndex === "daliy" ? "active" : ""}`}
            onClick={() => handleChangeTab("daliy")}
          >
            Daliy
          </Typography>
          <Typography
            className={`tab_item ${activeIndex === "weekly" ? "active" : ""}`}
            onClick={() => handleChangeTab("weekly")}
          >
            Weekly
          </Typography>
        </Box>
      </Box>
      {activeIndex === "daliy" ? <Daliy /> : <Weekly />}
    </Box>
  );
}
