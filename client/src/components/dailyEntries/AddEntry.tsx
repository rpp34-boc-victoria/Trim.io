import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {Autocomplete, Box, Button, Stack, TextField} from '@mui/material';
import {useForm, Controller} from 'react-hook-form';
import { apiGet, apiPost } from "../../api";


const AddEntry = () => {
  const {register, control, handleSubmit} = useForm();
  const [autocompleteItems, setAutocompleteItems] = React.useState([]);
  const foodItems = [
    "apple",
    "apple pie",
    "apple jam",
    "emu apple",
    "fuji apple",
    "gala apple",
    "tart apple",
    "apple mint",
    "applejack",
    "sorb apple"
];


  return (
    <Box>
      <form onSubmit={
        handleSubmit(({entryDate, foodItem, calories})=> {
          alert(JSON.stringify([entryDate, foodItem, calories]));
          let data = {
            "user_id": "007",
            "entryDate": entryDate,
            "foodItem": "potatoe",
            "nutrients": {
              "ENERC_KCAL": 371.0,
              "PROCNT": 13.04,
              "FAT": 1.51,
              "CHOCDF": 74.67,
              "FIBTG": 3.2
            },
            "gramsPerServing": "60",
            "servings": "2"
          }
          apiPost("http://localhost:8000/foodItem", data);
        })
      }>

        <Stack spacing={2}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Controller
            control={control}
            name="entryDate"
            defaultValue={new Date()}

            render={({ field: { onChange, onBlur, value, ref } }) => (
              <DatePicker
                onChange={(value)=>{console.log('change', this); onChange(value)}}
                value={value}
                label="Date"
                renderInput={(params) => {console.log('params', params); return (<TextField {...params} />)}}
              />
            )}
          />
          {/* <Controller
            control={control}
            name="date"
            defaultValue={new Date()}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <DatePicker
                // onChange={()=>{console.log('change')}}
                onChange={(value)=>{console.log('change', this); onChange(value)}}
                value={new Date()}
                label="Date"
                renderInput={(params) => {console.log('params', params); return (<TextField {...params} />)}}
              />
            )}
          /> */}
          </LocalizationProvider>

          <Autocomplete
            freeSolo
            disableClearable
            onChange={(event: React.SyntheticEvent, value: string | null): void =>{
              // console.log('autocomplete event, ', event);
              // console.log('autocomplete event target, ', event.target);
              // console.log('autocomplete value, ', value);
              apiGet(`https://api.edamam.com/api/food-database/v2/parser?ingr=${value}&app_id=6a35cc72&app_key=a18f0cdf128302c9b05501ed1f9b9838`)
              .then((data)=>{

                console.log('selectionn data', data);
              })
              .catch((err)=>{console.log('err auto complete get', err)})
            }}
            onInputChange={
              (event, value)=>{
                apiGet(`https://api.edamam.com/auto-complete?app_id=6a35cc72&app_key=
                a18f0cdf128302c9b05501ed1f9b9838&q=${value}&limit=100`)
                .then((data)=>{
                  setAutocompleteItems(data);
                })
              }
            }
            options={autocompleteItems}
            renderInput={(params) => (
              <TextField
                {...params}
                {...register('foodItem')}
                label="Food item"
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                }}
              />
            )}

          />
          <TextField
            type="tel"
            label="Calories"
            {...register('calories')}
          />
          <Button
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default AddEntry;