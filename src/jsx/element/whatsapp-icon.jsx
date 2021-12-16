import React from 'react'

function WhatsappIcon() {
    const [style, setStyle] = React.useState({
           position: "fixed",
           bottom: "20px",
           right: "20px",
           height: "70px",
           width: "70px",
           zIndex: "999",

    })
    
    React.useEffect(() => {
        const resize = function (e) {
        if(window.innerWidth < 768){
            setStyle({
                position: "fixed",
                left :"20px",
                right :"unset",
                height:"60px",
                width:"60px",
                bottom:"60px",
                zIndex: "999",

            })
        } else{
            setStyle({
           position: "fixed",
           bottom: "20px",
           right: "20px",
           height: "70px",
           width: "70px",
           zIndex: "999",

    })
        }
       } 
       window.onresize = resize
       resize()
       return ()=>{
           window.onresize = function () {return}
       }
    }, [])
   
   

    return (
       <div className="whatsapp-widget" style={style}>
            <a href="https://wa.me/989196360599" className="position-absolute w-100 h-100" style={{zIndex: 1000}}>&nbsp;</a>
            <img src={require('../../images/whatsapp.png')} alt="whatsapp" className="w-100"/>
            
       </div>
    )
}

export default WhatsappIcon
