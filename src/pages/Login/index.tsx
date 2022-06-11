import { Navigate, useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { loginAsync, selectCurrentUser, selectError, selectLoading } from "../../redux/features/authentication/authenticationSlice";

import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";

export default function Login() {
  const dispatch = useAppDispatch();
  //const navigate = useNavigate();
  const location = useLocation();
  let test2: any = location.state
  const redirect = test2?.redirect ?? "/";
  const currentUser = useAppSelector(selectCurrentUser);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const [name, setName] = useState("");

  const handleLogin = () => {
    dispatch(loginAsync({ name }));
    //navigate("/");
  }

  return !currentUser ? (
    <>
      {error && <p>error: {error}</p>}
      {loading && <p>Loading...</p>}
      {!loading && (
        <>
          <input type="text" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} />
          <button onClick={handleLogin}>Sign in</button>
        </>
      )}
    </>
  ) : (
    <Navigate to={redirect} replace={true}></Navigate>
  );
}