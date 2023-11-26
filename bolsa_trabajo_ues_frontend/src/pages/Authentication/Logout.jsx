import React, { useEffect } from "react";
import PropTypes from "prop-types";
import withRouter from "../../components/Common/withRouter";
import { logoutUser } from "../../store/actions";
import Cookies from "js-cookie";
//redux
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const history = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
    Cookies.remove('token');
    history('/login');
  },[]);


  return <></>;
};

Logout.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Logout);
