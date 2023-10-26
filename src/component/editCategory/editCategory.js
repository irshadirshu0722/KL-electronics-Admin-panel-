
import "./editCategory.css"
import {useNavigate ,useParams } from "react-router-dom"

import {React,useLayoutEffect,useEffect,useState,useRef} from "react"
import {ImageCard} from './component/imageCard'
import {getAccessToken,resetAccessToken} from "../../store"
import {useDispatch,useSelector} from "react-redux"
import axios from "axios"
import { endpoint } from "../../backend"
import {Loading} from "../../component/loading"
import {ErrorPopUp} from "../../component/errorpopup"
import {is_expired} from '../../component/checktokenexpire'

export const EditCategory = ()=>{
    const [selectedImages, setSelectedImages] = useState(null);
    const selectedImagestosend = useRef(null)
    const categoryname = useRef(null)
    const [buttonenable,setButtonEnable] = useState(false)
    
    const dispatch = useDispatch()
    const access_token = useSelector((state)=>state.getToken.value.access_token)
    const navigate = useNavigate();
    const [isloading,setLoading]  = useState(false)
    const [errorpopup,setErrorpopup] = useState("")
    const {category_id} = useParams()


    useLayoutEffect(()=>{
      dispatch(getAccessToken())

      if(access_token==null){

        
        navigate('/signin');
      }else if (access_token!=""){
        if(is_expired(access_token)){
          dispatch(resetAccessToken())
          navigate('/signin')
        }
        else{
            getcategorydetails()
          }

      }
      
     
  },[access_token])

  const getcategorydetails = async ()=>{
        const json = {
          "category_id":category_id
        }
        const config = {
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json'
          },
        };
        
        try{
          
          const response = await axios.post(`${endpoint}/admin-panel/get-category-for-edit`,json,config)

          if (response.status==200){
            
            setLoading(false)
            categoryname.current.value = response.data.data.category_name

            if(response.data.data.image){
              setSelectedImages(await fetchImageFiles(response.data.data.image.image))
              setButtonEnable(true)
            }
        
           
            
          }

        }catch (error){
          setLoading(false)
        navigate('/notfound')
        }
      }
  

    

  const fetchImageFiles = async (imageUrls) => {
      
      try {
        const response = await axios.get(imageUrls, { responseType: 'blob' });
        return new File([response.data], 'image.jpg', { type: 'image/jpeg' });
      } catch (e) {
      }
      
    }
  
    // Wait for all promises to resolve and return the result as an array of files
  
  


    const handleImageChange = (e) => {
        const file = e.target.files[0]; 
         setSelectedImages(file)
          
        
    };

   const onSubmit = async ()=>{
       setLoading(true)
       setErrorpopup('')
      const formdata = new FormData()
      const category_detail = {
        category_id:category_id,
        category_name:categoryname.current.value
      }
       const strcategory_detail = JSON.stringify(category_detail)
       formdata.append('jsonData',strcategory_detail)
       const file = selectedImages
       formdata.append(file.name,file)
       const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };
      try{
          const respone = await axios.post(`${endpoint}/product/admin/edit-category`,formdata,config)
         if(respone.status==200||respone.status==201){
           setLoading(false)

            
            navigate('/allcategory')
         }
      }catch (error){
        if (!error.response){
            setErrorpopup('request Failed Try later')
        }
        else if(error.response.status==400){
          setErrorpopup('Bad_Request or read error')
        }
        else if(error.response.status==401){
          setErrorpopup('Forbidden go and sign in')
          navigate('/signin')
        }
        else if(error.response.status==412){
          setErrorpopup("This Category  already exist")
        }
        setLoading(false)
      }

const fake="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY5Njk1MDc2MSwianRpIjoiMTg1ZGNlNWItMjZmMS00MzQzLTk5YTYtODE4MjNmODFmM2UzIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6Imlyc2hhZDNAZ21haWwuY29tIiwibmJmIjoxNjk2OTUwNzYxLCJleHAiOjE2OTk1NDI3NjF9.QAFBCSgp2eO-0Y2Fl-vD2SbF2EjFFOCtq7S5DoiWh0o"

   }
    return (
        <>
        {isloading &&  <Loading />}
        
        
      
    <section className="add-category-section">
    {errorpopup &&<ErrorPopUp message={errorpopup}/>}
      <div className="container">
       <div className="row">
        <h1 className="heading">Edit Category</h1>
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
                required
              />
            </li>
          </ul>    
          </div>


          <div className="form-group name-div">
              <label htmlFor="name">Category Name:</label>
              <input type="text" id="name" name="name" required minLength={3} ref={categoryname}/>
          </div>

          
          


          

          <button  disabled={buttonenable === true ? false : true} onClick={onSubmit} type="button" className="btn btn-dark">Edit Category</button>
        </form>
            </div>
        </div>
    </section>

    
    </>
        )
}