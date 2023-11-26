import React,{useState, useEffect, Fragment} from 'react';
import {
    Row, Col,
    Card,Spinner,
    Button, Form,
    Label, Input, FormFeedback,
    Modal,
    FormGroup,
} from 'reactstrap';
//Formik Validation.
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import { GET_ROL_INCIALIZAR,
    PUT_ROL } from '../../../helpers/RolesMto/url_helper';
//HOOKS
import useApiHelper from '../../../hooks/useApiHelper';

const ActualizarRol = props =>{
    const [modal, setModal] = useState(false);
    const [modulos, setModulos] = useState([]);
    const [listaModulos, setListaModulos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [rol, setRol] = useState(null);
    const {get, put} = useApiHelper();

    useEffect(()=>{
        if(props.modal != null){
            setModal(props.modal);
        }
    },[props.modal]);
    useEffect(()=>{
        setRol(props.rol);
    },[props.rol]);
    useEffect(()=>{
        if(modal == true) _inicializar();
    },[modal]);
    useEffect(()=>{
        if(rol != null && modulos.length > 0) _formarModulosInicializados();
    },[rol, modulos]);

    const validation = useFormik({
        enableReinitialize:true,
        initialValues: {
            nombre: rol?(rol.nombre):("")
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required("Nombre es requerido."),
        }),
        onSubmit: (values)=>{
            _actualizarRol(values)
        }
    })
    /**FUNCION: Obtiene los servicios necesarios para inicializar. */
    const _inicializar = async()=>{
        setLoading(true);
        const result = await get(GET_ROL_INCIALIZAR);
        setModulos(result.modulos);
        setLoading(false);

    }
    /**FUNCION: Cambia el estado del modal. */
    const _toggleModal=()=>{
        setModal(!modal);
        props.resetFlgs();
    }
    /**FUNCION: Preinicializa el arreglo de modulos de acuerdo a lo obtenido por el rol. */
    const _formarModulosInicializados=()=>{
        const {permisos_activos} = rol;
        const n_permisos =[];
        for(const modulo of modulos){

            const {recursos} = modulo;
            recursos.map(recurso =>{
                const coincidencia = permisos_activos.filter(permiso=>permiso.recurso.id === recurso.id);
                if(coincidencia.length > 0){
                    recurso.checked = true;
                }else{
                    recurso.checked = false;
                }
            });
            const n_permiso={
                ...modulo,
                recursos: recursos
            };
            n_permisos.push(n_permiso);
        }
        setListaModulos(n_permisos);
    }
    /**FUNCION: Actualiza los datos del rol en el servidor. */
    const _actualizarRol=async(values)=>{
        setLoading(true);
        const permisos=[];
        listaModulos.map(modulo =>{
            const {recursos} = modulo;
            recursos.map(recurso=>{
                if(recurso.checked === true){
                    permisos.push(recurso);
                }
            });
        });
        if(permisos.length > 0){
            const data={
                nombre: values.nombre,
                lista_permisos: permisos
            };
            const result = await put(PUT_ROL+rol.id+"/", data);
            Swal.fire({
                title:"Actualizar Rol",
                icon:"success",
                text: result.message,
                confirmButtonText:"Aceptar"
            });
            setLoading(false);
            _toggleModal();
        }else{
            Swal.fire({
                title:"Permisos",
                icon:"info",
                text:"Debe de marcar al menos un recurso", 
                confirmButtonText:"Aceptar"
            });
            setLoading(false);
        }
        

    }
    /**FUNCION: Cambia el estado de checkeado de un recurso. */
    const _handleCheck=(recurso)=>{
        const n_modulos =[];
        for(const iterador of listaModulos){
            const n_recursos=[];
            for(const iterador_recursos of iterador.recursos){
                if(iterador_recursos.id === recurso.id){
                    n_recursos.push({
                        ...iterador_recursos,
                        checked: !iterador_recursos.checked
                    });
                }else{
                    n_recursos.push({
                        ...iterador_recursos,
                    });
                }
            }//recursos.

            n_modulos.push({
                ...iterador,
                recursos: n_recursos
            });
        }//modulos.
        setListaModulos(n_modulos);
    }

    return(
        <Fragment>
        <Modal
        size='lg'
        isOpen={modal}
        toggle={()=>{
            _toggleModal()
        }}>
            <div className="modal-header">
                <h5 className="modal-title mt-0">
                    <i className="mdi mdi-account-plus-outline">
                        Actualizar Rol
                    </i>
                </h5>
                <button
                    onClick={() => {
                    _toggleModal()
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
                    {loading === true?(
                        <div className="text-center">
                            <Spinner color="primary" />
                        </div>
                    ):(
                        <Fragment>
                           <Form
                            onSubmit={e=>{
                                e.preventDefault();
                                validation.handleSubmit();
                                return false;
                            }}
                           >
                                <h5 style={{textDecoration:"underline"}}>Datos de Rol</h5>
                                <div className="mt-3 mb-3">
                                    <Row>
                                        <Col>
                                            <Label className="form-label">Nombre</Label>
                                            <Input
                                            name="nombre"
                                            className="form-control"
                                            placeholder="Nombre"
                                            type="text"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.nombre || ""}
                                            invalid={
                                                validation.touched.nombre && validation.errors.nombre
                                                ? true
                                                : false
                                            }
                                            />
                                            {validation.touched.nombre && validation.errors.nombre ? (
                                                <FormFeedback type="invalid">
                                                    {validation.errors.nombre}
                                                </FormFeedback>
                                                ) : null}
                                        </Col>
                                    </Row>
                                </div>

                                <h5 style={{textDecoration:"underline"}}>Permisos</h5>
                                <div className="mt-3 mb-3">
                                    <Row>
                                       {listaModulos.map(modulo=>{
                                        if(modulo.recursos.length > 0){
                                            return(
                                                <Col lg={6} md={4} xs={12} sm={12} className='mr-2'>
                                                    <FormGroup>
                                                        <Label><b>{modulo.tipo_recurso}</b></Label>
                                                        <Row>
                                                        {modulo.recursos.map(recurso=>{
                                                            return(
                                                                <Col md={5} xs={5} sm={5} className="mb-4">
                                                                    <Label check style={{fontSize:"12px"}}>
                                                                    <Input
                                                                        type="checkbox"
                                                                        name={recurso.nombre}
                                                                        defaultChecked={recurso.checked}
                                                                        onClick={()=>{
                                                                            _handleCheck(recurso)
                                                                        }}
                                                                        />{' '}
                                                                        {recurso.nombre}
                                                                    </Label>
                                                                </Col>
                                                            )
                                                        })}
                                                        </Row>
                                                    </FormGroup>
                                                </Col>
                                            );
                                        }else{
                                            return (<span></span>)
                                        }
                                       })}
                                    </Row>
                                </div>

                                <div className="mt-3 mb-3">
                                    <Row>
                                        <Col>
                                            <div className="mt-3 d-grid">
                                            <Button
                                            outline
                                            color="success"
                                            className="btn-block"
                                            type="submit"
                                            >
                                            <i className="fas fa-plus"></i>&nbsp;&nbsp;Actualizar Rol
                                            </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                           </Form>
                        </Fragment>
                    )}
                </Card>
            </div>

        </Modal>

        </Fragment>
    );
}

export default ActualizarRol;