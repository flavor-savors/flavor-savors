import axios from 'axios';

const intialState = {
    user: {}
}



// const REGISTER = "REGISTER";
const GET_USER = "GET_USER";




export const getUser = () => {
    return {
        type: GET_USER,
        payload: axios.post('/user/current')
    }
}



export default function userReducer(state = intialState, action){
    switch(action.payload){
        case `${GET_USER}_FULFILLED`:
            return{
                ...state,
                user: action.payload.data
            }

            default:
            return state;
    }
}