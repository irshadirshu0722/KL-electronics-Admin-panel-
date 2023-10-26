export const ImageCard = (props)=>{
    return (
        
            
              <div >
                <img
                  src={props.image}
                  style={{ width:"220px" , height:"150px",objectFit:"contains" , objectPosition:"center" }}
                alt={'Product Image'}
                />
              </div>
        
          
    )
}