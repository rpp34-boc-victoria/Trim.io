
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CalorieBar from "./calorieBar";
import ExceedBar from './exceedBar';
import './daily.scss';

const defaultCalorieGoal = 2000;
const defaultWaterGoal = 8;

const Daily = (props: any) => {

  const { handleDailyUpdate, dailyData, userInfo } = props;
  const calorieGoal = userInfo?.targetCalories || defaultCalorieGoal;
  const calorie = dailyData?.caloriesAmount; // will be changed;
  const waterGoal = userInfo?.targetWater || defaultWaterGoal;
  const water = dailyData?.waterAmount; // will be changed;

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
          <Typography className="title">{`${calorie} / ${calorieGoal}`}</Typography>
            <CalorieBar
              data={[{ value: calorie, goal: calorieGoal }]} />
          </Box>
        </Box>
        <Box className="chart_item">
          <Typography className="title">Water</Typography>
          <Box className="chart_wrap">
          <Typography className="title">{`${water} / ${waterGoal}  \t cups`}</Typography>
            <ExceedBar
              data={[{ value: water, goal: waterGoal }]} />
          </Box>
        </Box>
      </Box>
    )
  }

  return (<Box className='daily'></Box>)

}

export default Daily;