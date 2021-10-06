
import React from "react";
import ReactApexChart from "react-apexcharts";


const RadialChart = ({ balances, names }) =>{  
    const names2 = names.filter((c,i)=>i<5)
    const balances2 = balances.filter((c,i)=>i<5)    
    const chart_details = {
        series: balances2, 
        options: {
            chart: {
                height: 300,
                type: 'radialBar',
            },
            tooltip: {
                enabled: true,
                enabledOnSeries: undefined,
                shared: true,
                followCursor: false,
                intersect: false,
                inverseOrder: false,
                
                fillSeriesColor: false,
                theme: "light",
                style: {
                    fontSize: '14px',
                    fontFamily: undefined,
                    justifyContent: 'space-between'
                },
                onDatasetHover: {
                    highlightDataSeries: false,
                },
                x: {
                    show: true,
                    format: 'dd MMM',
                    formatter: undefined,
                },
                y: {
                    formatter: undefined,
                    title: {
                        formatter: (seriesName) => seriesName,
                    },
                },
                z: {
                    formatter: undefined,
                    title: 'Size: '
                },
                marker: {
                    show: false,
                },
                items: {
                    display: "flex",
                },
                fixed: {
                    enabled: false,
                    position: 'topRight',
                    offsetX: 0,
                    offsetY: 0,
                },
                
            },
            plotOptions: {
                radialBar: {
                    offsetY: 0,
                    startAngle: 0,
                    endAngle: 360,
                    hollow: {
                        margin: 5,
                        size: '30%',
                        background: 'transparent',
                        image: undefined,
                    },
                    dataLabels: {
                        name: {
                            show: false,
                        },
                        value: {
                            show: false,
                        }
                    }
                }
            },
            colors: [
                'rgba(137, 22, 255,1)',
                'rgba(137, 22, 255,0.7)',
                'rgba(137, 22, 255,0.3)',
                'rgba(137, 22, 255,0.1)'
            ],

            
            labels: names2, // ["ETH", "BTC"]


            legend: {
                show: false,
                floating: true,
                fontSize: '16px',
                position: 'left',
                offsetX: 160,
                offsetY: 15,
                labels: {
                    useSeriesColors: true,
                },
                markers: {
                    size: 0
                },
                formatter: function (seriesName, opts) {
                    return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
                },
                itemMargin: {
                    vertical: 3
                }
            },

            responsive: [{
                breakpoint: 480,
                options: {
                    legend: {
                        show: false
                    }
                }
            }]
        },


    }

    return (
        <> 
            {names.length ?
            <ReactApexChart options={chart_details.options} series={balances2} type="radialBar" height={360} />:
            
            <span></span>
            }
            </>



    );
    
}

export default RadialChart;