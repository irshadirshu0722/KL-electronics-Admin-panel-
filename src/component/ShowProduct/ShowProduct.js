import "./showproduct.css"

import {script} from"./script"


import {useNavigate ,useParams ,useLocation } from "react-router-dom"
import {React,useEffect,useState} from "react"
import {getAccessToken,resetAccessToken} from "../../store"
import {useDispatch,useSelector} from "react-redux"
import {Loading} from "../../component/loading"
import {ErrorPopUp} from "../../component/errorpopup"
import {is_expired} from '../../component/checktokenexpire'
import axios from "axios"
import { endpoint } from "../../backend"

export const ShowProduct=()=>{
  const {product_id} = useParams()
  const dispatch = useDispatch()
  const access_token = useSelector((state)=>state.getToken.value.access_token)
  const navigate = useNavigate();
  const [product,setProduct] = useState({}) 
  const [isloading,setLoading] = useState(true)
  const [isdatafetched,setisdatafetched] = useState(false)
  const [errorpopup,setErrorpopup] = useState("")
 const location = useLocation()
 
  
  useEffect(()=>{
    dispatch(getAccessToken())

    if(access_token===null){

      
      navigate('/signin');
    }
    else if (access_token !== ""){
      if(is_expired(access_token)){
        dispatch(resetAccessToken())
        navigate('/signin')
      }else{
      
        getproduct()
     

      }
     
    }
    

},[access_token,location])

  useEffect(()=>{
    script(isdatafetched)
  },[isdatafetched]) 
    
  const getproduct = async ()=>{
    setisdatafetched(false)
    setLoading(true)
    setErrorpopup('')
    const json = {
      product_id:product_id
    }
    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };
    
    try{
          const response = await axios.post(`${endpoint}/admin-panel/get-product`,json,config);

          if(response.status===200){
            setProduct(response.data.data)
            setLoading(false)
        
          }
          setisdatafetched(true)

    }catch(e){  
          setLoading(false)

      if(e.response===undefined){
        navigate('/notfound')

      }else if (e.response.status===401){
        navigate('/signin')
      }else if (e.response.status===404){
       setProduct({})

      }
      else{

        navigate('/notfound')
      }

      
    }
   

  }
   
  const onDelete = async (id)=>{
    setLoading(true)

    const json={
      product_id:id
    }
    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };
    try{
      const response = await axios.post(`${endpoint}/product/admin/delete-product`,json,config);

      if(response.status===200){
        navigate('/allproduct/1')
        setLoading(false)

      }

        }catch(e){
          setErrorpopup("Request  Failed try again later")
        }
        setLoading(false)

  }

    return (
        <>
        {isloading && <Loading />}
        {Object.keys(product).length!==0
        ?
        <> 
        <section className="showproduct">
          {errorpopup && <ErrorPopUp message={errorpopup} />}
            <div className="container">
              
           <div className="grid">
          
            
          
           <div className="product-img">
        <div className="show-img">

           <ul className="">
        <i id="left" className="fa-solid fa-angle-left"></i>

            {product?.images?.length!==0 && 
            
            product?.images?.map((value,idx)=><><li><img id="img-1" src={value.image} alt="Not found"/></li></>)

          
          }
          
                      <i id="right" className="fa-solid fa-angle-right"></i>


           </ul>

        </div>
        
      </div>

{/* ----------------------------------------------------------------------------------- */}

    <div className="product-stat">
        <h1>{product?.name}</h1>
        <h5>{product?.price}₹</h5>
        {product?.stock!==0 ? <h4> Availability : {product?.stock} in stock</h4>:<h4 style={{color:"red"}}>Out of Stock</h4>}
        
        
        <div>
          <form>
            <button type="button" onClick={()=>onDelete(product?.product_id)} style={{margin:0}} className="btn btn-danger">Delete</button>
            <button type="button" onClick={()=>navigate(`/editproduct/${product?.product_id}`)} className="btn btn-info">Edit</button>
             
          </form>

        </div>
       

        <h6>Product ID: {product.product_id}</h6>
        <h3> Category :{product.category && product?.category.category_name}</h3>
    </div>

    
           </div>

           
           </div>
           
         </section>

         <section className="create-update-section">

          <div className="container">
            <div className="row">
              <div>Created At : {product?.created_at}</div>
              <div>Updated At : {product?.updated_at}</div>

            </div>
          </div>
         </section>
{/* ----------------------------------------------------------------------------------- */}
       <section className="product-description">
        <div className="container">
            <h1>Description</h1>
            
            <div className="grid">
              <div className="product-contain">
                <h3>Package Contains</h3>
                <ul>
                  
                 {product.package_contain &&  Object.entries(product?.package_contain).map(([key, value]) => (<li>{key}</li>))}
                  
                    
                </ul>
                </div>
                <div className="additional-information">
                <h3>Additional information</h3>
                <ul>
                {product.additional_information && Object.entries(product?.additional_information).map(([key, value]) => (<li>{key}  :  {value}</li>))}

                    
                </ul>
                
                </div> 
              
            </div>
        </div>
       </section>
        </>
        :
        
        <h1 style={{color:"white",display:"flex", justifyContent:"center"}}>Product Not Found</h1>
        }
        
 
        </>

    )
}