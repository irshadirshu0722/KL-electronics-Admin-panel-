
import "./addCategory.css"
import {useNavigate} from "react-router-dom"

import {React,useLayoutEffect,useEffect,useState,useRef} from "react"
import {ImageCard} from './component/imageCard'
import {getAccessToken,resetAccessToken} from "../../store"
import {useDispatch,useSelector} from "react-redux"
import axios from "axios"
import { endpoint } from "../../backend"
import {Loading} from "../../component/loading"
import {ErrorPopUp} from "../../component/errorpopup"
import {is_expired} from '../../component/checktokenexpire'

export const AddCategory = ()=>{
    const [selectedImages, setSelectedImages] = useState(null);
    const selectedImagestosend = useRef(null)
    const categoryname = useRef(null)
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
      const category_detail = {
        category_name:categoryname.current.value
      }
      const strcategory_detail = JSON.stringify(category_detail)
       formdata.append('jsonData',strcategory_detail)
       
       const file = selectedImagestosend.current.files[0]
       if (file){
              formdata.append(file.name,file)
         }
       const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };
      try{
          const respone = await axios.post(`${endpoint}/product/admin/add-category`,formdata,config)
         if(respone.status==200||respone.status==201){
           setLoading(false)

            
            navigate('/allcategory')
         }
      }catch (error){ 
               setLoading(false)

        if (!error.response){
            navigate('/notfound')
        }
        else if(error.response.status==401){
         
          navigate('/signin')
        }
        else if(error.response.status==412){
          setErrorpopup('Category already exist')
        }else{
          navigate('/notfound')

        }
      }

const fake="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY5Njk1MDc2MSwianRpIjoiMTg1ZGNlNWItMjZmMS00MzQzLTk5YTYtODE4MjNmODFmM2UzIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6Imlyc2hhZDNAZ21haWwuY29tIiwibmJmIjoxNjk2OTUwNzYxLCJleHAiOjE2OTk1NDI3NjF9.QAFBCSgp2eO-0Y2Fl-vD2SbF2EjFFOCtq7S5DoiWh0o"

   }
    return (
        <>
        {isloading &&  <Loading />}
        
        
      
    <section className="add-category-section" data-testid="todo-1">
    {errorpopup &&<ErrorPopUp message={errorpopup}/>}
      <div className="container">
       <div className="row">
        <h1 className="heading">Add Category</h1>
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


          <div className="form-group name-div">
              <label htmlFor="name">Category Name:</label>
              <input type="text" id="name" name="name" required minLength={3} ref={categoryname}/>
          </div>

          
          


          

          <button onClick={onSubmit} type="button" className="btn btn-dark">Add Category</button>
        </form>
            </div>
        </div>
    </section>

    
    </>
        )
}