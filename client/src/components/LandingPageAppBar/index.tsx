import React from 'react';
import { AppBar, Toolbar, Container } from '@mui/material';
import { LargeLogo } from '../../components';

function LandingPageAppBar() {
  return (
    <AppBar sx={{ boxShadow: 0, paddingTop: '0.5rem', paddingBottom: '0.5rem' }} color="secondary">
      <Container maxWidth="lg">
        <Toolbar sx={{ padding: '0 !important' }}>
          <LargeLogo />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default LandingPageAppBar;
