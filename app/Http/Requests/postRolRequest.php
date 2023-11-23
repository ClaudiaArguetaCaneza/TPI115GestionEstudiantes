<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class postRolRequest extends FormRequest
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
            'nombre'=>'required|max:25',
            'lista_permisos'=>'required'
        ];
    }
    public function messages()
    {
        return [
            'nombre.required'=>'El nombre es requerido.',
            'nombre.max'=>'El nombre debe tener máximo 25 caracteres.',
            'lista_permisos.required'=>'La lista de permisos es requerida.'
        ];
    }
}
