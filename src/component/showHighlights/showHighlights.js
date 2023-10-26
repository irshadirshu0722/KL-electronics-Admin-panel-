import "./showHighlights.css"
import {React,useState,useLayoutEffect} from 'react'
import {useNavigate} from "react-router-dom"


import {ImageDiv} from "./component/imagediv"
import {getAccessToken,resetAccessToken} from "../../store"
import {useDispatch,useSelector} from "react-redux"
import axios from "axios"
import { endpoint } from "../../backend"
import {Loading} from "../../component/loading"
import {ErrorPopUp} from "../../component/errorpopup"
import {is_expired} from '../../component/checktokenexpire'

export const ShowHighlights=()=> {
    const [highlight,setHighlight] = useState([])
    const dispatch = useDispatch()
    const access_token = useSelector((state)=>state.getToken.value.access_token)
    const navigate = useNavigate();

    const [isloading,setLoading]  = useState(false)
    const [errorpopup,setErrorpopup] = useState("")
        useLayoutEffect(()=>{
          dispatch(getAccessToken())

          if(access_token==null){

          
            navigate('/signin');
          }else if(access_token!=""){
            if(is_expired(access_token)){
              dispatch(resetAccessToken())
              navigate('/signin')
            }else{
              getHighlights()
            }
            
          }
          
        
      },[access_token])
   
        const getHighlights = async ()=>{
          setLoading(true)
          setErrorpopup('')
          const json={}
          const config = {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          };

          try{
            const response = await axios.post(`${endpoint}/admin-panel/highlight-list`,json,config)
            if(response.status==200){
            
              setHighlight(response.data.data.highlights)
              setLoading(false)
            }
          
          } catch(e){ 
            setLoading(false)
              if (e.response==undefined){
                navigate('/notfound')
              }
             
              else if (e.response.status==401){
                navigate('/signin')
              } else{
                navigate('/notfound')

              }
             
          }
        }

  return (
    <>
    {isloading && <Loading/>}
    
   
     <section className='show-highlights-section'>
      {errorpopup && <ErrorPopUp message={errorpopup} />}
     <div className='container'>
       <div className='row'>
       <div className='heading' >Highlights</div>
       <button className='btn btn-dark' onClick={()=>navigate('/addhighlight')}>Add Highlight</button>
       {highlight.length!=0 ? 

       highlight.map((value)=> <ImageDiv data={value} seterror={setErrorpopup} setloading={setLoading} access_token={access_token}/>)
       :
       <div className="highlight-not-available">  Highlight Not added yet</div>
      }

       </div>
     </div>
   </section>
   
   
    </>
  )
}

