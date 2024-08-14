import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Box, Button, Container, Grid, Typography, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { LandingPageAppBar } from '../../components';
import main from '../../assets/images/main.svg';
import AuthService from '../../utils/auth';

function Landing() {
  const theme = useTheme();
  const mdWidthMatch = useMediaQuery(theme.breakpoints.up('md'));

  const navigate = useNavigate();
  useEffect(() => {
    if (AuthService.loggedIn()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <Box component="main" bgcolor="secondary.main">
      <LandingPageAppBar />
      <Container maxWidth="lg">
        <Grid
          container
          display="flex"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
          marginTop={0}
          columnSpacing={5}>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" component="h1" fontWeight={500}>
              Job{' '}
              <Typography variant="h3" component="span" color="primary" fontWeight={500}>
                Application
              </Typography>{' '}
              Tracker
            </Typography>
            <Typography variant="body1" marginTop={2} marginBottom={3}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae voluptate voluptatum voluptatibus totam, non
              at atque, facilis qui iste aliquam magni libero. Nam, tempore quos? Vitae impedit voluptatem temporibus
              ut.
            </Typography>
            <Link to="/auth" style={{ textDecoration: 'none' }}>
              <Button
                type="submit"
                variant="contained"
                disableElevation
                sx={{ bgcolor: 'primary.main', color: '#f2f2f2' }}
                endIcon={<ArrowForwardIosSharpIcon />}>
                get started
              </Button>
            </Link>
          </Grid>
          {mdWidthMatch && (
            <Grid item md={6}>
              <Box component="img" width="100%" alt="woman jobhunting" src={main}></Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}

export default Landing;
