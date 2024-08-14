import React from 'react';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const links = [
  {
    id: 1,
    text: 'stats',
    path: '/',
    icon: <InsertChartIcon />,
  },
  {
    id: 2,
    text: 'all jobs',
    path: 'all-jobs',
    icon: <QueryStatsIcon />,
  },
  {
    id: 3,
    text: 'add job',
    path: 'add-job',
    icon: <PostAddIcon />,
  },
  {
    id: 4,
    text: 'profile',
    path: 'profile',
    icon: <ManageAccountsIcon />,
  },
];

export default links;
