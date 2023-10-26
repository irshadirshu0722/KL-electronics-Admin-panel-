
import "./addProduct.css"
// import {script} from './script'
import {useNavigate  } from "react-router-dom"
import {React,useLayoutEffect,useState,useRef} from "react"
import {getAccessToken,resetAccessToken} from "../../store"
import {useDispatch,useSelector} from "react-redux"
import axios from 'axios'
import {endpoint} from "../../backend"
import {ImageCard} from './component/imageCard'
import {useForm} from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import {Loading} from "../../component/loading"
import {ErrorPopUp} from "../../component/errorpopup"
import {is_expired} from '../../component/checktokenexpire'


export const AddProduct = ()=>{
    const [isloading,setLoading] = useState(true)
    const [errorpopup,setErrorpopup] = useState()

    const selectedImagestosend = useRef(null)
    const [imagetosend,setImagetosend] = useState([])

    const [packagecotains,setPackageContains] = useState({})
    const [additionalinformation,setAdditionalInformation] = useState({})
    const [packagecotainsvinput,setPackageCotainsInput] = useState("")
    const [additionalinformationinputkey,setAdditionalAnformationInputKey] = useState("")
    const [additionalinformationinputvalue,setAdditionalAnformationInputValue] = useState("")
    const selectedcategory = useRef()
    const [categories,setCategories] = useState([])

    const dispatch = useDispatch()
    const access_token = useSelector((state)=>state.getToken.value.access_token)
    const navigate = useNavigate();

    useLayoutEffect(()=>{
      dispatch(getAccessToken())

      if(access_token===null){

        navigate('/signin');
      }
      else if (access_token !== ""){
        if(is_expired(access_token)){
          dispatch(resetAccessToken())
          navigate('/signin')
        }
        else{
          getCategories()
         }
      }
     
  },[access_token])
  
  

  const schema = yup.object().shape({
     name:yup.string().required().min(5),
     price:yup.number().required(),
     stock:yup.number().required(),

  })
  const {register,handleSubmit} =useForm({
    resolver:yupResolver(schema)
  })
  
  const onSubmit = async (data)=>{
    setLoading(true)
   const formdata = new FormData()
   const productdata = {
    "name":data.name,
    "price":data.price,
    "stock":data.stock,
    "category_name":selectedcategory.current.value,
    "package_contain":packagecotains,
    "additional_information":additionalinformation
   }
   const jsonData = JSON.stringify(productdata);

    formdata.append("jsonData",jsonData)

    const selectedFiles = imagetosend;

    for (let i = 0; i < selectedFiles.length; i++) {
      formdata.append(`${selectedFiles[i].name}`, selectedFiles[i]);
    }
    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };
    try{
      const response = await axios.post(`${endpoint}/product/admin/add-product`,formdata,config)
      
      if (response.status===200 || response.status===201){
        setLoading(false)
        navigate('/allproduct/1')
      }
      
    }catch (error){
      setLoading(false)
      if (!error.respone){
        navigate('/notfound')

      }
     
      else if (error.respone.status===401){
      
        navigate('/signin')
      }
      else if (error.respone.status===404){
        setErrorpopup("Category not found")
      }
      else{
        navigate('/notfound')

      }
      

    }
    

      
  }
    
    const getCategories = async ()=>{
          const config = {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          };
          try{
            const response = await axios.get(`${endpoint}/admin-panel/category-list`,config)

            if (response.status===200){
             
              const category = response.data.data.categories
          
              setCategories(category.map((value)=>value.category_name))
              setLoading(false)
              
         
              
            }

          }catch (error){
            if (error.response===undefined){
              setLoading(false)
            }
            else if ( error.response.status===401){
                setLoading(false)
                navigate('/signin');

            }
            
          }
    }

    

    
   
   const handlepackagecontains = ()=>{
    
    setPackageContains((prev) => ({
      ...prev,  // Spread the previous state
      [packagecotainsvinput]: ""  // Add the new key-value pair
    }));
   }


   const handlepackagecontainsremove = (keyToRemove)=>{
    const filteredData = {};
    for (const key in packagecotains) {
      if (key!==keyToRemove) {
         filteredData[key] = "";
      }
    }
    setPackageContains(filteredData)    
   }

   const handleadditionalinformationremove = (keyToRemove)=>{
    const filteredData = {};

    for (const key in additionalinformation) {
      if (key!==keyToRemove) {
        filteredData[key] = additionalinformation[key];
      }
    }
    setAdditionalInformation(filteredData)
    
   }

   const handleadditionalinformation = () => {
    setAdditionalInformation((prev) => ({
      ...prev,  // Spread the previous state
      [additionalinformationinputkey]: additionalinformationinputvalue  // Add the new key-value pair
    }));
    
    }


   
    const handleImageChange = (e) => {
        const filesObject = selectedImagestosend.current.files;

        for (const key in filesObject) {
          if (filesObject.hasOwnProperty(key)) {
            const file = filesObject[key];
            setImagetosend((prev)=>[...prev,file])
          }
        }
        
        
    };
    const handleimageremove = (idxtoremove)=>{
      setImagetosend((prev)=>prev.filter((value,idx)=> idxtoremove!==idx ))

      
    }
    
   
    return (
        <>
 {isloading &&
         <Loading />
   }  
    <section className="add-product-section">
      {errorpopup &&<ErrorPopUp message={errorpopup}/>}
      
     
      
      <div className="container">
       <div className="row">
        <h1 className="heading">Add New Product</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
             <div className="form-group image-div">
                  
              <ul>
               {imagetosend.length > 0 && (
               
                  <>
                  {imagetosend.map((image, index) => (
                  <li key={index}> <ImageCard index={index} image={URL.createObjectURL(image)} />
                  <button className="image-remove" onClick={()=>handleimageremove(index)}>❌</button>
                  </li>
                   ))}
                   </>
               )}
             <li >
              <label htmlFor="images">+Add image</label>
                <input
                type="file"
                accept="image/*"
                id="images" name="images"
                multiple
                onChange={handleImageChange}
               ref={selectedImagestosend}
               
              />
            </li>
          </ul>    
          </div>


          <div className="form-group name-div">
              <label htmlFor="name">Product Name:</label>
              <input type="text" id="name" name="name"  {...register("name")} autoFocus/>
          </div>

          <div className="form-group price-div">
              <label htmlFor="price">Price:</label>
              <input type="string" id="price" name="price" {...register("price")}></input>
          </div>

          <div className="form-group stock-div">
              <label htmlFor="stock">Available Stock:</label>
              <input type="number" id="stock" name="stock "  {...register("stock")}/>
          </div>
          {/* <div className="form-group productid-div">
              <label htmlFor="id">Product ID:</label>
              <input type="number" id="id" name="id"  {...register("id")}/>
          </div> */}

          <div className="form-group category-div">
              <label htmlFor="category">Product Category:</label>
               <select id="category" name="category" ref={selectedcategory} required>
               {categories.map((value, idx) => (
                 <option key={idx}>{value}</option>
               ))}
                

               </select>
          </div>
          <div className="form-group contains-div">
              <label htmlFor="package-contains">Package Contains:</label>
              <div className="add-section">
                <input type="string" id="package-contains" name="package-contains" placeholder="item"  onChange={(e)=>setPackageCotainsInput(e.target.value)}/>
                <button  className="btn btn-info" type="button" onClick={()=>handlepackagecontains()} >Add</button>
              </div>
              <ul className="list-of-item">
                { 

                Object.keys(packagecotains).map((key)=>(
                  <li>
                    {key} <button onClick={()=>handlepackagecontainsremove(key)}>❌</button>
                  </li>
                )
                 
                )}
              </ul>

          </div>
          <div className="form-group information-div">
              <label htmlFor="additional-information">Additional information:</label>
              <div className="add-section">
                <input type="string" id="additional-information-key" name="additional-information-key" placeholder="Key" onChange={(e)=>setAdditionalAnformationInputKey(e.target.value)} />
                <input type="string" id="additional-information-value" name="additional-information-value" placeholder="Value"  onChange={(e)=>setAdditionalAnformationInputValue(e.target.value)}/>
                <button className="btn btn-info" type="button" onClick={()=>handleadditionalinformation()} >Add</button>
              </div>
              <ul  className="list-of-item">
                  {Object.keys(additionalinformation).map((key) => (
                    <li key={key}>
                      {key}: {additionalinformation[key]}
                      <button type="button" onClick={() => handleadditionalinformationremove(key)}> ❌ </button>
                    </li>
                  ))}
                </ul>


          </div>



          

          <button type="submit" className="btn btn-dark">Add Product</button>
        </form>
            </div>
        </div>
    </section>

    
    </>
        )
}