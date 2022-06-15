import './App.css';

import { Link, Outlet } from 'react-router-dom';
import { loadCurrentUserFromLocal, logout, selectCurrentUser } from './redux/features/authentication/authenticationSlice';
import { useAppDispatch, useAppSelector } from './hooks';

import Button from './components/Button';
import { ButtonGroup } from '@mui/material';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from './components/IconButton';
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
          <IconButton LinkComponent={Link} to="/"><HomeIcon /></IconButton>
          <Button LinkComponent={Link} to="/invoices">Invoices</Button>
          <Button LinkComponent={Link} to="/expenses">Expenses</Button>
          <Button LinkComponent={Link} to="/profile">Profile</Button>
          {!user && <Button LinkComponent={Link} to="/login">Login</Button>}
        </ButtonGroup>
      </nav>
      {user && <button onClick={handleLogout}>Logout</button>}
      <Footer />
    </>
  );
}

export default App;