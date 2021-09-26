import React from 'react'

function Preloader(props) {
    return (
        <>
    
            <div id="preloader_screen" style={{transition: `0.3s all`}}className={`${props.loading? 'd-grid' :'d-none'}`}>
                <img src={require("../../images/preloader.gif")} alt="spinner"></img>           
            </div>
  
        </>
    )
}

export default Preloader
