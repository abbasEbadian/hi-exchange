import React from 'react'

function WhatsappIcon() {
    const [style, setStyle] = React.useState({
           position: "fixed",
           bottom: "28px",
           right: "100px",
           height: "65px",
           width: "65px",
           zIndex: "999",
            transform: "translateY(0px)",
            transition: "0.2s"
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
                transform: "translateY(0px)",
                transition: "0.2s"
            })
        } else{
            setStyle({
           position: "fixed",
           bottom: "28px",
           right: "100px",
           height: "65px",
           width: "65px",
           zIndex: "999",
            transform: "translateY(0px)",
            transition: "0.2s"
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
       <div className="whatsapp-widget" style={style} >
            <a href="https://wa.me/989196360599" className="position-absolute w-100 h-100" style={{zIndex: 1000}}>&nbsp;</a>
            <img src={require('../../images/whatsapp.png')} alt="whatsapp" className="w-100"/>
            
       </div>
    )
}

export default WhatsappIcon
