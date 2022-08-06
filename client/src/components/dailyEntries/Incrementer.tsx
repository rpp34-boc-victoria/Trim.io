import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { apiPost } from "../../api";
import { format, parseISO } from 'date-fns';

type IncrementerProps = {
  labelText: string,
  defaultAmount: number,
  active?: boolean,
  handleClick?: Function,
  route?: string,
  user_id?: number,
};

const Incrementer = ({labelText, defaultAmount, active, handleClick,route, user_id }: IncrementerProps) => {
  let initialCount = defaultAmount;
  const [count, setCount] = React.useState(initialCount);

  let counterText = active === true ? "text.primary" : count !== initialCount ? "text.primary" : "text.secondary";

  let handleChange = (changeAmount: string )=>{
    changeAmount === '1' ? setCount(count + 1) : count > 0 ? setCount(count - 1) : setCount(count);

    if (handleClick) {handleClick(changeAmount)}
    else {
      let data = {
        user_id: user_id,
        entryDate: format(new Date(), 'yyyy-MM-dd'),
        changeAmount: changeAmount
      }
      apiPost(`/${route}`, data);
    }
  };

  // handleClick = handleClick ? handleClick: postClick;

  return (
    <Box sx={{mb: '24px', mt: '0px'}}>
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
        <Fab size="small" onClick={()=>{handleChange('-1')}}>
          <RemoveIcon sx={{ fontSize: '1rem' }}/>
        </ Fab>
        <Typography
          variant="h5"
          color={counterText}
          sx={{ml: '12px', mr: '12px'}}
        >
          {count}
        </Typography>
        <Fab onClick={()=>{handleChange('1')}}>
          <AddIcon sx={{ fontSize: '1rem' }}/>
        </ Fab>
      </Box>
    </Box>
  );
}

export default Incrementer;