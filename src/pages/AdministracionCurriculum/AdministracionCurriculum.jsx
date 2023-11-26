import React from 'react'
import { useEffect, useState, Fragment, useRef } from 'react'
import Swal from 'sweetalert2'
import BootstrapTable from 'react-bootstrap-table-next'
import { Card, 
        CardTitle,Button,
    Row,Col, Input, Label, Spinner, Form, Modal, FormGroup, ButtonToggle} from 'reactstrap'
import useApiHelper from '../../hooks/useApiHelper'
// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";
import Select from 'react-select';
import DatePicker from 'react-datepicker';

import { GET_CURRICULUM,
    GET_INICIALIZAR_EXPERIENCIA_LABORAL,
    PUT_ACTUALIZAR_DATOS_ESTUDIANTE,
    POST_EXPERIENCIA_LABORAL,
    DELETE_EXPERIENCIA_LABORAL,
    POST_EXPERIENCIA_ACADEMICA,
    DELETE_EXPERIENCIA_ACADEMICA,
    GET_INICIALIZAR_APTITUD_CURRICULUM,
    POST_APTITUD_CURRICULUM,
    POST_GUARDAR_DOCUMENTO_CURRICULUM,
    POST_GUARDAR_IMAGEN} from '../../helpers/AdministracionCurriculum/url_helper'


import './css/styles.css';

