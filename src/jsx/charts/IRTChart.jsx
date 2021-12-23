import React from 'react'
import ReactApexChart from "react-apexcharts";
import axios from 'axios'
import Loader from 'react-loader-spinner'
import {useSelector} from 'react-redux'
function IRTChart({}) {
    const [series, setSeries] = React.useState({})
    const [categories, setCategories] = React.useState([])
    const [time, setTime] = React.useState(undefined)
    const chart = useSelector(state=>state.wallet.chart)
    const options = {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          },
         },
        dataLabels: {
          enabled: false
        },
        
        grid: {
          row: {
            colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.2
          },
        },
        
        
        xaxis: {
          type: 'datetime',
          categories
        },
        yaxis:{
          labels:{
             style: {
              colors: ["white"],
              fontSize: '14px',
              fontFamily: 'farsi-numbers, IranYekan, roboto, Arial',
              fontWeight: 400,
              cssClass: 'apexcharts-xaxis-label',
            },
            formatter: (x,y)=>{
              return Number(x).toLocaleString('fa-IR')
            }
          }
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          },
        },
      }


    const get_latest = (currency)=>{
      axios.get(`http://162.55.11.144:8000/api/v1/historical/?s=${chart}`)
        .then(response=>{
            const {data} = response
            
            setSeries([
                {name: currency+"-IRT", data:data.map(i=>{return (+i["price"]).toFixed()})},
            ])
            setCategories(data.map(i=>{let a = new Date(+i["timestamp"]*1000); return a.toLocaleString()}))
        })
        .catch(err=>console.log(err))
    }
    
    React.useEffect(()=>{
      get_latest(chart)
      if(time) clearInterval(time)
      const t = setInterval(() => {
        get_latest(chart)
      }, 60000)
      setTime(t)
    },[chart])

    
    return (
        <>
        {series.length? <>
        <div id="chart-timeline">
          <ReactApexChart
            options={options}
            series={series}
            // type="area"
            height={350}
          />
        </div>
        <small className="mt-3 d-block text-end" dir="rtl">آخرین قیمت:
         <span className="text-primary">{Number(series[0].data[0]).toLocaleString("fa-IR")}</span>
        <small style={{fontSize: "12px"}}>{" "} تومان { " " }(یک دقیقه پیش)</small>
         </small>
        </>
        :
        <div className="w-100 text-center pt-5"><Loader type={"Circles"} height={45}/></div>}
        </>
    )
}

export default IRTChart
