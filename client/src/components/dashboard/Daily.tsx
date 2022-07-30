
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Daily = (props: any) => {

  const { handleDailyUpdate, dailyData } = props;

  useEffect(() => {
    handleDailyUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  if (dailyData !== undefined) {
    return (
      <Box className='daily'>
        <Typography className="title">Calories</Typography>
        <div>
          {`${dailyData?.caloriesAmount}`}
        </div>
      </Box>
    )
  }

  return(<Box className='daily'></Box>)

}

export default Daily;