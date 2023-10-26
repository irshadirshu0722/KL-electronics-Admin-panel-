import axios from "axios"
import { endpoint } from "../../../backend"
import {useNavigate} from "react-router-dom"

export const ImageDiv = (props)=>{
    const navigate = useNavigate()
    const {data,access_token,seterror,setloading} = props
    const onDelete = async ()=>{
        setloading(true)
    
        const json={
            highlight_id:data.id
        }
        const config = {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };
        try{
          const response = await axios.post(`${endpoint}/admin-panel/delete-highlight`,json,config);
    
          if(response.status===200){
            window.location.reload()
            setloading(false)
    
          }
    
            }catch(e){
              if(e.response===undefined){
                seterror("Request  Failed try again later")
              }
              else if(e.response.status===401){
                navigate('/signin')
              }else{
                seterror("Request  Failed try again later")
    
              }
              
    
            }
            setloading(false)
    
      }
    return (
        <div className='img-div'>
                <img src={data.image} alt="image not found" />
                <button onClick={onDelete} className='delete-btn btn btn-danger'>Delete</button>
        </div>
    )
}
