const init_state= {
    otp_type : "login",
    otp_id: "",
    opt_register_phone: "",
}

export const otpReducer = (state=init_state, action) =>{
    switch (action.type) {
        case "UPDATE_TYPE":
            return {
                ...state,
                otp_type: action.payload
            }
        case "UDPATE_ID":
            return {
                ...state,
                otp_id: action.payload
            }
        case "UPDATE_PHONE":
            return {
                ...state,
                opt_register_phone: action.payload
            }
        
        default:
            return state;
    }
}