import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../element/page-title';
import Header2 from '../layout/header2';
import Sidebar from '../layout/sidebar';




function Accounts() {

    return (
        <>
            <Header2 />
            <Sidebar />
            <PageTitle />

            <div className="content-body">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-6">
                            <div className="card profile_card">
                                <div className="card-body">
                                    <div className="d-flex">
                                        <img className="me-3 rounded-circle me-0 me-sm-3" src={require('./../../images/profile/2.png')} width="60"
                                            height="60" alt="" />
                                        <div>
                                            <span>درود</span>
                                            <h4 className="mb-2">علی علی پور</h4>
                                            <p className="mb-1"> <span><i className="fa fa-phone ms-2 text-primary"></i></span>
                                            <span dir="ltr">+98 936 704 8788</span>
                                            </p>
                                            <p className="mb-1"> <span><i className="fa fa-envelope ms-2 text-primary"></i></span>
                                                hello@example.com
                                        </p>
                                        </div>
                                    </div>

                                    <ul className="card-profile__info">
                                        <li>
                                            <h5 className="ms-4">آدرس</h5>
                                            <span className="text-muted">تبریز سمت چپ</span>
                                        </li>
                                        <li className="mb-1">
                                            <h5 className="ms-4">گزارشات</h5>
                                            <span>103 گزارش</span>
                                        </li>
                                        <li>
                                            <h5 className="text-danger ms-4">آخرین گزارش</h5>
                                            <span className="text-danger">3 بهمن 1400 ، ساعت 10</span>
                                        </li>
                                    </ul>
                                    <div className="social-icons">
                                        <Link className="facebook text-center" to={'#'}><span><i
                                            className="fa fa-facebook"></i></span></Link>
                                        <Link className="twitter text-center" to={'#'}><span><i
                                            className="fa fa-twitter"></i></span></Link>
                                        <Link className="youtube text-center" to={'#'}><span><i
                                            className="fa fa-youtube"></i></span></Link>
                                        <Link className="googlePlus text-center" to={'#'}><span><i
                                            className="fa fa-google"></i></span></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                       </div>
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card">
                                <div className="card-header border-0">
                                    <h4 className="card-title">فعالیت ها</h4>
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
                                                            استفاده از - کارت *******2321
                                                    </td>
                                                        <td className="text-danger">-0.000242 BTC</td>
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

export default Accounts;