import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {Autocomplete, Box, Button, Container, Modal, Stack, TextField, Typography} from '@mui/material';
import {useForm, Controller} from 'react-hook-form';
import { apiGet, apiPost } from "../../api";
import LabelWithText from "./LabelWithText";
import Incrementer from './Incrementer';
import AddIcon from '@mui/icons-material/Add';

type AddEntryProps = {
  user_id: string
};

const AddEntry = ({user_id}: AddEntryProps) => {
  const {register, control, handleSubmit, reset} = useForm();
  const [autocompleteItems, setAutocompleteItems] = React.useState([]);
  const [autocompleteItemSelected, setAutocompleteItem] = React.useState(false);
  const [servings, setServings] = React.useState(1);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () =>{
    setOpen(false);
    setAutocompleteItem(false);
    setAutocompleteItems([]);
    setServings(1);
    setGramsPerServing(0);
    setNutrientsPerServing({
      ENERC_KCAL: 0,
      PROCNT: 0,
      FAT: 0,
      CHOCDF: 0,
      FIBTG: 0
    });

    reset({
      entryDate: new Date(),
      foodItem: null,
      calories: null
    }, {
      keepErrors: true,
      keepDirty: true,
      keepIsSubmitted: false,
      keepTouched: false,
      keepIsValid: false,
      keepSubmitCount: false,
    });
  };

  interface Inutrients {
    ENERC_KCAL: number,
    PROCNT: number,
    FAT: number,
    CHOCDF: number,
    FIBTG: number
  }
  const [nutrientsPerServing, setNutrientsPerServing] = React.useState<Inutrients>({
    ENERC_KCAL: 0,
    PROCNT: 0,
    FAT: 0,
    CHOCDF: 0,
    FIBTG: 0
  });
  const [gramsPerServing, setGramsPerServing] = React.useState(0);

  type measureProps = {
    uri: string,
    label: string,
    weight: number
  }


  const handleAutoCompleteSelection = (event: React.SyntheticEvent, value: string | null): void =>{
    apiGet(`https://api.edamam.com/api/food-database/v2/parser?ingr=${value}&app_id=6a35cc72&app_key=a18f0cdf128302c9b05501ed1f9b9838`)
    .then((data)=>{
      let nutrients = data.hints[0].food.nutrients;
      let measures = data.hints[0].measures;
      let gramsPerServing: number = 1;

      measures.forEach((measure: measureProps)=>{
        if (measure.label === 'Serving') {
          gramsPerServing = measure.weight;
        }
      });
      for (let key in nutrients) {
        nutrients[key] = (nutrients[key] * gramsPerServing)/100;
      }

      setNutrientsPerServing(nutrients);
      setGramsPerServing(gramsPerServing);

      setAutocompleteItem(true);
    })
    .catch((err)=>{console.log('err auto complete get', err)})
  };

  const handleAutoCompleteTyping = (event: React.SyntheticEvent, value: string | null): void =>{
    apiGet(`https://api.edamam.com/auto-complete?app_id=6a35cc72&app_key=
    a18f0cdf128302c9b05501ed1f9b9838&q=${value}&limit=100`)
    .then((data)=>{
      setAutocompleteItems(data);
    })
  };

  const handleChangeServing = (changeAmount: string)=>{
    changeAmount === '1' ? setServings(servings + 1) : servings > 0 ? setServings(servings - 1) : setServings(servings);
  }

  return (
    <Box>
      <Button
        onClick={handleOpen}
        variant="outlined"
        sx={{ width: '100%' }}
      >
        <AddIcon sx={{ fontSize: '1rem' }}/>
        Add a food item
      </Button>
      <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="Add entry"
      aria-describedby="Add a food item and its related calories"
      >
      <Container
        sx={{
          position: 'absolute' as 'absolute',
          borderRadius: '12px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: "sm",
          bgcolor: 'background.paper',
          p: 5,
        }}
      >
        <Typography
          variant="h5"
          color="text.primary"
          sx={{mb: 4, fontWeight:500}}
        >
          Add a food item
        </Typography>
        <form onSubmit={
          handleSubmit(({entryDate, foodItem, calories})=> {
            alert(JSON.stringify([entryDate, foodItem, calories]));
            let data = {
              "user_id": user_id,
              "entryDate": entryDate,
              "foodItem": foodItem,
              "nutrients": nutrientsPerServing,
              "gramsPerServing": gramsPerServing,
              "servings": servings
            }
            console.log('post item data fe', data);
            apiPost("http://localhost:8000/foodItem", data)
            .then(()=>{
              setAutocompleteItem(false);
              setAutocompleteItems([]);
              handleClose();
            })
          })
        }>

          <Stack spacing={3}>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Controller
                control={control}
                name="entryDate"
                defaultValue={new Date()}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <DatePicker
                    onChange={(value)=>{onChange(value)}}
                    value={value}
                    label="Date"
                    renderInput={(params) => {return (<TextField {...params} />)}}
                  />
                )}
              />
            </LocalizationProvider>

            <Autocomplete
              freeSolo
              disableClearable
              onChange={handleAutoCompleteSelection}
              onInputChange={handleAutoCompleteTyping}
              options={autocompleteItems}
              renderInput={(params) => (
                <TextField
                  {...params}
                  {...register('foodItem')}
                  label="Food item"
                  InputProps={{
                    ...params.InputProps,
                    type: 'search'
                  }}
                />
              )}
            />

            {autocompleteItemSelected && (
              <Stack direction="row" spacing={4} alignItems="">
                <Incrementer
                  labelText='Servings'
                  defaultAmount={1}
                  active={true}
                  handleClick={handleChangeServing}
                ></Incrementer>
                <LabelWithText
                  labelText="Total calories"
                  mainText={Math.round(nutrientsPerServing.ENERC_KCAL * servings)}
                />
                <LabelWithText
                  labelText="Total grams"
                  mainText={gramsPerServing * servings}
                />
              </Stack>
            )}

            {!autocompleteItemSelected && (
              <TextField
                type="tel"
                label="Calories"
                {...register('calories')}
              />
            )}

            <Button
              variant="contained"
              type="submit"
              sx={{mt: '8px !important'}}
              onClick={() => {
                // reset({
                //   entryDate: new Date(),
                //   foodItem: null,
                //   calories: null
                // }, {
                //   keepErrors: true,
                //   keepDirty: true,
                //   keepIsSubmitted: false,
                //   keepTouched: false,
                //   keepIsValid: false,
                //   keepSubmitCount: false,
                // });
              }}
            >
              Submit
            </Button>

          </Stack>
        </form>
      </Container>
      </Modal>
    </Box>
  );
}

export default AddEntry;