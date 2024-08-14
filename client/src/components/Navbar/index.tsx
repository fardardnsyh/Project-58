import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Box, Container, Toolbar, Typography, Button, FormControl, useMediaQuery } from '@mui/material';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import { useTheme } from '@mui/material/styles';
import { LargeLogo, SmallLogo } from '../../components';
import { useQuery } from '@apollo/client';
import { QUERY_LOGGED_IN_USER } from '../../utils/queries';
import { useAppContext } from '../../context/AppContext';

function Navbar() {
  const theme = useTheme();
  const smBreakPointDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdBreakPointDown = useMediaQuery(theme.breakpoints.down('md'));
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const { loading, data } = useQuery(QUERY_LOGGED_IN_USER);
  const userData = data?.me || {};

  const { logoutUser, toggleSidebar } = useAppContext();

  return (
    <Box>
      <AppBar position="static" sx={{ boxShadow: 0, backgroundColor: '#fff', paddingY: '0.5rem' }}>
        <Container maxWidth={false}>
          <Toolbar sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <FormatAlignLeftIcon
              color="primary"
              fontSize="large"
              sx={{
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
              onClick={() => {
                toggleSidebar();
              }}
            />
            <Box display="flex" flexDirection="column">
              {mdBreakPointDown ? (
                smBreakPointDown ? (
                  <SmallLogo />
                ) : (
                  <LargeLogo />
                )
              ) : (
                <Typography variant="h4" textTransform="capitalize">
                  dashboard
                </Typography>
              )}
            </Box>
            <FormControl>
              <Button
                onClick={() => {
                  setShowLogout(!showLogout);
                }}
                startIcon={<AccountCircleIcon />}
                endIcon={<ArrowDropDownOutlinedIcon />}
                disableRipple
                sx={{
                  textTransform: 'capitalize',
                  bgcolor: 'primary.main',
                  color: '#f2f2f2',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                  '&:active': {
                    bgcolor: 'primary.main',
                  },
                }}>
                {data && userData.name}
              </Button>
              {showLogout && (
                <Button
                  onClick={() => {
                    logoutUser();
                    localStorage.clear();
                    navigate('/');
                  }}
                  disableRipple
                  sx={{
                    width: '100%',
                    textTransform: 'capitalize',
                    bgcolor: 'primary.light',
                    color: 'primary.dark',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                      color: 'primary.light',
                    },
                    '&:active': {
                      bgcolor: 'primary.main',
                    },
                    position: 'absolute',
                    top: '40px',
                  }}>
                  logout
                </Button>
              )}
            </FormControl>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default Navbar;
