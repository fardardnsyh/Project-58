import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  TextField,
  MenuItem,
  Container,
  Select,
  Typography,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Stack,
} from '@mui/material';
import { useLazyQuery, useQuery } from '@apollo/client';
import { useAppContext } from '../../context/AppContext';
import { Alert } from '../../components';
import { GET_JOB_BY_ID, QUERY_LOGGED_IN_USER } from '../../utils/queries';

function JobsForm() {
  const initialState = {
    position: '',
    company: '',
    location: '',
    status: 'pending',
    type: 'full-time',
  };

  const { data: userData } = useQuery(QUERY_LOGGED_IN_USER);
  const userLoggedInData = userData?.me || {};
  const { isLoading, showAlert, displayAlert, createJob, editJob, editJobId, updateJob } = useAppContext();
  const [formState, setFormState] = useState(initialState);
  const [getJobById, { data: jobData }] = useLazyQuery(GET_JOB_BY_ID);

  useEffect(() => {
    const getJobData = async () => {
      await getJobById({
        variables: {
          id: editJobId,
        },
      });
    };

    async function updateForm() {
      async function updateFormState() {
        if (jobData) {
          setFormState({ ...jobData.getJobById });
        }
      }
      await updateFormState();
    }

    if (editJob) {
      getJobData();
      updateForm();
    }

    if (userData && !editJob) {
      setFormState({
        position: '',
        company: '',
        location: userLoggedInData.location,
        status: 'pending',
        type: 'full-time',
      });
    }
  }, [editJob, editJobId, getJobById, jobData, userData, userLoggedInData.location]);

  function resetForm() {
    setFormState(initialState);
  }

  function handleFormChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  }

  async function handleFormSubmit(event: FormEvent) {
    event.preventDefault();

    const { position, company, location, status, type } = formState;
    if (!position || !company || !location || !status || !type) {
      return displayAlert();
    }
    try {
      if (editJob) {
        const id = editJobId;
        updateJob({ id, position, company, location, status, type });
      } else {
        createJob({ position, company, location, status, type });
        resetForm();
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  return (
    <Container maxWidth={false} sx={{ minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center' }}>
      <Grid container display="flex" justifyContent="center">
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
              {editJob ? 'edit job' : 'add job'}
            </Typography>
            {showAlert && <Alert />}
            <TextField
              onChange={handleFormChange}
              name="company"
              label="Company"
              value={formState.company}
              type="text"
              variant="outlined"
              color="primary"
              fullWidth
              required
              size="small"
              placeholder="Company"></TextField>
            <TextField
              onChange={handleFormChange}
              name="position"
              label="Position"
              value={formState.position}
              type="text"
              variant="outlined"
              color="primary"
              fullWidth
              required
              size="small"
              placeholder="Position"></TextField>
            <TextField
              onChange={handleFormChange}
              name="location"
              label="Location"
              value={formState.location}
              type="email"
              variant="outlined"
              color="primary"
              fullWidth
              required
              size="small"
              placeholder="Location"></TextField>
            <FormControl size="small">
              <InputLabel id="status-select-label">Status</InputLabel>
              <Select
                labelId="status-select-label"
                id="status-select"
                name="status"
                label="Status"
                value={formState.status}
                onChange={(event: SelectChangeEvent) => {
                  setFormState({
                    ...formState,
                    status: event.target.value,
                  });
                }}>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="interview">Interview</MenuItem>
                <MenuItem value="declined">Declined</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small">
              <InputLabel id="status-select-label">Type</InputLabel>
              <Select
                labelId="type-select-label"
                id="type-select"
                name="type"
                label="Type"
                value={formState.type}
                onChange={(event: SelectChangeEvent) => {
                  setFormState({
                    ...formState,
                    type: event.target.value,
                  });
                }}>
                <MenuItem value="full-time">Full Time</MenuItem>
                <MenuItem value="part-time">Part Time</MenuItem>
                <MenuItem value="remote">Remote</MenuItem>
                <MenuItem value="internship">Internship</MenuItem>
              </Select>
            </FormControl>
            <Stack direction="row" spacing={2} display="flex" justifyContent="center">
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                disableElevation
                sx={{ bgcolor: 'primary.main', color: '#f2f2f2' }}>
                submit
              </Button>
              <Button
                type="button"
                variant="contained"
                color="error"
                disabled={isLoading}
                disableElevation
                onClick={resetForm}>
                clear
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default JobsForm;
