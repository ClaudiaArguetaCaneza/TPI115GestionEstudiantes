import React, { useEffect, useState } from "react";
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback, Spinner } from "reactstrap";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

import { Link } from "react-router-dom";

import useApiHelper from "../../hooks/useApiHelper";

// import images
import profileImg from "../../assets/images/profile-img.png";
import logoImg from "../../assets/images/logo.svg";

import { POST_REGISTER } from "../../helpers/Register/url_helper";

const Register = props => {
  document.title = "Registrarse | Bolsa de Trabajo UES";

  const [loading, setLoading] = useState(false);
  const {post} = useApiHelper();
  const navigate = useNavigate();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      carnet:'',
      dui:'',
      primer_nombre:'',
      segundo_nombre: '',
      primer_apellido:'',
      segundo_apellido:'',
      fecha_nacimiento:"",
      telefono:'',

      email: '',
      // username: '',
      password: '',
      confirm_password:'',
    },
    validationSchema: Yup.object({
      carnet: Yup.string()
      .required("El Carnet es requerido")
      .matches(/^[A-Za-z]{2}\d{5}$/, 'El formato del carnet debe ser AA#####'),
      dui: Yup.string()
      .required("El DUI es requerido")
      .matches(/^\d{8}-\d{1}$/, 'el format del DUI debe ser ########-#'),
      primer_nombre: Yup.string()
      .required("El primer nombre es requerido.")
      .max(20, 'El nombre debe tener como máximo 20 caracteres')
      .matches(/^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]+$/, "El nombre no debe de contener caracteres especiales ni números."),
      segundo_nombre: Yup.string()
      .max(20, 'El nombre debe tener como máximo 20 caracteres')
      .matches(/^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]+$/, "El nombre no debe de contener caracteres especiales ni números."),
      primer_apellido: Yup.string()
      .required("El primer apellido es requerido.")
      .max(20, 'El apellido debe tener como máximo 20 caracteres')
      .matches(/^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]+$/, "El apellido no debe de contener caracteres especiales ni números."),
      segundo_apellido: Yup.string()
      .max(20, 'El segundo apellido debe tener como máximo 20 caracteres')
      .matches(/^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]+$/, "El apellido no debe de contener caracteres especiales ni números."),
      fecha_nacimiento: Yup.string().required("La fecha de nacimiento es requerida."),
      telefono: Yup.string()
      .required("El número de teléfono es requerido")
      .min(8, "El teléfono debe de tener el formato ######## y formado por 8 dígitos.")
      .max(8, "El teléfono debe de tener el formato ######## y formado por 8 dígitos.")
      .matches(/^[67]\d{7}$/, 'No tiene el formato de número de teléfono correcto. Debe seguir el formato: ########'),



      email: Yup.string().required("El Email es requerido").email('Debe ser una dirección de correo electrónico válida.'),
      // username: Yup.string().required("Please Enter Your Username"),
      password:Yup.string()
      .min(8,'La contraseña debe de tener mínimo 8 caracteres')
      .required("La Contraseña es requerida")
      .matches(/[a-z]/, 'debe llevar al menos un caracter en minúscula')
      .matches(/[A-Z]/, 'debe llevar al menos un carater en mayúscula')
      .matches(/[a-zA-Z]+[^a-zA-Z\s]+/, 'debe llevar al menos un número o un caracter especial. (@,!,#, etc).'),
      confirm_password: Yup.string()
      .oneOf([Yup.ref('password'), null], 'las contraseñas no coinciden')
      .required('confirmación de contraseña es requerido')
    }),
    onSubmit: (values) => {
      _registrarse(values);
    }
  });

  useEffect(()=>{

    if(validation.values?.carnet != null && validation.values?.carnet.length > 0){
      const correo = validation.values?.carnet.toLowerCase() + "@ues.edu.sv";
      validation.setFieldValue("email",correo);
    }else{
      validation.setFieldValue("email","");
    }

  },[validation.values?.carnet]);

  const _registrarse=async(data)=>{
    try{
      setLoading(true);
      const result = await post(POST_REGISTER,data);
      Swal.fire({
        title:"Registrarse",
        icon: result.success==true?("success"):("error"),
        text:result.message,
        confirmButtonText:"Aceptar"
      });

      setLoading(false);
      navigate('/login');
    }catch(e){
      console.log("Error: ",e);
      Swal.fire({
        title:"Error al registrar la cuenta",
        icon:"error",
        text:"Ha ocurrido un error al registrar la cuenta",
        confirmButtonText:"Aceptar"
      })
      setLoading(false);
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
                    <Col className="col-7">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Registro</h5>
                        <p>Registrate en nuestra bolsa de trabajo ahora.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profileImg} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logoImg}
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
                      {/* {user && user ? (
                        <Alert color="success">
                          Register User Successfully
                        </Alert>
                      ) : null}

                      {registrationError && registrationError ? (
                        <Alert color="danger">{registrationError}</Alert>
                      ) : null} */}

                      <div className="mb-3">
                        <h4>Datos Estudiante</h4>
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Carnet</Label>
                        <Input
                          id="carnet"
                          name="carnet"
                          className="form-control"
                          placeholder="Ingrese su carnet"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.carnet || ""}
                          invalid={
                            validation.touched.carnet && validation.errors.carnet ? true : false
                          }
                        />
                        {validation.touched.carnet && validation.errors.carnet ? (
                          <FormFeedback type="invalid">{validation.errors.carnet}</FormFeedback>
                        ) : null}
                      </div>
                      
                      <div className="mb-3">
                        <Label className="form-label">DUI</Label>
                        <Input
                          id="dui"
                          name="dui"
                          className="form-control"
                          placeholder="Ingrese su DUI"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.dui || ""}
                          invalid={
                            validation.touched.dui && validation.errors.dui ? true : false
                          }
                        />
                        {validation.touched.dui  && validation.errors.dui ? (
                          <FormFeedback type="invalid">{validation.errors.dui}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Primer Nombre</Label>
                        <Input
                          id="primer_nombre"
                          name="primer_nombre"
                          className="form-control"
                          placeholder="Ingrese su primer nombre"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.primer_nombre || ""}
                          invalid={
                            validation.touched.primer_nombre && validation.errors.primer_nombre ? true : false
                          }
                        />
                        {validation.touched.primer_nombre && validation.errors.primer_nombre ? (
                          <FormFeedback type="invalid">{validation.errors.primer_nombre}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Segundo Nombre</Label>
                        <Input
                          id="segundo_nombre"
                          name="segundo_nombre"
                          className="form-control"
                          placeholder="Ingrese su segundo nombre"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.segundo_nombre || ""}
                          invalid={
                            validation.touched.segundo_nombre && validation.errors.segundo_nombre ? true : false
                          }
                        />
                        {validation.touched.segundo_nombre && validation.errors.segundo_nombre ? (
                          <FormFeedback type="invalid">{validation.errors.segundo_nombre}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Primer Apellido</Label>
                        <Input
                          id="primer_apellido"
                          name="primer_apellido"
                          className="form-control"
                          placeholder="Ingrese su primer apellido"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.primer_apellido || ""}
                          invalid={
                            validation.touched.primer_apellido && validation.errors.primer_apellido ? true : false
                          }
                        />
                        {validation.touched.primer_apellido && validation.errors.primer_apellido ? (
                          <FormFeedback type="invalid">{validation.errors.primer_apellido}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Segundo Apellido</Label>
                        <Input
                          id="segundo_apellido"
                          name="segundo_apellido"
                          className="form-control"
                          placeholder="Ingrese su segundo apellido"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.segundo_apellido || ""}
                          invalid={
                            validation.touched.segundo_apellido && validation.errors.segundo_apellido ? true : false
                          }
                        />
                        {validation.touched.segundo_apellido && validation.errors.segundo_apellido ? (
                          <FormFeedback type="invalid">{validation.errors.segundo_apellido}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label pl-1">Fecha de Nacimiento</Label>
                        <div className="pt-2">
                             <DatePicker
                              showIcon
                              selected={validation.values.fecha_nacimiento}
                              maxDate={new Date()}
                              onChange={(date)=>{
                                  validation.setFieldValue("fecha_nacimiento", date);
                              }}            
                              dateFormat="dd-MM-yyyy"
                              locale="es"
                          />
                          {validation.errors.fecha_nacimiento ? (
                              <div className="error">{validation.errors.fecha_nacimiento}</div>
                          ) : null}
                        </div>
                      </div>


                      <div className="mb-3">
                        <h4>Datos Usuario</h4>
                      </div>
                    

                      <div className="mb-3">
                        <Label className="form-label">Correo Electrónico</Label>
                        <Input
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="Ingrese su correo electrónico"
                          type="email"
                          onChange={validation.handleChange}
                          readOnly={true}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email && validation.errors.email ? true : false
                          }
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                        ) : null}
                      </div>
{/* 
                      <div className="mb-3">
                        <Label className="form-label">Username</Label>
                        <Input
                          name="username"
                          type="text"
                          placeholder="Enter username"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.username || ""}
                          invalid={
                            validation.touched.username && validation.errors.username ? true : false
                          }
                        />
                        {validation.touched.username && validation.errors.username ? (
                          <FormFeedback type="invalid">{validation.errors.username}</FormFeedback>
                        ) : null}
                      </div> */}
                      <div className="mb-3">
                        <Label className="form-label">Contraseña</Label>
                        <Input
                          name="password"
                          type="password"
                          placeholder="Ingrese una Contraseña"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.password || ""}
                          invalid={
                            validation.touched.password && validation.errors.password ? true : false
                          }
                        />
                        {validation.touched.password && validation.errors.password ? (
                          <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label"> Confirmar Contraseña</Label>
                        <Input
                          name="confirm_password"
                          type="password"
                          placeholder="Ingrese nuevamente la contraseña"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.confirm_password || ""}
                          invalid={
                            validation.touched.confirm_password && validation.errors.confirm_password ? true : false
                          }
                        />
                        {validation.touched.confirm_password && validation.errors.confirm_password ? (
                          <FormFeedback type="invalid">{validation.errors.confirm_password}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Teléfono</Label>
                        <Input
                          id="telefono"
                          name="telefono"
                          className="form-control"
                          placeholder="Ingrese un número de teléfono"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.telefono || ""}
                          invalid={
                            validation.touched.telefono && validation.errors.telefono ? true : false
                          }
                        />
                        {validation.touched.telefono && validation.errors.telefono ? (
                          <FormFeedback type="invalid">{validation.errors.telefono}</FormFeedback>
                        ) : null}
                      </div>


                      {
                            loading == true  && (
                              <div className="text-center">
                                <Spinner color="primary" />
                              </div>
                            )
                          }

                      <div className="mt-4 d-grid">
                        <button
                          className="btn btn-primary btn-block "
                          type="submit"
                          disabled={loading}
                          // onClick={()=>{
                          //   setLoading(true);
                          // }}
                        >
                          Registrarse
                          &nbsp;
                        </button>
                      </div>

                  
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  ¿Ya tienes una cuenta?{" "}
                  <Link to="/login" className="font-weight-medium text-primary">
                    {" "}
                    Inicia Sesión
                  </Link>{" "}
                </p>
                {/* <p>
                  © {new Date().getFullYear()} Skote. Crafted with{" "}
                  <i className="mdi mdi-heart text-danger" /> by Themesbrand
                </p> */}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Register;
