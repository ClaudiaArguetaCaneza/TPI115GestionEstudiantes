<?php

use App\Http\Controllers\AdministradorController;
use App\Http\Controllers\AsistenciaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// use App\Http\Controllers\SedeController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Estudiante\CurriculumController;
use App\Http\Controllers\Estudiante\EstudianteController;
use App\Http\Controllers\OfertaController;

// use App\Http\Controllers\FacilitadorController;
// use App\Http\Controllers\JornadaController;
// use App\Http\Controllers\RecursoController;
// use App\Http\Controllers\ReporteController;
// use App\Http\Controllers\RepresentanteController;
// use App\Http\Controllers\RolController;
// use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Rutas de autenticación
Route::prefix('auth')->group(function(){
    Route::post('/register',[AuthController::class,'register']);
    Route::post('/login',[AuthController::class,'login']);
    Route::post('/confirmacion_cuenta',[AuthController::class,'confirmarCuenta']);
    Route::middleware('jwt-verify')->get('/permisos',[AuthController::class,'userRoutes']);
});

Route::prefix('oferta')->group(function(){
    Route::get('/obtener_ofertas',[OfertaController::class,'obtenerOfertas']);
});

Route::middleware('jwt-verify')->group(function(){
    Route::prefix('estudiante')->group(function(){
        Route::get('/aplicacion_oferta',[EstudianteController::class,'indexAplicacionOferta']);
        Route::post('/aplicacion_oferta',[EstudianteController::class,'postAplicacionOferta']);
        Route::get('/aplicacion_oferta/:id_aplicacion_oferta',[EstudianteController::class,'getAplicacionOferta']);
    });

    Route::prefix('curriculum')->group(function(){
        Route::get('/obtener_curriculum',[CurriculumController::class, 'getCurriculumEstudiante']);
        Route::get('/inicializar_experiencia_laboral',[CurriculumController::class,'getInicializarExperienciaLaboral']);
        Route::post('/guardar_imagen_curriculum',[CurriculumController::class,'postImagenCurriculumEstudiante']);
        Route::post('/guardar_documento_curriculum',[CurriculumController::class,'postDocumentoCurriculumEstudiante']);

        Route::get('/experiencia_laboral',[CurriculumController::class,'getExperienciaLaboral']);
        Route::post('/experiencia_laboral',[CurriculumController::class,'postExperienciaLaboral']);
        Route::put('/experiencia_laboral/:id_experiencia_laboral',[CurriculumController::class,'updateExperienciaLaboral']);
        Route::delete('/experiencia_laboral/:id_experiencia_laboral',[CurriculumController::class,'deleteExperienciaLaboral']);

        Route::get('/experiencia_academica',[CurriculumController::class,'getExperienciaAcademica']);
        Route::post('/experiencia_academica',[CurriculumController::class,'postExperienciaAcademica']);
        Route::put('/experiencia_academica:/id_experiencia_academica',[CurriculumController::class,'putExperienciaAcademica']);
        Route::delete('/experiencia_academica:/id_experiencia_academica',[CurriculumController::class,'deleteExperienciaAcademica']);

        Route::get('/inicializar_aptitud_curriculum',[CurriculumController::class,'inicializarAptitudCurriculum']);
        Route::get('/aptitud_curriculum',[CurriculumController::class,'getAptitudCurriculum']);
        Route::post('/aptitud_curriculum',[CurriculumController::class,'postAptitudCurriculum']);
        Route::put('/aptitud_curriculum/:id_aptitud_curriculum',[CurriculumController::class,'putAptitudCurriculum']);
        Route::delete('/aptitud_curriculum/:id_aptitud_curriculum',[CurriculumController::class,'deleteAptitudCurriculum']);


    });



});

//Rutas protegidas
// Route::middleware('jwt-verify')->get('/users', [UserController::class,'index']);
// Route::middleware('jwt-verify')->group(function(){

