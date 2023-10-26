
import shoplogo from "../../images/logo.jpg"
import "./Dashboard.css"
import moneylogo from "../../images/Money.png"
import Product from "../../images/product.png"
import Order from "../../images/Order.png"
import {useNavigate  } from "react-router-dom"
import {React,useLayoutEffect,useEffect,useState} from "react"
import {getAccessToken,resetAccessToken} from "../../store"
import {useDispatch,useSelector} from "react-redux"
import axios from "axios"
import { endpoint } from "../../backend"
import {Orderstatus} from './svg/orderstatus'
import {Couponstatus} from './svg/couponstatus'
import {Highlightstatus} from './svg/highlightstatus'
import {Categorystatus} from './svg/categorystatus'
import {Productstatus} from './svg/productstatus'
import {Loading} from "../../component/loading"
import {is_expired} from '../../component/checktokenexpire'

export const Dashboard = ()=>{
    const dispatch = useDispatch()
    const access_token = useSelector((state)=>state.getToken.value.access_token)
    const navigate = useNavigate(); 
    const [isloading,setLoading]  = useState(false)
    const [data,setData] = useState(undefined)
    const checkAdmin = async()=>{
        const config = {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          };

         try{
            const response = await axios.get(`${endpoint}/admin-panel/is-admin-exist`,config)
              if (response.status==200){
             }
              setLoading(false)
              
         }catch (error){
            if(!error.response){
            }
            else if(error.response.status==401){
                navigate('/signin')
            }
         }
    }
    useLayoutEffect(()=>{
        dispatch(getAccessToken())

        if(access_token==null){
            navigate('/signin');
        }
        else if(access_token!=""){
            if(is_expired(access_token)){
                dispatch(resetAccessToken())
                navigate('/signin')
              }else{
                checkAdmin()
                getstatitics()  
              }
           
        }
    },[access_token])

  const getstatitics = async ()=>{
        setLoading(true)
    const json={
        }
        const config = {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };
        try{
          const response = await axios.post(`${endpoint}/admin-panel/statics`,json,config);
    
          if(response.status==200){
            setLoading(false)
            const token = response.data.data; 
            setData(token)
       
            
    
          }
    
            }catch(e){  
                console.log('hi error')
                setLoading(false)
              if(e.response==undefined){
                navigate('/notfound')

              }
              else if(e.response.status==401){
                navigate('/signin')
              }else{
                navigate('/notfound')

    
              }
              
    
            }
          
    
  }
  
  if(isloading){
    return <Loading/>
  }
        

    return (
      <>
      

      {data ? 
     <section className="dashboard-section">

     <div className="container">
     <section className="product-transition-statics">
         <div className="container">
             <div className="grid">
              <div className="total-details">
                 <div className="total-profit">
                     <div>
                         <div>Total Sales🎉</div>
                         <div>₹{data.total_sales}</div>
                     </div>
                     <div className="total-sales-logo">
                         <img  src={moneylogo}/>
                     </div>
                 </div>
                 <div className="total-Product-sold">
                     <div>
                         <div>Total Product Sold 🎉</div>
                         <div>{data.total_product_sold}</div>
                     </div>
                     <div className="total-sales-logo">
                         <img  src={Product}/>
                     </div>
                 </div>
             </div>   
                 <div className="transition-statics">
                     <div className="section-heading">
                            Transactions
                     </div>

                     <div className="this-month">
                         <div className="this-month-heading">
                         This Month
                         </div>
                         <div className="statics">
                             <div className="sales-div">

                                 <div className="sales icon-div">
                                     <i class="icon fa-solid fa-arrow-trend-up">
                                         </i>
                                 </div>

                                 <div className="stat">
                                             <div>Sales</div>
                                             <div>₹{data.transactions.this_month.total_sales}</div>
                                 </div>
                             </div>

                             <div className="user-div ">

                                 <div className="user icon-div">
                                     <i class="icon fas fa-user-alt">
                                         </i>
                                 </div>

                                 <div className="stat">
                                         <div>Customers</div>
                                         <div>{data.transactions.this_month.total_cusomers}</div>
                                 </div>
                             </div>
                             

                             <div className="product-div">

                                 <div className="product icon-div">
                                     <i class="icon fa-solid fa-box">
                                         </i>
                                 </div>

                                 <div className="stat">
                                         <div>Product</div>
                                         <div>{data.transactions.this_month.total_product_sold}</div>
                                 </div>
                             </div>
                             <div className="profit-div">

                                 <div className="profit icon-div">
                                 <i class="fa-solid fa-indian-rupee-sign"></i>
                                 </div>

                                 <div className="stat">
                                         <div>Revenue</div>
                                         <div>₹{data.transactions.this_month.revenue}</div>
                                 </div>
                             </div>
                         </div>
                     </div>
                     <div className="this-day">  
                         <div className="this-day-heading">
                         Today
                         </div>
                         <div className="statics">
                             <div className="sales-div">

                                 <div className="sales icon-div">
                                     <i class=" icon fa-solid fa-arrow-trend-up">
                                         </i>
                                 </div>

                                 <div className="stat">
                                             <div>Sales</div>
                                             <div>₹{data.transactions.today.total_sales}</div>
                                 </div>
                             </div>

                             <div className="user-div ">

                                 <div className="user icon-div" >
                                     <i class="icon fas fa-user-alt">
                                         </i>
                                 </div>

                                 <div className="stat">
                                         <div>Customers</div>
                                         <div>{data.transactions.today.total_cusomers}</div>
                                 </div>
                             </div>
                             

                             <div className="product-div">

                                 <div className="product icon-div">
                                     <i class="icon fa-solid fa-box">
                                         </i>
                                 </div>

                                 <div className="stat">
                                         <div>Product</div>
                                         <div>{data.transactions.today.total_product_sold}</div>
                                 </div>
                             </div>
                             <div className="profit-div">

                                 <div className="profit icon-div">
                                 <i class="fa-solid fa-indian-rupee-sign"></i>
                                 </div>

                                 <div className="stat">
                                         <div>Revenue</div>
                                         <div>₹{data.transactions.today.revenue}</div>
                                 </div>
                             </div>                           
                             
                         </div>
                     </div>
                 </div>



                 <div className="order-monthly-day-statics">
                     
                 </div>
             </div>
         </div>
     </section>
      <section className="order-total-status-statics ">
         <div className="container">
             <div className="grid">
             <div className="total-orders">
                     <div>
                         <div>Total Orders🎉</div>
                         <div>{data.total_orders}</div>
                     </div>
                     <div className="total-sales-logo">
                         <img  src={Order}/>
                     </div>           
             </div>
                 <div className="order-status">
                 <div className="section-heading">
                            Orders
                     </div>

                     
                       
                         <div className="statics">
                             <div className="pending-div">

                                 <div className="pending icon-div">
                                  <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 502 511.82"><path fill-rule="nonzero" d="M279.75 471.21c14.34-1.9 25.67 12.12 20.81 25.75-2.54 6.91-8.44 11.76-15.76 12.73a260.727 260.727 0 0 1-50.81 1.54c-62.52-4.21-118.77-31.3-160.44-72.97C28.11 392.82 0 330.04 0 260.71 0 191.37 28.11 128.6 73.55 83.16S181.76 9.61 251.1 9.61c24.04 0 47.47 3.46 69.8 9.91a249.124 249.124 0 0 1 52.61 21.97l-4.95-12.96c-4.13-10.86 1.32-23.01 12.17-27.15 10.86-4.13 23.01 1.32 27.15 12.18L428.8 68.3a21.39 21.39 0 0 1 1.36 6.5c1.64 10.2-4.47 20.31-14.63 23.39l-56.03 17.14c-11.09 3.36-22.8-2.9-26.16-13.98-3.36-11.08 2.9-22.8 13.98-26.16l4.61-1.41a210.71 210.71 0 0 0-41.8-17.12c-18.57-5.36-38.37-8.24-59.03-8.24-58.62 0-111.7 23.76-150.11 62.18-38.42 38.41-62.18 91.48-62.18 150.11 0 58.62 23.76 111.69 62.18 150.11 34.81 34.81 81.66 57.59 133.77 61.55 14.9 1.13 30.23.76 44.99-1.16zm-67.09-312.63c0-10.71 8.69-19.4 19.41-19.4 10.71 0 19.4 8.69 19.4 19.4V276.7l80.85 35.54c9.8 4.31 14.24 15.75 9.93 25.55-4.31 9.79-15.75 14.24-25.55 9.93l-91.46-40.2c-7.35-2.77-12.58-9.86-12.58-18.17V158.58zm134.7 291.89c-15.62 7.99-13.54 30.9 3.29 35.93 4.87 1.38 9.72.96 14.26-1.31 12.52-6.29 24.54-13.7 35.81-22.02 5.5-4.1 8.36-10.56 7.77-17.39-1.5-15.09-18.68-22.74-30.89-13.78a208.144 208.144 0 0 1-30.24 18.57zm79.16-69.55c-8.84 13.18 1.09 30.9 16.97 30.2 6.21-.33 11.77-3.37 15.25-8.57 7.86-11.66 14.65-23.87 20.47-36.67 5.61-12.64-3.13-26.8-16.96-27.39-7.93-.26-15.11 4.17-18.41 11.4-4.93 10.85-10.66 21.15-17.32 31.03zm35.66-99.52c-.7 7.62 3 14.76 9.59 18.63 12.36 7.02 27.6-.84 29.05-14.97 1.33-14.02 1.54-27.9.58-41.95-.48-6.75-4.38-12.7-10.38-15.85-13.46-6.98-29.41 3.46-28.34 18.57.82 11.92.63 23.67-.5 35.57zM446.1 177.02c4.35 10.03 16.02 14.54 25.95 9.96 9.57-4.4 13.86-15.61 9.71-25.29-5.5-12.89-12.12-25.28-19.69-37.08-9.51-14.62-31.89-10.36-35.35 6.75-.95 5.03-.05 9.94 2.72 14.27 6.42 10.02 12 20.44 16.66 31.39z"/></svg>
                                 </div>

                                 <div className="stat">
                                             <div>Pending</div>
                                             <div>{data.orders.pending}</div>
                                 </div>
                             </div>

                             <div className="confirmed-div ">

                                 <div className="confirmed icon-div">
                                     <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 128 160" x="0px" y="0px"><title>miscellaneous 53 solid</title><path d="M15,8V120a8.01066,8.01066,0,0,0,8,8h82a8.01066,8.01066,0,0,0,8-8V8a8.01062,8.01062,0,0,0-8-8H23A8.01062,8.01062,0,0,0,15,8Zm8,14a2,2,0,0,1,4,0v4a2,2,0,0,1-4,0Zm0,12a2,2,0,0,1,4,0v4a2,2,0,0,1-4,0Zm0,12a2,2,0,0,1,4,0v4a2,2,0,0,1-4,0Zm0,12a2,2,0,0,1,4,0v4a2,2,0,0,1-4,0Zm0,12a2,2,0,0,1,4,0v4a2,2,0,0,1-4,0Zm0,12a2,2,0,0,1,4,0v4a2,2,0,0,1-4,0Zm0,12a2,2,0,0,1,4,0v4a2,2,0,0,1-4,0Zm2,18a2.00591,2.00591,0,0,1-2-2v-4a2,2,0,0,1,4,0v4A2.00591,2.00591,0,0,1,25,112Zm8,8H29a2,2,0,0,1,0-4h4a2,2,0,0,1,0,4Zm12,0H41a2,2,0,0,1,0-4h4a2,2,0,0,1,0,4Zm12,0H53a2,2,0,0,1,0-4h4a2,2,0,0,1,0,4Zm12,0H65a2,2,0,0,1,0-4h4a2,2,0,0,1,0,4Zm12,0H77a2,2,0,0,1,0-4h4a2,2,0,0,1,0,4Zm12,0H89a2,2,0,0,1,0-4h4a2,2,0,0,1,0,4Zm2-14H33.5a2,2,0,0,1,0-4H95a2,2,0,0,1,0,4ZM39.4,46H33.5a2,2,0,0,1,0-4h9.41A31.02948,31.02948,0,0,0,39.4,46ZM64,37.5A26.5,26.5,0,1,1,37.5,64,26.5328,26.5328,0,0,1,64,37.5ZM33.5,62h.07c-.04.66-.07,1.33-.07,2s.03,1.34.07,2H33.5a2,2,0,0,1,0-4Zm0,20h5.9A31.03357,31.03357,0,0,0,42.91,86H33.5a2,2,0,0,1,0-4ZM95,86H85.09A31.03357,31.03357,0,0,0,88.6,82H95a2,2,0,0,1,0,4Zm0-20h-.57c.04-.66.07-1.33.07-2s-.03-1.34-.07-2H95a2,2,0,0,1,0,4Zm0-20H88.6A31.02948,31.02948,0,0,0,85.09,42H95a2,2,0,0,1,0,4Zm10,70a2,2,0,0,1-4,0v-4a2,2,0,0,1,4,0Zm0-12a2,2,0,0,1-4,0v-4a2,2,0,0,1,4,0Zm0-12a2,2,0,0,1-4,0V88a2,2,0,0,1,4,0Zm0-12a2,2,0,0,1-4,0V76a2,2,0,0,1,4,0Zm0-12a2,2,0,0,1-4,0V64a2,2,0,0,1,4,0Zm0-12a2,2,0,0,1-4,0V52a2,2,0,0,1,4,0Zm0-12a2,2,0,0,1-4,0V40a2,2,0,0,1,4,0Zm0-12a2,2,0,0,1-4,0V28a2,2,0,0,1,4,0Zm0-16v4a2,2,0,0,1-4,0V16a2,2,0,0,1,4,0ZM97,8h4a2,2,0,0,1,0,4H97a2,2,0,0,1,0-4ZM85,8h4a2,2,0,0,1,0,4H85a2,2,0,0,1,0-4ZM73,8h4a2,2,0,0,1,0,4H73a2,2,0,0,1,0-4ZM61,8h4a2,2,0,0,1,0,4H61a2,2,0,0,1,0-4ZM49,8h4a2,2,0,0,1,0,4H49a2,2,0,0,1,0-4ZM37,8h4a2,2,0,0,1,0,4H37a2,2,0,0,1,0-4ZM33,22H94.5a2,2,0,0,1,0,4H33a2,2,0,0,1,0-4ZM27,8h2a2,2,0,0,1,0,4H27v2a2,2,0,0,1-4,0V12A3.99887,3.99887,0,0,1,27,8Z"/><path d="M45.57,67.4l9.34,9.5a1.96835,1.96835,0,0,0,1.42.6,2.01286,2.01286,0,0,0,1.27-.45l22.66-18.5a1.99752,1.99752,0,1,0-2.52-3.1L56.48,72.8l-8.05-8.2a2.00122,2.00122,0,0,0-2.86,2.8Z"/></svg>
                                 </div>

                                 <div className="stat">
                                         <div>Confirmed</div>
                                         <div>{data.orders.confirmed}</div>
                                 </div>
                             </div>
                             

                             <div className="shipped-div">

                                 <div className="shipped icon-div">
                                      <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 100 125" x="0px" y="0px"><title>128all</title><path d="M91.16,33.73a8.94,8.94,0,0,0-7.64-4.25H65.78V23.67a8,8,0,0,0-8-8H9.33a8,8,0,0,0-8,8V67.2a8,8,0,0,0,8,8h4.12a12.11,12.11,0,0,0,23.47,0H67.14a12.11,12.11,0,0,0,23.47,0h5.06a3,3,0,0,0,3-3V46.67a3,3,0,0,0-.45-1.58Zm-66,44.6a6.13,6.13,0,1,1,6.13-6.12A6.13,6.13,0,0,1,25.18,78.33ZM49.9,35.09l-17,17a3,3,0,0,1-4.12.11l-9.49-8.49a3,3,0,1,1,4-4.47l7.38,6.6,15-15a3,3,0,0,1,4.24,4.24Zm15.88.38H83.51a3,3,0,0,1,2.55,1.42l4.29,6.9H65.78ZM78.87,78.33A6.13,6.13,0,1,1,85,72.2,6.13,6.13,0,0,1,78.87,78.33Zm13.8-9.12H90.61a12.11,12.11,0,0,0-23.47,0H65.78V49.79H92.67Z"/></svg>
                                 </div>

                                 <div className="stat">
                                         <div>Shipped</div>
                                         <div>{data.orders.shipped}</div>
                                 </div>
                             </div>
                             <div className="completed-div">

                                 <div className="completed icon-div">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><title>ionicons-v5-e</title><polyline points="465 127 241 384 149 292" style={{fill:"none",stroke:"white",strokeLinecap:"square",strokeMiterlimit:10,strokeWidth:"44px"}}/><line x1="140" y1="385" x2="47" y2="292" style={{fill:"none",stroke:"white",strokeLinecap:"square",strokeMiterlimit:10,strokeWidth:"44px"}}/><line x1="363" y1="127" x2="236" y2="273" style={{fill:"none",stroke:"white",strokeLinecap:"square",strokeMiterlimit:10,strokeWidth:"44px"}}/></svg>                                     </div>

                                 <div className="stat">
                                         <div>Completed</div>
                                         <div>{data.orders.completed}</div>
                                 </div>
                             </div>

                             <div className="cancelled-div">

                                 <div className="cancelled icon-div">
                                 
                                 <svg
                                 
                                 version="1.1"
                                 id="Layer_1"
                                 xmlns="http://www.w3.org/2000/svg"
                                 xmlnsXlink="http://www.w3.org/1999/xlink"
                                 viewBox="0 0 496 496"
                                 xmlSpace="preserve"
                                 >
                                 <path
                                     style={{ fill: '#CE0909' }}
                                     d="M496,320.8c0,96.8-78.4,175.2-175.2,175.2H175.2C78.4,496,0,417.6,0,320.8V175.2C0,78.4,78.4,0,175.2,0h145.6C417.6,0,496,78.4,496,175.2V320.8z"
                                 />
                                 <path
                                     style={{ fill: '#B70000' }}
                                     d="M0,175.2C0,78.4,78.4,0,175.2,0h145.6C417.6,0,496,78.4,496,175.2v145.6c0,96.8-78.4,175.2-175.2,175.2"
                                 />
                                 <g>
                                     <path
                                     style={{ fill: '#960000' }}
                                     d="M320.8,0C417.6,0,496,78.4,496,175.2v145.6c0,96.8-78.4,175.2-175.2,175.2"
                                     />
                                     <path
                                     style={{ fill: '#960000' }}
                                     d="M264.8,262.4l67.2-67.2c4.8-4.8,4.8-12,0-16.8s-12-4.8-16.8,0L248,245.6l-67.2-67.2
                                     c-4.8-4.8-12-4.8-16.8,0s-4.8,12,0,16.8l67.2,67.2L164,329.6c-4.8,4.8-4.8,12,0,16.8c2.4,2.4,5.6,3.2,8,3.2s5.6-0.8,8-3.2
                                     l67.2-67.2l67.2,67.2c2.4,2.4,5.6,3.2,8,3.2s5.6-0.8,8-3.2c4.8-4.8,4.8-12,0-16.8L264.8,262.4z"
                                     />
                                 </g>
                                 <path
                                     style={{ fill: '#FFFFFF' }}
                                     d="M264.8,248l67.2-67.2c4.8-4.8,4.8-12,0-16.8s-12-4.8-16.8,0L248,231.2L180.8,164
                                     c-4.8-4.8-12-4.8-16.8,0s-4.8,12,0,16.8l67.2,67.2L164,315.2c-4.8,4.8-4.8,12,0,16.8c2.4,2.4,5.6,3.2,8,3.2s5.6-0.8,8-3.2l67.2-67.2
                                     l67.2,67.2c2.4,2.4,5.6,3.2,8,3.2s5.6-0.8,8-3.2c4.8-4.8,4.8-12,0-16.8L264.8,248z"
                                 />
                                 </svg>

                                 </div>

                                 <div className="stat">
                                         <div>cancelled  </div>
                                         <div>{data.orders.cancelled}</div>
                                 </div>
                             </div>
                         </div>
                    
                 </div>
             </div>
         </div>
      </section>
      <section  className="order-category-product-status-section">
         <div className="container">
           <div className="grid">
           <div className="heading">
             Status
             </div> 
         <div className="statics">
         <div className="order-div">

             <div className="orders icon-div">
                 <Orderstatus/>
                      
             
               </div>

             <div className="stat">
                     <div>Orders</div>
                     <div>{data.total_orders}</div>
             </div>
         </div>

         <div className="product-div">

                 <div className="products icon-div">
                     <Productstatus/>
                     </div>
                 <div className="stat">
                         <div>Products</div>
                         <div>{data.total_products}</div>
                 </div>
         </div>

         <div className="category-div">

                 <div className="categories icon-div">
                     <Categorystatus/>
             </div>
                 <div className="stat">
                         <div>Categories</div>
                         <div>{data.total_categories}</div>
                 </div>
         </div>

         <div className="coupon-div">

                 <div className="coupons icon-div">
                   <Couponstatus />                     
                     </div>

                 <div className="stat">
                         <div>Coupons</div>
                         <div>{data.total_coupons}</div>
                 </div>
         </div>

         <div className="highlight-div">

                 <div className="highlights icon-div">
                 <Highlightstatus/>

           </div>
                 <div className="stat">
                         <div>Highlights</div>
                         <div>{data.total_highlights}    </div>
                 </div>
         </div>
         </div>
           </div>

         </div>
       

      </section>

      {/*  ------------------------------------------------------------------------------------------ */}
      <section  className="order-category-product-buttons-section">
         <div className="container">
           <div className="buttons">
            
             <div className="show-orders">
                <button onClick={()=>navigate('/allorders/1')}  className="btn btn-secondary">Show Orders</button>
             </div>
             <div className="show-products">
             <button onClick={()=>navigate('/allproduct/1')}  className="btn btn-warning">Show Products</button>

             </div>
             <div className="show-category">
             <button onClick={()=>navigate('/allcategory')}  className="btn btn-primary">Show Categories</button>

             </div>

             <div className="show-couponcode">
             <button  onClick={()=>navigate('/allcouponcode')}  className="btn btn-info">Show Coupon Code</button>

             </div>

             <div className="show-highlight">
             <button onClick={()=>navigate('/allhighlights')}  className="btn btn-dark">Show Highlights</button>

             </div>

           </div>
         </div>
       

      </section>

      <section  className="policy-deliverychargge-bankdetails-control-section">
         <div className="container">
           <div className="buttons">
            
             <div className="show-policy">
                <button onClick={()=>navigate('/policy-details-control')}  className="btn btn-secondary">Control Policies</button>
             </div>
             <div className="show-delivery-charge">
             <button onClick={()=>navigate('/delivery-charge-control')}  className="btn btn-warning">Control Delivery Charge</button>

             </div>
             <div className="show-bank-details">
             <button onClick={()=>navigate('bank-details-control')}  className="btn btn-primary">Control Bank Details</button>

             </div>
             <div className="show-payment-option">
             <button onClick={()=>navigate('/payment-mode-control')}  className="btn btn-info">Control payment mode</button>

             </div>
             

           </div>
         </div>
       

      </section>
      </div>
      </section>  
      :
      <div>Data Not Exist (May be Request error or Data reading error) Try again later</div>
    } 
       
        </>
    )
}