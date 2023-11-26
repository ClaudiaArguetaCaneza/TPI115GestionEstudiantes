import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import withRouter from "../Common/withRouter";

//i18n
import { withTranslation } from "react-i18next";
import SidebarContent from "./SidebarContent";

import { Link } from "react-router-dom";

import logo from "../../assets/images/logo.svg";
import logoLightPng from "../../assets/images/logo-light.png";
import logoLightSvg from "../../assets/images/logo-light.svg";
import logoDark from "../../assets/images/logo-dark.png";
import tseLogo from '../../assets/images/Tse_logo.png';
import uesLogo from '../../assets/images/escudoues.svg'

import {
  GET_AUTH_PERMISOS
} from '../../helpers/Sidebar/url_helper';

import useApiHelper from "../../hooks/useApiHelper";

const Sidebar = (props) => {
  const {get} = useApiHelper();
  const [rutaPrincipal, setRutaPrincipal] = useState("");

  useEffect(()=>{
    _inicializar();
  },[]);

  const _inicializar=async()=>{
    const result = await get(GET_AUTH_PERMISOS);
    const ruta = result.permisos[0].recursos[0].ruta;
    setRutaPrincipal(ruta);
  }

  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div className="navbar-brand-box">
        <br/>
          <Link to={rutaPrincipal} className="logo logo-dark">
            <span className="logo-sm">
              <img src={uesLogo} alt="" height="100" />
            </span>
            <span className="logo-lg">
              <img src={uesLogo} alt="" height="60" />
            </span>
            <br/>
          </Link>

          <Link to={rutaPrincipal} className="logo logo-light">
            <span className="logo-sm">
              <img src={uesLogo} alt="" height="44" />
            </span>
            <span className="logo-lg">
              <img src={uesLogo} alt="" height="77" />
            </span>
          </Link>
        </div>
        <div data-simplebar className="h-100">
          {props.type !== "condensed" ? <SidebarContent /> : <SidebarContent />}
        </div>

        <div className="sidebar-background"></div>
      </div>
    </React.Fragment>
  );
};

Sidebar.propTypes = {
  type: PropTypes.string,
};

const mapStatetoProps = (state) => {
  return {
    layout: state.Layout,
  };
};
export default connect(
  mapStatetoProps,
  {}
)(withRouter(withTranslation()(Sidebar)));
