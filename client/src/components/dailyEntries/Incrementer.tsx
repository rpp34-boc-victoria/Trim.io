import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { apiPost } from "../../api";

type IncrementerProps = {
  labelText: string,
  route: string
};

const Incrementer = ({labelText, route}: IncrementerProps) => {
  let initialCount = labelText === "Body weight" ? 257 : 0;
  const [count, setCount] = React.useState(initialCount);
  let counterText = count !== initialCount ? "text.primary" : "text.secondary";
  const handleClick = (changeAmount: string )=>{
    changeAmount === '1' ? setCount(count + 1) : count > 0 ? setCount(count - 1) : setCount(count);

    let data = {
      user_id: '007',
      entryDate: new Date(),
      changeAmount: changeAmount,
    }
    apiPost(`/${route}`, data);

  };

  return (
    <Box sx={{mb: '24px'}}>
      <Typography variant="caption" color="text.secondary">
        {labelText}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          mt: '4px'
        }}
      >
        <Fab size="small" onClick={()=>{handleClick('-1')}}>
          <RemoveIcon
           sx={{ fontSize: '1rem' }}/>
        </ Fab>
        <Typography
          variant="h5"
          color={counterText}
          sx={{ml: '12px', mr: '12px'}}
        >
          {count}
        </Typography>
        <Fab onClick={()=>{handleClick('1')}}>
          <AddIcon
          sx={{ fontSize: '1rem' }}/>
        </ Fab>
      </Box>
    </Box>
  );
}

export default Incrementer;