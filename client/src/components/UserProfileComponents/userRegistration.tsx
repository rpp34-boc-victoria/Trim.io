import * as React from 'react';
import { apiPost } from "../../api";
import './userRegistration.scss';
import {
    Typography,
    AppBar,
    Toolbar,
    TextField,
    Button,
    Box,
    MenuItem,
    Input,
} from "@mui/material";
import Select from "react-select";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

interface IFormInput {
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    gender: { label: string; value: string };
    height: number;
    weight: number;
    targetWeight: number;
}

export default function UserRegistration() {
    const { control, handleSubmit } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = data => {
        console.log(data);
        apiPost("/api/register").then((res) => {
            console.log(res);
        })
    };

    return (
        <div>
            <Typography>
                <h1>SIGNUP FORM </h1>
            </Typography>
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
                    render={({ field }) => <Input {...field} />}
                />
                <Typography>
                    <sub>Gender</sub>
                </Typography>
                <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => <Select
                        {...field}
                        options={[
                            { value: "Male", label: "Male" },
                            { value: "Female", label: "Female" },
                            { value: "Non-binary", label: "Non-binary" }
                        ]}
                    />}
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
                    <sub>height (cm)</sub>
                </Typography>
                <Controller
                    name="height"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                />
                <Typography>
                    <sub>weight (kg)</sub>
                </Typography>
                <Controller
                    name="weight"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                />
                <Typography>
                    <sub>Target weight (kg)</sub>
                </Typography>
                <Controller
                    name="targetWeight"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                />
                <input type="submit" />
            </form>
        </div>
    );
}