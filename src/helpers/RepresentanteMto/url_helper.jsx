const prefix="representante";
export const GET_REPRESENTANTE_INDEX=prefix+"/";
export const PUT_REPRESENTANTE_ACTIVO=(parameter)=>{
    return prefix+"/"+parameter+"/activo";
}
export const GET_REPRESENTANTE_INICIALIZAR=prefix+"/inicializar";
export const POST_REPRESENTANTE=prefix+"/";
export const PUT_REPRESENTANTE=(parameter)=>{
    return prefix+"/"+parameter;
}