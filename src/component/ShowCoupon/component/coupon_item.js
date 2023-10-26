import React from 'react'
import { dateConveter} from '../../../component/dateconvert'
import axios from "axios"
import {endpoint} from '../../../backend'
import {useNavigate} from "react-router-dom"

export const CouponItem = (props)=> {
  const {data,seterror,setloading,access_token} = props
  const navigate = useNavigate()
  const onDelete = async ()=>{
    setloading(true)

    const json={
      coupon_id:data.id
    }
    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };
    try{
      const response = await axios.post(`${endpoint}/coupon-code/admin/delete-coupon-code`,json,config);

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
    <tr>
        <td className='cell id' > #{data.id} </td>
        <td  className='cell code' > {data.code} </td>

        <td className='cell rate' > {data.discount_rate}% </td>

        <td className='cell amount' > {data.discount_amount}₹ </td>
        <td className='cell min-order' > {data.min_order}₹ </td>
        <td className='cell created' > {dateConveter(data.created_at)} </td>
        <td className='cell updated' > {dateConveter(data.updated_at)} </td>
        <td className='cell delete' onClick={onDelete} > <button className='btn btn-danger'>Delete</button></td>
        <td className='cell edit' onClick={()=>navigate(`/editcoupon/${data.id}`)}> <button className='btn btn-info'>Edit</button></td>

    </tr>
  )
}
