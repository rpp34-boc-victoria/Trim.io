
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CalorieBar from "./calorieBar";
import './daily.scss';

const Daily = (props: any) => {

  const { handleDailyUpdate, dailyData } = props;
  const goal = 1800; // will be changed;
  const calorie = dailyData?.caloriesAmount; // will be changed;

  useEffect(() => {
    handleDailyUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (dailyData !== undefined) {
    return (
      <Box className='daily'>
        <Box className="chart_item">
          <Typography className="title">Calories</Typography>
          <Box className="chart_wrap">
            <CalorieBar data={[{ value: calorie, goal: goal }]}/>
          </Box>
        </Box>
      </Box>
    )
  }

  return (<Box className='daily'></Box>)

}

export default Daily;