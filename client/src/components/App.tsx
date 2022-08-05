

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
import AddEntry from './dailyEntries/AddEntry';
import Incrementer from './dailyEntries/Incrementer';
import {ThemeProvider} from '@mui/material/styles';
import { Divider } from '@mui/material';
import theme from '../theme';
import ToastNotification from './ToastNotification/ToastNotification';
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
  const [activeIndex, setActiveIndex] = useState("daliy");
  // const [username, userId] = [...props.data];
  const user_id = props.data.username;
  const user_id_obj = {userID: user_id};
  // const userId = props.data.userId;
  const [signUp, setSignedUp] = useState(props.signedUp);

  /*****************************************************************/

  const handleChangeTab = (type: string) => {
    setActiveIndex(type);
  };

  async function handleDailyUpdate() {
    try {
      console.log(user_id);
      let data = await getDaily();
      setDailyData(data);
    } catch (err: any) {
      throw err;
    }
  }
  if (signUp === 'newAccount') {
    return (
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Box>
            <UserReg setSignUp= {setSignedUp}/>
          </Box>
          <Copyright />
        </Box>
      </Container>
    );
  } else {
    return (
    <ThemeProvider theme={theme}>
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
          <Incrementer labelText='Water (cups)' />
          <Divider sx={{mb: '16px'}} />
          <Incrementer labelText='Body weight' />
          <AddEntry></AddEntry>
          <Copyright />
        </Box>
        <ToastNotification />
      </Container>
    </ThemeProvider>
    );
  }
}
