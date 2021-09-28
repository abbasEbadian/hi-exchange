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
    }, [])
   

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
                                <h4 className="mt-5">موجودی کل : <strong > {(+totalBalance).toLocaleString()} تومان</strong></h4> 
                                <br/>
                                {/* {totalBalance===0? 
                                    <Link to="/buy-sell" className="text-secondary border-0 bg-transparent">شارژ</Link>:
                                    undefined
                                } */}
                            </div>
                            <div className="col-xl-12 col-xxl-6 col-lg-6">
                            <div className="balance-widget">
                                <ul className="list-unstyled">
                                {!wallet.length ?
                                    <li className="list-unstyled">
                                        در حال حاضر ارزی در کیف پول خود ندارید.
                                        <br/><br/>
                                        <Link to="/wallet"className="text-secondary border-0 bg-transparent">شارژ کیف پول</Link>
                                    </li>
                                    :
                                    wallet.map((item, idx)=>{
                                        return <li key={idx} className="d-flex">
                                            <i className={"cc "+ item.service.small_name_slug + " ms-3"}></i>
                                            <div className="flex-grow-1">
                                                <h5 className="m-0">{item.service.small_name_slug}</h5>
                                            </div>
                                            <div className="text-right">
                                                <h5 className="m-0">{item.balance} {" "} {item.service.small_name_slug}</h5>
                                                <span className="w-100 text-left">{(item.balance * item.service.show_price_irt).toLocaleString()} ت</span>
                                            </div>
                                        </li>
                                    })
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
