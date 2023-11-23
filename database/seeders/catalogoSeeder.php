<?php

namespace Database\Seeders;

use App\Models\TblNAptitud;
use App\Models\TblNEmpresa;
use App\Models\TblNEstadoAplicacionOferta;
use App\Models\TblNEstadoOferta;
use App\Models\TblNPuesto;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class catalogoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //APTITUDES
        $aptitud_pivote = new TblNAptitud();
        $aptitud_pivote->aptitud = "Programación";
        $aptitud_pivote->save();

        $aptitud_pivote = new TblNAptitud();
        $aptitud_pivote->aptitud = "Diseño Gráfico";
        $aptitud_pivote->save();

        $aptitud_pivote = new TblNAptitud();
        $aptitud_pivote->aptitud = "Manejo de software específico";
        $aptitud_pivote->save();

        $aptitud_pivote = new TblNAptitud();
        $aptitud_pivote->aptitud = "Desarrollo web";
        $aptitud_pivote->save();

        $aptitud_pivote = new TblNAptitud();
        $aptitud_pivote->aptitud = "Gestión de base de datos";
        $aptitud_pivote->save();

        $aptitud_pivote = new TblNAptitud();
        $aptitud_pivote->aptitud = "Comunicación verbal";
        $aptitud_pivote->save();

        $aptitud_pivote = new TblNAptitud();
        $aptitud_pivote->aptitud = "Redacción";
        $aptitud_pivote->save();

        $aptitud_pivote = new TblNAptitud();
        $aptitud_pivote->aptitud = "Presentaciones";
        $aptitud_pivote->save();

        $aptitud_pivote = new TblNAptitud();
        $aptitud_pivote->aptitud = "Negociación";
        $aptitud_pivote->save();

        $aptitud_pivote = new TblNAptitud();
        $aptitud_pivote->aptitud = "Colaboración en equipo";
        $aptitud_pivote->save();

        $aptitud_pivote = new TblNAptitud();
        $aptitud_pivote->aptitud = "Gestión del tiempo";
        $aptitud_pivote->save();

        $aptitud_pivote = new TblNAptitud();
        $aptitud_pivote->aptitud = "Planificación";
        $aptitud_pivote->save();

        $aptitud_pivote = new TblNAptitud();
        $aptitud_pivote->aptitud = "Organización de eventos";
        $aptitud_pivote->save();

        $aptitud_pivote = new TblNAptitud();
        $aptitud_pivote->aptitud = "Resolución de problemas";
        $aptitud_pivote->save();

        $aptitud_pivote = new TblNAptitud();
        $aptitud_pivote->aptitud = "Toma de decisiones";
        $aptitud_pivote->save();

        $aptitud_pivote = new TblNAptitud();
        $aptitud_pivote->aptitud = "Pensamiento crítico";
        $aptitud_pivote->save();

        $aptitud_pivote = new TblNAptitud();
        $aptitud_pivote->aptitud = "Análisis de datos";
        $aptitud_pivote->save();

        $aptitud_pivote = new TblNAptitud();
        $aptitud_pivote->aptitud = "Investigación";
        $aptitud_pivote->save();

        $aptitud_pivote = new TblNAptitud();
        $aptitud_pivote->aptitud = "Evaluación de riesgos";
        $aptitud_pivote->save();

        $aptitud_pivote = new TblNAptitud();
        $aptitud_pivote->aptitud = "Resolución de problemas complejos";
        $aptitud_pivote->save();

        $aptitud_pivote = new TblNAptitud();
        $aptitud_pivote->aptitud = "Empatía";
        $aptitud_pivote->save();

        $aptitud_pivote = new TblNAptitud();
        $aptitud_pivote->aptitud = "Trabajo en equipo";
        $aptitud_pivote->save();

        $aptitud_pivote = new TblNAptitud();
        $aptitud_pivote->aptitud = "Liderazgo";
        $aptitud_pivote->save();

        $aptitud_pivote = new TblNAptitud();
        $aptitud_pivote->aptitud = "Colaboración";
        $aptitud_pivote->save();

        $aptitud_pivote = new TblNAptitud();
        $aptitud_pivote->aptitud = "Adaptabilidad";
        $aptitud_pivote->save();

        $aptitud_pivote = new TblNAptitud();
        $aptitud_pivote->aptitud = "Idiomas";
        $aptitud_pivote->save();

        $aptitud_pivote = new TblNAptitud();
        $aptitud_pivote->aptitud = "Conciencia cultural";
        $aptitud_pivote->save();

        $aptitud_pivote = new TblNAptitud();
        $aptitud_pivote->aptitud = "Adaptabilidad cultural";
        $aptitud_pivote->save();

        $aptitud_pivote = new TblNAptitud();
        $aptitud_pivote->aptitud = "Desarrollo de estrategias de marketing";
        $aptitud_pivote->save();

        $aptitud_pivote = new TblNAptitud();
        $aptitud_pivote->aptitud = "Ventas y negociación";
        $aptitud_pivote->save();

        $aptitud_pivote = new TblNAptitud();
        $aptitud_pivote->aptitud = "Relaciones con clientes";
        $aptitud_pivote->save();

        $aptitud_pivote = new TblNAptitud();
        $aptitud_pivote->aptitud = "Publicidad";
        $aptitud_pivote->save();

        $aptitud_pivote = new TblNAptitud();
        $aptitud_pivote->aptitud = "Competencia en redes sociales";
        $aptitud_pivote->save();

        $aptitud_pivote = new TblNAptitud();
        $aptitud_pivote->aptitud = "Marketing digital";
        $aptitud_pivote->save();

        $aptitud_pivote = new TblNAptitud();
        $aptitud_pivote->aptitud = "Analisis financiero";
        $aptitud_pivote->save();

        //PUESTOS.
        $puesto_pivote = new TblNPuesto();
        $puesto_pivote->puesto="Enfermero/a";
        $puesto_pivote->descripcion="Proporciona atención médica y apoyo a pacientes.";
        $puesto_pivote->save();

        $puesto_pivote = new TblNPuesto();
        $puesto_pivote->puesto="Gerente de Proyecto";
        $puesto_pivote->descripcion="Encargado de planificar, ejecutar y supervisar proyectos específicos.";
        $puesto_pivote->save();

        $puesto_pivote = new TblNPuesto();
        $puesto_pivote->puesto="Desarrollador de software";
        $puesto_pivote->descripcion="Responsable de programar, probar y mantener aplicaciones informáticas";
        $puesto_pivote->save();

        $puesto_pivote = new TblNPuesto();
        $puesto_pivote->puesto="Analista de Datos";
        $puesto_pivote->descripcion="Se encarga de recopilar, analizar e interpretar grandes conjuntos de datos.";
        $puesto_pivote->save();

        $puesto_pivote = new TblNPuesto();
        $puesto_pivote->puesto="Especialista en Recursos Humanos";
        $puesto_pivote->descripcion="Encargado de las funciones de contratación, capacitación, desarrollo y gestión del personal.";
        $puesto_pivote->save();

        $puesto_pivote = new TblNPuesto();
        $puesto_pivote->puesto="Asistente Administrativo";
        $puesto_pivote->descripcion="Brinda apoyo administrativo y realiza tareas de oficina.";
        $puesto_pivote->save();

        $puesto_pivote = new TblNPuesto();
        $puesto_pivote->puesto="Ingeniero de Redes";
        $puesto_pivote->descripcion="Diseña, implementa y gestiona infraestructuras de red.";
        $puesto_pivote->save();

        $puesto_pivote = new TblNPuesto();
        $puesto_pivote->puesto="Especialista en Marketing Digital";
        $puesto_pivote->descripcion="Desarrolla estrategias de marketing en linea, gestiona campañas y analiza resultados.";
        $puesto_pivote->save();

        $puesto_pivote = new TblNPuesto();
        $puesto_pivote->puesto="Analista Financiero";
        $puesto_pivote->descripcion="Examina datos financieros, realiza proyecciones y ofrece asesoramiento financiero.";
        $puesto_pivote->save();

        $puesto_pivote = new TblNPuesto();
        $puesto_pivote->puesto="Representante de Servicio al Cliente";
        $puesto_pivote->descripcion="Atiende consultas de clientes, resuelve problemas y proporciona soporte.";
        $puesto_pivote->save();

        $puesto_pivote = new TblNPuesto();
        $puesto_pivote->puesto="Técnico de Soporte IT";
        $puesto_pivote->descripcion="Proporciona asistencia técnica para hardware y software.";
        $puesto_pivote->save();

        $puesto_pivote = new TblNPuesto();
        $puesto_pivote->puesto="Diseñador Gráfico";
        $puesto_pivote->descripcion="Crear elementos visuales para publicidad, branding y optros medios.";
        $puesto_pivote->save();

        $puesto_pivote = new TblNPuesto();
        $puesto_pivote->puesto="Ingeniero de Calidad";
        $puesto_pivote->descripcion="Asegura la calidad de productos o procesos a través de prueba y análisis.";
        $puesto_pivote->save();

        $puesto_pivote = new TblNPuesto();
        $puesto_pivote->puesto="Especialista en Desarrollo Organizacional";
        $puesto_pivote->descripcion="Diseña e implementa programas para mejorar la eficiencia y el rendimiento organizacional.";
        $puesto_pivote->save();

        $puesto_pivote = new TblNPuesto();
        $puesto_pivote->puesto="Gestor de Proyectos de Construcción";
        $puesto_pivote->descripcion="Supervisa y coordina proyectos de construcción desde la planficación hasta la finalización.";
        $puesto_pivote->save();

        $puesto_pivote = new TblNPuesto();
        $puesto_pivote->puesto="Especialista en Relaciones Públicas";
        $puesto_pivote->descripcion="Gestiona la comunicación y la imagen de la empresa con el público.";
        $puesto_pivote->save();

        $puesto_pivote = new TblNPuesto();
        $puesto_pivote->puesto="Abogado Corporativo";
        $puesto_pivote->descripcion="Proporciona asesoramiento legal interno a la empresa.";
        $puesto_pivote->save();

        $puesto_pivote = new TblNPuesto();
        $puesto_pivote->puesto="Analista de Seguridad de la Información";
        $puesto_pivote->descripcion="Protege la información digital y desarrolla estrategias de seguridad.";
        $puesto_pivote->save();


        //ESTADO OFERTA.

        $estado_oferta_pivote = new TblNEstadoOferta();
        $estado_oferta_pivote->estado_oferta= "Abierto";
        $estado_oferta_pivote->save();

        $estado_oferta_pivote = new TblNEstadoOferta();
        $estado_oferta_pivote->estado_oferta= "Cerrado";
        $estado_oferta_pivote->save();

        $estado_oferta_pivote = new TblNEstadoOferta();
        $estado_oferta_pivote->estado_oferta= "En Revisión";
        $estado_oferta_pivote->save();

        $estado_oferta_pivote = new TblNEstadoOferta();
        $estado_oferta_pivote->estado_oferta= "Entrevistas";
        $estado_oferta_pivote->save();

        $estado_oferta_pivote = new TblNEstadoOferta();
        $estado_oferta_pivote->estado_oferta= "Selección Final";
        $estado_oferta_pivote->save();

        $estado_oferta_pivote = new TblNEstadoOferta();
        $estado_oferta_pivote->estado_oferta= "Oferta Extendida";
        $estado_oferta_pivote->save();

        $estado_oferta_pivote = new TblNEstadoOferta();
        $estado_oferta_pivote->estado_oferta= "Contratado";
        $estado_oferta_pivote->save();

        $estado_oferta_pivote = new TblNEstadoOferta();
        $estado_oferta_pivote->estado_oferta= "En Espera";
        $estado_oferta_pivote->save();

        $estado_oferta_pivote = new TblNEstadoOferta();
        $estado_oferta_pivote->estado_oferta= "Cancelado";
        $estado_oferta_pivote->save();

        $estado_oferta_pivote = new TblNEstadoOferta();
        $estado_oferta_pivote->estado_oferta= "En Proceso";
        $estado_oferta_pivote->save();

        //EMPRESA
        $empresa_pivote = new TblNEmpresa();
        $empresa_pivote->nombre_empresa="BambooHR";
        $empresa_pivote->save();

        $empresa_pivote = new TblNEmpresa();
        $empresa_pivote->nombre_empresa="Workday Recruiting";
        $empresa_pivote->save();

        $empresa_pivote = new TblNEmpresa();
        $empresa_pivote->nombre_empresa="Greenhouse";
        $empresa_pivote->save();

        $empresa_pivote = new TblNEmpresa();
        $empresa_pivote->nombre_empresa="Lever";
        $empresa_pivote->save();

        $empresa_pivote = new TblNEmpresa();
        $empresa_pivote->nombre_empresa="iCIMS";
        $empresa_pivote->save();

        $empresa_pivote = new TblNEmpresa();
        $empresa_pivote->nombre_empresa="Jobvite";
        $empresa_pivote->save();

        $empresa_pivote = new TblNEmpresa();
        $empresa_pivote->nombre_empresa="SmartRecruiters";
        $empresa_pivote->save();

        $empresa_pivote = new TblNEmpresa();
        $empresa_pivote->nombre_empresa="ApllicantPro";
        $empresa_pivote->save();

        $empresa_pivote = new TblNEmpresa();
        $empresa_pivote->nombre_empresa="JazzHR";
        $empresa_pivote->save();

        $empresa_pivote = new TblNEmpresa();
        $empresa_pivote->nombre_empresa="ADP Recruiting Management";
        $empresa_pivote->save();

        $empresa_pivote = new TblNEmpresa();
        $empresa_pivote->nombre_empresa="UltiPro";
        $empresa_pivote->save();

        $empresa_pivote = new TblNEmpresa();
        $empresa_pivote->nombre_empresa="CATS ATS";
        $empresa_pivote->save();

        $empresa_pivote = new TblNEmpresa();
        $empresa_pivote->nombre_empresa="JobScore";
        $empresa_pivote->save();

        $empresa_pivote = new TblNEmpresa();
        $empresa_pivote->nombre_empresa="Zoho Recruit";
        $empresa_pivote->save();

        $empresa_pivote = new TblNEmpresa();
        $empresa_pivote->nombre_empresa="Kenexa";
        $empresa_pivote->save();


        //ESTADO APLICACION OFERTA.
        $estado_aplicacion_oferta = new TblNEstadoAplicacionOferta();
        $estado_aplicacion_oferta->estado_aplicacion_oferta="Enviada";
        $estado_aplicacion_oferta->save();

        $estado_aplicacion_oferta = new TblNEstadoAplicacionOferta();
        $estado_aplicacion_oferta->estado_aplicacion_oferta="En Revisión";
        $estado_aplicacion_oferta->save();

        $estado_aplicacion_oferta = new TblNEstadoAplicacionOferta();
        $estado_aplicacion_oferta->estado_aplicacion_oferta="Elegible para Entrevista";
        $estado_aplicacion_oferta->save();

        $estado_aplicacion_oferta = new TblNEstadoAplicacionOferta();
        $estado_aplicacion_oferta->estado_aplicacion_oferta="Entrevista programada";
        $estado_aplicacion_oferta->save();

        $estado_aplicacion_oferta = new TblNEstadoAplicacionOferta();
        $estado_aplicacion_oferta->estado_aplicacion_oferta="Entrevista realizada";
        $estado_aplicacion_oferta->save();

        $estado_aplicacion_oferta = new TblNEstadoAplicacionOferta();
        $estado_aplicacion_oferta->estado_aplicacion_oferta="Prueba de Habilidades";
        $estado_aplicacion_oferta->save();

        $estado_aplicacion_oferta = new TblNEstadoAplicacionOferta();
        $estado_aplicacion_oferta->estado_aplicacion_oferta="Contratado";
        $estado_aplicacion_oferta->save();

        $estado_aplicacion_oferta = new TblNEstadoAplicacionOferta();
        $estado_aplicacion_oferta->estado_aplicacion_oferta="No Seleccionado";
        $estado_aplicacion_oferta->save();

        $estado_aplicacion_oferta = new TblNEstadoAplicacionOferta();
        $estado_aplicacion_oferta->estado_aplicacion_oferta="Cancelado por la empresa";
        $estado_aplicacion_oferta->save();

        $estado_aplicacion_oferta = new TblNEstadoAplicacionOferta();
        $estado_aplicacion_oferta->estado_aplicacion_oferta="Retirado por el candidato";
        $estado_aplicacion_oferta->save();
















    }
}
