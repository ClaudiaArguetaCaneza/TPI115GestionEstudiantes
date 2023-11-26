import React,{Fragment, useState, useEffect, useMemo} from 'react';
import{
    Card, CardTitle,
    Row,Col,
    Label,Button,ButtonToggle,
    Spinner, Input, FormGroup
} from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Swal from 'sweetalert2';
//API´s Services
import { GET_RECURSOS, PUT_ACTIVO_RECURSO } from '../../helpers/RecursosMto/url_helper';
//Components
import ActualizarRecurso from './ActualizarRecurso/ActualizarRecurso';
import CrearRecurso from './CrearRecurso/CrearRecurso';
//HOOKS
import useApiHelper from '../../hooks/useApiHelper';
const RecursosMto = props =>{
    document.title="Recursos - mtto";
    const [recursos, setRecursos] = useState([]);
    const [listaRecursos, setListaRecursos] = useState([]);
    const [loading, setLoading] = useState(false);
    const {get,put} = useApiHelper();
    const [modal, setModal] = useState(false);
    const [modalActualizar, setModalActualizar] = useState(false);
    const [recurso, setRecurso] = useState(null);
    const columns=useMemo(
        ()=>[
            {
                dataField:"numero_fila",
                text:"No.",
                headerStyle: ()=>{
                    return { width:"5%", textAlign:"center", fontSize:"12px"};
                },
                style: {
                    fontSize:"12ps",
                    textAlign:"center"
                }  
            },
            {
                dataField:"nombre",
                text:"Nombre Recurso",
                headerStyle: () => {
                    return { width: "10%",textAlign:"center", fontSize:"12px" };
                },
                style:{
                    fontSize:"12px",
                    textAlign:"center"
                }
            },
            {
                dataField:"ruta",
                text:"Ruta",
                headerStyle: () => {
                    return { width: "10%",textAlign:"center", fontSize:"12px" };
                },
                style:{
                    fontSize:"12px",
                    textAlign:"center"
                }
            },
            {
                dataField:"modulo",
                text:"Modulo",
                headerStyle: () => {
                    return { width: "10%",textAlign:"center", fontSize:"12px" };
                },
                style:{
                    fontSize:"12px",
                    textAlign:"center"
                }
            },
            {
                dataField:"activo_recurso",
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
                    return { width: "10%",textAlign:"center", fontSize:"12px" };
                },
                style:{
                    fontSize:"12px",
                    textAlign:"center"
                }
            },
        ]
    )
    useEffect(()=>{
        _inicializar();
    },[]);
    useEffect(()=>{
        _formarFilas();
    },[recursos]);
    const _inicializar=async()=>{
        setLoading(true);
        const results = await get(GET_RECURSOS);
        setRecursos(results.recursos);
        setLoading(false);
    }

    const _formarFilas=()=>{
        const n_filas=[];
        let numero_fila=1;
        for(const iterador of recursos){
            const activo_recurso=<Fragment>
              <FormGroup switch>
                <Input
                type="switch"
                checked={iterador.activo == true?(true):(false)}
                onChange={() => {
                    _cambiarEstadoRecurso(iterador)
                }}
                />
                <Label check>{iterador.activo?"Activo":"Inactivo"}</Label>
              </FormGroup>
            </Fragment>;

            const operaciones = <Fragment>
                <ButtonToggle outline 
                    color="warning"
                    onClick={()=>{
                        setModalActualizar(true);
                        iterador.tipo_recurso.value = iterador.tipo_recurso.id;
                        iterador.tipo_recurso.label = iterador.tipo_recurso.tipo_recurso;
                        setRecurso(iterador);
                    }}>
                    <i className="mdi mdi-pencil-outline"></i>
                </ButtonToggle>
            </Fragment>;

            const n_fila={
                ...iterador,
                modulo: iterador.tipo_recurso.tipo_recurso,
                numero_fila,
                activo_recurso,
                operaciones
            };
            n_filas.push(n_fila);
            numero_fila++;
        }
        setListaRecursos(n_filas);
    }

    const _cambiarEstadoRecurso=async({id: id_recurso})=>{
        const result = await put(PUT_ACTIVO_RECURSO+id_recurso+"/activo");
        Swal.fire({
            title:"Actualizar Recurso",
            icon:"success",
            text:result.message,
            confirmButtonText:"Aceptar"
        });
        _inicializar();
    }

    return(
        <Fragment>
            <div className="page-content">
                <Card body>
                    <CardTitle>
                        <h3>
                            <i className="mdi mdi-form-select"></i>&nbsp;
                            Recursos del sistema
                        </h3>
                    </CardTitle>
                    <div className="m-3">
                        <Row>
                            <Col>
                                <Button outline 
                                color="success"
                                 onClick={()=>setModal(!modal)}
                                >
                                     <i className="bx bx-building"></i>&nbsp;&nbsp;
                                Agregar Recurso
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {loading == false?(
                                    <div style={{overflow:scroll}}>
                                        <BootstrapTable
                                            keyField="numero_fila"
                                            data={listaRecursos}
                                            columns={columns}
                                            wrapperClasses='table-responsive'
                                            pagination={ paginationFactory()}
                                            />
                                    </div>
                                    ):(
                                        <div className="text-center">
                                            <Spinner color="primary" />
                                        </div>
                                )}
                            </Col>
                        </Row>
                    </div>
                </Card>
            </div>
            <ActualizarRecurso
                initialValues={recurso}
                modal={modalActualizar}
                resetFlgs={()=>{
                    setRecurso(null);
                    setModalActualizar(!modalActualizar);
                    _inicializar();
                }}
            />
            <CrearRecurso
                modal={modal}
                resetFlgs={()=>{
                    setModal(!modal);
                    _inicializar();
                }}
            />
        </Fragment>
    );
}

export default RecursosMto;