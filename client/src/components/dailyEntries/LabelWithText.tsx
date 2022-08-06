import * as React from 'react';
import Typography from '@mui/material/Typography';
import {Stack} from '@mui/material';

type LabelWithTextProps = {
  labelText: string,
  mainText: number
};

const LabelWithText = ({labelText, mainText}: LabelWithTextProps) => {
  return (
    <Stack
      spacing={1}
      sx={{
        paddingTop: '4px',
        // mb: '24px',
        // display: 'flex',
        // flexDirection: 'column',
        // alignItems: 'left'
      }}
    >
      <Typography variant="caption" color="text.secondary">
        {labelText}
      </Typography>
      <Typography variant="h5" color="text.primary">
        {mainText}
      </Typography>
    </Stack>
  );
  // return (
  //   <Box
  //   sx={{
  //     mb: '24px',
  //     paddingTop: '4px',
  //     display: 'flex',
  //     flexDirection: 'column',
  //     alignItems: 'left'
  //   }}>
  //     <Typography variant="caption" color="text.secondary">
  //       {labelText}
  //     </Typography>
  //     <Typography variant="h5" color="text.primary">
  //       {mainText}
  //     </Typography>
  //   </Box>
  // );
}

export default LabelWithText;