//     Route::prefix('facilitador')->group(function(){
//         Route::get('/',[FacilitadorController::class,'index']);
//         Route::post('/',[FacilitadorController::class,'store']);
//         Route::put('/{id_facilitador}',[FacilitadorController::class,'update']);
//         Route::put('/{id_facilitador}/activo',[FacilitadorController::class,'activoFacilitador']);
//         Route::get('/inicializar',[FacilitadorController::class,'inicializarFacilitador']);

//         Route::prefix('/jornada')->group(function(){
//             Route::get('/ver/{id_jornada}',[FacilitadorController::class,'obtenerJornada']);
//             Route::put('/ver/{id_jornada}',[FacilitadorController::class,'aprobarEstadoFacilitadorJornada']);
//             Route::get('/activas',[FacilitadorController::class,'jornadasActivasFacilitador']);
//             Route::get('/inicializar',[FacilitadorController::class,'inicializarCrearJornadas']);
//             Route::post('/obtener_facilitador_dui',[FacilitadorController::class,'obtenerFacilitadorByDui']);
//             Route::post('/store_jornada',[FacilitadorController::class,'storeJornada']);
//             Route::get('/total_jornada',[FacilitadorController::class,'getTotalJornadasFacilitador']);
//         });
//     });
//     Route::prefix('sede')->group(function(){
//         Route::get('/',[SedeController::class,'index']);
//         Route::post('/',[SedeController::class,'store']);
//         Route::put('/{id_sede}/activo',[SedeController::class, 'activoSede']);
//         Route::get('/inicializar',[SedeController::class,'inicializarSede']);
//     });
//     Route::prefix('jornada')->group(function(){
//         Route::get('/jornadas_sede_temporal', [JornadaController::class,'getJornadasSedeTemporal']);
//         Route::put('/jornada_st_aprobar',[JornadaController::class,'putAprobacionJornadaSedeTemporal']);
//     });
//     Route::prefix('recurso')->group(function(){
//         Route::get('/',[RecursoController::class,'get']);
//         Route::get('/inicializar',[RecursoController::class,'inicializarRecurso']);
//         Route::post('/',[RecursoController::class,'post']);
//         Route::put('/{id_recurso}',[RecursoController::class,'put']);
//         Route::put('/{id_recurso}/activo',[RecursoController::class,'putRecursoActivo']);

//     });
//     Route::prefix('rol')->group(function(){
//         Route::get('/', [RolController::class,'index']);
//         Route::post('/',[RolController::class,'post']);
//         Route::get('/inicializar',[RolController::class,'inicializar']);
//         Route::put('/{id_rol}',[RolController::class,'put']);
//         Route::put('/{id_rol}/activo',[RolController::class,'putActivo']);
//     });

//     Route::prefix('reporte')->group(function(){
//         Route::get('/inicializar',[ReporteController::class,'getInicializar']);
//         Route::post('/asistentes_fecha',[ReporteController::class,'postGenerarReporteAsistentes']);
//     });
//     Route::prefix('administrador')->group(function(){
//         Route::get('/',[AdministradorController::class,'index']);
//         Route::post('/',[AdministradorController::class,'store']);
//         Route::put('/{id_administrador}',[AdministradorController::class,'update']);
//         Route::put('/{id_administrador}/activo',[AdministradorController::class,'updateActivo']);
//         Route::get('/inicializar',[AdministradorController::class,'inicializar']);
//     });
//     Route::prefix('asistencia')->group(function(){
//         Route::get('/jornadas_dia',[AsistenciaController::class,'indexJornadas']);
//         Route::post('/registrar_asistencia',[AsistenciaController::class,'obtenerAsistenciaJornada']);
//         Route::post('/consulta_asistentes',[AsistenciaController::class,'obtenerConsultaAsistentes']);
//     });
//     Route::prefix('representante')->group(function(){
//         Route::get('/', [RepresentanteController::class,'index']);
//         Route::post('/',[RepresentanteController::class,'store']);
//         Route::put('/{id_representante}',[RepresentanteController::class,'update']);
//         Route::get('/inicializar',[RepresentanteController::class,'inicializar']);
//         Route::put('/{id_representante}/activo',[RepresentanteController::class,'putActivo']);
//     });
// });
