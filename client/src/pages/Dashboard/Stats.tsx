import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import { Chart, StatusCard } from '../../components';
import { useQuery } from '@apollo/client';
import { MONTHLY_APPLICATIONS, SHOW_STATS } from '../../utils/queries';

function Stats() {
  const { data: statsData } = useQuery(SHOW_STATS);
  const { data: applicationsData } = useQuery(MONTHLY_APPLICATIONS);
  const stats = statsData?.showStats || [
    { _id: 'pending', count: 0 },
    { _id: 'interview', count: 0 },
    { _id: 'declined', count: 0 },
  ];
  const monthlyApplications = applicationsData?.monthlyApplications || [];

  console.log(monthlyApplications);

  type StatusType = {
    _id: string;
    count: number;
  };

  return (
    <Box bgcolor="secondary.main">
      <Container
        maxWidth={false}
        sx={{
          minHeight: 'calc(100vh - 80px)',
          paddingTop: '3rem',
          display: 'flex',
          flexDirection: 'column',
          rowGap: 5,
          alignItems: 'center',
          justifyContent: 'flex-start',
          boxSizing: 'border-box',
        }}>
        <Grid container spacing={2} paddingX={2} display="flex" alignItems="center" justifyContent="center">
          {stats.map((status: StatusType) => {
            const { _id, count } = status;
            return (
              <Grid item key={_id} xs={12} sm={6} lg={4} xl={4}>
                <StatusCard _id={_id} count={count} />
              </Grid>
            );
          })}
        </Grid>
        {monthlyApplications.length > 0 && <Chart monthlyApplications={monthlyApplications} />}
      </Container>
    </Box>
  );
}

export default Stats;
