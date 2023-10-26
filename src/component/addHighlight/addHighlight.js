
import "./addHighlights.css"
import {useNavigate  } from "react-router-dom"

import {React,useLayoutEffect,useEffect,useState,useRef} from "react"
import {ImageCard} from './component/imageCard'
import {getAccessToken,resetAccessToken} from "../../store"
import {useDispatch,useSelector} from "react-redux"
import axios from "axios"
import { endpoint } from "../../backend"
import {Loading} from "../../component/loading"
import {ErrorPopUp} from "../../component/errorpopup"
import {is_expired} from '../../component/checktokenexpire'

export const AddHighlight = ()=>{
    const [selectedImages, setSelectedImages] = useState(null);
    const selectedImagestosend = useRef(null)
    const dispatch = useDispatch()
    const access_token = useSelector((state)=>state.getToken.value.access_token)
    const navigate = useNavigate();
  const [isloading,setLoading]  = useState(false)
  const [errorpopup,setErrorpopup] = useState("")


    useLayoutEffect(()=>{
      dispatch(getAccessToken())

        if(access_token==null){

          navigate('/signin');
        }
        else if(access_token!=""){
          if(is_expired(access_token)){
            dispatch(resetAccessToken())
            navigate('/signin')
          }
          
        }
      
     
  },[access_token])

    const handleImageChange = (e) => {
        const file = e.target.files[0]; 
         setSelectedImages(file)
          
        
    };

   const onSubmit = async ()=>{
       setLoading(true)
       setErrorpopup('')
       const formdata = new FormData()
      
       
       const file = selectedImagestosend.current.files[0]
       if(file){
          formdata.append(file.name,file)

       }
       const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };
      try{
          const response = await axios.post(`${endpoint}/admin-panel/add-highlight`,formdata,config)
         if(response.status==200||response.status==201){
         
           navigate('/allhighlights')
         }
        
         setLoading(false)
      }catch (error){
        setLoading(false)
        if (!error.response){
          navigate('/notfound')
        }
        
        else if(error.response.status==401){
          navigate('/signin')
        }
        else if(error.response.status==402){
          setErrorpopup('Highlights not selected')

         
        }else{
         navigate('/notfound')
        }
        
      }


   }
    return (
        <>
        {isloading &&  <Loading />}
        
        
      
    <section className="add-category-section">
    {errorpopup &&<ErrorPopUp message={errorpopup}/>}
      <div className="container">
       <div className="row">
        <h1 className="heading">Add Highlight</h1>
          <form>
           <div className="form-group image-div">
                  
               <ul>
                {selectedImages  && (
                  <>
                  <li> <ImageCard  image={URL.createObjectURL(selectedImages)} /></li>
                  </>
               )}
             <li >
              <label htmlFor="images">+Add image</label>
                <input
                type="file"
                accept="image/*"
                id="images" name="images"
              
                onChange={handleImageChange}
                ref={selectedImagestosend}

              />
            </li>
          </ul>    
          </div>
          <button onClick={onSubmit} type="button" className="btn btn-dark">Add Highlight</button>
        </form>
            </div>
        </div>
    </section>

    
    </>
        )
}