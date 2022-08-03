import React, { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
// import ProTip from "./ProTip";
import Weekly from "./history/Weekly";
import { getDaily } from '../api';
import Daily from "./dashboard/Daily";
import UserReg from './UserProfileComponents/userRegistration';
import './App.scss'

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Trim.io
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}



export default function App(props: any) {

  /********************* State Hooks At App Level ******************/

  const [dailyData, setDailyData] = useState(async () => undefined);
  const [activeIndex, setActiveIndex] = useState("daily");

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
        <Typography variant="h3" component="h1"
          gutterBottom align="center" fontWeight="bold">
          Trim.io
        </Typography>
        {/* <ProTip /> */}
        {/* <History /> */}
        <Box className="history">
          <Box className="tab_wrap">
            <Box className="tab">
              <Typography
                className={`tab_item ${activeIndex === "daily" ? "active" : ""
                  }`}
                onClick={() => handleChangeTab("daily")}
              >
                Day
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
          {activeIndex === "daily" ?
            <Daily dailyData={dailyData} handleDailyUpdate={handleDailyUpdate} /> :
            <Weekly />
          }
        </Box>
        <Box>
          <UserReg />
        </Box>
        <Copyright />
      </Box>
    </Container>
  );
}