export const AdministracionCurriculum = () => {

    const [curriculum, setCurriculum] = useState(null);
    const [estudiante, setEstudiante] = useState(null);
    const [documento, setDocumento] = useState(null);
    const [imagen, setImagen] = useState(null); //BASE 64
    const [nuevaImagen, setNuevaImagen] = useState(null);
    const [listaExperienciasLaborales, setListaExperienciasLaborales] = useState([]);
    const [listaExperienciasAcademicas, setListaExperienciasAcademicas] = useState([]);
    const [loading, setLoading] = useState(false);

    const [listaPuestos, setListaPuestos] = useState([]);
    const [listaEmpresas, setListaEmpresas] = useState([]);
    const [listaAptitudes, setListaAptitudes] = useState([]);
    const [listaAptitudesCV, setListaAptitudesCV] = useState([]);
    const [modalELaboral, setModalELaboral] = useState(false);
    const [modalEAcademica, setModalEAcademica] = useState(false);
    const [loadingELaboral, setLoadingELaboral] = useState(false);
    const [loadingEAcademica, setLoadingEAcademica] = useState(false);
    const [loadingAptitudes, setLoadingAptitudes] = useState(false);

    const inputExperienciaAcademicaRef = useRef(null);
    const inputDocumentoCV = useRef(null);
    const inputNuevaImagen = useRef(null);

    //CSS
    const contenedorEstilos = {
        width: '100px', // Ajusta el tamaño según tus necesidades
        height: '100px', // Ajusta el tamaño según tus necesidades
        borderRadius: '50%',
        overflow: 'hidden',
      };
    
    const imagenEstilos = {
    width: '100%',
    height: '100%',
    objectFit: 'cover', // Ajusta la forma en que la imagen se ajusta dentro del contenedor circular
    };

    const imagenStyle = {
        borderRadius: '50%', // Establece el borde redondeado para hacer la imagen circular
        width: '200px', // Ajusta el ancho según tus necesidades
        height: '200px', // Ajusta la altura según tus necesidades
        objectFit: 'cover', // Para asegurarte de que la imagen se ajuste correctamente dentro del contenedor circular
      };



    const {get, put, post, del} = useApiHelper();

    //Form datos contacto.
    const validation = useFormik({
        enableReinitialize:true,
        initialValues: {
            primer_nombre:'',
            segundo_nombre:'',
            primer_apellido:'',
            segundo_apellido:'',
            dui:'',
            correo_electronico:'',
            telefono:'',
            descripcion_usuario: '',
        },
        validationSchema: Yup.object({
            telefono: Yup.string()
            .required("Un número de teléfono es requerido")
            .min(8,"Mínimo de caracteres 8")
            .max(8,"Máximo de caracteres 8")
            .matches(/^[67]\d{7}$/, 'No tiene el formato de número de teléfono correcto. Debe seguir el formato: ########'),
            descripcion_usuario: Yup.string()
            .max(400,"El máximo son 400 caracteres"),

        }),
        onSubmit: values =>{
            _cambioDatosEstudiante(values)
        }
    });

    //Form modal registrar experiencia.
    const validation_registrar_experiencia = useFormik({
        enableReinitialize:true,
        initialValues:{
            fk_empresa: null,
            fk_puesto: null,
            fecha_inicio: '',
            fecha_finalizacion: '',
            // duracion:'',
        },
        validationSchema: Yup.object({
            fk_empresa: Yup.object().required("Seleccione una empresa"),
            fk_puesto: Yup.object().required("Seleccione un puesto."),
            fecha_inicio: Yup.string().required("Debe definir la fecha de inicio"),
            fecha_finalizacion: Yup.string().required("Debe definir la fecha de finalización"),
            // duracion: Yup.string().required("Debe de definir la duración de la experiencia."),
        }),
        onSubmit: values =>{
            _registrarExperienciaLaboral(values);
        }
    });

    //Form modal registrar experiencia academica.
    const validation_registrar_experiencia_academica = useFormik({
        enableReinitialize:true,
        initialValues:{
            institucion_academica:'',
            titulo:'',
            finalizado: true,
            fecha_inicio:'',
            fecha_finalizacion:'',
            documento:null,
        },
        validationSchema: Yup.object({
            institucion_academica: Yup.string().required("La institución académica es requerida").max(60,'Debe tener máximo 60 caracteres'),
            titulo: Yup.string().required("El título es requerido").max(60,'Debe tener máximo 60 caracteres'),
            fecha_inicio: Yup.string().required("Debe definir la fecha de inicio"),
            fecha_finalizacion: Yup.string().required("Debe definir la fecha de finalización"),
        }),
        onSubmit: values=>{
            _registrarExperienciaAcademica(values);
        }
    })

    useEffect(()=>{
        _inicializar();
    },[]);
    /**Inicializa y trae los datos del curriculum y catalogos necesarios. */
    const _inicializar = async()=>{
        try{
            setLoading(true);
            const result = await get(GET_CURRICULUM);
            const {curriculum, imagen, estudiante, correo_electronico, } = result;
            const {experiencias_laborales, experiencias_academicas,aptitudes_curriculum} = curriculum;
            console.log({result});
            setCurriculum(curriculum);
            setImagen(imagen); //BASE 64
            setEstudiante(estudiante);

            //form de datos del estudiante.
            validation.setFieldValue("primer_nombre",estudiante?.primer_nombre);
            validation.setFieldValue("segundo_nombre",estudiante?.segundo_nombre);
            validation.setFieldValue("primer_apellido",estudiante?.primer_apellido);
            validation.setFieldValue("segundo_apellido",estudiante?.segundo_apellido);
            validation.setFieldValue("dui",estudiante?.dui);
            validation.setFieldValue("correo_electronico",correo_electronico);
            validation.setFieldValue("telefono", estudiante?.telefono);
            validation.setFieldValue("descripcion_usuario", curriculum?.descripcion_usuario);


            const result_inicializar = await get(GET_INICIALIZAR_EXPERIENCIA_LABORAL);
            const {puestos, empresas } = result_inicializar;
            console.log({puestos});
            empresas.map(i=>{
                i.value = i.id;
                i.label = i.nombre_empresa;
            })
            puestos.map(i=>{
                i.value = i.id;
                i.label = i.puesto;
            })
            setListaEmpresas(empresas);
            setListaPuestos(puestos);
            setListaExperienciasLaborales(experiencias_laborales);
            setListaExperienciasAcademicas(experiencias_academicas);

            const result_inicializar_aptitudes = await get(GET_INICIALIZAR_APTITUD_CURRICULUM);
            const {aptitudes} = result_inicializar_aptitudes;
            aptitudes.map(it=>{
                it.value = it.id;
                it.label = it.aptitud;
            });
            setListaAptitudes(aptitudes);

            const aptitudes_cv=[];
            aptitudes_curriculum.map(i=>{
                if(i != null){
                   aptitudes_cv.push({
                    value: i.aptitud.id,
                    label: i.aptitud.aptitud,
                    id: i.aptitud.id,
                    aptitud:i.aptitud.aptitud
                   });
                }
            });
            setListaAptitudesCV(aptitudes_cv)

            setLoading(false);
        }catch(e){
            console.log("Error: ",e);
            Swal.fire({
                title:"Error al obtener el curriculum",
                icon:"error",
                text:"Ha ocurrido un error al obtener el curriculum del usuario.",
                confirmButtonText:"Aceptar"
            });
            setLoading(false);
        }
    }
    /**Cambia los datos de telefono y descripcion usuario del estudiante. */
    const _cambioDatosEstudiante=(datos)=>{
        try{
            Swal.fire({
                title:"Actualizar Datos Contacto",
                icon:"warning",
                text:"¿Desea actualizar sus datos de contacto?",
                showCancelButton:true,
                confirmButtonText:"Aceptar",
                showLoaderOnConfirm:true,
                cancelButtonText:"Cancelar"
            }).then(async respuesta=>{
                if(respuesta.isConfirmed){
                    setLoading(true);
                    const result = await put(PUT_ACTUALIZAR_DATOS_ESTUDIANTE, datos);
                    Swal.fire({
                        title:"Actualizar Datos Contacto",
                        icon:result.success==true?("success"):("error"),
                        text:result.message,
                        confirmButtonText:"Aceptar"
                    })
                    setLoading(false);
                }
            })

        }catch(e){
            console.log("Error: ",e);
            Swal.fire({
                title:"Error al actualizar datos del estudiante",
                icon:"error",
                text:"Ha ocurrido un error al actualizar los datos del estudiante.",
                confirmButtonText:"Aceptar"
            })
        }
    }

    const _actualizarDocumento = async()=>{
        try{
            setLoading(true);
            const formData = new FormData();
            formData.set('documento_cv',documento);

            const result = await post(POST_GUARDAR_DOCUMENTO_CURRICULUM, formData);
            Swal.fire({
                title:"Actualizar Documento",
                icon:result.success==true?("success"):("false"),
                text:result.message,
                confirmButtonText:"Aceptar"
            })
            inputDocumentoCV.current.value = '';
            setDocumento(null);
            setLoading(false)
            _inicializar();
        }catch(e){
            console.log("Error: ",e);
            Swal.fire({
                title:"Actualizar Documento",
                icon:"error",
                text:"Ha ocurrido un error al actualizar el documento",
                confirmButtonText:"Aceptar"
            })
        }
    }

    const _registrarExperienciaLaboral=async(data)=>{
        try{
            setLoadingELaboral(true);
            const fecha_inicio = new Date(data.fecha_inicio);
            const fecha_finalizacion = new Date(data.fecha_finalizacion);

            if(fecha_finalizacion < fecha_inicio){
                Swal.fire({
                    title:"Orden de fechas erroneo",
                    icon:"error",
                    text:"La fecha de finalización debe ser mayor a la fecha de inicio.",
                    confirmButtonText:"Aceptar"
                })
                return;
            }

            const result = await post(POST_EXPERIENCIA_LABORAL, data);

            Swal.fire({
                title:"Registrar Experiencia Laboral",
                icon: result.success== true?("success"):("error"),
                message: result.message,
                confirmButtonText:"Aceptar"
            })
            if(result.success == true){
                _inicializar()
            }
            setLoadingELaboral(false);
            setModalELaboral(false);
            
        }catch(e){
            console.log("Error: ",e);
            setLoadingELaboral(false);
            Swal.fire({
                title:"Registrar Experiencia Laboral",
                icon:"error",
                text:"Ocurrio un error al registrar la experiencia laboral",
                confirmButtonText:"Aceptar"
            });
        }
    }

    const _eliminarExperienciaLaboral =async(item)=>{
        try{
            const result = await del(DELETE_EXPERIENCIA_LABORAL(item.id));

            Swal.fire({
                title:"Eliminar Experiencia Laboral",
                icon: result.success==true?("success"):("error"),
                message:result.message,
                confirmButtonText:"Aceptar"
            })

            _inicializar()
            
        }catch(e){
            console.log("Error: ",e);
            Swal.fire({
                title:"Error al eliminar la experiencia laboral",
                icon:"error",
                text:"Ha ocurrido un error al eliminar la experiencia laboral",
                confirmButtonText:"Aceptar"
            })
        }
    }

    const _registrarExperienciaAcademica = async(item)=>{
        try{
            setLoadingEAcademica(true);

            let fecha_inicio = new Date(item.fecha_inicio);
            let fecha_finalizacion = new Date(item.fecha_finalizacion);

            if(fecha_finalizacion < fecha_inicio){
                Swal.fire({
                    title:"Orden de fechas erroneo",
                    icon:"error",
                    text:"La fecha de finalización debe ser mayor a la fecha de inicio.",
                    confirmButtonText:"Aceptar"
                })
                return;
            }

            fecha_inicio = fecha_inicio.toISOString();
            fecha_finalizacion = fecha_finalizacion.toISOString();
            console.log("fecha_inicio: ",fecha_inicio);

            const formData = new FormData();
            formData.set('institucion_academica',item.institucion_academica);
            formData.set('titulo',item.titulo);
            formData.set('finalizado',item.finalizado);
            formData.set('fecha_inicio',fecha_inicio);
            formData.set('fecha_finalizacion',fecha_finalizacion);
            formData.set('documento_experiencia', item.documento);

            // // console.log("form adat: ", formData);
            // for(var pair of formData.entries()) {
            //     console.log(pair[0]+', '+pair[1]);
            //   }
            const result = await post(POST_EXPERIENCIA_ACADEMICA,formData);
            Swal.fire({
                title:"Registrar Experiencia Academica",
                icon:result.success==true?("success"):("error"),
                text: result.message,
                confirmButtonText:"Aceptar"
            });
            if(result.success == true){
                validation_registrar_experiencia_academica.values.documento = null;
                // if(inputExperienciaAcademicaRef.current.value != null)  inputExperienciaAcademicaRef.current.value = '';
                _inicializar();
            }
            setLoadingEAcademica(false);
        }catch(e){
            console.log("Error: ",e);
            setLoadingEAcademica(false);
            Swal.fire({
                title:"Registrar Experiencia Academica",
                icon:"error",
                text:"Ha ocurrido un error al registrar la experiencia academica",
                confirmButtonText:"Aceptar"
            })
        }
    }

    const _eliminarExperienciaAcademica = async(item)=>{
        try{
            Swal.fire({
                title:"Eliminar Experiencia Academica",
                icon:"warning",
                text:"¿Desea eliminar el registro de esta experiencia laboral?",
                confirmButtonText:"Aceptar",
                showCancelButton:true,
                cancelButtonText:"Cancelar",
                showLoaderOnConfirm:true,
            }).then(async respuesta =>{
                if(respuesta.isConfirmed){
                    const result = await del(DELETE_EXPERIENCIA_ACADEMICA(item.id));
                    Swal.fire({
                        title:"Eliminar Experiencia Academica",
                        icon: result.success==true?("success"):("error"),
                        text:result.message,
                        confirmButtonText:"Aceptar"
                    })
                    _inicializar();
                }
            })

        }catch(e){
            console.log("Error: ",e);
            Swal.fire({
                title:"Eliminar Experiencia Laboral",
                icon:"error",
                text:"Ha ocurrido un error al eliminar la experiencia laboral",
                confirmButtonText:"Aceptar"
            })
        }
    }

    const _guardarAptitudesCurriculum = async()=>{
        try{
            Swal.fire({
                title:"Actualizar Aptitudes",
                icon:"warning",
                text:"¿Desea actualizar las aptitudes?",
                confirmButtonText:"Aceptar",
                showCancelButton:true,
                cancelButtonText:"Cancelar"
            }).then(async respuesta =>{
                if(respuesta.isConfirmed){
                    try{ 
                        setLoadingAptitudes(true);
                        const result = await post(POST_APTITUD_CURRICULUM,{lista_aptitudes_cv:listaAptitudesCV});
                        Swal.fire({
                            title:"Actualizar Aptitudes",
                            icon: result.success==true?("success"):("error"),
                            text: result.message,
                            confirmButtonText:"Aceptar"
                        });
                        setLoadingAptitudes(false);
                        _inicializar()

                    }catch(e){
                        console.log("Error: ",e);
                        Swal.fire({
                            title:"Actualizar Aptitudes",
                            icon:"error",
                            text:"Ha ocurrido un error al actualizar las aptitudes.",
                            confirmButtonText:"Aceptar"
                        });
                    }
                }
            });
        }catch(e){
            console.log("Error: ",e);
            Swal.fire({
                title:"Actualizar Aptitudes",
                icon:"error",
                text:"Ha ocurrido un error al actualizar las aptitudes.",
                confirmButtonText:"Aceptar"
            });
        }
    }

    const _guardarNuevaImagen = async()=>{
        try{
            setLoading(true);
            const formData = new FormData();
            formData.set('imagen_perfil', nuevaImagen);

            const result = await post(POST_GUARDAR_IMAGEN, formData);
            Swal.fire({
                title:"Guardar Imagen de Perfil",
                icon: result.success == true?("success"):("false"),
                text: result.message,
                confirmButtonText:"Aceptar"
            });
            if(result.success==true){
                _inicializar();
                setImagen(null);
                inputNuevaImagen.current.value = null;
            }
            setLoading(false);

        }catch(e){
            console.log("Error: ",e);
            Swal.fire({
                title:"Actualizar Foto",
                icon:"error",
                text:"Ha ocurrido un error al actualizar la foto.",
                confirmButtonText:"Aceptar"
            })
        }
    }

    return (
        <Fragment>
            <div className="page-content">
                <div className="container-fluid">

                    <div className="mb-2">
                    <Card body>
                        <CardTitle>
                            <h3>
                                <i className="mdi mdi-file-document-edit-outline"></i>&nbsp;
                                Administración de Curriculum &nbsp;{loading==true&&<Spinner color="primary" />}
                            </h3>
                        </CardTitle>
                        <div className="mt-2">
                           <div className="mt-3 mb-3">
                           <Row>
                                <Col>
                                   <Row>
                                        <Col>
                                        {imagen != null && (
                                           <div className="mb-3" style={{ width: '200px', height: '200px', overflow: 'hidden'}}>
                                           <img
                                             src={`data:image/png;base64,${imagen}`}
                                             alt="Imagen Circular"
                                             style={imagenStyle}
                                           />
                                         </div>
                                        )}
                                        {imagen == null && (
                                            <div style={contenedorEstilos}>
                                                <img style={imagenEstilos} 
                                                    src={"https://cdn-icons-png.flaticon.com/512/85/85488.png"} 
                                                    alt="Sin Imagen"            
                                                    className="form-control" />
                                            </div>
                                        )}
                                        </Col>
                                   </Row>
                                   <Row>
                                        <Col>
                                            <input 
                                                type="file" 
                                                accept="image/*" 
                                                title='Seleccione una foto'
                                                placeholder='Seleccione una foto'
                                                onChange={e=>setNuevaImagen(e.target.files[0])}
                                                className={'form-control'}
                                                ref={inputNuevaImagen}/>
                                        </Col>
                                   </Row>
                                   <div className="m-2">
                                        <Row>
                                            <Col md={8}>
                                                {nuevaImagen != null && (<Button
                                                outline
                                                color="primary"
                                                className="btn-block"
                                                type="button"
                                                onClick={()=>{
                                                    _guardarNuevaImagen();
                                                }}>
                                                    Actualizar Foto
                                                </Button>)}
                                            </Col>
                                            <Col>
                                            <div className="pull-right">
                                            <ButtonToggle 
                                                    color="danger" 
                                                    onClick={()=>{setNuevaImagen(null); inputNuevaImagen.current.value = '';}}
                                                    disabled={nuevaImagen == null?(true):(false)}>
                                                    <i className="mdi mdi-trash-can"></i>
                                                </ButtonToggle>
                                            </div>
                                            </Col>
                                        </Row>
                                        </div>
                                </Col>
                                <Col>
                                    <Label>
                                        Curriculum: <b>{curriculum?.ruta_documento != null?(
                                            <span
                                                onClick={()=>{
                                                    const documento_url = `${import.meta.env.VITE_APP_BASE_URL}`+curriculum.ruta_documento;
                                                    const documento_url_sin_api = documento_url.replace('/api', '');
                                                    window.open(documento_url_sin_api, '_blank');
                                                }}
                                            >Descarga</span>
                                        ):(
                                            <span>No Registrado</span>
                                        )}</b>
                                    </Label>
                                    <div className="mt-3">
                                        <Row>
                                            <Col>
                                                <Label>Actualizar Documento Curriculum </Label> <br />
                                                <Label>Formatos admitidos: <b>.pdf</b></Label>
                                                <input 
                                                    type="file" 
                                                    title='Seleccione el documento'
                                                    placeholder='Seleccione el documento'
                                                    accept='.pdf'
                                                    className='form-control'
                                                    id='inputDocumentoCV'
                                                    onChange={e=>{
                                                        setDocumento(e.target.files[0]);
                                                    }}
                                                    disabled={documento != null? true:false}
                                                    //disabled={validation_registrar_experiencia_academica.values.finalizado != null ? true: false }
                                                    ref={inputDocumentoCV} />   
                                            </Col>
                                        </Row>
                                    </div>
                                        <div className="mb-2">
                                        <Row>
                                            <Col md={10}>
                                                {documento != null && (<Button
                                                outline
                                                color="primary"
                                                className="btn-block"
                                                type="button"
                                                onClick={()=>{
                                                    _actualizarDocumento();
                                                }}>
                                                    Actualizar Documento
                                                </Button>)}
                                            </Col>
                                            <Col>
                                            <div className="pull-right">
                                            <ButtonToggle 
                                                    color="danger" 
                                                    onClick={()=>{setDocumento(null); inputDocumentoCV.current.value = '';}}
                                                    disabled={documento == null?(true):(false)}>
                                                    <i className="mdi mdi-trash-can"></i>
                                                </ButtonToggle>
                                            </div>
                                            </Col>
                                        </Row>
                                        </div>
                                    
                                </Col>
                            </Row>

                           </div>
                            <Form
                            onSubmit={e=>{
                                e.preventDefault();
                                validation.handleSubmit();
                            }}>
                                <div className="mb-3">
                                <h4 style={{textDecoration:"underline"}}>Datos de Contacto</h4>
                                </div>
                                <Row>
                                    <Col>
                                        <Label className="form-label">Primer Nombre</Label>
                                        <Input 
                                            name="primer_nombre"
                                            id="primer_nombre"
                                            className="form-control"
                                            type="text"
                                            value={validation.values.primer_nombre || ""}
                                            readOnly={true}
                                            disabled={true}
                                        />
                                    </Col>
                                    <Col>
                                        <Label className="form-label">Segundo Nombre</Label>
                                        <Input 
                                            name="segundo_nombre"
                                            id="segundo_nombre"
                                            className="form-control"
                                            type="text"
                                            value={validation.values.segundo_nombre || ""}
                                            readOnly={true}
                                            disabled={true}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Label className="form-label">Primer Apellido</Label>
                                        <Input 
                                            name="primer_apellido"
                                            id="primer_apellido"
                                            className="form-control"
                                            type="text"
                                            value={validation.values.primer_apellido || ""}
                                            readOnly={true}
                                            disabled={true}
                                        />
                                    </Col>
                                    <Col>
                                        <Label className="form-label">Segundo Apellido</Label>
                                        <Input 
                                            name="segundo_apellido"
                                            id="segundo_apellido"
                                            className="form-control"
                                            type="text"
                                            value={validation.values.segundo_apellido || ""}
                                            readOnly={true}
                                            disabled={true}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Label className="form-label">DUI</Label>
                                        <Input 
                                            name="dui"
                                            id="dui"
                                            className="form-control"
                                            type="text"
                                            value={validation.values.dui || ""}
                                            readOnly={true}
                                            disabled={true}
                                        />
                                    </Col>
                                    <Col>
                                        <Label className="form-label">Correo Electrónico</Label>
                                        <Input 
                                            name="correo_electronico"
                                            id="correo_electronico"
                                            className="form-control"
                                            type="text"
                                            value={validation.values.correo_electronico || ""}
                                            readOnly={true}
                                            disabled={true}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                    <Label className="form-label">Teléfono</Label>
                                        <Input 
                                            name="telefono"
                                            id="telefono"
                                            className="form-control"
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
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Label className="form-label">Perfil Profesional</Label>
                                        <Input 
                                            name="descripcion_usuario"
                                            id="descripcion_usuario"
                                            className="form-control"
                                            type="textarea"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.descripcion_usuario || ""}
                                            invalid={
                                                validation.touched.descripcion_usuario && validation.errors.descripcion_usuario ? true : false
                                              }
                                            />
                                            {validation.touched.descripcion_usuario && validation.errors.descripcion_usuario ? (
                                              <FormFeedback type="invalid">{validation.errors.descripcion_usuario}</FormFeedback>
                                            ) : null}
                                    </Col>
                                </Row>

                                <div className="mt-3 d-grid">
                                    <Button
                                    outline
                                    color="primary"
                                    className="btn-block"
                                    type="submit">
                                        Guardar Cambios
                                    </Button>
                                </div>
                            </Form>

                        </div>
                    </Card> 
                    </div>

                    <div className="mb-2">
                        <Card body>
                            <CardTitle>
                                <h4 style={{textDecoration:"underline"}}>
                                    Experiencias Laborales 
                                </h4>
                                     &nbsp;{loading==true&&<Spinner color="primary" />}
                            </CardTitle>

                            <div className="mt-2 mb-2">
                                <Button
                                outline
                                color="primary"
                                onClick={()=>{
                                    setModalELaboral(true);
                                }}>
                                   <i className="fas fa-plus"></i>&nbsp; Registrar Experiencia Laboral
                                </Button>
                            </div>

                            <div className="mt-2" style={{height: "300px", overflowY: "auto"}}>

                                   {listaExperienciasLaborales?.length > 0 ?(
                                      <Fragment>
                                         {listaExperienciasLaborales.map(it=>(
                                        <Card body className="custom-card">
                                            <Row>
                                                <Col>
                                                    <Label>
                                                        Empresa: <b>{it?.empresa_ctg?.nombre_empresa}</b>
                                                    </Label>
                                                </Col>
                                                <Col>
                                                    <Label>
                                                        Puesto: <b>{it?.puesto_ctg?.puesto}</b>
                                                    </Label>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Label>Fecha Inicio:&nbsp; 
                                                        <b>{new Date(it?.fecha_inicio).getDate()} / {new Date(it?.fecha_inicio).getMonth()+1} / {new Date(it?.fecha_inicio).getFullYear()}</b>
                                                    </Label>
                                                </Col>
                                                <Col>
                                                    <Label>Fecha Finalización:&nbsp; 
                                                        <b>{new Date(it?.fecha_finalizacion).getDate()} / {new Date(it?.fecha_finalizacion).getMonth()+1} / {new Date(it?.fecha_finalizacion).getFullYear()}</b>
                                                    </Label>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={6}>
                                                    <Button
                                                    outline
                                                    color="danger"
                                                    onClick={()=>{
                                                        Swal.fire({
                                                            title:"Eliminar Experiencia Laboral",
                                                            icon:"warning",
                                                            text:"¿Desea Eliminar la experiencia laboral seleccionada?",
                                                            confirmButtonText:"Eliminar",
                                                            showCancelButton:true,
                                                            cancelButtonText:"Cancelar",
                                                            showLoaderOnConfirm:true,
                                                        }).then(async respuesta =>{
                                                            if(respuesta.isConfirmed){
                                                                _eliminarExperienciaLaboral(it)
                                                            }
                                                        })
                                                    }}
                                                    >
                                                        <i className="fas fa-trash-alt"></i>&nbsp;
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Card>
                                       ))}
                                      </Fragment>
                                   ):(
                                    <Card body className="custom-card">
                                            <div className="mt-2 mb-2 text-center">
                                            <Label>No se han registrado experiencias laborales.</Label>
                                            </div>
                                    </Card>
                                   )}
                                
                            </div>

                        </Card>
                    </div>

                    <div className="mb-2">
                        <Card body>
                            <CardTitle>
                                <h4 style={{textDecoration:"underline"}}>Experiencias Academicas</h4> &nbsp;{loading==true&&<Spinner color="primary" />}
                            </CardTitle>
                            <div className="mt-2 mb-2">
                                <Button
                                 outline
                                 color="primary"
                                 onClick={()=>{
                                    setModalEAcademica(true);
                                 }}>
                                    <i className="fas fa-plus"></i>&nbsp; Registrar Experiencia Academica
                                </Button>
                            </div>

                            <div className="mt-2" style={{height: "300px", overflowY: "auto"}}>
                               {listaExperienciasAcademicas.length > 0?(
                                <Fragment>
                                    {listaExperienciasAcademicas.map(it=>(
                                    <Card body className="custom-card">
                                        <Row>
                                            <Col>
                                                <Label>Institución: <b>{it?.institucion_academica}</b></Label>
                                            </Col>
                                            <Col>
                                                <Label>Título: <b>{it?.titulo}</b></Label>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Label>Fecha Inicio:&nbsp; 
                                                    <b>{new Date(it?.fecha_inicio).getDate()} / {new Date(it?.fecha_inicio).getMonth()+1} / {new Date(it?.fecha_inicio).getFullYear()}</b>
                                                </Label>
                                            </Col>
                                            <Col>
                                                <Label>Fecha Finalización:&nbsp; 
                                                    <b>{new Date(it?.fecha_finalizacion).getDate()} / {new Date(it?.fecha_finalizacion).getMonth()+1} / {new Date(it?.fecha_finalizacion).getFullYear()}</b>
                                                </Label>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                Documento: <b>{it?.ruta_documento != null?(
                                                    <span style={{textDecoration:"underline", color:"blue"}}
                                                    onClick={()=>{
                                                        
                                                        const documento_url = `${import.meta.env.VITE_APP_BASE_URL}`+it.ruta_documento;
                                                        const documento_url_sin_api = documento_url.replace('/api', '');
                                                        window.open(documento_url_sin_api, '_blank');
                                                    }}>
                                                        Descargar
                                                    </span>
                                                ):("No Registrado")}</b>
                                            </Col>
                                            <Col>
                                                <FormGroup>
                                                    <ButtonToggle 
                                                        outline
                                                        color="danger" 
                                                        onClick={()=>{
                                                            _eliminarExperienciaAcademica(it);
                                                        }}>
                                                        <i className="mdi mdi-trash-can"></i>
                                                    </ButtonToggle>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </Card>
                               ))}
                                </Fragment>
                               ):(
                                    <Card body className="custom-card">
                                            <div className="mt-2 mb-2 text-center">
                                            <Label>No se han registrado experiencias academicas.</Label>
                                            </div>
                                    </Card>
                               )}
                            </div>
                        </Card>
                    </div>

                    <div className="mb-2">
                        <Card body>
                            <CardTitle>
                                <h4 style={{textDecoration:"underline"}}>Aptitudes</h4> &nbsp;{loading==true&&<Spinner color="primary" />}{loadingAptitudes==true&&<Spinner color="primary" />}
                            </CardTitle>
                            <div className="mt-2 mb-2">
                                <Button
                                 outline
                                 color="primary"
                                 onClick={()=>{
                                    _guardarAptitudesCurriculum();
                                 }}>
                                    <i className="fas fa-plus"></i>&nbsp; Actualizar Aptitudes
                                </Button>
                            </div>
                            <div className="mb-2">
                                <Select
                                    id="select_aptitudes"
                                    name="select_aptitudes"
                                    placeholder="Seleccione una o más aptitudes"
                                    options={listaAptitudes}
                                    isMulti
                                    value={listaAptitudesCV}
                                    onChange={e=>setListaAptitudesCV(e)}
                                    isSearchable={true}
                                 />
                            </div>
                        </Card>
                    </div>


                </div>
            </div>
        
            {/**REGISTRAR EXPERIENCIA LABORAL. */}
            <Modal
            size="md"
            isOpen={modalELaboral}
            toggle={()=>{
                setModalELaboral(false)
            }}>
                <div className="modal-header">
                    <h5
                    className="modal-title mt-0">
                        Agregar Nueva Experiencia Laboral.
                    </h5>
                    <button
                        onClick={()=>{
                            setModalELaboral(false)
                        }}
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <Card body>
                        {loadingELaboral == false?(
                            <div className="p-2">
                                <Form
                                onSubmit={(e)=>{
                                    e.preventDefault();
                                    console.log("Entro");
                                    validation_registrar_experiencia.handleSubmit();
                                    return false;
                                }}>
                                    <Row>
                                        <Col>
                                        <Label className="form-label"><b>Empresa</b></Label>
                                            <Select
                                                placeholder="Empresa"
                                                value={validation_registrar_experiencia.values.fk_empresa}
                                                onChange={selectedOption => {
                                                    validation_registrar_experiencia.setFieldValue("fk_empresa", selectedOption);
                                                }}
                                                isSearchable={true}
                                                options={listaEmpresas}
                                                name="fk_empresa"
                                                isLoading={false}
                                               
                                                />
                                            {validation_registrar_experiencia.errors.fk_empresa ? (
                                                <div className="error">{validation_registrar_experiencia.errors.fk_empresa}</div>
                                            ) : null}
                                        </Col>

                                        <Col>
                                        <Label className="form-label"><b>Puesto</b></Label>
                                            <Select
                                                placeholder="Puesto"
                                                value={validation_registrar_experiencia.values.fk_puesto}
                                                onChange={selectedOption => {
                                                    validation_registrar_experiencia.setFieldValue("fk_puesto", selectedOption);
                                                }}
                                                isSearchable={true}
                                                options={listaPuestos}
                                                name="fk_puesto"
                                                isLoading={false}
                                               
                                                />
                                            {validation_registrar_experiencia.errors.fk_puesto ? (
                                                <div className="error">{validation_registrar_experiencia.errors.fk_puesto}</div>
                                            ) : null}
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <div className="pl-1">
                                                <Label className='form-label pt-2 pb-2'>
                                                    <b>Fecha Inicio</b>
                                                </Label>
                                            </div>
                                            <div className="pt-2">
                                                <DatePicker
                                                    showIcon
                                                    selected={validation_registrar_experiencia.values.fecha_inicio}
                                                    maxDate={new Date()}
                                                    onChange={(date)=>{     
                                                        validation_registrar_experiencia.setFieldValue("fecha_inicio", date);
                                                    }}
                                                    dateFormat={'dd-MM-yyyy'}
                                                    locale="es"
                                                />
                                                {validation_registrar_experiencia.errors.fecha_inicio ? (
                                                    <div className="error">{validation_registrar_experiencia.errors.fecha_inicio}</div>
                                                ) : null}
                                            </div>
                                        </Col>
                                        
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div className="pl-1">
                                                <Label className='form-label pt-2 pb-2'>
                                                    <b>Fecha Finalización</b>
                                                </Label>
                                            </div>
                                            <div className="pt-2">
                                                <DatePicker
                                                    showIcon
                                                    selected={validation_registrar_experiencia.values.fecha_finalizacion}
                                                    maxDate={new Date()}
                                                    onChange={(date)=>{     
                                                        validation_registrar_experiencia.setFieldValue("fecha_finalizacion", date);
                                                    }}
                                                    dateFormat={'dd-MM-yyyy'}
                                                    locale="es"
                                                />
                                                {validation_registrar_experiencia.errors.fecha_finalizacion ? (
                                                    <div className="error">{validation_registrar_experiencia.errors.fecha_finalizacion}</div>
                                                ) : null}
                                            </div>
                                        </Col>
                                    </Row>

                                    <div className="mt-3 d-grid">
                                        <Button outline
                                        color="success"
                                        className='btn-block'
                                        type="submit">
                                            <div className="fas fa-plus"></div>&nbsp; Registrar Experiencia
                                        </Button>
                                    </div>

                                </Form>
                            </div>
                        ):(
                            <div className="text-center">
                                <Spinner color="primary" />
                            </div>
                        )}
                    </Card>
                </div>

            </Modal>

           {/**REGISTRAR EXPERIENCIA ACADEMICA. */}                 
            <Modal
             size="md"
             isOpen={modalEAcademica}
             toggle={()=>{
                 setModalEAcademica(false)
             }}>
                <div className="modal-header">
                    <h5
                    className="modal-title mt-0">
                        Agregar Nueva Experiencia Academica.
                    </h5>
                    <button
                        onClick={()=>{
                            setModalEAcademica(false)
                        }}
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div className="modal-body">
                    <Card body>
                        {loadingEAcademica == false?(
                            <div className="p-2">
                                <Form
                                onSubmit={(e)=>{
                                    e.preventDefault();
                                    console.log("Entro");
                                    validation_registrar_experiencia_academica.handleSubmit();
                                    return false;
                                }}>
                                    <Row>
                                        <Col>
                                            <div className="pt-2">
                                                <Label><b>Institución Academica</b></Label>
                                                <Input
                                                    name="institucion_academica"
                                                    className="form-control"
                                                    placeholder="Institucion Academica"
                                                    type="text"
                                                    onChange={validation_registrar_experiencia_academica.handleChange}
                                                    onBlur={validation_registrar_experiencia_academica.handleBlur}
                                                    value={validation_registrar_experiencia_academica.values.institucion_academica || ""}
                                                    invalid={
                                                        validation_registrar_experiencia_academica.touched.institucion_academica && validation_registrar_experiencia_academica.errors.institucion_academica
                                                        ? true
                                                        : false
                                                    }
                                                    />
                                                    {validation_registrar_experiencia_academica.touched.institucion_academica && validation_registrar_experiencia_academica.errors.institucion_academica ? (
                                                    <FormFeedback type="invalid">
                                                        {validation_registrar_experiencia_academica.errors.institucion_academica}
                                                    </FormFeedback>
                                                    ) : null}
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className="pt-2">
                                                <Label><b>Título</b></Label>
                                                <Input
                                                    name="titulo"
                                                    className="form-control"
                                                    placeholder="Título"
                                                    type="text"
                                                    onChange={validation_registrar_experiencia_academica.handleChange}
                                                    onBlur={validation_registrar_experiencia_academica.handleBlur}
                                                    value={validation_registrar_experiencia_academica.values.titulo || ""}
                                                    invalid={
                                                        validation_registrar_experiencia_academica.touched.titulo && validation_registrar_experiencia_academica.errors.titulo
                                                        ? true
                                                        : false
                                                    }
                                                    />
                                                    {validation_registrar_experiencia_academica.touched.titulo && validation_registrar_experiencia_academica.errors.titulo ? (
                                                    <FormFeedback type="invalid">
                                                        {validation_registrar_experiencia_academica.errors.titulo}
                                                    </FormFeedback>
                                                    ) : null}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div className="pl-1">
                                                <Label className='form-label pt-2 pb-2'>
                                                    <b>Fecha Inicio</b>
                                                </Label>
                                            </div>
                                            <div className="pt-2">
                                                <DatePicker
                                                    showIcon
                                                    selected={validation_registrar_experiencia_academica.values.fecha_inicio}
                                                    maxDate={new Date()}
                                                    onChange={(date)=>{     
                                                        validation_registrar_experiencia_academica.setFieldValue("fecha_inicio", date);
                                                    }}
                                                    dateFormat={'dd-MM-yyyy'}
                                                    locale="es"
                                                />
                                                {validation_registrar_experiencia_academica.errors.fecha_inicio ? (
                                                    <div className="error">{validation_registrar_experiencia_academica.errors.fecha_inicio}</div>
                                                ) : null}
                                            </div>
                                        </Col>

                                        <Col>
                                            <div className="pl-1">
                                                <Label className='form-label pt-2 pb-2'>
                                                    <b>Fecha Finalización</b>
                                                </Label>
                                            </div>
                                            <div className="pt-2">
                                                <DatePicker
                                                    showIcon
                                                    selected={validation_registrar_experiencia_academica.values.fecha_finalizacion}
                                                    maxDate={new Date()}
                                                    onChange={(date)=>{     
                                                        validation_registrar_experiencia_academica.setFieldValue("fecha_finalizacion", date);
                                                    }}
                                                    dateFormat={'dd-MM-yyyy'}
                                                    locale="es"
                                                />
                                                {validation_registrar_experiencia_academica.errors.fecha_finalizacion ? (
                                                    <div className="error">{validation_registrar_experiencia_academica.errors.fecha_finalizacion}</div>
                                                ) : null}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col  md={6} xs={12}>
                                            <div className="pt-3">
                                                <FormGroup switch>
                                                <Input
                                                type="switch"
                                                checked={validation_registrar_experiencia_academica.values.finalizado}
                                                onClick={()=>{
                                                    validation_registrar_experiencia_academica.setFieldValue("finalizado",!validation_registrar_experiencia_academica.values.finalizado)
                                                }}
                                                onChange={()=>{
                                                    validation_registrar_experiencia_academica.setFieldValue("finalizado",!validation_registrar_experiencia_academica.values.finalizado)
                                                }}
                                                />
                                                <Label check>{validation_registrar_experiencia_academica.values.finalizado?"Finalizado":"Finalizado"}</Label>
                                            </FormGroup>
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className="pt-3">
                                    <Row>
                                        <Col md={10}>
                                            <Label>Seleccione el documento de su título (opcional) </Label>
                                            <Label>Formatos admitidos: <b>.pdf</b></Label>
                                            <input 
                                                type="file" 
                                                title='Seleccione el documento'
                                                placeholder='Seleccione el documento'
                                                accept='.pdf'
                                                className='form-control'
                                                id='inputExperienciaAcademicaFile'
                                                onChange={e=>{
                                                    validation_registrar_experiencia_academica.setFieldValue("documento",e.target.files[0]);
                                                }}
                                                //disabled={validation_registrar_experiencia_academica.values.finalizado != null ? true: false }
                                                ref={inputExperienciaAcademicaRef} />   
                                        </Col>
                                        <Col>
                                            <ButtonToggle 
                                                color="danger" 
                                                onClick={()=>{validation_registrar_experiencia_academica.setFieldValue("documento",null); inputExperienciaAcademicaRef.current.value = '';}}
                                                disabled={validation_registrar_experiencia_academica.values.documento == null?(true):(false)}>
                                                <i className="mdi mdi-trash-can"></i>
                                            </ButtonToggle>
                                        </Col>

                                    </Row>
                                    </div>
                                    <div className="mt-3 d-grid">
                                        <Button outline
                                        color="success"
                                        className='btn-block'
                                        type="submit">
                                            <div className="fas fa-plus"></div>&nbsp; Registrar Experiencia Academica
                                        </Button>
                                    </div>

                                </Form>
                            </div>
                        ):(
                            <div className="text-center">
                                <Spinner color="primary" />
                            </div>
                        )}
                    </Card>
                </div>
            </Modal>
        </Fragment>
    )
}
