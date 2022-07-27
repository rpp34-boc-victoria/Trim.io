import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MyBarChart from "./MyBarChart";
import MyLineChart from "./MyLineChart";
import "./Weekly.scss";
import { apiGet } from "../../api";
import dayjs from "dayjs";

interface IDaliy {
  user_id: string;
  waterAmount: number;
  weightAmount: number;
  caloriesAmount: number;
  foodItems?: any;
  entryDate?: Date;
  bmi: number;
  bfp: number;
  age?: number;
}

enum EGender {
  female = 0,
  male = 1,
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
  const [userInfo] = useState<IUser>({
    gender: EGender.female,
    weight: 50,
    height: 1.7,
    caloriesGoal: 500,
    waterGoal: 8,
    age: 27,
  });
  const [weeklyData, setWeeklyData] = useState<IDaliy[]>([]);

  useEffect(() => {
    getWeekly();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  const getWeekly = async () => {
    //发起请求 ， 成功后根据获取的数据计算bmi，bfp
    const result = await apiGet("/api/getWeekly");
    console.log(result);
    if (result) {
      const tempData = [...result];
      const {height, gender, age } = userInfo;
      tempData.forEach((item) => {
        item.entryDate = dayjs(item.entryDate).format("MM/DD");
        item.bmi = Number((item.weightAmount / (height * height)).toFixed(2));
        if (gender === EGender.female) {
          item.bfp = 1.2 * item.bmi + 0.23 * age - 5.4;
        } else if (gender === EGender.male) {
          item.bfp = 1.2 * item.bmi + 0.23 * age - 16.2;
        }
      });
      setWeeklyData(tempData);
    }
  };

  return (
    <Box className="weekly">
      <Box className="calories chart_item">
        <Typography className="title">Calories</Typography>
        <Box className="chart_wrap">
          <MyBarChart
            data={weeklyData.map((item) => ({ value: item.caloriesAmount }))}
          />
        </Box>
      </Box>
      <Box className="water chart_item">
        <Typography className="title">Water</Typography>
        <Box className="chart_wrap">
          <MyBarChart
            data={weeklyData.map((item) => ({ value: item.waterAmount }))}
          />
        </Box>
      </Box>
      <Box className="weight chart_item ">
        <Typography className="title">Weight</Typography>
        <Box className="chart_wrap">
          <MyLineChart
            data={weeklyData.map((item) => ({
              value: item.weightAmount,
              date: item.entryDate,
            }))}
          />
        </Box>
      </Box>
      <Box className="BMI chart_item ">
        <Typography className="title">BMI</Typography>
        <Box className="chart_wrap">
          <MyLineChart
            data={weeklyData.map((item) => ({
              value: item.bmi,
              date: item.entryDate,
            }))}
          />
        </Box>
      </Box>
      <Box className="BFP chart_item ">
        <Typography className="title">BFP</Typography>
        <Box className="chart_wrap">
          <MyLineChart
            data={weeklyData.map((item) => ({
              value: item.bfp,
              date: item.entryDate,
            }))}
          />
        </Box>
      </Box>
    </Box>
  );
};

// const Daliy = () => {
//   return <Box className="daliy">Daliy</Box>;
// };

// export default function History() {
//   // hooks
//   const [activeIndex, setActiveIndex] = useState("daliy");

//   const handleChangeTab = (type: string) => {
//     setActiveIndex(type);
//   };

//   return (
//     <Box className="history">
//       <Box className="tab_wrap">
//         <Box className="tab">
//           <Typography
//             className={`tab_item ${activeIndex === "daliy" ? "active" : ""}`}
//             onClick={() => handleChangeTab("daliy")}
//           >
//             Daliy
//           </Typography>
//           <Typography
//             className={`tab_item ${activeIndex === "weekly" ? "active" : ""}`}
//             onClick={() => handleChangeTab("weekly")}
//           >
//             Weekly
//           </Typography>
//         </Box>
//       </Box>
//       {activeIndex === "daliy" ? <Daliy /> : <Weekly />}
//     </Box>
//   );
// }

export default Weekly;
