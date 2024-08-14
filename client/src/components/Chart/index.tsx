import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

type ChartPropType = {
  monthlyApplications: {
    _id: {
      year: string;
      month: string;
    };
    count: number;
  }[];
};

function Chart(props: ChartPropType) {
  const { monthlyApplications } = props;

  const data = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = format(new Date(`${year}/${month}`), 'MMM y');
      return { date, count };
    })
    .reverse();

  console.log(data);

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h5" paragraph textTransform="capitalize" textAlign="center">
        monthly applications
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} width={100}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#2cb1bc" barSize={50} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default Chart;
