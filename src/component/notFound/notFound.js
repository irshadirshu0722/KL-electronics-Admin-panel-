
import "./notfound.css"
import {getAccessToken,resetAccessToken} from "../../store"
import {React,useLayoutEffect} from "react"
import {useNavigate} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import {is_expired} from '../../component/checktokenexpire'

export const NotFound = ()=>{
  const dispatch = useDispatch()
    const access_token = useSelector((state)=>state.getToken.value.access_token)
    const navigate = useNavigate();

    useLayoutEffect(()=>{
      dispatch(getAccessToken())
  
      if(access_token==null){
  
        console.log("not exist");
        navigate('/signin');
      }else if(access_token!=""){
        if(is_expired(access_token)){
          dispatch(resetAccessToken())
          navigate('/signin')
        }
        
      }
      
     
  },[access_token])

    return (
        <>
<h1 className="not-found-heading">Page Not Found</h1>

<section class="not-found-error-container">
  <span class="four"><span class="screen-reader-text">4</span></span>
  <span class="zero"><span class="screen-reader-text">0</span></span>
  <span class="four"><span class="screen-reader-text">4</span></span>
</section>

      </>
    )
} 