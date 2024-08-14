import React from 'react';
import { Box, Typography } from '@mui/material';
import { useAppContext } from '../../context/AppContext';
import { NavLinks, LargeLogo } from '../../components';

function BigSidebar() {
  const { showSidebar, toggleSidebar } = useAppContext();

  return (
    <Box>
      {!showSidebar && (
        <Box width="100%" paddingY={2}>
          <Box display="flex" justifyContent="center">
            <LargeLogo />
          </Box>
          <NavLinks toggleSidebar={toggleSidebar} />
        </Box>
      )}
    </Box>
  );
}

export default BigSidebar;
