
import "./editProduct.css"
// import {script} from './script'
import {useNavigate ,useParams  } from "react-router-dom"
import {React,useLayoutEffect,useState,useRef} from "react"
import {getAccessToken,resetAccessToken} from "../../store"
import {useDispatch,useSelector} from "react-redux"
import axios from 'axios'
import {endpoint} from "../../backend"
import {ImageCard} from './component/imageCard'

import {Loading} from "../../component/loading"
import {ErrorPopUp} from "../../component/errorpopup"
import {is_expired} from '../../component/checktokenexpire'

export const EditProduct = ()=>{
    const { product_id } = useParams();
    const selectedImagestosend = useRef(null)
    const [imagetosend,setImagetosend] = useState([])
    const [buttonenable,setButtonEnable] = useState(false)

    const [packagecotains,setPackageContains] = useState({})
    const [additionalinformation,setAdditionalInformation] = useState({})
    const [packagecotainsvinput,setPackageCotainsInput] = useState("")
    const [additionalinformationinputkey,setAdditionalAnformationInputKey] = useState("")
    const [additionalinformationinputvalue,setAdditionalAnformationInputValue] = useState("")
    const product_name = useRef(null)
    const product_price = useRef(null)
    const product_stock = useRef(null)
    const selectedcategory = useRef()
    const [categories,setCategories] = useState([])



    // current product category
    const [curcategory,setCurCategory] = useState([])



    const dispatch = useDispatch()
    const access_token = useSelector((state)=>state.getToken.value.access_token)
    const navigate = useNavigate();

    const [isloading,setLoading] = useState(true)
    const [errorpopup,setErrorpopup] = useState("")
  

    useLayoutEffect(()=>{
      dispatch(getAccessToken())

      if(access_token===null){

        navigate('/signin');
      }
      else if (access_token !== ""){
        if(is_expired(access_token)){
          dispatch(resetAccessToken())
          navigate('/signin')
        }else{
           getproductdetails()
        }
       
      }
     
  },[access_token])
  
  const onSubmit = async ()=>{
    setLoading(true)
    setErrorpopup("")
     const formdata = new FormData()
     const productdata = {
      "name":product_name.current.value,
     "price":product_price.current.value,
     "stock":product_stock.current.value,
     "category_name":selectedcategory.current.value,
     "package_contain":packagecotains,
     "additional_information":additionalinformation,
     "product_id":product_id
   }
   const jsonData = JSON.stringify(productdata);

    formdata.append("jsonData",jsonData)

    const selectedFiles = imagetosend;
    console.log("this is the length of the imag eto send",imagetosend);
    for (let i = 0; i < selectedFiles.length; i++) {
      formdata.append(`img${i}`, selectedFiles[i]);
    }
    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };
    try{
      const response = await axios.post(`${endpoint}/product/admin/edit-product`,formdata,config)
      
      if (response.status===200 || response.status===201){
        setLoading(false)

        navigate('/allproduct/1')
      }
      
    }catch (error){
       setLoading(false)
      if (error.response===undefined){
        navigate('/notfound')

      }
      
      else if (error.response.status===401){
        setErrorpopup('Admin not Found')
        navigate('/signin')
      }
      else if (error.response.status===404){
       setErrorpopup('Category not found')
      }else{
        navigate('/notfound')

      }
     

    }
    

      
  }
    
    const getproductdetails = async ()=>{
          const json = {
            "product_id":product_id
          }
          const config = {
            headers: {
              Authorization: `Bearer ${access_token}`,
              'Content-Type': 'application/json'
            },
          };
          
          try{
            
            const response = await axios.post(`${endpoint}/admin-panel/get-product-for-edit`,json,config)

            if (response.status===200){
              
              setLoading(false)
              setAdditionalInformation(response.data.data.product.additional_information)
              setPackageContains(response.data.data.product.package_contain)
              product_name.current.value = response.data.data.product.name
              product_price.current.value = response.data.data.product.price
              product_stock.current.value = response.data.data.product.stock
              setCurCategory(response.data.data.product.category.category_name)
              setCategories(response.data.data.categories.map((value)=>value.category_name))
              const imageurl = response.data.data.product.images.map((value)=>value.image)
              const files = await fetchImageFiles(imageurl)

              setImagetosend(()=>files.filter((img)=>img!==undefined))
              
              setButtonEnable(true)

              
            }

          }catch (error){
            if (error.response===undefined){
              setErrorpopup("request failed")
            }else{
                navigate('/notfound')
                }
                setLoading(false)
            
          }
    }

    
    const fetchImageFiles = async (imageUrls) => {
      const imageFile = imageUrls.map(async (url) => {
        try {
          const response = await axios.get(url, { responseType: 'blob' });
          return new File([response.data], 'image.jpg', { type: 'image/jpeg' });
        } catch (e) {
        }
      });
      // console.log(imageFile);
      return Promise.all(imageFile);
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
        setImagetosend([...imagetosend,])
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
            {isloading &&  <Loading />}
    <section className="edit-product-section">
    {errorpopup &&<ErrorPopUp message={errorpopup}/>}
      <div className="container">
       <div className="row">
        <h1 className="heading">Edit New Product</h1>
          <form >
             <div className="form-group image-div">
                  
              <ul>
               {imagetosend.length > 0 && (
               
                  <>
                  {imagetosend.map((image, index) => (
                    image && 
                  <li key={index}> <ImageCard index={index} image={URL.createObjectURL(image)} />
                  <button type="button" className="image-remove" onClick={()=>handleimageremove(index)}>❌</button>
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
              <input type="text" id="name" name="name"   ref={product_name} autoFocus />
          </div>

          <div className="form-group price-div">
              <label htmlFor="price">Price:</label>
              <input type="number" id="price" name="price" min={1} ref={product_price} ></input>
          </div>

          <div className="form-group stock-div">
              <label htmlFor="stock">Available Stock:</label>
              <input type="number" id="stock" name="stock " min={1} ref={product_stock} />
          </div>
          {/* <div className="form-group productid-div">
              <label htmlFor="id">Product ID:</label>
              <input type="number" id="id" name="id"  {...register("id")}/>
          </div> */}

          <div className="form-group category-div">
              <label htmlFor="category">Product Category:</label>
               <select id="category" name="category" ref={selectedcategory}>
               {categories.map((value, idx) => (
                value!==curcategory ? <option key={idx}>{value}</option>:<option key={idx} selected >{value}</option>

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
                    {key} <button type="button" onClick={()=>handlepackagecontainsremove(key)}>❌</button>
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



          

          <button disabled={buttonenable === true ? false : true} onClick={onSubmit} type="button" className="btn btn-dark">Edit Product</button>
        </form>
            </div>
        </div>
    </section>

    
    </>
        )
}