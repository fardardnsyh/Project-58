import React, { useEffect } from 'react';
import { Avatar, Button, Card, CardContent, CardHeader, Grid, Stack } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import { format } from 'date-fns';
import { useAppContext } from '../../context/AppContext';

type JobType = {
  company: string;
  location: string;
  position: string;
  status: string;
  type: string;
  createdAt: number;
  _id: string;
};

function Job({ company, location, position, status, type, createdAt, _id }: JobType) {
  const { removeJob, editJob, showEditJobForm } = useAppContext();
  const date = format(new Date(Number(createdAt)), 'do MMM yyyy');

  return (
    <Card sx={{ textTransform: 'capitalize' }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: 'primary.main' }}>{company.substring(0, 1).toUpperCase()}</Avatar>}
        title={position}
        subheader={company}></CardHeader>
      <CardContent>
        <Grid container spacing={1} marginBottom={2} fontSize="0.9rem">
          <Grid item xs={12} sm={6} display="flex" alignItems="center">
            <Grid container spacing={1}>
              <Grid item>
                <LocationOnOutlinedIcon />
              </Grid>
              <Grid item>{location}</Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} display="flex" alignItems="center">
            <Grid container spacing={1}>
              <Grid item>
                <EventOutlinedIcon />
              </Grid>
              <Grid item>{date}</Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} display="flex" alignItems="center">
            <Grid container spacing={1}>
              <Grid item>
                <WorkOutlineOutlinedIcon />
              </Grid>
              <Grid item>{type}</Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container>
              <Grid
                item
                width="100px"
                paddingX={2}
                paddingY={1}
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius={3}
                sx={{
                  ...(status === 'interview' && { bgcolor: 'secondary.light', color: 'secondary.dark' }),
                  ...(status === 'pending' && { bgcolor: 'warning.light', color: 'warning.dark' }),
                  ...(status === 'declined' && { bgcolor: 'error.light', color: 'error.dark' }),
                }}>
                {status}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Stack direction="row" spacing={2}>
          <Button
            data-id={_id}
            onClick={(event: React.SyntheticEvent<HTMLButtonElement>) => {
              const jobId = event.currentTarget.dataset.id as string;
              showEditJobForm(jobId);
            }}
            type="button"
            variant="contained"
            sx={{ bgcolor: 'success.light', color: 'success.dark' }}
            disableElevation>
            edit
          </Button>
          <Button
            onClick={() => {
              removeJob(_id);
              window.location.reload();
            }}
            type="button"
            variant="contained"
            sx={{ bgcolor: 'error.light', color: 'error.dark' }}
            disableElevation>
            delete
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default Job;
