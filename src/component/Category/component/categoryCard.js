
import {useNavigate  } from "react-router-dom"

export const CategoryCard = (props)=>{
  const navigate = useNavigate(); 
  const {data} = props
    return (
       
        
                <div className="category-item">
              
                    <div className="cat-img" onClick={()=>navigate(`/categoryproducts/${data.category_name}/1`)}>
                      <img src={data?.image?.image&&data.image.image} alt="" />
                    </div>
                    <div className="cat-title">{data.category_name}</div>
                   <div className="edit-category-btn">
                    <button onClick={()=>navigate(`/editcategory/${data.category_id}`)} className="btn btn-info">Edit Category</button>
                   </div>
                </div>
             
             
       )   
    }