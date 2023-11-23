<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'email'=>'required|email|unique:tbl_n_usuario|max:50',
            'password'=>'required|min:8',
            'carnet'=>'required|unique:tbl_n_estudiante|min:7|max:7',
            'primer_nombre'=>'required|max:20',
            'segundo_nombre'=>'max:20',
            'primer_apellido'=>'required|max:20',
            'segundo_apellido'=>'max:20',
            'dui'=>'min:10|MAX:10',
        ];
    }

    public function messages(){
        return[
            'email.required' => 'El correo electrónico es requerido',
            'email.email' => 'El formato de correo no es valido',
            'email.unique' =>'El correo ya ha sido registrado en el sistema',
            'password.required' => 'La contraseña es requerida',
            'password.min'=>'La contraseña debe tener mínimo 8 caracteres',
            'primer_nombre.required'=>'El primer nombre es requerido',
            'primer_apellido.required'=>'El primer apellido es requerido',
            'carnet.required'=>'El carnét ya ha sido registrado en el sistema'
        ];
    }
}
