import React,{Fragment, useState, useEffect, useMemo} from 'react';
import{
    Card,CardTitle,
    Button,Spinner,Row,Col,
    ButtonToggle,Input,Label,
    FormGroup
} from 'reactstrap';
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
//Components
import ActualizarRol from './ActualizarRol/ActualizarRol';
import CrearRol from './CrearRol/CrearRol';
//API´s Services
import { GET_ROL_INDEX, PUT_ROL_ACTIVO } from '../../helpers/RolesMto/url_helper';
//HOOKS
import useApiHelper from '../../hooks/useApiHelper';
import Swal from 'sweetalert2';
const RolesMto = props =>{
    const [modal, setModal] = useState(false);
    const [modalRol, setModalRol] = useState(false);
    const [rol, setRol] = useState(null);
    const [roles, setRoles] = useState([]);
    const [listaRoles, setListaRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const {get, put} = useApiHelper();
    //Titulo Pantalla.
    document.title="Roles - mtto.";
    const columns = useMemo(
        ()=>[
            {
                dataField:"numero_fila",
                text:"No.",
                headerStyle: ()=>{
                    return { width:"5%",textAlign:"center", fontSize:"12px"}
                },
                style:{
                    fontSize:"12px",
                    textAlign:"center"
                }
            },
            {
                dataField:"nombre",
                text:"Nombre",
                headerStyle: () => {
                    return { width: "20%",textAlign:"center", fontSize:"12px" };
                },
                style:{
                    fontSize:"12px",
                    textAlign:"center"
                }
            },
            {
                dataField:"permisos_rol",
                text:"Permisos",
                headerStyle: () => {
                    return { width: "25%",textAlign:"center", fontSize:"12px" };
                },
                style:{
                    fontSize:"12px",
                    textAlign:"justify"
                }
            },
            {
                dataField:"activo_rol",
                text:"Activo",
                headerStyle: () => {
                    return { width: "8%",textAlign:"center", fontSize:"12px" };
                },
                style:{
                    fontSize:"12px",
                    textAlign:"center"
                }
            },
            {
                dataField:"operaciones",
                text:"Operaciones",
                headerStyle: () => {
                    return { width: "20%",textAlign:"center", fontSize:"12px" };
                },
                style:{
                    fontSize:"12px",
                    textAlign:"center"
                }
            },
        ]
    );

    useEffect(()=>{
        _inicializar();
    },[]);
    useEffect(()=>{
        _formarFilas();
    },[roles]);
    /**FUNCION: Inicializa la pantalla y sus servicios. */
    const _inicializar = async()=>{
        try{
            setLoading(true);
            const results = await get(GET_ROL_INDEX);
            setRoles(results.roles);
            setLoading(false);
        }catch(e){
            setLoading(false);
        }
    }
    /**FUNCION: Forma las filas de la tabla con los roles obtenidos. */
    const _formarFilas=()=>{
        const filas =[];
        let numero_fila=1;
        for(const iterador of roles){
            const activo_rol=<FormGroup switch>
                <Input
                    type="switch"
                    checked={iterador.activo?(true):(false)}
                    onChange={()=>{
                        _cambiarEstadoRol(iterador);
                    }} 
                />
                <Label check>{iterador.activo?"Activo":"Inactivo"}</Label>
            </FormGroup>;

            const permisos_rol=<Fragment>
                <ul>
                    {iterador.permisos_activos.map((permiso, index)=>{
                        return(
                            <li key={index}>{permiso.recurso.nombre}</li>
                        )
                    })}
                </ul>
            </Fragment>

            const operaciones =<Fragment>
                <ButtonToggle outline 
                    color="warning"
                    onClick={()=>{
                        setRol(iterador);
                        setModalRol(true);
                    }}>
                    <i className="mdi mdi-pencil-outline"></i>
                </ButtonToggle>
            </Fragment>
            const fila={
                ...iterador,
                numero_fila,
                activo_rol,
                permisos_rol,
                operaciones
            }
            filas.push(fila);
            numero_fila++;
        }
        setListaRoles(filas);
    }
    /**FUNCION: Cambia el estado de un rol. */
    const _cambiarEstadoRol=async({id: id_rol})=>{
        Swal.fire({
            title:"Actualizar Estado Rol",
            icon:"info",
            text:"¿Desea Activar/Desactivar el rol en el sistema?.NOTA: Al desactivar, los usuarios con este rol perderán sus permisos.",
            showCancelButton: true,
            confirmButtonText: 'Actualizar',
            cancelButtonText:'Cancelar',
            confirmButtonColor:"success",
        }).then(async result =>{
            if(result.isConfirmed){
                const resultado = await put(PUT_ROL_ACTIVO+id_rol+"/activo");
                Swal.fire({
                    title:"Actualizar Estado Rol",
                    icon:"success",
                    text: resultado.message,
                    confirmButtonText:"Aceptar"
                });
                _inicializar();
            }
        })
    }
    return(
        <Fragment>
        <div className="page-content">
            <div className="container-fluid">
                <Card body>
                    <CardTitle>
                        <h3>
                            <i className="mdi mdi-account-group"></i>&nbsp;
                            Mantenimiento Roles
                        </h3>
                    </CardTitle>
                    <div className="mt-2 mb-3">
                    <Row>
                        <Col>
                            <Button outline 
                                color="success"
                                onClick={()=>setModal(!modal)}
                                >
                                    <i className="mdi mdi-plus-outline"></i>&nbsp;&nbsp;
                                Agregar Rol
                            </Button>
                        </Col>
                    </Row>
                    </div>
                    <Row>
                        <Col>
                            {loading?(
                                <div className="text-center">
                                    <Spinner color="primary" />
                                </div>
                            ):(
                                <BootstrapTable
                                    keyField='numero_fila'
                                    data={listaRoles}
                                    columns={columns}
                                    pagination={ paginationFactory() }
                                    wrapperClasses="table-responsive"
                                />
                            )}
                        </Col>
                    </Row>
                </Card>
                <ActualizarRol
                    modal={modalRol}
                    rol={rol}
                    resetFlgs={()=>{
                        setModalRol(false);
                        setRol(null);
                        _inicializar();
                    }}
                />
                <CrearRol
                    modal={modal}
                    resetFlgs={()=>{
                        setModal(false);
                        _inicializar();
                    }}
                />
            </div>
        </div>
    </Fragment>
    );
}

export default RolesMto;