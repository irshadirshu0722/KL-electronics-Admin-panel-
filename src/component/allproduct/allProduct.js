import "./allProduct.css"

import {useParams,useNavigate} from "react-router-dom"

import {React,useLayoutEffect,useState} from "react"
import {ProductCard} from "./component/searchProduct"
import {getAccessToken,resetAccessToken} from "../../store"
import {useDispatch,useSelector} from "react-redux"
import axios from "axios"
import { endpoint } from "../../backend"
import {Loading} from "../../component/loading"
import {ErrorPopUp} from "../../component/errorpopup"
import {is_expired} from '../../component/checktokenexpire'
export const AllProduct = ()=>{
  const {page_no} = useParams()

  const [products,setProducts] = useState([])
  const [buttonstate,setButtonState] = useState({})
  const dispatch = useDispatch()
    const access_token = useSelector((state)=>state.getToken.value.access_token)
    const navigate = useNavigate();

    const [isloading,setLoading]  = useState(false)
    const [errorpopup,setErrorpopup] = useState("")
    useLayoutEffect(()=>{
    dispatch(getAccessToken())

    if(access_token===null){

      navigate('/signin');
    }else if(access_token!==""){
      if(is_expired(access_token)){
        dispatch(resetAccessToken())
        navigate('/signin')
      }else{
        getproductdetails()
      }
      
    }
    
   
},[access_token,page_no])
  
const reload = (url)=>{

  navigate(url)
  window.location.reload();
}
  
  
    const getproductdetails = async ()=>{
      setLoading(true)
      setErrorpopup('')
      const json = {
        page:page_no
      }
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };

      try{
        const response = await axios.post(`${endpoint}/admin-panel/products-list`,json,config)
        if(response.status===200){
          setProducts(response.data.data.products)
          setButtonState(response.data.data.button_state)
          setLoading(false)
        }
       
      } catch(e){
          if (e && e.response===undefined){
            navigate('/notfound')
          }
          
          else if (e.response.status===401){
            navigate('/signin')
          }
          else{
            navigate('/notfound')
          }

          setLoading(false)
      }
    }
    return(
        <>
        {isloading&&  <Loading/>}
     
        


      <section className="all-product-section">
        {errorpopup&&  <ErrorPopUp message={errorpopup}/>}

       <div className="container">
       <div className="row">
 
        <div className="all-product-heading">
            <div className="heading">
              
              <div className="page-count">Page : {page_no}</div>
            </div>
            
          </div>
          <div className="add-product-btn">
                <button className="btn btn-dark" onClick={()=>navigate('/addproduct')}>Add Product</button>
              </div>
          <div className="all-product-details">
        <div className="grid">
          {
            products.map((value,index)=> < ProductCard data={value}/>)
          }
          
           
           
        </div>
       {products.length===0&&<div className="product-not-available">  Product Not added yet</div>}  
      </div>
      <div  className="product-next-page">
        <div>
          <div className="prev-btn">
        {
          (buttonstate.prev_button && products.length!==0) &&
          <button onClick={()=>reload(`/allproduct/${page_no-1}`)} className="prev">
          <i id="left" className="fa-solid fa-angle-left"></i>
        </button>
        }  
        </div>
       <div className="page-no">
       {products.length!==0&& page_no}  
       </div>
       <div className="next-btn">
        
          {
             (buttonstate.next_button && products.length!==0) &&
          <button onClick={()=>reload(`/allproduct/${parseInt(page_no)+1}`)} className="next">
               <i id="right" className="fa-solid fa-angle-right"></i>
           </button>
         }
        </div>
        
      
        

        
         </div>
       </div>
       </div></div>
       </section>
        </>
    )
}