<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Mail\CorreoConfirmacionMail;
use App\Mail\EstudianteNewAccountMail;
use App\Models\TblNEstudiante;
use App\Models\TblNRol;
use App\Models\TblNTipoRecurso;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Str;
use Validator;

class AuthController extends Controller
{
    /**
     * Registra un nuevo usuario en el sistema.
     *
     * @return \Illuminate\Http\Response
     */
    public function register(RegisterRequest $request){

        ['email'=>$email,
        'password'=>$password,
        'carnet'=>$carnet,
        'primer_nombre'=>$primer_nombre,
        'segundo_nombre'=>$segundo_nombre,
        'primer_apellido'=>$primer_apellido,
        'segundo_apellido'=>$segundo_apellido,
        'dui'=>$dui] = $request->all();

      try {
        //code...
        DB::beginTransaction();
        $estudiante = new TblNEstudiante();
        $estudiante->primer_nombre =$primer_nombre;
        $estudiante->segundo_nombre=$segundo_nombre;
        $estudiante->primer_apellido=$primer_apellido;
        $estudiante->segundo_apellido=$segundo_apellido;
        $estudiante->dui = $dui;
        $estudiante->save();

        $usuario = new User();
        $usuario->nombre = $primer_nombre." ".$primer_apellido;
        $usuario->email = $email;
        $usuario->password= $password;
        $usuario->confirmed = false;
        $confirmation_code = Str::random(25);
        $usuario->confirmation_code = $confirmation_code;
        $usuario->save();
        DB::commit();

        //ENVIO DE CORREO CON CONFIRMATION CODE
        Mail::to($email)->send(new CorreoConfirmacionMail($confirmation_code, $usuario->nombre));

        return response()->json([
            'success'=>true,
            'message'=>'Usuario Creado. Su código de confirmación fue enviado a su correo electrónico.'
        ]);

      } catch (\Exception $e) {
        $error = $e->getMessage();
        DB::rollBack();
        return response()->json([
            'success'=>false,
            'message'=>'Ocurrio un error al crear la cuenta',
            'error'=>$error,
        ]);

      }
    }// register END
    /**
     * Inicia sesión en el sistema para un usuario registrado y activo.
     *
     * @return \Illuminate\Http\Response
     */
    public function login(LoginRequest $request){
        $request->validated();
        $credentials = $request->only('email','password');
        $credentials['activo']=true;
        if(!$token = JWTAuth::attempt($credentials)){
            return response()->json([
                'message'=>'Credenciales Invalidas'
            ],400);
        }
        $usuario = JWTAuth::user();
        // $roles = $usuario->roles;
        // $rol = TblNRol::find($roles[0]->fk_rol);

        // $permisos =$rol->permisos_activos;
        // $ruta = $permisos[0]->recurso->ruta;



        return response()->json([
            'token'=>$token,
            // 'ruta'=>$ruta
        ],200);
    }//login END
    /**
     * Inicia sesión en el sistema para un usuario registrado y activo.
     *
     * @return \Illuminate\Http\Response
     */
    public function userRoutes(Request $request){
        $usuario = User::find($request->get('usuario_tk'));
        $modulos = TblNTipoRecurso::all();

        $lista_modulos=[];
        foreach($modulos as $modulo){
            $roles = $usuario->roles;
            $recursos = [];
            foreach($roles as $rol){
                $rol = TblNRol::find($rol->fk_rol);
                $permisos = $rol->permisos_activos;
                foreach($permisos as $permiso){
                    $recurso = $permiso->recurso;
                    if(in_array($recurso, $recursos) == false and $recurso->fk_tipo_recurso == $modulo->id){
                        array_push($recursos, $recurso);
                    }//if
                }//permisos.
            }//roles
            if(sizeof($recursos)>0){
                array_push($lista_modulos,[
                    'id'=>$modulo->id,
                    'tipo_recurso'=>$modulo->tipo_recurso,
                    'recursos'=>$recursos
                ]);
            }
        }//modulos
        return response()->json([
            'permisos'=>$lista_modulos,
            'usuario'=>$usuario->persona->nombres." ".$usuario->persona->apellidos
        ],200);

    } // userRoutes END.
    /**
     * Confirma una cuenta de usuario en el sistema.
     *
     * @return \Illuminate\Http\Response
     */
    public function confirmarCuenta(Request $request){
        try{
            $confirmation_code = $request->codigo_confirmacion;
            $usuario = User::where('confirmation_code',$confirmation_code)->where('confirmed', false)->first();
            if($usuario != null){
                $usuario->confirmed=true;
                $usuario->confirmation_code=null;
                $password = trim($usuario->password);
                $usuario->password = Hash::make($password);
                $usuario->save();
                $correo = trim($usuario->email);
                $enviado = Mail::to($correo)->send( new EstudianteNewAccountMail($password, $usuario->nombre, $usuario->email));
                if($enviado){
                    return response()->json([
                        'success'=>true,
                        'correo'=>$correo,
                        'message'=>'Usuario confirmado. Sus credenciales fueron enviadas a su correo electrónico.'
                    ]);
                }else{
                    return response()->json([
                        'success'=>false,
                        'message'=> 'Ocurrio un error al enviar las credenciales.'
                    ]);
                }
            }
            return response()->json([
                'success'=>false,
                'message'=>'El código de confirmación no corresponde a ningun usuario',
            ]);
        }catch(\Exception $e){
            $error = $e->getMessage();
            return response()->json([
                'success'=>false,
                'message'=>'Ocurrio un error al crear la cuenta',
                'error'=>$error,
            ]);
        }
    }


}

