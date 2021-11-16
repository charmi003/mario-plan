import { LOGIN_SUCCESS, LOGOUT_SUCCESS, SET_USER, SIGNUP_SUCCESS } from "./authTypes"

const initialState={
    isLoggedIn:false,
    user:null
}

const authReducer=(currState=initialState, action)=>{
    switch(action.type){
        case LOGIN_SUCCESS:
            action.alert.show("Logged In!",{ type:'success' })
            return {
                isLoggedIn:true,
                user:action.payload
            }

        case SIGNUP_SUCCESS:
            action.alert.show("Signed Up!",{ type:'success' });
            return currState;

        case LOGOUT_SUCCESS:
            action.alert.show("Logged Out", { type:'success' })
            return {
                isLoggedIn:false,
                user:null
            }
        
        case SET_USER:
            return{
                isLoggedIn:true,
                user:action.payload
            }

        default:
            return currState
    }

}

export default authReducer