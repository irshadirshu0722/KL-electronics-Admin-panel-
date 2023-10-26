import React from 'react'
import {useState,useRef} from "react"
import {useNavigate} from 'react-router-dom'
export  const  SearchBar = ()=> {
    const navigate = useNavigate()
    const search_type = {
        "By ID":"number",
        "By Name":"text"
      }

      const [searchType,setSearchType] = useState("text")
      const searchitem = useRef(null)
      const handletype = (event)=>{
         setSearchType(search_type[event.target.value])
         console.log(searchType);
      }
      

      const onSearch = (e)=>{
        
        e.preventDefault()
        if (searchType==="text"){
            navigate(`/search-product/${searchitem.current.value}/1`)
        }else{
         
          navigate(`/showproduct/${searchitem.current.value}`)
        }
      }
    return (

    <section className="search-bar-section">

          
            <div className="container">
                <div className="row">
                    <form action="" onSubmit={onSearch}>
                      <input type={searchType} ref={searchitem}  placeholder="Product search" />
                      <button  type="submit">
                        <svg viewBox="0 0 1024 1024" className="icon icon-search">
                          <path className="path1" d="M966.070 981.101l-304.302-331.965c68.573-71.754 106.232-165.549 106.232-265.136 0-102.57-39.942-199-112.47-271.53s-168.96-112.47-271.53-112.47-199 39.942-271.53 112.47-112.47 168.96-112.47 271.53 39.942 199.002 112.47 271.53 168.96 112.47 271.53 112.47c88.362 0 172.152-29.667 240.043-84.248l304.285 331.947c5.050 5.507 11.954 8.301 18.878 8.301 6.179 0 12.378-2.226 17.293-6.728 10.421-9.555 11.126-25.749 1.571-36.171zM51.2 384c0-183.506 149.294-332.8 332.8-332.8s332.8 149.294 332.8 332.8-149.294 332.8-332.8 332.8-332.8-149.294-332.8-332.8z"></path>
                        </svg>
                      </button>
                      
                    </form>
                    <select onChange={handletype}>
                         <option>
                            By ID
                         </option>
                         <option selected>
                            By Name
                         </option>
                      </select>
                </div>
            </div>
        </section>
  )
}
