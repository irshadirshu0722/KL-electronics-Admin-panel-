export const ImageCard = (props)=>{
    return (
        
            
              <div key={props.index}>
                <img
                  src={props.image}
                  alt={`Selected ${props.index + 1}`}
                  style={{ width:"220px" , height:"150px",objectFit:"contains" , objectPosition:"center" }}
                />
              </div>
        
          
    )
}