
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Daily = (props: any) => {

  const { handleDailyUpdate, dailyData } = props;

  useEffect(() => {
    handleDailyUpdate();
  }, []);



  return (
    <Box className='daily'>
      <Typography>
        {`${dailyData?.caloriesAmount}`}
      </Typography>
    </Box>
  )
}

export default Daily;