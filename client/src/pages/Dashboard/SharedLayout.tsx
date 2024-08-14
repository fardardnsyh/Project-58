import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Grid, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Navbar, SmallSidebar, BigSidebar } from '../../components';
import { useAppContext } from '../../context/AppContext';

function SharedLayout() {
  const theme = useTheme();
  const mdBreakPoint = useMediaQuery(theme.breakpoints.up('md'));
  const lgBreakPoint = useMediaQuery(theme.breakpoints.up('lg'));
  const { showSidebar } = useAppContext();

  return (
    <Box component="main" sx={{ bgcolor: '#fff' }}>
      <Grid container minHeight="100vh" justifyContent="center">
        {mdBreakPoint && (
          <Grid item md={!showSidebar ? (!lgBreakPoint ? 3 : 2) : 0}>
            <BigSidebar />
          </Grid>
        )}
        {!mdBreakPoint && (
          <Grid item xs={12}>
            <SmallSidebar />
          </Grid>
        )}
        <Grid item xs={12} md={!showSidebar ? (!lgBreakPoint ? 9 : 10) : 12}>
          <Box minHeight="100vh">
            <Navbar />
            <Box bgcolor="secondary.main">
              <Outlet />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SharedLayout;
