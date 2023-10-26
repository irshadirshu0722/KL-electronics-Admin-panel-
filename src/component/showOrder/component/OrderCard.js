export const OrderCard = (props)=>{
    const {data} = props
    return (
        <tr>
            <td className="table-cell">
            {data.product_name}({data.product_price}₹)  × <span>{data.quantity }</span>
             </td>
            <td className="table-cell">
             {data.total}₹
            </td>
    </tr>
    )
}