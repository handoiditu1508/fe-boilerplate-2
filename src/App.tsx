import './App.css';

import { Box, ButtonGroup, useTheme } from '@mui/material';
import { loadCurrentUserFromLocal, logout, selectCurrentUser } from './redux/features/authentication/authenticationSlice';
import { useAppDispatch, useAppSelector } from './hooks';

import Footer from './components/Footer';
import Header from './components/Header';
import HomeIcon from '@mui/icons-material/Home';
import LinkButton from './components/LinkButton';
import LinkIconButton from './components/LinkIconButton';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

function App() {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const handleLogout = () => {
    dispatch(logout());
  };

  // Check login user
  useEffect(() => {
    dispatch(loadCurrentUserFromLocal());
  }, []);

  return (
    <>
      <Header />
      <Box bgcolor={theme.palette.background.default} color={theme.palette.text.primary}>
        <Outlet />
        <nav
          style={{
            paddingBottom: "1rem",
          }}
        >
          <ButtonGroup variant='text' color='primary'
          >
            <LinkIconButton to="/"><HomeIcon /></LinkIconButton>
            <LinkButton to="/invoices">Invoices</LinkButton>
            <LinkButton to="/expenses">Expenses</LinkButton>
            <LinkButton to="/profile">Profile</LinkButton>
            {!user && <LinkButton to="/login">Login</LinkButton>}
          </ButtonGroup>
        </nav>
        {user && <button onClick={handleLogout}>Logout</button>}
      </Box>
      <Footer />
    </>
  );
}

export default App;