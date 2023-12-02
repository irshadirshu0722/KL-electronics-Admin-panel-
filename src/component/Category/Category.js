
import "./category.css"
import {useNavigate} from "react-router-dom"
import {React,useLayoutEffect,useState} from "react"
import {CategoryCard} from "./component/categoryCard"
import {getAccessToken,resetAccessToken} from "../../store"
import {useDispatch,useSelector} from "react-redux"
import axios from "axios"
import { endpoint } from "../../backend"
import {Loading} from "../../component/loading"
import {ErrorPopUp} from "../../component/errorpopup"
import {is_expired} from '../../component/checktokenexpire'

export const Category=()=>{
  const [categories,setCategories] = useState([])
  const dispatch = useDispatch()
    const access_token = useSelector((state)=>state.getToken.value.access_token)
    const navigate = useNavigate();

    const [isloading,setLoading]  = useState(false)
  useLayoutEffect(()=>{
    dispatch(getAccessToken())

    if(access_token===null){

      navigate('/signin');
    }else if(access_token!==""){
      if(is_expired(access_token)){
        dispatch(resetAccessToken())
        navigate('/signin')
      }else{
        getcategorydetails()
      }
      
    }
    
   
},[access_token])
 

  const  getcategorydetails = async()=>{
     setLoading(true)
     const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };
    try{
      const response = await axios.get(`${endpoint}/admin-panel/category-list`,config)

     if (response.status===200){
      setCategories(response.data.data.categories)
     }
     setLoading(false)


    }catch(e){ 
      setLoading(false)
     if(e.response.status===401){
      navigate("/signin")
     }else{
      console.log("error else")

      navigate('/notfound')

     }
    }

  }


    return (
      <>
      {isloading&& <Loading />}
     
        <div>
         
          <section className="category-section">
           
            <div className="container">
              <div className="row">
                <div className="heading">
                  Product Categories
                </div>
                <div className="add-cat-btn">
                  <button className="btn btn-dark" onClick={()=>navigate('/addcategory')}>Add Category</button>
                </div>

                <div className="category-grid">
                  {
                    categories.map((value,idx)=>{
                      return  <CategoryCard data={value} />
                    })
                  }
                 
                  
                </div>

                 {categories.length===0 && <div className="category-not-available">  Category Not added yet</div>}
              </div>
            </div>
           
           
          </section>
          
        </div>
       
       
       </>
      );
}




    // Your code here
