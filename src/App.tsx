import './App.css';

import { Link, Outlet } from 'react-router-dom';
import { loadCurrentUserFromLocal, logout, selectCurrentUser } from './redux/features/authentication/authenticationSlice';
import { useAppDispatch, useAppSelector } from './hooks';

import Footer from './components/Footer';
import Header from './components/Header';
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
        <Link to="/">Home</Link> |{" "}
        <Link to="/invoices">Invoices</Link> |{" "}
        <Link to="/expenses">Expenses</Link> |{" "}
        <Link to="/profile">Profile</Link> |{" "}
        {!user && <Link to="/login">Login</Link>}
      </nav>
      {user && <button onClick={handleLogout}>Logout</button>}
      <Footer />
    </>
  );
}

export default App;
