import React from 'react';
import { Box, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAppContext } from '../../context/AppContext';
import { LargeLogo, NavLinks } from '../../components';

const style = {
  position: 'absolute',
  top: '5%',
  bottom: '5%',
  left: '5%',
  right: '5%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function SmallSidebar() {
  const { showSidebar, toggleSidebar } = useAppContext();

  return (
    <div>
      <Modal open={showSidebar} onClose={toggleSidebar}>
        <Box sx={style} display="flex" flexDirection="column" rowGap={4}>
          <CloseIcon
            onClick={toggleSidebar}
            fontSize="large"
            color="primary"
            sx={{
              '&:hover': {
                cursor: 'pointer',
              },
            }}
          />
          <LargeLogo />
          <NavLinks toggleSidebar={toggleSidebar} />
        </Box>
      </Modal>
    </div>
  );
}

export default SmallSidebar;
