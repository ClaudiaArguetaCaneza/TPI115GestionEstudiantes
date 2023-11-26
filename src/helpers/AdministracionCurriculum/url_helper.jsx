const prefix="/curriculum";
export const GET_CURRICULUM = prefix+"/obtener_curriculum";
export const PUT_ACTUALIZAR_DATOS_ESTUDIANTE=prefix+"/actualizar_datos_estudiante";
export const GET_INICIALIZAR_EXPERIENCIA_LABORAL = prefix+"/inicializar_experiencia_laboral";
export const POST_EXPERIENCIA_LABORAL = prefix+"/experiencia_laboral";
export const DELETE_EXPERIENCIA_LABORAL= (parametro)=>{
    return prefix+"/experiencia_laboral/"+parametro;
}

export const POST_EXPERIENCIA_ACADEMICA=prefix+"/experiencia_academica";

export const DELETE_EXPERIENCIA_ACADEMICA =parametro=>{
    return prefix+"/experiencia_academica/"+parametro;
}

export const GET_INICIALIZAR_APTITUD_CURRICULUM= prefix+"/inicializar_aptitud_curriculum";
export const POST_APTITUD_CURRICULUM = prefix+"/aptitud_curriculum";

export const POST_GUARDAR_DOCUMENTO_CURRICULUM = prefix+"/guardar_documento_curriculum";

export const POST_GUARDAR_IMAGEN=prefix+"/guardar_imagen_curriculum";