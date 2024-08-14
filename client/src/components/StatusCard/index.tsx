import React from 'react';
import { Box, Card, CardContent, Grid, Icon, Stack, Typography } from '@mui/material';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';

type StatusCardPropTypes = {
  _id: string;
  count: number;
};

function StatusCard({ _id, count }: StatusCardPropTypes) {
  return (
    <Card
      sx={{
        boxShadow: 0,
        textTransform: 'capitalize',
        borderBottom: '5px solid',
        paddingY: '1rem',
        ...(_id === 'pending' && { borderColor: '#E9B949' }),
        ...(_id === 'interview' && { borderColor: '#647ACB' }),
        ...(_id === 'declined' && { borderColor: '#D66A6A' }),
      }}>
      <CardContent>
        <Grid container display="flex" alignItems="center">
          <Grid item xs={10}>
            <Typography
              variant="h4"
              paragraph
              sx={{
                ...(_id === 'pending' && { color: '#E9B949' }),
                ...(_id === 'interview' && { color: '#647ACB' }),
                ...(_id === 'declined' && { color: '#D66A6A' }),
              }}>
              {count}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingY: '0.75rem',
                paddingX: '1.75rem',
                borderRadius: '0.25rem',
                ...(_id === 'pending' && { color: '#E9B949', bgcolor: '#FCEFC7' }),
                ...(_id === 'interview' && { color: '#647ACB', bgcolor: '#E0E8F9' }),
                ...(_id === 'declined' && { color: '#D66A6A', bgcolor: '#FFEEEE' }),
                '& svg': {
                  fontSize: '2rem',
                },
              }}>
              {_id === 'pending' ? (
                <PendingActionsOutlinedIcon />
              ) : _id === 'interview' ? (
                <EventAvailableOutlinedIcon />
              ) : (
                <ThumbDownAltOutlinedIcon />
              )}
            </Box>
          </Grid>
        </Grid>
        {_id === 'pending' && <Typography>pending applications</Typography>}
        {_id === 'interview' && <Typography>interviews scheduled</Typography>}
        {_id === 'declined' && <Typography>jobs declined</Typography>}
      </CardContent>
    </Card>
  );
}

export default StatusCard;
