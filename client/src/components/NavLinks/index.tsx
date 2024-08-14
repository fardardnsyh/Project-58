import React from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, useMediaQuery } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import links from '../../utils/SidebarLinks';

type NavLinksPropTypes = {
  toggleSidebar: () => void;
};

function NavLinks({ toggleSidebar }: NavLinksPropTypes) {
  const theme = useTheme();
  const mdBreakPoint = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <List>
      {links.map((link) => {
        const { id, path, text, icon } = link;
        return (
          <ListItem key={id} sx={{ width: '100%', paddingY: 0 }}>
            <NavLink
              reloadDocument
              to={path}
              onClick={() => {
                if (mdBreakPoint) {
                  toggleSidebar();
                }
              }}
              style={{ textDecoration: 'none', width: '100%' }}
              className={(isActive) => (isActive ? 'activeLink' : '')}>
              <ListItemButton
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  '&:hover *': {
                    color: 'primary.main',
                  },
                }}>
                <Box display="flex" width="8rem" justifyContent="space-between" alignItems="center">
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} sx={{ textTransform: 'capitalize', color: 'text.secondary' }} />
                </Box>
              </ListItemButton>
            </NavLink>
          </ListItem>
        );
      })}
    </List>
  );
}

export default NavLinks;
