import {createContext, useReducer} from "react"
import AuthReducer from './AuthReducer'

//state managment system 

const INITIAL_STATE ={
    user:{
        _id: "623ce618db132b011be7f39e",
        username: "idas",
        email: "idasidir@gmail.com",
        profilePicture: "post/1.jpeg",
        coverPicture: "",
        isAdmin:false,
        followers: [],
        followings: [1,2,3],
    },
    isAFetching:false,
    error:false
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({children})=>{

 const [state,dispatch] = useReducer(AuthReducer,INITIAL_STATE)

 return (
     <AuthContext.Provider
     value={{
        user:state.user, 
        isFetching:state.isFatching,
        error:state.error,
        dispatch
        }}>
        {children}       
     </AuthContext.Provider>
 )
}
