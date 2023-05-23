import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFoundPage from './pages/notFoundPage';
import HomePage from './pages/homePage';
import SearchPage from './pages/searchPage';
import AppHeader from './components/AppHeader';
import ErrorPage from './pages/errorPage';
import FlashCardPage from './pages/flashCardPage';
import LoginPage from './pages/loginPage';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './styles.css';
import { NotificationsContextProvider } from './context/notificationContext';
import { UserContextProvider } from './context/userContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Notification } from './components/notification';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7531',
    },
    secondary: {
      main: '#FFF',
    },
  },
});

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppHeader />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: '/flashcards',
        element: <SearchPage />,
      },
      {
        path: '/flashcards/:flashCardId',
        element: <FlashCardPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <NotificationsContextProvider>
        <UserContextProvider>
          <ThemeProvider theme={theme}>
            {/* <AppHeader /> */}
            <RouterProvider router={router} />
          </ThemeProvider>
          <Notification />
        </UserContextProvider>
      </NotificationsContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
