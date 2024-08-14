import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import notFoundImg from '../../assets/images/not-found.svg';

function Error() {
  return (
    <Box component="main" bgcolor="secondary.main">
      <Container maxWidth="md">
        <Grid
          container
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
          rowSpacing={1}>
          <Grid item>
            <Box component="img" alt="error page" width="100%" src={notFoundImg}></Box>
          </Grid>
          <Grid item>
            <Typography variant="h3" align="center" sx={{ textTransform: 'capitalize' }}>
              page not found
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" align="center" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
              this page does not exist
            </Typography>
          </Grid>
          <Grid item>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Typography
                variant="body1"
                color="primary"
                textTransform="capitalize"
                align="center"
                sx={{ textDecoration: 'underline' }}>
                back home
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Error;
