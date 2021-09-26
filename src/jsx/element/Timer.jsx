import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';

function Timer() {
    const [time, setTime] = useState(60)
    const [next, setNext] = useState(undefined)
    const next_refresh = useSelector(state=>state.indexConverter.nextRefreshTime)
    useEffect(() => {
        setNext(next_refresh)
        
    }, [next_refresh])
    const nd = new Date(+next)
    setTimeout(e=>{
        const t= Math.round( (nd - new Date())/1000 )
        const m = t > 0 ? t : 60+t
        setTime( m )
    }, 1000)
    return (
        <div>
            {(time < 60 && time >=0) ?
            <> 
               <small className="fs-6 text-center text-muted"> 
                <span className="px-2  text-success">{time + " ثانیه "}</span>
                تا بروزرسانی
                </small>
            </>
            :
            <i></i>
            }
            
        </div>
    )
}

export default Timer
