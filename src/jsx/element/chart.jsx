import React from 'react'
import TradingViewWidget from 'react-tradingview-widget';
import { Themes } from 'react-tradingview-widget';
import {Constants} from '../../Constants'
import {Modal} from "react-bootstrap"
function Chart({selectedChart}) {
    const [show, setShow] = React.useState(false    )
    return (
       <div style={{minHeight: 400+"px"}}>

            <TradingViewWidget 
                symbol={Constants.TW_SYMBOL[selectedChart]}
                theme={Themes.DARK}
                locale="fa_IR"
                width={"100%"}
                height={400}
                hide_top_toolbar={false}
                hide_side_toolbar={false}
                allow_symbol_change={false}
                withdateranges={true}
                />
            <div className='d-block'>
                <a onClick={e=>setShow(true)}><small>نمایش تمام صقحه</small></a>

            </div>
            <Modal dialogClassName="modal-100w"  contentClassName="dark"     show={show} fullscreen={true} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                <Modal.Title>تمودار  {selectedChart}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <TradingViewWidget 
                symbol={Constants.TW_SYMBOL[selectedChart]}
                theme={Themes.DARK}
                locale="fa_IR"
                autosize={window.size> 768}
                height={500}
                width={"100%"}
                hide_top_toolbar={false}
                hide_side_toolbar={false}
                allow_symbol_change={false}
                withdateranges={true}
                /></Modal.Body>
             </Modal>
            </div>
    )
}

export default Chart
