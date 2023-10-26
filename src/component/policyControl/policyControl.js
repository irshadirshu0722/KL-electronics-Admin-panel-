import "./policyControl.css"
import{script} from './script'
import {useState,useLayoutEffect, useEffect} from 'react'
import {useNavigate   } from "react-router-dom"

import {getAccessToken,resetAccessToken } from "../../store"
import {is_expired} from '../checktokenexpire'
import {Loading} from "../../component/loading"
import {ErrorPopUp} from "../../component/errorpopup"
import axios from 'axios'
import {endpoint} from "../../backend"
import {useDispatch,useSelector} from "react-redux"

export const PolicyControl = ()=>{
    const dispatch = useDispatch()
    const access_token = useSelector((state)=>state.getToken.value.access_token)
    const navigate = useNavigate();
    const [policyinput, setpolicyinput] = useState({

            "privacy_policy": '',
            "refund_policy": '',
            "terms_and_condition":'',
            "shipping_policy":'',
            "cookie_policy":'',
            "faq":''

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
  

    useEffect(() => {
        const textareas = document.querySelectorAll('.autoresizing');
        console.log(policyinput);
        textareas.forEach((textarea) => {
          textarea.addEventListener('input', function () {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
          });
        });
      }, [policyinput]);
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
            
            const response = await axios.post(`${endpoint}/admin-panel/policy-details-data    `,json,config)
            setLoading(false)
            if (response.status==200){
                setpolicyinput(response.data.data)
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
        setpolicyinput({ ...policyinput, [name]: value });
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
            
            const response = await axios.post(`${endpoint}/admin-panel/policy-details-control`,policyinput,config)
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
    <section className="policy-details-control-section">
        {errorpopup && <ErrorPopUp message={errorpopup} />}
        <div className="container">
            <div className="row" style={{color:"white"}}>
               
               <div className='policy-control'>
               <form onSubmit={handleSubmit}>
                      <div>
                        <label>Privacy Policy</label>
                        <textarea
                            name="privacy_policy"
                            value={policyinput.privacy_policy}
                            onChange={handleChange}
                            rows="auto"
                            cols="auto"
                            className="autoresizing"
                        />
                        </div>
                        <div>
                        <label>Refund Policy</label>
                        <textarea
                            name="refund_policy"
                            value={policyinput.refund_policy}
                            onChange={handleChange}
                            
                            className="autoresizing"
                        />
                        </div>

                        <div>
                        <label>Terms & Condition</label>
                        <textarea
                            name="terms_and_condition"
                            value={policyinput.terms_and_condition}
                            onChange={handleChange}
                            className="autoresizing"
                        />
                        </div>

                        <div>
                        <label>Shipping Policy</label>
                        <textarea
                            name="shipping_policy"
                            value={policyinput.shipping_policy}
                            onChange={handleChange}
                            className="autoresizing"
                        />
                        </div>

                        <div>
                        <label>cookie Policy</label>
                        <textarea
                            name="cookie_policy"
                            value={policyinput.cookie_policy}
                            onChange={handleChange}
                            className="autoresizing"
                        />
                        </div>

                        <div>
                        <label>FAQ</label>
                        <textarea
                            name="faq"
                            value={policyinput.faq}
                            onChange={handleChange}
                            className="autoresizing"
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