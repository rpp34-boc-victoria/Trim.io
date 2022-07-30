import React, { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import ProTip from "./ProTip";
import Weekly from "./history/Weekly";
import { getDaily } from '../api';
import Daily from "./dashboard/Daily";
import './App.scss';


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}



export default function App() {

  /********************* State Hooks At App Level ******************/

  const [dailyData, setDailyData] = useState(() => {})
  const [activeIndex, setActiveIndex] = useState("daliy");

  /*****************************************************************/

  const handleChangeTab = (type: string) => {
    setActiveIndex(type);
  };

  async function handleDailyUpdate() {
    try {
      let data = await getDaily();
      setDailyData(data);
    } catch (err: any) {
      throw err;
    }
  }


  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create React App example with TypeScript
        </Typography>
        <ProTip />
        {/* <History /> */}
        <Box className="history">
          <Box className="tab_wrap">
            <Box className="tab">
              <Typography
                className={`tab_item ${activeIndex === "daliy" ? "active" : ""
                  }`}
                onClick={() => handleChangeTab("daliy")}
              >
                Daliy
              </Typography>
              <Typography
                className={`tab_item ${activeIndex === "weekly" ? "active" : ""
                  }`}
                onClick={() => handleChangeTab("weekly")}
              >
                Weekly
              </Typography>
            </Box>
          </Box>
          {activeIndex === "daliy" ?
            <Daily dailyData={dailyData} handleDailyUpdate={handleDailyUpdate} /> :
            <Weekly />
          }
        </Box>
        <Copyright />
      </Box>
    </Container>
  );
}
