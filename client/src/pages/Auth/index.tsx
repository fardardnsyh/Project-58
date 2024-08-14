import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Box, Button, Container, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { LargeLogo, Alert } from '../../components';
import { useAppContext } from '../../context/AppContext';
import AuthService from '../../utils/auth';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
  showPassword: false,
};

function Auth() {
  const [values, setValues] = useState(initialState);
  const { isLoading, showAlert, displayAlert, registerUser, loginUser } = useAppContext();

  const navigate = useNavigate();
  useEffect(() => {
    if (AuthService.loggedIn()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  function handleClickShowPassword() {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  }

  function toggleMember() {
    setValues({
      ...values,
      isMember: !values.isMember,
    });
  }

  function handleFormChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  }

  async function handleFormSubmit(event: FormEvent) {
    event.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!name && !isMember)) {
      return displayAlert();
    }
    try {
      if (values.isMember) {
        loginUser(values);
      } else {
        registerUser(values);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  return (
    <Box component="main" bgcolor="secondary.main">
      <Container maxWidth="lg">
        <Grid container minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={9} md={7} lg={5}>
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
              <LargeLogo />
              <Typography variant="h4" component="h3" textAlign="center">
                {values.isMember ? 'Login' : 'Register'}
              </Typography>
              {showAlert && <Alert />}
              {!values.isMember && (
                <TextField
                  onChange={handleFormChange}
                  name="name"
                  label="Name"
                  value={values.name}
                  type="text"
                  variant="outlined"
                  color="primary"
                  fullWidth
                  required
                  size="small"
                  placeholder="Your name"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">{<PersonOutlineIcon />}</InputAdornment>,
                  }}></TextField>
              )}
              <TextField
                onChange={handleFormChange}
                name="email"
                label="Email"
                value={values.email}
                type="email"
                variant="outlined"
                color="primary"
                fullWidth
                required
                size="small"
                placeholder="Your email"
                InputProps={{
                  startAdornment: <InputAdornment position="start">{<MailOutlineIcon />}</InputAdornment>,
                }}></TextField>
              <TextField
                onChange={handleFormChange}
                name="password"
                label="Password"
                value={values.password}
                type={values.showPassword ? 'text' : 'password'}
                variant="outlined"
                color="primary"
                fullWidth
                required
                size="small"
                placeholder="Your password"
                InputProps={{
                  startAdornment: <InputAdornment position="start">{<LockOutlinedIcon />}</InputAdornment>,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} aria-label="toggle password visibility">
                        {values.showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}></TextField>
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                disableElevation
                sx={{ bgcolor: 'primary.main', color: '#f2f2f2' }}>
                submit
              </Button>
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
                mt={-3}
                display="flex"
                alignItems="center"
                justifyContent="center"
                lineHeight={1}
                fontWeight="bold">
                {values.isMember ? 'Not a member yet?' : 'Already a member?'}
                <Button
                  variant="text"
                  color="primary"
                  sx={{ textTransform: 'capitalize', lineHeight: 1 }}
                  onClick={toggleMember}>
                  {values.isMember ? 'Register' : 'Login'}
                </Button>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Auth;
