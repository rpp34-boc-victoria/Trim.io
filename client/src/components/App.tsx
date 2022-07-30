import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import ProTip from "./ProTip";
import Weekly from "./history/Weekly";
import UserReg from './UserProfileComponents/userRegistration';
import './App.scss'

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
  const [activeIndex, setActiveIndex] = React.useState("daliy");

  const handleChangeTab = (type: string) => {
    setActiveIndex(type);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create React App example with TypeScript
        </Typography>
        <ProTip />
        {/* <History /> */}
        <UserReg />
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
          {activeIndex === "daliy" ? <Box /> : <Weekly />}
        </Box>
        <Copyright />
      </Box>
    </Container>
  );
}
