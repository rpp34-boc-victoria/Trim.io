

import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
// import ProTip from "./ProTip";
import Weekly from "./history/Weekly";
import { getDaily, getUserInfo } from '../api';
import Daily from "./dashboard/Daily";
import UserReg from './UserProfileComponents/userRegistration';
import AddEntry from './dailyEntries/AddEntry';
import Incrementer from './dailyEntries/Incrementer';
import { ThemeProvider } from '@mui/material/styles';
import { Divider } from '@mui/material';
import theme from '../theme';
import ToastNotification from './ToastNotification/ToastNotification';
import './App.scss'


export default function App(props: any) {

  /********************* State Hooks At App Level ******************/


  const user_id = props.data.username;
  const [signUp, setSignedUp] = useState(props.signedUp);
  const [weightAmount, setWeightAmount] = useState(0);
  const [waterAmount, setWaterAmount] = useState(0);
  const [dailyData, setDailyData] = useState(() => undefined);
  const [activeIndex, setActiveIndex] = useState("daliy");
  const [userInfo, setUserInfo] = useState(undefined);
  const [submitModalOn, toggleSubmit] = useState(false);

  /*****************************************************************/

  const handleChangeTab = (type: string) => {
    setActiveIndex(type);
  };

  async function handleDailyUpdate() {
    try {
      let data = await getDaily(user_id);
      setDailyData(data);
      console.log('daily data, ', data);
      setWaterAmount(data.waterAmount);
      setWeightAmount(data.weightAmount);
    } catch (err: any) {
      throw err;
    }
  };

  async function updateUserInfo(user_id: String) {
    let info = await getUserInfo(user_id);
    setUserInfo(info);
    console.log('USER INFO: ', info);
  }

  useEffect(() => {
    updateUserInfo(user_id);
  }, [user_id]);

  if (signUp === 'newAccount') {
    return (
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Box>
            <UserReg setSignUp={setSignedUp} setUserInfomation={setUserInfo} userID={user_id}/>
          </Box>
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
                    Daily
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
                <Daily dailyData={dailyData}
                  handleDailyUpdate={handleDailyUpdate}
                  userInfo={userInfo}
                  toggleSubmit={toggleSubmit}
                  submitModalOn={submitModalOn} /> :
                <Weekly />
              }
            </Box>
          </Box>
          <Incrementer
            labelText='Water (cups)'
            route="water"
            user_id={user_id}
            defaultAmount={waterAmount}
          />
          <Divider sx={{mb: '16px'}} />
          <Incrementer
            labelText='Body weight'
            route="weight"
            user_id={user_id}
            defaultAmount={weightAmount}
          />
          <AddEntry
            user_id={user_id}
          />
          <ToastNotification />
        </Container>
      </ThemeProvider>
    );
  }
}
