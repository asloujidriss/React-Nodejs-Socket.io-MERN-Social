import axios from "axios"
import {useNavigate} from 'react-router-dom'



export const loginCall = async (userCredentials,dispatch)=>{
 
    dispatch({type:"LOGIN_START"})
    try {
        const res = await axios.post("Auth/login",userCredentials)
        dispatch({type:"LOGIN_SUCCESS", payload:res.data})
      
    } catch (error) {
        dispatch({type:"LOGIN_FAILURE", payload:error}) 
    }
}