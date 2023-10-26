import "./delibverychargecrl.css"


import {useState,useLayoutEffect} from 'react'
import {useNavigate   } from "react-router-dom"

import {getAccessToken,resetAccessToken } from "../../store"
import {is_expired} from '../checktokenexpire'
import {Loading} from "../../component/loading"
import {ErrorPopUp} from "../../component/errorpopup"
import axios from 'axios'
import {endpoint} from "../../backend"
import {useDispatch,useSelector} from "react-redux"

export const DeliveryChargeControl = ()=>{
    const dispatch = useDispatch()
    const access_token = useSelector((state)=>state.getToken.value.access_token)
    const navigate = useNavigate();
    const [deliverychargeinput, setdeliverychargeinput] = useState({

        "inside_kerala": 0,
        "outside_kerala":0,

    })
    const [deliverychargedata, setdeliverychargedata] = useState({

        "inside_kerala": 0,
        "outside_kerala":0,

    })
    
  
    const [isloading,setLoading] = useState(true)
    const [errorpopup,setErrorpopup] = useState("")
  
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
            getdeliverychargedetails()
          }
         
        }
       
    },[access_token])

    const getdeliverychargedetails = async ()=>{
            const json = {
           
            }
            const config = {
            headers: {
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            },
            };
            
            try{
            
            const response = await axios.post(`${endpoint}/admin-panel/delivery-charge-data    `,json,config)
            setLoading(false)
            if (response.status==200){
                setdeliverychargeinput(response.data.data)
                setdeliverychargedata(response.data.data)
            }

            }catch (error){  
                setLoading(false)
            if (error.response==undefined){
                setErrorpopup("request failed")
            }else{
                navigate('/notfound')
                }
              
            
            }
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setdeliverychargeinput({ ...deliverychargeinput, [name]: value });
    };

      const handleSubmit =async (e) => {
        e.preventDefault();
        setLoading(true)
        
        const config = {

            headers: {
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json'
                },
            }
            
            try{
            
            const response = await axios.post(`${endpoint}/admin-panel/delivery-charge-control`,deliverychargeinput,config)
            setLoading(false)
            if (response.status==200){
                navigate('/')

            }

            }catch (error){  
                setLoading(false)
            if (error.response==undefined){
                setErrorpopup("request failed")
            }else{
                navigate('/notfound')
                }
              
            
            }
    
      };
      if(isloading){
        return <Loading/>
      }
  return (
    <section className="delivery-charge-details-control-section">
        {errorpopup && <ErrorPopUp message={errorpopup} />}
        <div className="container">
            <div className="row" style={{color:"white"}}>
               <div className="delivery-charge-status-table">
                 <table>
                    
                    <tbody>
                       <tr>
                            <td>Inside Kerala</td>
                            <td>{deliverychargedata.inside_kerala}</td>
                       </tr>
                       <tr>
                            <td>Outside Kerala</td>
                            <td>{deliverychargedata.outside_kerala}</td>
                       </tr>
                       
                    </tbody>
                 </table>
               </div>

               <div className='delivery-charge-control'>
               <form onSubmit={handleSubmit}>
                      <div>
                        <label>Inside kerala:</label>
                        <input
                            type="number"
                            name="inside_kerala"
                            value={deliverychargeinput.inside_kerala}
                            onChange={handleChange}
                        />
                        </div>
                        <div>
                        <label>Outside kerala:</label>
                        <input
                            type="text"
                            name="outside_kerala"
                            value={deliverychargeinput.outside_kerala}
                            onChange={handleChange}
                        />
                        </div>
                        
                        
                        
                        
                        
                        <button type="submit" className="btn btn-dark">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
  )
}