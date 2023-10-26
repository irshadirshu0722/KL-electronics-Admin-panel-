import { useState} from 'react'
import { useForm } from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import axios from "axios"
import {useNavigate  } from "react-router-dom"

import {setAccessToken} from "../../../store"
import {useDispatch} from "react-redux"
import {endpoint} from "../../../backend"
// const reducer =(state,action)=>{
//   switch(action.type){

//     case "SetEmail":
//       return {...state,email : action.payload};

//     case "SetPassword":
//       return {...state,password : action.payload}  
//     default:
//       return state
//   }
// }

 

export const SignInForm = ()=>{
  const [message,SetMessage] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate(); 

  const schema = yup.object().shape({
    email:yup.string().email().required(),
    password:yup.string().min(8).required(),
  })

  const {register,handleSubmit,formState:{errors}}  = useForm({
    resolver :yupResolver(schema)
  })


  // const [state,dipatch] = useReducer(reducer,{email:"",password:""})
  
 



  const onSubmit = async (data)=>{
  
    const email = data.email
    const password = data.password
    
    const body = {
      "email":email,
      "password":password
    }
    try{
      const response = await axios.post(`${endpoint}/auth/admin/login`,body)

      
      if(response.status===200){
        const access_token = response.data.access_token
        dispatch(setAccessToken(access_token))
     
        navigate('/')
      }
      
    }catch (error) {
      if (error.response===undefined){
        navigate('/notfound')

      }
      else if ( error.response.status===401){
        SetMessage("Admin doesn't exist")

      }
      else if(error.response.status===400)
      {
         SetMessage("Password is Wrong")
      }
      else{
        navigate('/notfound')

      }
      
      
    }


    
   
  }
  
  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
              <h3>Sign in</h3>

              <p className='error'>{message && message}</p>
              <div className="inputbox">
                <input 
                {...register("email")}
                />
                <span>Email</span>
                <i></i>
              </div>
              <p className='error'>{errors.email?.message}</p>

              <div className="inputbox">
                <input 
                {...register("password")}
                type='password'
                /> 
                <span>Password</span>
                <i></i>
                
              </div>
              <p className='error'>{errors.password?.message}</p>
              {/* <div className="links">
                <a href="">Forgot password</a>
                <a href="">Signup</a>
              </div> */}
            <input className="submit" type="submit" value="Login" />
        </form>
   )
}