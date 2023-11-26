import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const Authmiddleware = (props) => {
  const token = Cookies.get('token');
  // if (!token) {
  //   return (
  //     <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
  //   );
  // }
  return <React.Fragment>{props.children}</React.Fragment>;
};

export default Authmiddleware;
