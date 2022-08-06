// import * as React from "react";
// import { apiPost } from "../../api";
import "./userRegistration.scss";
import { Typography, Input, Box } from "@mui/material";
import Select from "react-select";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { BMIcal, BFPcal, BMRcal, RecommandedCaloIntakecal, RecommandedWaterIntakecal } from './calculators';
import axios from "axios";

interface IFormInput {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phoneNumber: number;
  gender: { label: string; value: string };
  height: number;
  weight: number;
  caloriesGoal: number;
  waterGoal: number;
  user_id: any;
  userBMI: number;
  userBFP: number;
  userBMR: number;
  userRecommandedCaloIntake: number;
  userRecommandedWaterIntake: number;
}


export default function UserRegistration(props: any) {

  const { control, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(props.userID)
    data.user_id = props.userID;
    data.userBMI = BMIcal(data.weight, data.height);
    data.userBFP = BFPcal(data.gender.value, data.weight, data.height, data.age);
    data.userBMR = BMRcal(data.gender.value, data.weight, data.height, data.age);
    data.userRecommandedCaloIntake = RecommandedCaloIntakecal(data.gender.value, data.height, data.weight, data.age);
    data.userRecommandedWaterIntake = RecommandedWaterIntakecal(data.weight);
    axios.post("/api/register", data).then((res) => {
      //console.log("user successfully posted something, :", res);
      props.setSignUp('SignedUp')
      props.setUserInfomation(data);
    }).catch(err => {
      console.log(data)
      alert(`User Creation NOT Succssful: ${err.message}`);
    });
  };

  return (
    <Box className="signUpForm">
      <Typography variant="h4">SIGN UP</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography>
          <sub>First Name</sub>
        </Typography>
        <Controller
          name="firstName"
          control={control}
          defaultValue=""
          render={({ field }) => <Input {...field} />}
        />
        <Typography>
          <sub>Last Name</sub>
        </Typography>
        <Controller
          name="lastName"
          control={control}
          defaultValue=""
          render={({ field }) => <Input {...field} />}
        />
        <Typography>
          <sub>Age</sub>
        </Typography>
        <Controller
          name="age"
          control={control}
          defaultValue={0}
          render={({ field }) => <Input {...field} />}
        />
        <Typography>
          <sub>Gender</sub>
        </Typography>
        <Controller
          name="gender"
          control={control}
          defaultValue={{ value: "", label: "" }}
          render={({ field }) => (
            <Select
              {...field}
              options={[
                { value: "M", label: "Male" },
                { value: "F", label: "Female" },
                { value: "N", label: "Non-binary" },
              ]}
            />
          )}
        />
        <Typography>
          <sub>Email</sub>
        </Typography>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => <Input {...field} />}
        />
        <Typography>
          <sub>Phone Number</sub>
        </Typography>
        <Controller
          name="phoneNumber"
          control={control}
          defaultValue={0}
          render={({ field }) => <Input {...field} />}
        />
        <Typography>
          <sub>height (cm)</sub>
        </Typography>
        <Controller
          name="height"
          control={control}
          defaultValue={0}
          render={({ field }) => <Input {...field} />}
        />
        <Typography>
          <sub>weight (kg)</sub>
        </Typography>
        <Controller
          name="weight"
          control={control}
          defaultValue={0}
          render={({ field }) => <Input {...field} />}
        />
        <Typography>
          <sub>Target Daily Calories Goal (kcal)</sub>
        </Typography>
        <Controller
          name="caloriesGoal"
          control={control}
          defaultValue={0}
          render={({ field }) => <Input {...field} />}
        />
        <Typography>
          <sub><i>Recommanded </i></sub>
          <sub><i>1000</i></sub>
          <sub><i> kcal Daily Calories intake based on your BMI</i></sub>
        </Typography>
        <Typography>
          <sub>Target Daily Water Intake Goal (cup)</sub>
        </Typography>
        <Controller
          name="waterGoal"
          control={control}
          defaultValue={0}
          render={({ field }) => <Input {...field} />}
        />
        <input type="submit" />
      </form>
    </Box>
  );
}