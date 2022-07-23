import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MyBarChart from "./MyBarChart";
import MyLineChart from "./MyLineChart";
import "./History.scss";

interface IDaliy {
  user_id: string;
  waterAmount: number;
  weightAmount: number;
  foodItems?: any;
  entryDate?: Date;
  bmi?: number;
  bfp?: number;
  age?: number;
}

type TGender = 0 | 1;

enum EGender {
  female=0,
  male=1,
}

interface IUser {
  gender: EGender;
  weight: number;
  height: number;
  caloriesGoal: number;
  waterGoal: number;
  age: number;
}

const Weekly = () => {
  const [userInfo, setUserInfo] = useState<IUser>({
    gender: EGender.female,
    weight: 50,
    height: 1.7,
    caloriesGoal: 500,
    waterGoal: 8,
    age: 27,
  });
  const [weeklyData, setWeeklyData] = useState<IDaliy[]>([
    { user_id: "62da3e404afcce3152212f47", waterAmount: 8, weightAmount: 49 },
    { user_id: "62da3e404afcce3152212f47", waterAmount: 5, weightAmount: 49 },
    { user_id: "62da3e404afcce3152212f47", waterAmount: 8, weightAmount: 48 },
    { user_id: "62da3e404afcce3152212f47", waterAmount: 3, weightAmount: 49 },
  ]);

  useEffect(() => {
    //发起请求 ， 成功后根据获取的数据计算bmi，bfp
    const tempData = [...weeklyData];
    const { weight, height, gender, age } = userInfo;
    tempData.forEach((item) => {
      item.bmi = Number((weight / (height * height)).toFixed(2));
      if (gender === EGender.female) {
        item.bfp = 1.2 * item.bmi + 0.23 * age - 5.4;
      } else if (gender === EGender.male) {
        item.bfp = 1.2 * item.bmi + 0.23 * age - 16.2;
      }

    });

    console.log(weeklyData)
    setWeeklyData(tempData)
    console.log(weeklyData)
  },[]);

  return (
    <Box className="weekly">
      <Box className="calories chart_item">
        <Typography className="title">Calories</Typography>
        <Box className="chart_wrap">
          <MyBarChart />
        </Box>
      </Box>
      <Box className="water chart_item">
        <Typography className="title">Water</Typography>
        <Box className="chart_wrap">
          <MyBarChart />
        </Box>
      </Box>
      <Box className="weight chart_item ">
        <Typography className="title">Weight</Typography>
        <Box className="chart_wrap">
          <MyLineChart />
        </Box>
      </Box>
      <Box className="BMI chart_item ">
        <Typography className="title">BMI</Typography>
        <Box className="chart_wrap">
          <MyLineChart />
        </Box>
      </Box>
    </Box>
  );
};

const Daliy = () => {
  return <Box className="daliy">Daliy</Box>;
};

export default function History() {
  // hooks
  const [activeIndex, setActiveIndex] = useState("daliy");

  const handleChangeTab = (type: string) => {
    setActiveIndex(type);
  };

  return (
    <Box className="history">
      <Box className="tab_wrap">
        <Box className="tab">
          <Typography
            className={`tab_item ${activeIndex === "daliy" ? "active" : ""}`}
            onClick={() => handleChangeTab("daliy")}
          >
            Daliy
          </Typography>
          <Typography
            className={`tab_item ${activeIndex === "weekly" ? "active" : ""}`}
            onClick={() => handleChangeTab("weekly")}
          >
            Weekly
          </Typography>
        </Box>
      </Box>
      {activeIndex === "daliy" ? <Daliy /> : <Weekly />}
    </Box>
  );
}
