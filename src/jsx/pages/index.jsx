import React, {useContext, useEffect} from 'react';
import AreaChart from '../charts/area';
import BtcChart from '../charts/btc';
import LtcChart from '../charts/ltc';
import RadialChart from '../charts/radial';
import XrpChart from '../charts/xrp';
import PageTitle from '../element/page-title';
import Convert from '../element/convert';
import Header2 from '../layout/header2';
import Sidebar from '../layout/sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { get_wallet_list } from '../../redux/actions'


function Dashboard() {
    const dispatch = useDispatch()
    const currentUser  = useSelector(state => state.session.user)
    const wallet = useSelector(state=> state.wallet);
    useEffect(()=>{
        dispatch(get_wallet_list())
    }, [])
    console.log(wallet)
    return (
        <>
            <Header2 />
            <Sidebar />
            <PageTitle />
            
            <div className="content-body">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-9 col-xxl-12">
                            <div className="row">
                                <div className="col-xl-4 col-lg-12 col-xxl-4">
                                    <div className="row">
                                        <div className="col-xxl-12 col-xl-12 col-lg-12">
                                            <div className="card welcome-profile transparent">
                                                <div className="card-body">
                                                    <img src={require('../../images/profile/2.png')} alt="" />
                                                    <h4>سلام ، 
                                                    {(currentUser.first_name||'') + " " + currentUser.last_name}   
                                                    </h4>
                                                    {   currentUser &&  currentUser.authentication_status === "unverified" &&
                                                        <p>
                                                            <small>حساب کاربری شما هنوز تایید نشده است.</small>
                                                        </p>
                                                    }

                                                    <ul>
                                                        <li>
                                                            <a href="#">
                                                            {   currentUser &&  currentUser.authentication_status !== "unverified"?
                                                                 <span className="verified">
                                                                    <i className="icofont-check-alt"></i>
                                                                </span>
                                                                :
                                                                <span className="not-verified">
                                                                    <i className="icofont-close-line"></i></span>
                                                            }
                                    
                                                            تایید حساب
                                                        </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                            {   currentUser &&  currentUser && currentUser.twoStepVerification?
                                                                 <span className="verified">
                                                                    <i className="icofont-check-alt"></i>
                                                                </span>
                                                                :
                                                                <span className="not-verified">
                                                                    <i className="icofont-close-line"></i></span>
                                                            }
                                                            احراز هویت دو مرحله ای
                                                        </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                            {   currentUser &&  currentUser && currentUser.firstDeposit?
                                                                 <span className="verified">
                                                                    <i className="icofont-check-alt"></i>
                                                                </span>
                                                                :
                                                                <span className="not-verified">
                                                                    <i className="icofont-close-line"></i></span>
                                                            }
                                                            افزایش موجودی
                                                        </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-12 col-lg-12">
                                            <div className="widget-card">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="widget-stat">
                                                        <div className="coin-title">
                                                            <span><i className="cc BTC-alt"></i></span>
                                                            <h5 className="d-inline-block ms-2 mb-3">بیت کوین
                                                            <span>(24 ساعته)</span>
                                                            </h5>
                                                        </div>
                                                        <h4>USD 1254.36 <span className="badge badge-success ms-2">+
                                                            06%</span>
                                                        </h4>
                                                    </div>
                                                    <BtcChart/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-12 col-lg-12">
                                            <div className="widget-card">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="widget-stat">
                                                        <div className="coin-title">
                                                            <span><i className="cc ETH-alt"></i></span>
                                                            <h5 className="d-inline-block ms-2 mb-3">اتریوم
                                                            <span>(24 ساعته)</span>
                                                            </h5>
                                                        </div>
                                                        <h4>USD 1254.36 <span className="badge badge-danger ms-2">-
                                                            06%</span>
                                                        </h4>
                                                    </div>
                                                    <LtcChart/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-12 col-lg-12">
                                            <div className="widget-card">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="widget-stat">
                                                        <div className="coin-title">
                                                            <span><i className="cc LTC-alt"></i></span>
                                                            <h5 className="d-inline-block ms-2 mb-3">لایت کوین
                                                            <span>(24 ساعته)</span>
                                                            </h5>
                                                        </div>
                                                        <h4>USD 1254.36 <span className="badge badge-primary ms-2">
                                                            06%</span>
                                                        </h4>
                                                    </div>
                                                    <XrpChart/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                               
                                <div className="col-xl-8 col-lg-12 col-xxl-8">
                                    <Convert></Convert>
                                    <div className="card profile_chart transparent">
                                        <div className="card-header">
                                            <div className="chart_current_data">
                                                <h3>254856 <span>USD</span></h3>
                                                <p className="text-success">125648 <span>USD (20%)</span></p>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <AreaChart />
                                            <div className="chart-content text-center mt-3">
                                                <div className="row">
                                                    <div className="col-xl-4 col-sm-6 col-6">
                                                        <div className="chart-stat">
                                                            <p className="mb-1">حجم 24 ساعته</p>
                                                            <strong>$1236548.325</strong>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-4 col-sm-6 col-6">
                                                        <div className="chart-stat">
                                                            <p className="mb-1">کپ بازار</p>
                                                            <strong>19B USD</strong>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-4 col-sm-6 col-6">
                                                        <div className="chart-stat">
                                                            <p className="mb-1">گردش</p>
                                                            <strong>29.4M BTC</strong>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-4 col-sm-6 col-6">
                                                        <div className="chart-stat">
                                                            <p className="mb-1">های کل</p>
                                                            <strong>19.783.06 USD</strong>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-4 col-sm-6 col-6">
                                                        <div className="chart-stat">
                                                            <p className="mb-1">تییکال هلد</p>
                                                            <strong>88 days</strong>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-4 col-sm-6 col-6">
                                                        <div className="chart-stat">
                                                            <p className="mb-1">فعالیت معالمه</p>
                                                            <strong>70% buy </strong>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-xxl-12">
                            <div className="row">
                                <div className="col-xl-12 col-xxl-6">
                                    <div className="card balance-widget transparent">
                                        <div className="card-body p-0">
                                            <div className="row">
                                                <div className="col-xl-12 col-xxl-6 col-lg-6 px-0">
                                                    {currentUser && <RadialChart currentUser={currentUser}/>}
                                                    <h4 className="mt-5">موجودی کل : <strong>${currentUser && currentUser.dollarCredit }</strong></h4>
                                                </div>
                                                <div className="col-xl-12 col-xxl-6 col-lg-6">

                                                    <div className="balance-widget">
                                                        <ul className="list-unstyled">
                                                            <li className="d-flex">
                                                                <i className="cc BTC ms-3"></i>
                                                                <div className="flex-grow-1">
                                                                    <h5 className="m-0">Bitcoin</h5>
                                                                </div>
                                                                <div className="text-right">
                                                                    <h5>0.000242 BTC</h5>
                                                                    <span>0.125 USD</span>
                                                                </div>
                                                            </li>
                                                            <li className="d-flex">
                                                                <i className="cc LTC ms-3"></i>
                                                                <div className="flex-grow-1">
                                                                    <h5 className="m-0">Litecoin</h5>
                                                                </div>
                                                                <div className="text-right">
                                                                    <h5>0.000242 LTC</h5>
                                                                    <span>0.125 USD</span>
                                                                </div>
                                                            </li>
                                                            <li className="d-flex">
                                                                <i className="cc XRP ms-3"></i>
                                                                <div className="flex-grow-1">
                                                                    <h5 className="m-0">Ripple</h5>
                                                                </div>
                                                                <div className="text-right">
                                                                    <h5>0.000242 XRP</h5>
                                                                    <span>0.125 USD</span>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="d-none col-xl-12 col-xxl-6">
                                    <div className="card acc_balance">
                                        <div className="card-header">
                                            <h4 className="card-title">کیف پول</h4>
                                        </div>
                                        <div className="card-body">
                                            <span>موجودی بیت کوین</span>
                                            <h3>0.0230145 BTC</h3>

                                            <div className="d-flex justify-content-between my-4">
                                                <div>
                                                    <p className="mb-1">خرید این ماه</p>
                                                    <h4>3.0215485 BTC</h4>
                                                </div>
                                                <div>
                                                    <p className="mb-1">فروش این ماه</p>
                                                    <h4>3.0215485 BTC</h4>
                                                </div>
                                            </div>

                                            <div className="btn-group mb-3">
                                                <button className="btn btn-success">خرید</button>
                                                <button className="btn btn-redish">فروش</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div className="col-xl-12 col-xxl-12">
                            <div className="card">
                                <div className="card-header border-0">
                                    <h4 className="card-title"> تراکنش ها</h4>
                                </div>
                                <div className="card-body pt-0">
                                    <div className="transaction-table">
                                        <div className="table-responsive">
                                            <table className="table mb-0 table-responsive-sm">
                                                <tbody>
                                                    <tr>
                                                        <td><span className="sold-thumb"><i className="la la-arrow-down"></i></span>
                                                        </td>

                                                        <td>
                                                            <span className="badge badge-danger">فروش</span>
                                                        </td>
                                                        <td>
                                                            <i className="cc BTC"></i> BTC
                                                    </td>
                                                        <td>
                                                            استفاده از - بانک *******5264
                                                    </td>
                                                        <td className="text-danger">-0.000242 BTC</td>
                                                        <td>-0.125 USD</td>
                                                    </tr>
                                                    <tr>
                                                        <td><span className="buy-thumb"><i className="la la-arrow-up"></i></span>
                                                        </td>
                                                        <td>
                                                            <span className="badge badge-success">خرید</span>
                                                        </td>
                                                        <td>
                                                            <i className="cc LTC"></i> LTC
                                                    </td>
                                                        <td>
                                                        استفاده از - کارت *******8475
                                                    </td>
                                                        <td className="text-success">-0.000242 BTC</td>
                                                        <td>-0.125 USD</td>
                                                    </tr>
                                                    <tr>
                                                        <td><span className="sold-thumb"><i className="la la-arrow-down"></i></span>
                                                        </td>
                                                        <td>
                                                            <span className="badge badge-danger">فروش</span>
                                                        </td>
                                                        <td>
                                                            <i className="cc XRP"></i> XRP
                                                    </td>
                                                        <td>
                                                        استفاده از - کارت *******8475
                                                    </td>
                                                        <td className="text-danger">-0.000242 BTC</td>
                                                        <td>-0.125 USD</td>
                                                    </tr>
                                                    <tr>
                                                        <td><span className="buy-thumb"><i className="la la-arrow-up"></i></span>
                                                        </td>
                                                        <td>
                                                            <span className="badge badge-success">خرید</span>
                                                        </td>
                                                        <td>
                                                            <i className="cc DASH"></i> DASH
                                                    </td>
                                                        <td>
                                                        استفاده از - کارت *******2321
                                                    </td>
                                                        <td className="text-success">-0.000242 BTC</td>
                                                        <td>-0.125 USD</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
            
        </>
    )
}

export default Dashboard;