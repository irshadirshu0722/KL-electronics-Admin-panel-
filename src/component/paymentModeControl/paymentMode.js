import "./paymentmode.css"


import {useState,useLayoutEffect} from 'react'
import {useNavigate   } from "react-router-dom"

import {getAccessToken,resetAccessToken } from "../../store"
import {is_expired} from '../checktokenexpire'
import {Loading} from "../../component/loading"
import axios from 'axios'
import {endpoint} from "../../backend"
import {useDispatch,useSelector} from "react-redux"

export const PaymentModeControl = ()=>{
    const dispatch = useDispatch()
    const access_token = useSelector((state)=>state.getToken.value.access_token)
    const navigate = useNavigate();
    const [PaymentModeState, setPaymentModeState] = useState({})
    const [directTransferEnabled, setDirectTransferEnabled] = useState(false);
    const [onlinePaymentEnabled, setOnlinePaymentEnabled] = useState(false);
    const [cashOnDeliveryEnabled, setCashOnDeliveryEnabled] = useState(false);
  
    const [isloading,setLoading] = useState(true)
  
    useLayoutEffect(()=>{
        dispatch(getAccessToken())
  
        if(access_token===null){
  
          navigate('/signin');
        }
        else if (access_token !== ""){
          if(is_expired(access_token)){
            dispatch(resetAccessToken())
            navigate('/signin')
          }else{
            getpaymentModedetails()
          }
         
        }
       
    },[access_token])

        const getpaymentModedetails = async ()=>{
            const json = {
           
            }
            const config = {
            headers: {
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            },
            };
            
            try{
            
            const response = await axios.post(`${endpoint}/admin-panel/payment-mode-data    `,json,config)
            setLoading(false)
            if (response.status===200){
                setPaymentModeState(response.data.data)
                setDirectTransferEnabled(response.data.data.direct_bank_transfer)
                setOnlinePaymentEnabled(response.data.data.online_payment)
                setCashOnDeliveryEnabled(response.data.data.cash_own_delivery)
            }

            }catch (error){  
                setLoading(false)
            
                navigate('/notfound')
                
              
            
            }
    }
    const handlePaymentModeChange = (mode, value) => {
        switch (mode) {
          case 'directTransfer':
            setDirectTransferEnabled(value);
            break;
          case 'onlinePayment':
            setOnlinePaymentEnabled(value);
            break;
          case 'cashOnDelivery':
            setCashOnDeliveryEnabled(value);
            break;
          default:
            break;
        }
      };

      const handleSubmit =async (e) => {
        e.preventDefault();
        setLoading(true)
        const json = {
            direct_bank_transfer:directTransferEnabled,
            cash_own_delivery:onlinePaymentEnabled,
            online_payment:cashOnDeliveryEnabled,
        };
        const config = {
            headers: {
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            },
            };
            
            try{
            
            const response = await axios.post(`${endpoint}/admin-panel/payment-mode-control`,json,config)
            setLoading(false)
            if (response.status===200){
                navigate('/')

            }

            }catch (error){  
                setLoading(false)
            
                navigate('/notfound')
            }
              
            
            
    
      };
      if(isloading){
        return <Loading/>
      }
  return (
    <section className="payment-mode-control-section">
        <div className="container">
            <div className="row" style={{color:"white"}}>
               <div className="payment-status-table">
                 <table>
                    <thead>
                        <tr>
                            <td>
                                Payment Mode
                            </td>
                            <td>
                                Status
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                       <tr>
                        <td>Direct Bank Transfer</td>
                        <td>{PaymentModeState.direct_bank_transfer ? "Enabled" :"Disabled"}</td>
                       </tr>
                       <tr>
                        <td>Cash own delivery</td>
                        <td>{PaymentModeState.cash_own_delivery ? "Enabled" :"Disabled"}</td>
                       </tr>
                       <tr>
                        <td>Online Payment</td>
                        <td>{PaymentModeState.online_payment ? "Enabled" :"Disabled"}</td>
                       </tr>
                    </tbody>
                 </table>
               </div>

               <div className='payment-control'>
               <form onSubmit={handleSubmit}>
               
                    <div>
                        <label htmlFor="">  Direct Bank Transfer:</label>
                    <label>
                   
                        <input
                        type='radio'
                        value='directTransferEnabled'
                        checked={directTransferEnabled}
                        onChange={(e) => handlePaymentModeChange('directTransfer', e.target.checked)}
                        />
                        Enable
                    </label>
                    <label>
                        <input
                        type='radio'
                        value='directTransferDisabled'
                        checked={!directTransferEnabled}
                        onChange={(e) => handlePaymentModeChange('directTransfer', !e.target.checked)}
                        />
                        Disable
                    </label>
                    </div>

                    <div>
                    <label htmlFor="">Online Payment:</label>

                    <label>
                        <input
                        type='radio'
                        value='onlinePaymentEnabled'
                        checked={onlinePaymentEnabled}
                        onChange={(e) => handlePaymentModeChange('onlinePayment', e.target.checked)}
                        />
                        Enable
                    </label>
                    <label>
            <input
              type='radio'
              value='onlinePaymentDisabled'
              checked={!onlinePaymentEnabled}
              onChange={(e) => handlePaymentModeChange('onlinePayment', !e.target.checked)}
            />
            Disable
          </label>
        </div>

        <div>
        <label htmlFor="">Cash on Delivery:</label>

          <label>
            
            <input
              type='radio'
              value='cashOnDeliveryEnabled'
              checked={cashOnDeliveryEnabled}
              onChange={(e) => handlePaymentModeChange('cashOnDelivery', e.target.checked)}
            />
            Enable
          </label>
          <label>
            <input
              type='radio'
              value='cashOnDeliveryDisabled'
              checked={!cashOnDeliveryEnabled}
              onChange={(e) => handlePaymentModeChange('cashOnDelivery', !e.target.checked)}
            />
            Disable
          </label>
        </div>

      <button type="submit" className="btn btn-dark">Update</button>
    </form>
                </div>
            </div>
        </div>
    </section>
  )
}