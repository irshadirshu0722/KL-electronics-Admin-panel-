import {useNavigate  } from "react-router-dom"

import {useLayoutEffect,useEffect,useState,React,useRef} from "react"
import "./addcoupon.css"
import {getAccessToken,resetAccessToken} from "../../store"
import {useDispatch,useSelector} from "react-redux"
import axios from "axios"
import { endpoint } from "../../backend"
import {Loading} from "../../component/loading"
import {ErrorPopUp} from "../../component/errorpopup"
import {is_expired} from '../../component/checktokenexpire'

export const AddCoupon =  ()=> {

  const dispatch = useDispatch()
  const access_token = useSelector((state)=>state.getToken.value.access_token)
  const navigate = useNavigate();
  const [isloading,setLoading]  = useState(false)
  const [errorpopup,setErrorpopup] = useState("")

  const couponcode = useRef(null)
  const couponrate = useRef(null)
  const couponamount = useRef(null)
  const couponminorder = useRef(null)

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

    const onSubmit = async ()=>{
      setLoading(true)
      setErrorpopup('')
      const json = {
        code:couponcode.current.value,
        discount_rate:couponrate.current.value,
        discount_amount:couponamount.current.value,
        min_order:couponminorder.current.value
      }
     
    
      
      const config = {
       headers: {
         Authorization: `Bearer ${access_token}`,
         "Content-Type":"application/json"
       },
     };
     try{
        const respone = await axios.post(`${endpoint}/coupon-code/admin/create-coupon`,json,config)
        if(respone.status==200||respone.status==201){
           setLoading(false)
           navigate('/allcouponcode ')
        }
     }catch (error){
      setLoading(false)
       if (!error.response){
        navigate('/notfound')

       }
       
       else if(error.response.status==412){
        setErrorpopup('Coupon code already exist')
      }
       else if(error.response.status==401){
         navigate('/signin')
       }else{
        navigate('/notfound')

       } 
 

     }
    }
  return (
    <>
    {isloading && <Loading />}

    <section className="add-couponcode-section">
       {errorpopup && <ErrorPopUp message={errorpopup}/>}
      <div className="container">
       <div className="row">
        <h1 className="heading">Add Coupon Code</h1>
          <form>
        <div className="form-group name-div">
              <label htmlFor="name">Coupon Code:</label>
              <input type="text" id="name" name="name"  ref={couponcode}/>
          </div>

          <div className="form-group price-div">
              <label htmlFor="price">Discount Rate:</label>
              <input type="number" id="price" name="price" ref={couponrate}></input>
          </div>

          <div className="form-group stock-div">
              <label htmlFor="stock">Discount Amount:</label>
              <input type="number" id="stock" name="stock "  ref={couponamount}/>
          </div>
          <div className="form-group productid-div">
              <label htmlFor="id">Min-Order:</label>
              <input type="number" id="id" name="id"  ref={couponminorder}/>
          </div>

          <button type="button" onClick={onSubmit} className="btn btn-dark">Add Coupon</button>
        </form>
    </div>
    </div>
    </section>
    </>
  )
}

