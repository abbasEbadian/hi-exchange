import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import RadialChart from "../charts/radial";
import { get_wallet_list } from '../../redux/actions';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom'

function Balance() {
    const dispatch = useDispatch()
    const {is_fetching} = useSelector(state=> state.wallet);
    const [totalBalance, setTotalBalance] = useState(0);
    const [names, setNames] = useState([]);
    const [balances, setBalances] = useState([]);
    const [wallet, setWallet] = useState([])

    useEffect(()=>{
        dispatch(get_wallet_list()).then(data=>{
            let bals = []
            let nams = []
            let tot = 0
            data.sort((a,b)=>b.balance*b.service.show_price_irt - a.balance*a.service.show_price_irt)
            for(let item of data){                
                bals.push(item.balance)
                nams.push(item.service.small_name_slug)
                tot += item.balance * item.service.show_price_irt
            }
            setTotalBalance(tot)
            setNames(nams)
            setBalances(bals)
            setWallet(data)
            
        }).catch(err=>{
            console.log("Err");
        })
    }, [dispatch])
   

    return (
        <div className="row">
            <div className="col-xl-12 col-xxl-6 p-0">
                <div className="card balance-widget transparent">
                    <div className="card-body p-0">
                    {is_fetching?
                        <div className="w-100 text-center">
                            <Loader type="Oval" color="#00BFFF" height={80} width={80} />
                        </div>
                        :
                        <div className="row">
                            <div className="col-xl-12 col-xxl-6 col-lg-6 px-0">
                                {balances.length ? <RadialChart balances={balances} names={names} />: undefined}
                                <h4 className="mt-5">موجودی کل : <strong className="d-block mt-2"> {Number((+totalBalance).toFixed()).toLocaleString()} تومان</strong></h4> 
                                <br/>
                              
                            </div>
                            <div className="col-xl-12 col-xxl-6 col-lg-6 px-4">
                            <div className="balance-widget">
                                <ul className="list-unstyled">
                                {!wallet.length ?
                                    <li className="list-unstyled">
                                        در حال حاضر ارزی در کیف پول خود ندارید.
                                        <br/><br/>
                                        <Link to="/wallet"className="text-secondary border-0 bg-transparent">شارژ کیف پول</Link>
                                    </li>
                                    :
                                    <>
                                    {wallet.map((item, idx)=>{
                                        return idx <5 && <li key={idx} className="d-flex">
                                            <img src={item.service.image} alt="currecny icon " style={{width:"36px", marginLeft:"10px"}}/>
                                            <div className="flex-grow-1">
                                                <h5 className="m-0">{item.service.small_name_slug}</h5>
                                            </div>
                                            <div className="text-start">
                                                <h5 className="m-0">{Math.round(1000*item.balance)/1000}</h5>
                                                {item.balance!=="0"?<span className="w-100 text-left">{Number(Number(item.balance * item.service.show_price_irt).toFixed()).toLocaleString()} ت</span>:undefined}
                                            </div>
                                        </li>
                                    })}
                                    <Link to="/wallet" className="w-100 text-center">نمایش همه</Link>
                                    </>
                                }
                                </ul>
                            </div>
                            </div>
                        </div> 
                    }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Balance
