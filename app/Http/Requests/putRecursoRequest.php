<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class putRecursoRequest extends FormRequest
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
            'nombre'=>'required|max:30',
            'ruta'=>'required|max:60'
        ];
    }
    public function messages(){
        return[
            'nombre.required'=>'El nombre es requerido',
            'nombre.max'=>'El nombre debe de tener máximo 30 caracteres.',
            'ruta.required'=>'La ruta es requerida',
            'ruta.max'=>'La ruta debe tener máximo 60 caracteres.'
        ];
    }
}
