import React, { Fragment, useState, useEffect, useMemo } from 'react'
import{
    Card,
    CardTitle,
    Row,Col,
    Spinner,
    Nav,NavItem, NavLink,
    TabContent,TabPane,
    Badge, ButtonToggle, Modal,
    Label,Button
} from 'reactstrap';
import classnames from "classnames";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { GET_OFERTAS, POST_OFERTAS, GET_APLICACIONES_OFERTA } from '../../helpers/ofertas_aplicaciones/helpers';
import useApiHelper from '../../hooks/useApiHelper';
import Swal from 'sweetalert2';
import { Input } from 'reactstrap';
import './css/styles.css'

export const OfertasAplicaciones = () => {
    document.title="Ofertas de Empleo -  Bolsa de trabajo."

    const [activeTab, setActiveTab] = useState("1");
    const [loadingOfertas, setLoadingOfertas] = useState(false);
    const [ofertas, setOfertas] = useState([]);
    const [ofertas_filas, setOfertas_filas] = useState([]);
    const [modalAplicar, setModalAplicar] = useState(false);
    const [ofertaAplicar, setOfertaAplicar] = useState(null);

    const [aplicaciones, setAplicaciones] = useState([]);
    const [filasAplicaciones, setFilasAplicaciones] = useState([]);
    const [loadingAplicaciones, setLoadingAplicaciones] = useState(false);
    const {post,get} = useApiHelper();

    const [searchTerm, setSearchTerm] = useState("");

    const columns = useMemo(
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
                dataField:"nombre_empresa",
                text:"Empresa",
                headerStyle: () => {
                    return { width: "10%",textAlign:"center", fontSize:"12px" };
                },
                style:{
                    fontSize:"12px",
                    textAlign:"center"
                }
            },
            {
                dataField:"nombre_puesto",
                text:"Puesto",
                headerStyle: () => {
                    return { width: "10%",textAlign:"center", fontSize:"12px" };
                },
                style:{
                    fontSize:"12px",
                    textAlign:"center"
                }
            },
            {
                dataField:"n_estado_oferta",
                text:"Estado Oferta",
                headerStyle: () => {
                    return { width: "10%",textAlign:"center", fontSize:"12px" };
                },
                style:{
                    fontSize:"12px",
                    textAlign:"center"
                }
            },
            {
                dataField:"fecha_inicio",
                text:"Fecha Inicio",
                headerStyle: () => {
                    return { width: "10%",textAlign:"center", fontSize:"12px" };
                },
                style:{
                    fontSize:"12px",
                    textAlign:"center"
                }
            },
            {
                dataField:"fecha_finalizacion",
                text:"Fecha Finalización",
                headerStyle: () => {
                    return { width: "10%",textAlign:"center", fontSize:"12px" };
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

    const columnas_aplicaciones=useMemo(
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
                dataField:"nombre_empresa",
                text:"Empresa",
                headerStyle: () => {
                    return { width: "10%",textAlign:"center", fontSize:"12px" };
                },
                style:{
                    fontSize:"12px",
                    textAlign:"center"
                }
            },
            {
                dataField:"nombre_puesto",
                text:"Puesto",
                headerStyle: () => {
                    return { width: "10%",textAlign:"center", fontSize:"12px" };
                },
                style:{
                    fontSize:"12px",
                    textAlign:"center"
                }
            },
            {
                dataField:"estado_aplicacion",
                text:"Estado",
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

    useEffect(() => {
        if (ofertas != null) {
          _formarFilasOfertas();
        }
      }, [ofertas, searchTerm]);

    useEffect(()=>{
        console.log("aplicaciones: ",aplicaciones);
        if(aplicaciones != null){
            _formarFilasAplicaciones();
        }
    },[aplicaciones, searchTerm]);

    const _toggleTab=(tab_item)=>{
        setActiveTab(tab_item);
        if(tab_item == "2"){
            _inicializar_aplicaciones()
        }else{
            _inicializarOfertas()
        }
    }

    const _inicializarOfertas=async()=>{
        try{
            setLoadingOfertas(true);
            const result = await get(GET_OFERTAS);

            const {ofertas} = result;
            setOfertas(ofertas);
            setLoadingOfertas(false);
        }catch(e){
            console.log("Error: ",e);
            Swal.fire({
                title:"Error al obtener las ofertas",
                icon:"error",
                text:"Ha ocurrido un error al obtener las ofertas.",
                confirmButtonText:"Aceptar"
            })
        }
    }

    const _inicializar_aplicaciones =async()=>{
        try{

            setLoadingAplicaciones(true);
            const result = await get(GET_APLICACIONES_OFERTA);
            console.log({result});
            setAplicaciones(result.lista_aplicaciones);
            
            setLoadingAplicaciones(false);

        }catch(e){
            console.log("Error: ",e);
            Swal.fire({
                title:"Error al obtener las aplicaciones",
                icon:"error",
                text:"Ha ocurrido un error al obtener las aplicaciones.",
                confirmButtonText:"Aceptar"
            })
        }
    }

    const _formarFilasOfertas = () => {
        const n_filas = [];
        let n_fila = 1;
      
        for (const oferta of ofertas) {
              const fecha_inicio = new Date(oferta?.fecha_inicio_oferta);
            const fecha_finalizacion = new Date(oferta?.fecha_finalizacion_oferta);
            const operaciones=<Fragment>
                <ButtonToggle 
                outline 
                color="success"
                legend="aplicar"
                onClick={()=>{
                    setOfertaAplicar(oferta);
                    setModalAplicar(true);
                }}>
                    <i className="mdi mdi-check-outline"></i>
                </ButtonToggle>
            </Fragment>

          n_filas.push({
            numero_fila: n_fila,
                nombre_empresa: oferta?.empresa_ctg?.nombre_empresa,
                nombre_puesto: oferta?.puesto_ctg?.puesto,
                n_estado_oferta: oferta?.estado_oferta?.estado_oferta,
                fecha_inicio: fecha_inicio.getDate()+"-"+fecha_inicio.getMonth()+"-"+fecha_inicio.getFullYear(),
                fecha_finalizacion: fecha_finalizacion.getDate()+"-"+fecha_finalizacion.getMonth()+"-"+fecha_finalizacion.getFullYear(),
                operaciones
          });
      
          n_fila++;
        }
      
        // Filtrar ofertas por el término de búsqueda
        const ofertasFiltradas = n_filas.filter((oferta) =>
          oferta.nombre_puesto.toLowerCase().includes(searchTerm.toLowerCase())||
          oferta.nombre_empresa.toLowerCase().includes(searchTerm.toLowerCase())
        );
      
        setOfertas_filas(ofertasFiltradas);
      };

      const _formarFilasAplicaciones=()=>{
        const n_filas=[];
        let numero_fila = 1;

        for(const iterador of aplicaciones){
            n_filas.push({
                numero_fila,
                nombre_empresa: iterador?.oferta?.empresa_ctg?.nombre_empresa,
                nombre_puesto: iterador?.oferta?.puesto_ctg?.puesto,
                estado_aplicacion: iterador?.estado_aplicacion_oferta?.estado_aplicacion_oferta
            });
          numero_fila++;

        }
// Filtrar ofertas por el término de búsqueda
        const aplicacionesFiltradas = n_filas.filter((iterador) =>
          iterador.nombre_empresa.toLowerCase().includes(searchTerm.toLowerCase())||
          iterador.nombre_puesto.toLowerCase().includes(searchTerm.toLowerCase())
        );
      

        setFilasAplicaciones(aplicacionesFiltradas);
    }


    const _aplicarOferta=async()=>{
        try{
            Swal.fire({
                title:"Aplicar Oferta",
                icon:"warning",
                text:"¿Desea aplicar a esta oferta de empleo?",
                showCancelButton:true,
                cancelButtonText:"Cancelar",
                confirmButtonText:"Aceptar"
            }).then(async respuesta=>{
                if(respuesta.isConfirmed){
                    try{
                        const result = await post(POST_OFERTAS, {id_oferta:ofertaAplicar?.id});
                        Swal.fire({
                            title:"Aplicar Oferta",
                            icon: result.success==true?("success"):("error"),
                            text:result.message,
                            confirmButtonText:"Aceptar"
                        });
                        setModalAplicar(false);
                        setOfertaAplicar(null);
                        _inicializarOfertas();

                    }catch(e){
                        console.log("Error: ",e);
                        Swal.fire({
                            title:"Aplicar a Oferta",
                            icon:"error",
                            text:"Ha ocurrido un error al aplicar a la oferta",
                            confirmButtonText:"Aceptar"
                        })
                    }
                }
            })

        }catch(e){
            console.log("Error: ",e);
            Swal.fire({
                title:"Aplicar a Oferta",
                icon:"error",
                text:"Ha ocurrido un error al aplicar a la oferta",
                confirmButtonText:"Aceptar"
            })
        }
    }
    return(
        <Fragment>
            <div className="page-content">
                <Card body>
                    <CardTitle>
                        <h3>
                            <i className="mdi mdi-briefcase-outline"></i>&nbsp;
                            Ofertas de Empleo
                        </h3>
                    </CardTitle>
                    <div className="buscador">
                    <i className="mdi mdi-magnify icono-lupa"></i>
                    <Input
                        type="text"
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    </div>
                    <br/> 
                    <Row>     
                        <Col>
                            <div>
                                <Nav tabs className="nav-tabs-custom nav-justified">
                                    <NavItem>
                                        <NavLink
                                        style={{cursor: 'pointer'}}
                                        className={classnames({
                                            active: activeTab === "1",
                                        })}
                                        onClick={()=>{
                                            _toggleTab("1");
                                        }}>
                                            <i className="mdi mdi-briefcase-outline"></i>&nbsp;
                                            <span className="d-none d-sm-block">Ofertas Disponibles</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                        style={{cursor: 'pointer'}}
                                        className={classnames({
                                            active: activeTab === "2",
                                        })}
                                         onClick={()=>{
                                        _toggleTab("2");
                                    }}>
                                            <i className="mdi mdi-briefcase"></i>&nbsp;
                                            <span className="d-none d-sm-block">Aplicaciones a Ofertas</span>
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent
                                    activeTab={activeTab}
                                    className='p-3 text-muted'>
                                        <TabPane tabId='1'>
                                            <Row>
                                                <Col>
                                                    {loadingOfertas == false?(
                                                        <div style={{overflow:scroll}}>
                                                            <BootstrapTable
                                                            keyField='numero_fila'
                                                            data={ofertas_filas}
                                                            columns={columns}
                                                            pagination={ paginationFactory() }
                                                            wrapperClasses="table-responsive"
                                                             />
                                                        </div>
                                                    ):(
                                                        <div className="text-center">
                                                            <Spinner color="primary" />
                                                        </div>
                                                    )}
                                                </Col>
                                            </Row>
                                        </TabPane>
                                        <TabPane tabId='2'>
                                                {loadingAplicaciones == false?(
                                                        <div style={{overflow:scroll}}>
                                                            <BootstrapTable
                                                            keyField='numero_fila'
                                                            data={filasAplicaciones}
                                                            columns={columnas_aplicaciones}
                                                            pagination={ paginationFactory() }
                                                            wrapperClasses="table-responsive"
                                                             />
                                                        </div>
                                                    ):(
                                                        <div className="text-center">
                                                            <Spinner color="primary" />
                                                        </div>
                                                    )}
                                        </TabPane>
                                </TabContent>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </div>

            <Modal
            size="lg"
            isOpen={modalAplicar}
            toggle={()=>{
                setModalAplicar(false);
            }}>
                <div className="modal-header">
                    <h4 className="modal-header">
                        Aplicar Oferta Laboral
                    </h4>
                    <button
                        onClick={()=>{
                            setModalAplicar(false)
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
                        <Row>
                            <Col>
                                <Label>Empresa: </Label> <br />
                                <b>{ofertaAplicar?.empresa_ctg?.nombre_empresa}</b>
                            </Col>
                            <Col>
                                <Label>Puesto: </Label> <br />
                                <b>{ofertaAplicar?.puesto_ctg?.puesto}</b>
                            </Col>
                        </Row>
                       <div className="mt-3 mb-3">
                       <Row>
                           
                           <Col>
                               <Label>Fecha Inicio:</Label> <br />
                               <b>{
                               new Date(ofertaAplicar?.fecha_inicio_oferta).getDate()+" - "+ new Date(ofertaAplicar?.fecha_inicio_oferta).getMonth()+" - "+ new Date(ofertaAplicar?.fecha_inicio_oferta).getFullYear()
                               }</b>
                           </Col>
                           <Col>
                               <Label>Fecha Finalizacion: </Label> <br />
                               <b>{
                               new Date(ofertaAplicar?.fecha_finalizacion_oferta).getDate()+" - "+ new Date(ofertaAplicar?.fecha_finalizacion_oferta).getMonth()+" - "+ new Date(ofertaAplicar?.fecha_finalizacion_oferta).getFullYear()
                               }</b>
                           </Col>
                       </Row>
                       </div>
                        <Row>
                            <Col md={6}>
                                <Label>Estado: </Label> <br />
                                <b>{ofertaAplicar?.estado_oferta?.estado_oferta}</b>
                            </Col>
                        </Row>

                       <div className="mt-5 mb-2">
                       <Row>
                            <Col>
                               <h4 style={{textDecoration:"underline"}}> Requisitos Aspirante </h4>
                            </Col>
                        </Row>
                       </div>
                       
                        <div className="mt-4 mb-2" style={{height: "300px", overflowY: "auto", overflowX:"hidden" }}>
                       
                        <Row>
                            <Col>
                               {ofertaAplicar?.requisitos_aspirante.map(i=>(
                                <Fragment>
                                    <Card body className="custom-card">
                                        <Row><Col><Label>Requisito: <b>{i.requisito}</b></Label></Col></Row>
                                        <Row><Col md={8}><Label>{i.descripcion}</Label></Col></Row>
                                    </Card>
                                </Fragment>
                               ))}
                            </Col>
                        </Row>
                        </div>

                        <div className="mt-5 mb-2">
                       <Row>
                            <Col>
                               <h4 style={{textDecoration:"underline"}}> Responsabilidades Puesto </h4>
                            </Col>
                        </Row>
                       </div>
                       
                        <div className="mt-4 mb-2" style={{height: "300px", overflowY: "auto", overflowX:"hidden"}}>
                       
                        <Row>
                            <Col>
                               {ofertaAplicar?.responsabilidades_puesto.map(i=>(
                                <Fragment>
                                    <Card body className="custom-card">
                                        <Row><Col md={8}><Label>{i.responsabilidad_puesto}</Label></Col></Row>
                                    </Card>
                                </Fragment>
                               ))}
                            </Col>
                        </Row>
                        </div>

                        <div className="mt-3 d-grid">
                            <Button outline
                            color="success"
                            className='btn-block'
                            type="button"
                            onClick={()=>{
                                _aplicarOferta();
                            }}>
                                <div className="fas fa-plus"></div>&nbsp; Aplicar
                            </Button>
                        </div>
                    </Card>
                </div>

            </Modal>
        </Fragment>
    )
}

export default OfertasAplicaciones;
