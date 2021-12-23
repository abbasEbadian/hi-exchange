import React from 'react'
import ReactApexChart from "react-apexcharts";
import axios from 'axios'
import Loader from 'react-loader-spinner'
function IRTChart({currency}) {
    const [series, setSeries] = React.useState({})
    const [categories, setCategories] = React.useState([])
    const [time, setTime] = React.useState(undefined)
    const [currency2, setCurrency2] = React.useState(currency)
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
            opacity: 0.5
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
              fontSize: '12px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 400,
              cssClass: 'apexcharts-xaxis-label',
            },
          }
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          },
        },
      }


    const get_latest = ()=>{
      axios.get(`http://162.55.11.144:8000/api/v1/historical/?s=${currency2}`)
        .then(response=>{
            const {data} = response
            
            setSeries([
                {name: currency2+"-IRT", data:data.map(i=>{return +i["price"].toFixed()})},
            ])
            setCategories(data.map(i=>{let a = new Date(+i["timestamp"]*1000); return a.toLocaleString()}))
        })
        .catch(err=>console.log(err))
    }
    if(!time){
      const t = setTimeout(() => {
        get_latest(currency)
      }, 60000)
      setTime(t)
    }
    React.useEffect(()=>{
      setCurrency2(currency)
        if(!currency)return
        get_latest()

    }, [currency])
    console.log(series, categories);
    
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
        :
        <div className="w-100 text-center"><Loader type={"Circles"} height={45}/></div>
        }
        </>
    )
}

export default IRTChart
