import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Box, Button, Grid, TextField, Container, Typography } from '@mui/material';
import { useQuery } from '@apollo/client';
import { QUERY_LOGGED_IN_USER } from '../../utils/queries';
import { useAppContext } from '../../context/AppContext';
import { Alert } from '../../components';

function Profile() {
  const { loading, data } = useQuery(QUERY_LOGGED_IN_USER);
  const userData = data?.me || {};
  const { isLoading, showAlert, displayAlert, updateCurrentUser } = useAppContext();

  const [formState, setFormState] = useState({
    name: '',
    lastName: '',
    email: '',
    location: '',
  });

  useEffect(() => {
    if (data) {
      setFormState({
        name: userData.name,
        lastName: userData.lastName,
        email: userData.email,
        location: userData.location,
      });
    }
  }, [data, userData.email, userData.lastName, userData.location, userData.name]);

  function handleFormChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  }

  async function handleFormSubmit(event: FormEvent) {
    event.preventDefault();
    const { name, lastName, email, location } = formState;
    if (!email || !lastName || !email || !location) {
      return displayAlert();
    }
    try {
      updateCurrentUser({ name, lastName, email, location });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  return (
    <Box bgcolor="secondary.main">
      <Container maxWidth={false} sx={{ minHeight: 'calc(100vh - 80px)' }}>
        <Grid container display="flex" justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h4" padding={2} margin={2} gutterBottom>
              Profile
            </Typography>
          </Grid>
          <Grid item xs={12} sm={9} md={7} lg={5} xl={4}>
            <Box
              onSubmit={handleFormSubmit}
              component="form"
              noValidate
              autoComplete="off"
              display="flex"
              justifyContent="center"
              flexDirection="column"
              rowGap={4}
              borderRadius="0.25rem"
              sx={{ backgroundColor: '#fff' }}
              borderTop="5px solid"
              borderColor="primary.main"
              padding={5}>
              <Typography variant="h5" textAlign="center" textTransform="capitalize">
                update profile
              </Typography>
              {showAlert && <Alert />}
              <TextField
                onChange={handleFormChange}
                name="name"
                label="Name"
                value={formState.name}
                type="text"
                variant="outlined"
                color="primary"
                fullWidth
                required
                size="small"
                placeholder="Your name"></TextField>
              <TextField
                onChange={handleFormChange}
                name="lastName"
                label="Last Name"
                value={formState.lastName}
                type="text"
                variant="outlined"
                color="primary"
                fullWidth
                required
                size="small"
                placeholder="Your last name"></TextField>
              <TextField
                onChange={handleFormChange}
                name="email"
                label="Email"
                value={formState.email}
                type="email"
                variant="outlined"
                color="primary"
                fullWidth
                required
                size="small"
                placeholder="Your email"></TextField>
              <TextField
                onChange={handleFormChange}
                name="location"
                label="Location"
                value={formState.location}
                type="text"
                variant="outlined"
                color="primary"
                fullWidth
                required
                size="small"
                placeholder="Your location"></TextField>
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                disableElevation
                sx={{ bgcolor: 'primary.main', color: '#f2f2f2' }}>
                submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Profile;
