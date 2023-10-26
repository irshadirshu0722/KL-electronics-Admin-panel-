import {React,useState,useLayoutEffect} from 'react'
import "./showOrders.css"
import {OrderDetailsCard} from "./component/OrderDetals"
import {useParams,useNavigate,Link} from "react-router-dom"
import {getAccessToken,resetAccessToken} from "../../store"
import {useDispatch,useSelector} from "react-redux"
import axios from "axios"
import { endpoint } from "../../backend"
import {Loading} from "../../component/loading"
import {ErrorPopUp} from "../../component/errorpopup"
import {is_expired} from '../../component/checktokenexpire'

export const ShowOrders = ()=>{
    const {page_no} = useParams()

    const [orders,setOrders] = useState([])
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
        getOrdersDetails()
      }
      
    }
    
   
},[access_token,page_no])

   const  getOrdersDetails = async ()=>{
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
        const response = await axios.post(`${endpoint}/admin-panel/orders-list`,json,config)
        if(response.status===200){
       
          setOrders(response.data.data.orders)
          setButtonState(response.data.data.button_state)
          
          setLoading(false)
        }
       
      } catch(e){ 
         setLoading(false)
          if (e.response===undefined){
            navigate('/notfound')
          }
          
          else if (e.response.status===401){
            navigate('/signin')
          }else{
            navigate('/notfound')

          }
        
      }
    
   }
    return (
        <>
        {isloading && <Loading />}
        <section className="show-orders-section">
            {errorpopup && <ErrorPopUp message={errorpopup} />}
            <div className="container">
                <div className="grid">
                    <div className="heading">Orders</div>
                    <div className="all-order-heading">
                        <div className="page-heading">
                        
                        <div className="page-count">Page : {page_no}</div>
                        </div>
                        
                    </div>

                    <div className="total-orders">

                        <table>
                            <thead>

                                <tr>
                                    
                                    <td>Order ID</td>
                                    <td>User Name</td>
                                    <td>Date</td>
                                    <td>Price</td>
                                    <td>Profit</td>

                                    <td>View</td>
                                    <td>status</td>

                                </tr>

                            </thead>
                            <tbody>
                                {orders.map((value,idx)=><OrderDetailsCard data={value}/>)}
                            
                                
                            </tbody>
                        </table>
                        <div className='prev-next-btn'>

                                         <div >
                                {buttonstate.prev_button &&
                                     
                                     <Link to={`/allorders/${ parseInt(page_no)-1}`} className="btn btn-dark">Preview</Link>
                                 
                                    }
                                </div>

                                    <div>
                                 {buttonstate.next_button && 
                                   
                                     <Link to={`/allorders/${parseInt(page_no)+1}`} className="btn btn-dark">Next</Link>
                                 
                                } 
                                   </div>
                        </div>
                    </div>
                </div>


            </div>
        </section>
        </>
    )
}