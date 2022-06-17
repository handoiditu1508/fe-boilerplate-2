import './App.css';

import { loadCurrentUserFromLocal, logout, selectCurrentUser } from './redux/features/authentication/authenticationSlice';
import { useAppDispatch, useAppSelector } from './hooks';

import { ButtonGroup } from '@mui/material';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from './components/IconButton';
import LinkButton from './components/LinkButton';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

function App() {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  }

  useEffect(() => {
    dispatch(loadCurrentUserFromLocal())
  }, []);

  return (
    <>
      <Header />
      <Outlet />
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <ButtonGroup variant='text' color='primary'
        >
          <IconButton to="/"><HomeIcon /></IconButton>
          <LinkButton to="/invoices">Invoices</LinkButton>
          <LinkButton to="/expenses">Expenses</LinkButton>
          <LinkButton to="/profile">Profile</LinkButton>
          {!user && <LinkButton to="/login">Login</LinkButton>}
        </ButtonGroup>
      </nav>
      {user && <button onClick={handleLogout}>Logout</button>}
      <Footer />
    </>
  );
}

export default App;