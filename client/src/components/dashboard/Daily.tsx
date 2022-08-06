
import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import CalorieBar from "./calorieBar";
import ExceedBar from './exceedBar';
import './daily.scss';
import { calcTotalCal } from '../utilFuncs';

const defaultCalorieGoal = 2000;
const defaultWaterGoal = 8;

const Daily = (props: any) => {

  const { handleDailyUpdate, dailyData, userInfo, submitModalOn, toggleSubmit } = props;
  const calorieGoal = userInfo?.caloriesGoal || defaultCalorieGoal;
  const waterGoal = userInfo?.waterGoal || defaultWaterGoal;
  const calorie = dailyData?.foodItems ? calcTotalCal(dailyData.foodItems) : null;
  const water = dailyData?.waterAmount || 0;

  useEffect(() => {
    handleDailyUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

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
        {/* <Box sx={{ height: '30px' }}></Box>
        <Box>
          {
            submitModalOn ? null :
              <Button sx={{ width: '100%' }}
                variant="contained"
                onClick={() => { toggleSubmit(true) }} >
                + Add Food Item
              </Button>
          }
        </Box> */}
      </Box>
    )
  }

  return (<Box className='daily'></Box>)

}

export default Daily;