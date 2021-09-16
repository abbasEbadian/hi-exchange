import React from 'react';
import { Accordion, Card, Tab, Tabs } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PageTitle from '../element/page-title';
import Popup from '../element/popup';
import Header2 from '../layout/header2';
import Sidebar from '../layout/sidebar';




function BuySell() {

    return (
        <>
            <Header2 />
            <Sidebar />
            <PageTitle />

            <div className="content-body">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-5 col-lg-5 col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="buy-sell-widget">

                                        <Tabs defaultActiveKey="buy" id="uncontrolled-tab-example">
                                            <Tab eventKey="buy" title="خرید">
                                                <form method="post" name="myform" className="currency_validate">
                                                    <div className="mb-3">
                                                        <label className="form-label">ارز</label>
                                                        <div className="input-group mb-3">
                                                            <select name='currency' className="form-control">
                                                                <option data-display="Bitcoin" value="bitcoin">Bitcoin
                                                            </option>
                                                                <option value="litecoin">Litecoin</option>
                                                            </select>
                                                            <input type="text" name="usd_amount" className="form-control"
                                                                value="125.00 USD" />
                                                        </div>
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="form-label">روش پرداخت</label>
                                                        <div className="input-group mb-3">
                                                            <select name='currency' className="form-control">
                                                                <option data-display="Bitcoin" value="bitcoin">Bitcoin
                                                            </option>
                                                                <option value="litecoin">Litecoin</option>
                                                            </select>
                                                            <input type="text" name="usd_amount" className="form-control"
                                                                value="125.00 USD" />
                                                        </div>
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="form-label">مقدار</label>
                                                        <div className="input-group">
                                                            <input type="text" name="currency_amount" className="form-control"
                                                                placeholder="0.0214 BTC" />
                                                            <input type="text" name="usd_amount" className="form-control"
                                                                placeholder="125.00 USD" />
                                                        </div>
                                                        <div className="d-flex justify-content-between mt-3">
                                                            <p className="mb-0">سقف ماهانه: </p>
                                                            <h6 className="mb-0">$49750 باقیمانده</h6>
                                                        </div>
                                                    </div>
                                                    <button type="submit" name="submit"
                                                        className="btn btn-success w-100">تبدیل کن !</button>

                                                </form>
                                            </Tab>
                                            <Tab eventKey="sell" title="فروش">
                                                <form method="post" name="myform" className="currency2_validate">
                                                    <div className="mb-3">
                                                        <label className="form-label">ارز</label>
                                                        <div className="input-group mb-3">
                                                            <select name='currency' className="form-control">
                                                                <option data-display="Bitcoin" value="bitcoin">Bitcoin
                                                            </option>
                                                                <option value="litecoin">Litecoin</option>
                                                            </select>
                                                            <input type="text" name="usd_amount" className="form-control"
                                                                value="125.00 USD" />
                                                        </div>
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="form-label">روش پرداخت</label>
                                                        <div className="input-group mb-3">
                                                            <select name='currency' className="form-control">
                                                                <option data-display="Bitcoin" value="bitcoin">Bitcoin
                                                            </option>
                                                                <option value="litecoin">Litecoin</option>
                                                            </select>
                                                            <input type="text" name="usd_amount" className="form-control"
                                                                value="125.00 USD" />
                                                        </div>
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="form-label">مقدار</label>
                                                        <div className="input-group">
                                                            <input type="text" name="currency_amount" className="form-control"
                                                                placeholder="0.0214 BTC" />
                                                            <input type="text" name="usd_amount" className="form-control"
                                                                placeholder="125.00 USD" />
                                                        </div>
                                                        <div className="d-flex justify-content-between mt-3">
                                                            <p className="mb-0">سقف ماهانه</p>
                                                            <h6 className="mb-0">$49750 remaining</h6>
                                                        </div>
                                                    </div>
                                                    <button type="submit" name="submit"
                                                        className="btn btn-success w-100">تبدیل کن !</button>

                                                </form>
                                            </Tab>
                                        </Tabs>
                                        
                                    </div>

                                </div>
                            </div>
                            <p className="p-4">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است</p>
                        </div>
                        <div className="col-xl-7 col-lg-7 col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="buyer-seller">
                                        <div className="d-flex justify-content-between mb-3">
                                            <div className="buyer-info">
                                                <div className="d-flex align-items-start">
                                                    <img className="ms-3" src={require('./../../images/profile/2.png')} alt="" width="50" />
                                                    <div>
                                                        <h4>خریدار</h4>
                                                        <h5>علی علی زاده</h5>
                                                        <Link to={'#'}>hello@example.com</Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="seller-info text-end">
                                                <div className="d-flex align-items-start">
                                                    <div>
                                                        <h4>فروشنده</h4>
                                                        <h5>علی علیپور</h5>
                                                        <Link to={'#'}>hello@example.com</Link>
                                                    </div>
                                                    <img className="me-3" src={require('./../../images/profile/1.png')} alt="" width="50" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table">
                                                <tbody>
                                                    <tr>
                                                        <td><span className="text-primary">شما فروشنده هستید</span></td>
                                                        <td><span className="text-primary">0.00254 BTC</span></td>
                                                    </tr>
                                                    <tr>
                                                        <td>روش پرداخت</td>
                                                        <td>کارت بانک ملی ***********5245</td>
                                                    </tr>
                                                    <tr>
                                                        <td>نسبت تبدیل</td>
                                                        <td>0.00212455 BTC</td>
                                                    </tr>
                                                    <tr>
                                                        <td>فی</td>
                                                        <td>$28.00 USD</td>
                                                    </tr>
                                                    <tr>
                                                        <td>جمع</td>
                                                        <td>$854.00 USD</td>
                                                    </tr>
                                                    <tr>
                                                        <td>وت</td>
                                                        <td>
                                                            <div className="text-danger">$25.00 USD</div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td> مجموع</td>
                                                        <td> $1232.00 USD</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className="row">
                        <div className="col-xl-6 col-xxl-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">پرس های متداول</h4>
                                </div>
                                <div className="card-body">

                                    <Accordion defaultActiveKey="0" id="accordion-faq" className="accordion">
                                        <Card>
                                            <Accordion.Toggle as={Card.Header} eventKey="0">
                                                <h5>متدهای پرداخت</h5>
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="0">
                                                <Card.Body>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است</Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                        <Card>
                                            <Accordion.Toggle as={Card.Header} eventKey="1">
                                                <h5>سوال 2</h5>
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="1">
                                                <Card.Body>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است</Card.Body>
                                            </Accordion.Collapse>
                                        </Card>

                                        <Card>
                                            <Accordion.Toggle as={Card.Header} eventKey="2">
                                                <h5>سوال 3</h5>
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="2">
                                                <Card.Body>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است</Card.Body>
                                            </Accordion.Collapse>
                                        </Card>

                                    </Accordion>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <Popup />
                        </div>
                    </div> */}
                </div>
            </div>

            
        </>
    )
}

export default BuySell;