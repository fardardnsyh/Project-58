import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Landing, Auth, Error } from './pages';
import { AddJobs, AllJobs, Profile, SharedLayout, Stats } from './pages';
import theme from './theme';
import { AppProvider } from './context/AppContext';
import { ProtectedRoute } from './components';
import AuthService from './utils/auth';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_: unknown, { headers }) => {
  const token = localStorage.getItem('id_token');

  if (token && AuthService.isTokenExpired(token)) {
    return localStorage.clear();
  }
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <AppProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Routes>
              <Route index element={<Landing />} />
              <Route path="/auth" element={<Auth />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <SharedLayout />
                  </ProtectedRoute>
                }>
                <Route index element={<Stats />} />
                <Route path="all-jobs" element={<AllJobs />} />
                <Route path="add-job" element={<AddJobs />} />
                <Route path="profile" element={<Profile />} />
              </Route>
              <Route path="*" element={<Error />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </AppProvider>
    </ApolloProvider>
  );
}

export default App;
