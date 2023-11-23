<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
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
            'email'=>'required|email|max:50',
            'password'=>'min:8'
        ];
    }

    public function messages()
    {
        return [
            'email.required' => 'El correo electrónico es requerido',
            'email.email' => 'El formato de correo no es valido',
            'password.required' => 'La contraseña es requerida',
            'password.min'=>'La contraseña debe tener mínimo 8 caracteres'
        ];
    }
}
