import React from 'react'
import ReactApexChart from "react-apexcharts";
import axios from 'axios'
import Loader from 'react-loader-spinner'
function IRTChart({currency}) {
    const [series, setSeries] = React.useState({})
    const options = {
        chart: {
          height: 350,
          type: 'area',
          stacked:true,
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          type: 'datetime',
          categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T00:00:00.000Z","2018-09-19T00:00:00.000Z","2018-09-19T00:00:00.000Z","2018-09-19T00:00:00.000Z","2018-09-19T00:00:00.000Z","2018-09-19T00:00:00.000Z","2018-09-19T00:00:00.000Z","2018-09-19T00:00:00.000Z","2018-09-19T00:00:00.000Z","2018-09-19T00:00:00.000Z","2018-09-19T00:00:00.000Z","2018-09-19T00:00:00.000Z","2018-09-19T00:00:00.000Z","2018-09-19T00:00:00.000Z","2018-09-19T00:00:00.000Z","2018-09-19T00:00:00.000Z","2018-09-19T00:00:00.000Z","2018-09-19T00:00:00.000Z","2018-09-19T00:00:00.000Z","2018-09-19T00:00:00.000Z","2018-09-19T00:00:00.000Z","2018-09-19T00:00:00.000Z","2018-09-19T00:00:00.000Z",]
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          },
        },
      }


    
    
    React.useEffect(()=>{
        if(!currency)return
        axios.get(`https://api.nobitex.ir/v2/orderbook/${currency}IRT`)
        .then(response=>{
            const {data} = response
            setSeries([
                {name: "bids", data:data.bids.map(i=>{return [+(i[0]+"000"), +i[1]]})},
                {name:"asks", data: data.asks.map(i=>{return [+(i[0]+"000"), +i[1]]})}
            ])
        })
        .catch(err=>console.log(err))

    }, [])
    console.log(series);
    
    return (
        <>
        {series.length? 
        <div id="chart-timeline">
          <ReactApexChart
            options={options}
            series={series}
            // type="area"
            height={350}
          />
        </div>
        :<Loader type={"Circles"} height={45}/>
        }
        </>
    )
}

export default IRTChart
