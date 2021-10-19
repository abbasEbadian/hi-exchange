import React, {useState, useEffect} from 'react'
import ProfileChart from '../layout/profile-chart'

function IndexChart() {
    const [selectedChart, setSelectedChart] = useState("BTC")
    const [chartList, setChartList] = useState([])
    useEffect(() => {
        setChartList([
            ["BTC", "بیت کوین", 'btc'],
            ["ETH", "اتریوم", 'eth'],
            ["BNB", "بایننس کوین", 'bnb'],
            ["ADA", "کاردانو", 'ada'],
            ["XRP", "ریپل", 'xrp'],
            ["SOL", "سولانا", 'sol'],
            ["DOT", "پولکادات", 'dot'],
            ["DOGE", "دوج کوین", 'doge'],
        ])
    }, [])
    return (
        <>
        <div className="col-12 col-lg-4 px-2">
        <div className="row">
            {chartList.map((item, idx)=>{
                return <div key={idx} className="col-xl-12 col-lg-12 chart-selector">
                    <div className={"widget-card mb-2"+(selectedChart===item[0] ? " active" : " ") }  onClick={()=>setSelectedChart(item[0])}>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="coin-title d-flex align-items-center w-100 widget-stat">
                                <img src={require(`../../icons/newicon/${item[2]}.png`)}></img>
                                <h5 className="d-flex w-100 me-2 mb-0 align-items-center">
                                    <span >{item[1]}</span>
                                    <span className="me-auto">{item[0]}</span>
                                    
                                </h5>
                            </div>
                            {/* <BtcChart/> */}
                        </div>
                    </div>
                </div>
            })
            }
            
        
        </div>
        </div>
        <div className="col-12 col-lg-8">
            <ProfileChart  selectedChart={selectedChart}></ProfileChart>
        </div>
        </>
    )
}

export default IndexChart
