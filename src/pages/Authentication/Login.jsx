import React,{useState} from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import withRouter from "../../components/Common/withRouter";
import Swal from 'sweetalert2';
import Cookies from "js-cookie";

//API's
import { post } from "../../helpers/Login/api_helper";
//API's Services
import { POST_LOGIN,POST_CONFIRMAR_CUENTA } from "../../helpers/Login/url_helper";



// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Form,
  Input,
  FormFeedback,
  Label,
  Spinner,
  Modal,
  Button,
} from "reactstrap";

// import images
import profile from "../../assets/images/profile-img.png";
import logo from "../../assets/images/logo.svg";
import {
  GET_AUTH_PERMISOS
} from '../../helpers/Sidebar/url_helper';
import useApiHelper from "../../hooks/useApiHelper";
const Login = (props) => {

  const[loading, setLoading] = useState(false);
  const [loadingConfirm, setLoadingConfirm] = useState(false);
  const[modalConfirmar, setModalConfirmar] = useState(false);
  const {get} = useApiHelper();
  //meta title
  document.title = "Bolsa de Trabajo UES - Inicio de sesión";

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      email: "carnet@ues.edu.sv" || "",
      password: "123456" || "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Por favor ingrese su correo electrónico"),
      password: Yup.string().min(8,'Mínimo 8 caracteres').required("Por favor ingrese su contraseña"),
    }),
    onSubmit: (values) => {
      _login(values)
    },
  });

  const validationConfimationAccount= useFormik({
    enableReinitialize:true,
    initialValues:{
      codigo_confirmacion:""
    },
    validationSchema: Yup.object({
      codigo_confirmacion: Yup.string().required("Por favor ingrese su código de confirmación"),
    }),
    onSubmit:(values)=>{
      _confirmarCuenta(values)
    }

  });




  const _login=async(values)=>{

    try{
      setLoading(true);
      const result = await post(POST_LOGIN,values,null);
      const {token, ruta} = result;
      Cookies.set('token',token);
      setLoading(false);
      props.router.navigate(ruta);

    }catch(e){
      console.log("Error: ",e);
      Swal.fire({
        title:"Error al ingresar al sistema",
        text:e.response.data.message,
        icon:"error",
        confirmButtonText:"Aceptar"
    });
      setLoading(false);

    }
  }

  const _confirmarCuenta=async(values)=>{
    try{
      setLoadingConfirm(true);
      const result = await post(POST_CONFIRMAR_CUENTA, values);
      Swal.fire({
        title:"Confirmar Cuenta",
        icon: result.success?("success"):("error"),
        text:result.message,
        confirmButtonText:"Aceptar"
      })
      setLoadingConfirm(false)
      setModalConfirmar(false);
    }catch(e){
      console.log("Error: ",e);
      Swal.fire({
        title:"Error",
        icon:"error",
        text:"Error al confirmar la cuenta",
        confirmButtonText:"Aceptar"
      })
      setLoadingConfirm(false)
    }
  }

  

  
  return (
    <React.Fragment>
      {/* <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="bx bx-home h2" />
        </Link>
      </div> */}
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary-subtle">
                  <Row>
                    <Col xs={7}>
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Bolsa de Trabajo UES</h5>
                        <p>Inicie sesión para continuar</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/" className="auth-logo-light">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logo}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      {/* {error ? <Alert color="danger">{error}</Alert> : null} */}

                      <div className="mb-3">
                        <Label className="form-label">Correo Electrónico</Label>
                        <Input
                          name="email"
                          className="form-control"
                          placeholder="Ingrese su correo electrónico"
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email && validation.errors.email
                              ? true
                              : false
                          }
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">
                            {validation.errors.email}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Contraseña</Label>
                        <Input
                          name="password"
                          autoComplete="off"
                          value={validation.values.password || ""}
                          type="password"
                          placeholder="Ingrese su Contraseña"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={
                            validation.touched.password &&
                            validation.errors.password
                              ? true
                              : false
                          }
                        />
                        {validation.touched.password &&
                        validation.errors.password ? (
                          <FormFeedback type="invalid">
                            {validation.errors.password}
                          </FormFeedback>
                        ) : null}
                      </div>
                          {loading?(
                            <div className="text-center">
                              <Spinner color="primary" />
                            </div>
                          ):(<div></div>)}
                      <div className="mt-3 d-grid">
                        <button
                          className="btn btn-primary btn-block"
                          type="submit"
                        >
                          Iniciar Sesión
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        
                        <Button outline color="primary" onClick={()=>setModalConfirmar(true)}>
                        Confirmar Cuenta
                        </Button>
                      </div>

                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  ¿No te has registrado? {" "}
                  <Link to="/register" className="fw-medium text-primary">
                    {" "}
                    Registrate ahora{" "}
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} Bolsa de Trabajo UES.
                </p>
              </div>
            </Col>
          </Row>

            <Modal
            size="md"
            isOpen={modalConfirmar}
            toggle={()=>{
              setModalConfirmar(false)
            }}
            >
              <div className="modal-header">
                <h5 className="modal-title mt-0">
                  Confirmar Cuenta
                </h5>
                <button
                  onClick={() => {
                    setModalConfirmar(false)
                  }}
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close">
                  <span aria-hidden="true">&times;</span>
              </button>
              </div>

              <div className="modal-body">
                <Card body>
                  <Form
                    onSubmit={e=>{
                      e.preventDefault();
                      validationConfimationAccount.handleSubmit();
                      return false;
                    }}
                  >
                    <div className="mt-2 mb-2">
                        <Row>
                          <Col lg={12} md={12} xs={12} sm={12}>
                          <Input
                            name="codigo_confirmacion"
                            className="form-control"
                            placeholder="Codigo de Confirmación"
                            type="text"
                            onChange={validationConfimationAccount.handleChange}
                            onBlur={validationConfimationAccount.handleBlur}
                            value={validationConfimationAccount.values.codigo_confirmacion || ""}
                            invalid={
                            validationConfimationAccount.touched.codigo_confirmacion && validationConfimationAccount.errors.codigo_confirmacion
                                ? true
                                : false
                            }
                            />
                            {validationConfimationAccount.touched.codigo_confirmacion && validationConfimationAccount.errors.codigo_confirmacion ? (
                            <FormFeedback type="invalid">
                                {validationConfimationAccount.errors.codigo_confirmacion}
                            </FormFeedback>
                            ) : null}   
                          </Col>
                        </Row>
                        {loadingConfirm == true &&(
                          <div className="text-center">
                            <Spinner color="primary" />
                          </div>
                        )}
                        <div className="mt-3 d-grid">
                          <Button
                          outline
                          color="success"
                          className="btn-block"
                          type="submit"
                          >
                          Confirmar Cuenta
                          </Button>
                      </div>
                    </div>

                  </Form>
                </Card>
              </div>

            </Modal> 
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Login);

Login.propTypes = {
  history: PropTypes.object,
};
