import {React,useState,useLayoutEffect} from 'react'
import './showcoupon.css'
import {useNavigate} from "react-router-dom"

import {CouponItem} from "./component/coupon_item"
import {getAccessToken,resetAccessToken} from "../../store"
import {useDispatch,useSelector} from "react-redux"
import axios from "axios"
import { endpoint } from "../../backend"
import {Loading} from "../../component/loading"
import {ErrorPopUp} from "../../component/errorpopup"
import {is_expired} from '../../component/checktokenexpire'
export  function ShowCoupon() {
  


  const [coupons,setCoupons] = useState([])
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
        getcoupondetails()
      }
      
    }
    
   
},[access_token])

  
    const getcoupondetails = async ()=>{
      setLoading(true)
      setErrorpopup('')
       const json={}
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };

      try{
        const response = await axios.post(`${endpoint}/admin-panel/coupon-list`,json,config)
        if(response.status==200){
      
          setCoupons(response.data.data.coupon_codes)
          setLoading(false)
        }
      
      } catch(e){
         setLoading(false)
          if (e.response==undefined){
            navigate('/notfound')

          }
         
          else if (e.response.status==401){
            navigate('/signin')
          }else{
            navigate('/notfound')

          }
         
      }
    }
  return (
    <>
    {isloading && <Loading/>}
    <div className='add-coupon-code-btn'><button onClick={()=>navigate('/addcoupon')} className='bt btn-dark'>Add Coupon</button></div>
    {coupons.length!=0 ?
    <section className='coupon-code-section'>
      {errorpopup && <ErrorPopUp message={errorpopup}/>}
        <div className='container'>
            <div className='row'>

                <div className='heading'>Coupon Code</div>
                <div className='coupone-list-table'>
                  <table>
                    <thead>
                        <tr>
                            <td className='cell' >Coupon ID</td>
                            <td className='cell' >Code</td>
                            <td className='cell' >Discount Rate </td>
                            <td className='cell' >Discount Amount </td>
                            <td className='cell' >Min_Order </td>
                            <td className='cell' >Created</td>
                            <td className='cell' >Updated</td>
                            <td className='cell' >Delete</td>
                            <td className='cell' >Edit</td>
                        </tr>
                    </thead>
                    <tbody>

                      {coupons.map((value)=> <CouponItem data={value} seterror={setErrorpopup} setloading={setLoading} access_token={access_token}/>)}
                       

                        

                    </tbody>
                  </table>
                </div>
            </div>
        </div>
    </section>

    :
    <div className="coupon-not-available">  CouponCode Not added yet</div>
    }
    </>
  )
}
