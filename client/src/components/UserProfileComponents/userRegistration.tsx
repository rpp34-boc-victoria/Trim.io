import * as React from "react";
import { apiPost } from "../../api";
import "./userRegistration.scss";
import { Typography, Input, Box } from "@mui/material";
import Select from "react-select";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

interface IFormInput {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phoneNumber: number;
  gender: { label: string; value: string };
  height: number;
  weight: number;
  targetCalories: number;
  targetWater: number;
}

export default function UserRegistration() {
  const { control, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    //console.log(data);
    apiPost("/api/register", data).then((res) => {
      //console.log("user successfully posted something, :", res);
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
          name="targetCalories"
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
          name="targetWater"
          control={control}
          defaultValue={0}
          render={({ field }) => <Input {...field} />}
        />
        <input type="submit" />
      </form>
    </Box>
  );
}
