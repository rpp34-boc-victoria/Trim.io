
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Daily = (props: any) => {

  const { handleDailyUpdate, dailyData } = props;

  useEffect(() => {
    handleDailyUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  return (
    <Box className='daily'>
      <Typography className="title">Calories</Typography>
      <div>
        {`${dailyData?.caloriesAmount}`}
      </div>
    </Box>
  )
}

export default Daily;