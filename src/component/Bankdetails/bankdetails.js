import "./bankdetails.css"


import {useState,useLayoutEffect} from 'react'
import {useNavigate   } from "react-router-dom"

import {getAccessToken,resetAccessToken } from "../../store"
import {is_expired} from '../checktokenexpire'
import {Loading} from "../../component/loading"
import {ErrorPopUp} from "../../component/errorpopup"
import axios from 'axios'
import {endpoint} from "../../backend"
import {useDispatch,useSelector} from "react-redux"

export const BankDetailsControl = ()=>{
    const dispatch = useDispatch()
    const access_token = useSelector((state)=>state.getToken.value.access_token)
    const navigate = useNavigate();
    const [bankDetailsinput, setbankDetailsinput] = useState({
        account_number:'',
        ifsc_code:'',
        upi_id:'',
        whatsapp_number:'',
        email:'',
        bank_name:''
    })
    const [bankDetailsdata, setbankDetailsdata] = useState({
        account_number:'',
        ifsc_code:'',
        upi_id:'',
        whatsapp_number:'',
        email:'',
        bank_name:''
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
            getbankdetails()
          }
         
        }
       
    },[access_token])

        const getbankdetails = async ()=>{
            const json = {
           
            }
            const config = {
            headers: {
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            },
            };
            
            try{
            
            const response = await axios.post(`${endpoint}/admin-panel/bank-details-data    `,json,config)
            setLoading(false)
            if (response.status==200){
                setbankDetailsinput(response.data.data)
                setbankDetailsdata(response.data.data)
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
        setbankDetailsinput({ ...bankDetailsinput, [name]: value });
    };

      const handleSubmit =async (e) => {
        e.preventDefault();
        setLoading(true)
        
        const config = {
            headers: {
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            },
            };
            
            try{
            
            const response = await axios.post(`${endpoint}/admin-panel/bank-details-control`,bankDetailsinput,config)
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
    <section className="bank-details-control-section">
        {errorpopup && <ErrorPopUp message={errorpopup} />}
        <div className="container">
            <div className="row" style={{color:"white"}}>
               <div className="bank-status-table">
                 <table>
                    
                    <tbody>
                       <tr>
                            <td>Bank name</td>
                            <td>{bankDetailsdata.bank_name}</td>
                       </tr>
                       <tr>
                            <td>Account number</td>
                            <td>{bankDetailsdata.account_number}</td>
                       </tr>
                       <tr>
                            <td>IFSC bode</td>
                            <td>{bankDetailsdata.ifsc_code}</td>
                       </tr>
                       <tr>
                            <td>Upi id</td>
                            <td>{bankDetailsdata.upi_id}</td>
                       </tr>
                       <tr>
                            <td>Whatsapp number</td>
                            <td>{bankDetailsdata.whatsapp_number}</td>
                       </tr>
                      
                       <tr>
                            <td>Email</td>
                            <td>{bankDetailsdata.email}</td>
                       </tr>
                    </tbody>
                 </table>
               </div>

               <div className='bank-control'>
               <form onSubmit={handleSubmit}>
               <div>
                        <label>Bank Name:</label>
                        <input
                            type="text"
                            name="bank_name"
                            value={bankDetailsinput.bank_name}
                            onChange={handleChange}
                        />
                        </div>
                        <div>
                        <label>Account Number:</label>
                        <input
                            type="text"
                            name="account_number"
                            value={bankDetailsinput.account_number}
                            onChange={handleChange}
                        />
                        </div>
                        <div>
                        <label>IFSC Code:</label>
                        <input
                            type="text"
                            name="ifsc_code"
                            value={bankDetailsinput.ifsc_code}
                            onChange={handleChange}
                        />
                        </div>
                        <div>
                        <label>UPI ID:</label>
                        <input
                            type="text"
                            name="upi_id"
                            value={bankDetailsinput.upi_id}
                            onChange={handleChange}
                        />
                        </div>
                        <div>
                        <label>WhatsApp Number:</label>
                        <input
                            type="text"
                            name="whatsapp_number"
                            value={bankDetailsinput.whatsapp_number}
                            onChange={handleChange}
                        />
                        </div>
                        <div>
                        <label>Email:</label>
                        <input
                            type="text"
                            name="email"
                            value={bankDetailsinput.email}
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