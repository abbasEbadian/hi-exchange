import React, {useEffect, useState} from 'react'

import axios from 'axios';
import Loader from 'react-loader-spinner'
import Chart from '../element/chart'
function ProfileChart({ selectedChart}) {
    const base = "http://162.55.11.144:8000/api/v1/cmc_request/?source="
    const [info, setInfo] = useState({})
    useEffect(() => {
        setInfo({})
        axios.get(base+selectedChart)
        .then(res=>{
            try{
                const {data} = res;
                setInfo(data.data);
            }catch(e){
                console.log(e)
            }
            
        }).catch(err=>{
            console.log(err);
            
        })
    }, [selectedChart])
        
    return (
        <div className="card profile_chart transparent">
            <div className="card-body p-0">
                {/* <AreaChart /> */}
                <Chart selectedChart={selectedChart}/>
                <div className="chart-content text-center mt-3">
                    <div className="row">
                    {[["price", "قیمت", "$"],
                     ["volume_24h", "حجم 24 ساعته", "$"],
                     ["market_cap", "حجم بازار", "$"],
                     ["percent_change_1h", "درصد تغییر 1 ساعته", "%"],
                     ["percent_change_24h", "درصد تغییر 24 ساعته", "%"],
                     ["percent_change_7d", "درصد تغییر 7 روزه", "%"]].map((item, idx)=>{
                        return <div key={idx} className="col-xl-4 col-sm-6 col-6">
                                <div className="chart-stat">
                                    <p className="mb-1 fs-6">{item[1]}</p>
                                    { Object.keys(info).includes(selectedChart) ? 
                                        <span dir="ltr">{Number(info[selectedChart]["quote"]["USD"][item[0]]).toLocaleString()} {" "} {item[2]}</span>
                                        :<Loader type="TailSpin" color="#00BFFF" height={20} width={80} />
                                    }
                                </div>
                            </div>
                        })

                    }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileChart
