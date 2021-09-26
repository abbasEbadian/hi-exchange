export const LOADER_ON = "LOADER_ON"
export const LOADER_OFF = "LOADER_OFF"

export const toggle_loader_on = ()=>{
    return {
        type: LOADER_ON
    }
}
export const toggle_loader_off = ()=>{
    return {
        type: LOADER_OFF
    }
}