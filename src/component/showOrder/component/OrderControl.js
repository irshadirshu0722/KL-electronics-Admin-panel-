import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import axios from "axios"
import {useState} from "react"

import { endpoint } from "../../../backend"
import {ErrorPopUp} from "../../../component/errorpopup"
export const OrderControl = (props)=>{
    
    const {status,id,setloading}  =  props
    const navigate = useNavigate();
    const access_token = useSelector((state)=>state.getToken.value.access_token)
    const [errorpopup,setErrorpopup] = useState("")

    const onAction = async(action)=>{
      setloading(true)
      const json={
        order_id:id
      }
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };
        try{
            const response = await axios.post(`${endpoint}/order/admin/order-status-${action}-order`,json,config);
            setloading(false)
            if(response.status===200){
             
             window.location.reload()
            
      
            }

        }catch(e){
          setloading(false)
            if(e.response===undefined){
            
            setErrorpopup("Request  Failed try again later")

            }else if (e.response.status===401){
            navigate('/signin')
            }else{

            navigate('/notfound')
            }
         
            
        }
    }
    
    return (
        <>
      
        {errorpopup && <ErrorPopUp message={errorpopup}/>}
        <div className="order-control" style={{display:"flex",gap:"20px"}}>
        {status === 'pending' && (
            <>
       
        <button type="button" className="btn btn-primary" onClick={()=>onAction("confirm")}>Confirm Order</button>
        <button type="button" className="btn btn-danger" onClick={()=>onAction("cancel")}>Cancel Order</button>
        </>
        )}
        {status === 'confirmed' && (
            <>
        <button type="button" disabled={props.tracking_id ? false :true} className="btn btn-info" onClick={()=>onAction("ship")}> Ship Order</button>
        <button  type="button" className="btn btn-danger" onClick={()=>onAction("cancel")}>Cancel Order</button>
        </>

        )}
        {status === 'shipped' && (
        <>
        <button type="button" disabled={props.profit===0 ? true :false} className="btn btn-success" onClick={()=>onAction("complete")}>Complete Order</button>
        <button  type="button" className="btn btn-danger" onClick={()=>onAction("cancel")}>Cancel Order</button>
        </>
        
        )}
        
    </div>
    </>
    )
}