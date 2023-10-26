import {useNavigate, useParams  } from "react-router-dom"

import {useLayoutEffect,useEffect,useState,React,useRef} from "react"
import "./editCoupon.css"
import {getAccessToken,resetAccessToken} from "../../store"
import {useDispatch,useSelector} from "react-redux"
import axios from "axios"
import { endpoint } from "../../backend"
import {Loading} from "../../component/loading"
import {ErrorPopUp} from "../../component/errorpopup"
import {is_expired} from '../../component/checktokenexpire'

export const EditCoupon =  ()=> {
  const {coupon_id} = useParams()

  const dispatch = useDispatch()
  const access_token = useSelector((state)=>state.getToken.value.access_token)
  const navigate = useNavigate();
  const [isloading,setLoading]  = useState(false)
  const [errorpopup,setErrorpopup] = useState("")
  const [buttonenable,setButtonEnable] = useState(false)

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
        else{
          getcouponcode()
        }
        
      }
    
   
    },[access_token])
    
    const getcouponcode = async () => {
      const json = {
        coupon_id: coupon_id
      };
    
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json"
        }
      };
    
      try {
        const response = await axios.post(
          `${endpoint}/coupon-code/admin/get-coupon-for-edit`,
          json,
          config
        );
    
        if (response.status === 200 || response.status === 201) {
          const data = response.data.data;
          couponcode.current.value = data.code;
          couponrate.current.value = data.discount_rate;
          couponamount.current.value = data.discount_amount;
          couponminorder.current.value = data.min_order;
          setButtonEnable(true)

          setLoading(false);
        }
      } catch (error) {
            setLoading(false)
          navigate('/notfound')
      
        
      }
    };
    



    const onSubmit = async ()=>{
      setLoading(true)
      setErrorpopup('')
      const json = {
        coupon_id:coupon_id,
        code:couponcode.current.value,
        discount_rate:couponrate.current.value,
        discount_amount:couponamount.current.value,
        min_order:couponminorder.current.value
      }
     
     console.log(json);
      
      const config = {
       headers: {
         Authorization: `Bearer ${access_token}`,
         "Content-Type":"application/json"
       },
     };
     try{
        const respone = await axios.post(`${endpoint}/coupon-code/admin/edit-coupon-code`,json,config)
        if(respone.status==200||respone.status==201){
           setLoading(false)
           navigate('/allcouponcode')
        }
     }catch (error){
       if (!error.response){
       navigate('/notfound')
      }
       
       else if(error.response.status==412){
        setErrorpopup('This coupon code already exist')}
       else if(error.response.status==401){
      setErrorpopup('Forbidden go and sign in');
      navigate('/signin')
      }else{
        navigate('/notfound')
      }
       setLoading(false)

     }
    }
  return (
    <>
    {isloading && <Loading />}
   
    <section className="add-couponcode-section">
    {errorpopup && <ErrorPopUp message={errorpopup}/>}
    
      <div className="container">
       <div className="row">
        <h1 className="heading">Edit Coupon Code</h1>
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

          <button disabled={buttonenable === true ? false : true} type="button" onClick={onSubmit} className="btn btn-dark">Edit Coupon</button>
        </form>
    </div>
    </div>
    </section>
    </>
  )
}

