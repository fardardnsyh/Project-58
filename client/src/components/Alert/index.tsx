import React from 'react';
import { Box, Typography } from '@mui/material';
import { useAppContext } from '../../context/AppContext';

function Alert() {
  const { alertType, alertText } = useAppContext();
  return (
    <Box
      textAlign="center"
      padding={1}
      borderRadius={1}
      sx={
        alertType === 'success'
          ? {
              bgcolor: 'success.light',
            }
          : {
              bgcolor: 'error.light',
            }
      }>
      <Typography color={`${alertType === 'success' ? 'success.dark' : 'error.dark'}`}>{alertText}</Typography>
    </Box>
  );
}

export default Alert;
