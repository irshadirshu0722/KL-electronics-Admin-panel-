
import { Link,useNavigate } from 'react-router-dom';
import  img from "../../../images/cart-item.jpg"
export const ProductCard = (props)=>{
  const navigate = useNavigate();

  const {data} = props
    return (
       
      <div className="product-content" >
      <div to="/show-product" className="product">
      <img onClick={()=>navigate(`/showproduct/${data.product_id}`)} src={data?.image?.image&&data.image.image} alt="" />
      <div className="product-title">
        {data.name}
       </div>
      <div className="product-price-button">
        <div className="price" >₹{data.price}</div>
        <div className="button">
       
          <button onClick={()=>navigate(`/editproduct/${data.product_id}`)} className="btn btn-dark add-to-cart">Edit Product</button>
        
        
        </div>
      </div>
      
      </div>
      
    </div>
    )
    }