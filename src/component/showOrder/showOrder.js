import "./showOrder.css"
import{OrderCard} from "./component/OrderCard"
import{OrderControl} from "./component/OrderControl"
import {useNavigate ,useParams  } from "react-router-dom"
import {React,useLayoutEffect,useEffect,useState,useRef} from "react"
import {getAccessToken,resetAccessToken} from "../../store"
import {useDispatch,useSelector} from "react-redux"
import {Loading} from "../../component/loading"
import {ErrorPopUp} from "../../component/errorpopup"
import {SuccessPopUp} from "../../component/success message "

import {is_expired} from '../../component/checktokenexpire'
import axios from "axios"
import { endpoint } from "../../backend"
import {dateConveter} from '../../component/dateconvert'
export const ShowOrder = ()=>{
    const {order_id} = useParams()
    const dispatch = useDispatch()
    const access_token = useSelector((state)=>state.getToken.value.access_token)
    const navigate = useNavigate();
    const [order,setOrder] = useState({}) 
    const [isloading,setLoading] = useState(true)
    const [errorpopup,setErrorpopup] = useState("")
    const [profit,setProfit] = useState(0)
    const [successpop,setSuccessPopup] = useState("")
    const [windowreload,setwindowreload] = useState(0)
    const [trackingId,setTrackingId] = useState('')



    useLayoutEffect(()=>{
        dispatch(getAccessToken())
    
        if(access_token==null){
        navigate('/signin');
        }
        else if (access_token != ""){
          if(is_expired(access_token)){
            dispatch(resetAccessToken())
            navigate('/signin')
          }else{
            getOrder()
            //  script() 
    
          }
         
        }
       
    },[access_token,windowreload])

    const getOrder = async ()=>{
        setLoading(true)
        setErrorpopup('')
        const json = {
          order_id:order_id
        }
        const config = {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };
        
        try{
              const response = await axios.post(`${endpoint}/admin-panel/get-order`,json,config);
    
              if(response.status==200){
                setOrder(response.data.data)
                setLoading(false)
                setProfit(response.data.data.profit)
              }
    
        }catch(e){
          if(e.response==undefined){
           
            navigate('/notfound')
    
          }else if (e.response.status==401){
            navigate('/signin')
          }else{
    
            navigate('/notfound')
          }
          setLoading(false)
          
        }
    
    
      }
      const onProfitSubmit = async (e)=>{
        e.preventDefault(); 
        setLoading(true)
        setErrorpopup('')
        const json = {
          order_id:order_id,
          profit:profit
        }
        const config = {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };
        
        try{
              const response = await axios.post(`${endpoint}/order/admin/order-profit-set`,json,config);
              setLoading(false)
              if(response.status==200){
                setSuccessPopup("Profit Changed successfully")
                setwindowreload(windowreload+1)
              }
    
        }catch(e){
          setLoading(false)
          if(e.response==undefined){
           
            navigate('/notfound')
    
          }else if (e.response.status==401){
            navigate('/signin')
          }else{
    
            navigate('/notfound')
          }
       
          
        }
      }
      const onTrackingIdSubmit = async (e)=>{
        e.preventDefault(); 
        setLoading(true)
        setErrorpopup('')
        const json = {
          order_id:order_id,
          tracking_id:trackingId
        }
        const config = {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };
        try{
              const response = await axios.post(`${endpoint}/order/admin/order-tracking-id-set`,json,config);
              setLoading(false)
              if(response.status==200){
                setSuccessPopup("Tracking id Addedd  successfully")
                setwindowreload(windowreload+1)
              }
    
        }catch(e){
          setLoading(false)
          if(e.response==undefined){
           
            navigate('/notfound')
    
          }else if (e.response.status==401){
            navigate('/signin')
          }else{
    
            navigate('/notfound')
          }
       
          
        }
      }
    return (
        <>
        {isloading && <Loading />}
        {order.user && 
        <> 
        <section className="show-order-section">
            {errorpopup && <ErrorPopUp message={errorpopup}/>}
            {successpop && <SuccessPopUp message={successpop}/>}
            <div className="container">
                <div className="flex">
                  <div className="heading">Order ID:#{order.order_id}</div>



              
                < OrderControl setloading={setLoading} profit={order.profit} tracking_id={order.tracking_id} status={order.status.toLowerCase()} id={order.order_id}/>
                
                {(order?.status).toLowerCase() === 'confirmed' && 
                <div className="order-tracking-id-add-section">
                <div className="container">
                  <form onSubmit={onTrackingIdSubmit}> 
                  <input type="text" placeholder="Tracking ID with Provider" onChange={(e)=>setTrackingId(e.target.value)}/>
                  <button type="submit" className="btn btn-dark"> Add Tracking ID</button>

                 </form>
                  
                </div>
                
                </div>
                }
                
                <div className="order-profit-add-section">
                  <div className="container">
                      <form onSubmit={onProfitSubmit}> 
                    <input type="number" max={order?.total && parseInt(order?.total)} placeholder="Profit" onChange={(e)=>setProfit(e.target.value)}  required value={profit}/>
                    <button type="submit" className="btn btn-dark"> Add Profit</button>

                   </form>
                    
                  </div>
                  
                  </div>     
                <div className="order-status">
                    <table>
                        <tbody>
                           <tr>
                                <td className="table-cell">User </td>
                                <td className="table-cell">{order.user.username}</td>
                            </tr>
                            <tr>
                                <td className="table-cell">Date</td>

                                <td className="table-cell">{dateConveter(order.order_at)}</td>
                            </tr>
                            <tr>
                                <td className="table-cell">status</td>
                                <td className="table-cell">{order.status}</td>
                            </tr>
                            <tr>
                                <td className="table-cell">Payment Mode</td>
                                <td className="table-cell">{order.payment_details.provider}</td>
                            </tr>

                            <tr>
                                <td className="table-cell">Total</td>
                                <td className="table-cell">{order.total}₹ for {order.quantity} items</td>
                            </tr>
                              <tr>
                                <td className="table-cell">Profit</td>
                                <td className="table-cell">{order.profit}₹</td>
                            </tr>
                            <tr>
                                <td className="table-cell">Tracking ID</td>
                                <td className="table-cell">{order?.tracking_id ? order?.tracking_id :"Not yet added"}</td>
                            </tr>
                            
                            
                        </tbody>
                    </table>
                </div>







                <div className="your-order">
                    <div className="center">
                      <h1>Order Details</h1>
                            <table>
                                <thead>
                                    <tr>
                                    <td className="table-cell">Product</td>
                                    <td className="table-cell">Price</td>
                                    </tr>
                                </thead>
                                <tbody>
                                {order.order_items.map((value,idx)=><OrderCard data={value}/>)}
                                
                                    <tr className="subtotal">
                                        <td className="table-cell">
                                        Subtotal
                                        
                                        </td>
                                        <td className="table-cell">
                                        {order.subtotal}₹

                                        </td>
                                    </tr>
                                    <tr >
                                        <td className="table-cell">
                                        Delivery charge
                                        
                                        </td>
                                        <td className="table-cell" >
                                       {order.deliverycharge}₹  

                                        </td>
                                    </tr>
                                    {order.discount_code &&
                                    <>
                                            <tr>
                                                <td className="table-cell">
                                                Discount Code
                                                
                                                </td>
                                                <td className="table-cell" >
                                            {order.discount_code}₹  

                                                </td>
                                            </tr>
                                            {order.discount_rate!=0 &&
                                            <tr>
                                                  <td className="table-cell">
                                                        Discount Rate
                                            
                                             </td>
                                               <td className="table-cell" >
                                            {order.discount_rate}% 

                                                  </td>
                                              </tr>
                                                }
                                                {order.discount_amount!=0 &&
                                            <tr>
                                                  <td className="table-cell">
                                                        Discount Amount
                                            
                                             </td>
                                               <td className="table-cell" >
                                            {order.discount_amount}% 

                                                  </td>
                                              </tr>
                                                }
                                   
                                   </>   
                                        }
                                    <tr>
                                                <td className="table-cell">
                                                Discount
                                                
                                                </td>
                                                <td className="table-cell" >
                                            {order.discount}₹

                                                </td>
                                            </tr>  
                                    <tr className="order-total total">
                                        <td className="table-cell">
                                        Total	
                                        
                                        </td>
                                        <td className="table-cell">
                                        {order.total}₹ 
                                                
                                        </td>
                                    </tr>
                                </tbody>
                                </table>
                            </div>
                    </div>  
        

                    <div className="payment-details">
                       <div className="center">
                          <h1>Payment Details</h1>
                              <table>
                                <thead>
                                    <tr>
                                    <td className="table-cell">Amount</td>
                                    <td className="table-cell">{order.payment_details.amount}₹</td>
                                    </tr>
                                </thead>
                                <tbody>
                                
                                
                                    <tr>
                                        <td className="table-cell">
                                        Payment ID
                                        
                                        </td>
                                        <td className="table-cell">
                                        {order.payment_details.payment_id}

                                        </td>
                                    </tr>
                                    <tr >
                                        <td className="table-cell">
                                        provider
                                        
                                        </td>
                                        <td className="table-cell" >
                                        {order.payment_details.provider} 

                                        </td>
                                    </tr>
                                    <tr className="subtotal">
                                        <td className="table-cell">
                                        Date
                                        
                                        </td>
                                        <td className="table-cell">
                                        { dateConveter(order.payment_details.payment_at)}

                                        </td>
                                    </tr>
                                    <tr className="order-total total">
                                        <td className="table-cell">
                                        status	
                                        
                                        </td>
                                        <td className="table-cell">
                                            {order.payment_details.status}    
                                        </td>
                                    </tr>
                                </tbody>
                                </table>
                            </div>
                    </div> 
              
                    <div className="address-table">
                        <div className="center">
                       <h1>Address</h1>

                        <table>
                            <tbody>
                                {order.billing_address && 
                                <>
                                 <tr>

                                    <td  className="table-cell" >Billing Address</td>

                                        
                                    </tr>
                                    <tr>
                                        <td className="table-cell" >

                                        <p>{order.billing_address.first_name} {order.billing_address.last_name}</p>
                                        <p>{order.billing_address.street_address}</p>
                                        <p>{order.billing_address.city}</p>  
                                        <p>{order.billing_address.district}</p>  

                                        <p>{order.billing_address.pincode}</p>   
                                        <p>{order.billing_address.state}</p>
                                        <p>{order.billing_address.phoneno}</p>
                                        <p>{order.billing_address.email}</p>


                                        </td>
                                    </tr>
                                </>
                                }
                               
                                <tr >
                                <td className="table-cell" >Shipping Address</td>
                                </tr>
                                <tr>
                                  <td className="table-cell" >
                                  <p>{order.shipping_address.first_name} {order.shipping_address.last_name}</p>
                                <p>{order.shipping_address.street_address}</p>
                                <p>{order.shipping_address.city}</p>  
                                <p>{order.shipping_address.district}</p>  

                                <p>{order.shipping_address.pincode}</p>   
                                <p>{order.shipping_address.state}</p>
                                <p>{order.shipping_address.phoneno}</p>
                                <p>{order.shipping_address.email}</p>
                                  </td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                 </div>
                
                
                
                </div>
            </div>
        </section>
        </>
        }
        
        </>
    )
}