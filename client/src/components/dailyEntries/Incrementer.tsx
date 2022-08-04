import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

type IncrementerProps = {
  labelText: string;
};

const Incrementer = ({labelText}: IncrementerProps) => {
  let initialCount = labelText === "Body weight" ? 257 : 0;
  const [count, setCount] = React.useState(initialCount);
  let counterText = count !== initialCount ? "text.primary" : "text.secondary";
  const handleClick = (operation: string )=>{
    operation === 'increment' ? setCount(count + 1) : count > 0 ? setCount(count - 1) : setCount(count);
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
        <Fab size="small" onClick={()=>{handleClick('decrement')}}>
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
        <Fab onClick={()=>{handleClick('increment')}}>
          <AddIcon
          sx={{ fontSize: '1rem' }}/>
        </ Fab>
      </Box>
    </Box>
  );
}

export default Incrementer;