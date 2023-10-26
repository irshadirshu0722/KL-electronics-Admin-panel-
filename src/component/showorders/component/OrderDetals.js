import {Link} from "react-router-dom"


export const OrderDetailsCard = (props)=>{
    const {data} = props
    const _ = require('lodash'); 

    



    const date = new Date(data.order_at);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Note: Months are 0-based, so add 1 to get the correct month
    const day = date.getDate();

    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

return (
    <tr>
      <td>#{data.order_id}</td>
      <td>{data.username}</td>
      <td>{formattedDate}</td>
      <td>{data.total}₹</td>
      <td>{data.profit}₹</td>
      <td  className="view"> <Link to={`/showorder/${data.order_id}`}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M.2 10a11 11 0 0 1 19.6 0A11 11 0 0 1 .2 10zm9.8 4a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-2a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/></svg></Link></td>
      <td> {  _.startCase(data.status)}</td>
    </tr>
   )   
}