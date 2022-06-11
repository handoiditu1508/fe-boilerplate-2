import React from "react";
import { selectCurrentUser } from "../../redux/features/authentication/authenticationSlice";
import useAppSelector from "../../hooks/useAppSelector";

export default function Profile() {
  const user = useAppSelector(selectCurrentUser);

  return (
    <>
      <p>Hello user {user.name}</p>
      <p>Id: {user.id}</p>
    </>
  );
}