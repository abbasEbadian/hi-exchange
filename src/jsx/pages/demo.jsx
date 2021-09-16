import React, { } from 'react';
import { Link } from 'react-router-dom';
import Header1 from '../layout/header1';




function Demo() {

    return (
        <>
            <Header1 />

            <div className="intro section-padding position-relative" id="intro">
                <div className="container">
                    <div className="row align-items-center justify-content-between">
                        <div className="col-xl-6 col-md-6">
                            <div className="intro-content mb-5">
                                <h2>The complete Cryptocurrency Exchange React App</h2>
                                <p>Sign in, Signup, Phone and ID card verification, One time password verify and add bank, debit card settings and profile etc pages included. </p>
                                <Link href="#" className="btn btn-primary" data-scroll-nav="1">View Demo</Link>
                            </div>
                        </div>
                        <div className="col-xl-6 col-md-6 py-md-5">
                            <div className="intro-demo_img intro-img">
                                <img src={require('./../../images/portfolio.jpg')} alt="" className="img-fluid" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="demo section-padding page-section" id="demo">
                <div className="container">
                    <div className="row py-lg-5 justify-content-center">
                        <div className="col-xl-7">
                            <div className="section-heading text-center">
                                <span>Explore</span>
                                <h2>Dashboard</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-4 col-md-4 col-sm-6">
                            <div className="demo_img">
                                <Link to={'./landing'} target="_blank">
                                    <div className="img-wrap">
                                        <img src={require('./../../images/demo/landing.jpg')} alt="" className="img-fluid" />
                                    </div>
                                </Link>
                                <h4>Landing</h4>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-4 col-sm-6">
                            <div className="demo_img">
                                <Link to={'./'} target="_blank">
                                    <div className="img-wrap">
                                        <img src={require('./../../images/demo/dashboard.jpg')} alt="" className="img-fluid" />
                                    </div>
                                </Link>
                                <h4>Dashboard</h4>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-4 col-sm-6">
                            <div className="demo_img">
                                <Link to={'./buy-sell'} target="_blank">
                                    <div className="img-wrap">
                                        <img src={require('./../../images/demo/buy-sell.jpg')} alt="" className="img-fluid" />
                                    </div>
                                </Link>
                                <h4>Buy and Sell</h4>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-4 col-sm-6">
                            <div className="demo_img">
                                <Link to={'./accounts'} target="_blank">
                                    <div className="img-wrap">
                                        <img src={require('./../../images/demo/accounts.jpg')} alt="" className="img-fluid" />
                                    </div>
                                </Link>
                                <h4>Accounts</h4>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-4 col-sm-6">
                            <div className="demo_img">
                                <Link to={'./settings'} target="_blank">
                                    <div className="img-wrap">
                                        <img src={require('./../../images/demo/edit-profile.jpg')} alt="" className="img-fluid" />
                                    </div>
                                </Link>
                                <h4>Edit Profile</h4>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-4 col-sm-6">
                            <div className="demo_img">
                                <Link to={'./settings-preferences'} target="_blank">
                                    <div className="img-wrap">
                                        <img src={require('./../../images/demo/preferences.jpg')} alt="" className="img-fluid" />
                                    </div>
                                </Link>
                                <h4>Preferences</h4>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-4 col-sm-6">
                            <div className="demo_img">
                                <Link to={'./settings-security'} target="_blank">
                                    <div className="img-wrap">
                                        <img src={require('./../../images/demo/security.jpg')} alt="" className="img-fluid" />
                                    </div>
                                </Link>
                                <h4>Security</h4>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-4 col-sm-6">
                            <div className="demo_img">
                                <Link to={'./settings-account'} target="_blank">
                                    <div className="img-wrap">
                                        <img src={require('./../../images/demo/linked-account.jpg')} alt="" className="img-fluid" />
                                    </div>
                                </Link>
                                <h4>Linked Account</h4>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-4 col-sm-6">
                            <div className="demo_img">
                                <Link to={'./history'} target="_blank">
                                    <div className="img-wrap">
                                        <img src={require('./../../images/demo/history.jpg')} alt="" className="img-fluid" />
                                    </div>
                                </Link>
                                <h4>History</h4>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-4 col-sm-6">
                            <div className="demo_img">
                                <Link to={'./signin'} target="_blank">
                                    <div className="img-wrap">
                                        <img src={require('./../../images/demo/signin.jpg')} alt="" className="img-fluid" />
                                    </div>
                                </Link>
                                <h4>Signin</h4>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-4 col-sm-6">
                            <div className="demo_img">
                                <Link to={'./signup'} target="_blank">
                                    <div className="img-wrap">
                                        <img src={require('./../../images/demo/signup.jpg')} alt="" className="img-fluid" />
                                    </div>
                                </Link>
                                <h4>Signup</h4>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-4 col-sm-6">
                            <div className="demo_img">
                                <Link to={'./reset'} target="_blank">
                                    <div className="img-wrap">
                                        <img src={require('./../../images/demo/reset.jpg')} alt="" className="img-fluid" />
                                    </div>
                                </Link>
                                <h4>Reset</h4>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-4 col-sm-6">
                            <div className="demo_img">
                                <Link to={'./lock'} target="_blank">
                                    <div className="img-wrap">
                                        <img src={require('./../../images/demo/lock.jpg')} alt="" className="img-fluid" />
                                    </div>
                                </Link>
                                <h4>Locked</h4>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-4 col-sm-6">
                            <div className="demo_img">
                                <Link to={'./otp-1'} target="_blank">
                                    <div className="img-wrap">
                                        <img src={require('./../../images/demo/otp-phone.jpg')} alt="" className="img-fluid" />
                                    </div>
                                </Link>
                                <h4>OTP Number</h4>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-4 col-sm-6">
                            <div className="demo_img">
                                <Link to={'./otp-2'} target="_blank">
                                    <div className="img-wrap">
                                        <img src={require('./../../images/demo/otp-code.jpg')} alt="" className="img-fluid" />
                                    </div>
                                </Link>
                                <h4>OTP Code</h4>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-4 col-sm-6">
                            <div className="demo_img">
                                <Link to={'./verify-step-1'} target="_blank">
                                    <div className="img-wrap">
                                        <img src={require('./../../images/demo/verify-id.jpg')} alt="" className="img-fluid" />
                                    </div>
                                </Link>
                                <h4>Verify ID</h4>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-4 col-sm-6">
                            <div className="demo_img">
                                <Link to={'./verify-step-2'} target="_blank">
                                    <div className="img-wrap">
                                        <img src={require('./../../images/demo/upload-id.jpg')} alt="" className="img-fluid" />
                                    </div>
                                </Link>
                                <h4>Upload ID</h4>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-4 col-sm-6">
                            <div className="demo_img">
                                <Link to={'./verify-step-3'} target="_blank">
                                    <div className="img-wrap">
                                        <img src={require('./../../images/demo/id-verifing.jpg')} alt="" className="img-fluid" />
                                    </div>
                                </Link>
                                <h4>ID Verifying</h4>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-4 col-sm-6">
                            <div className="demo_img">
                                <Link to={'./verify-step-4'} target="_blank">
                                    <div className="img-wrap">
                                        <img src={require('./../../images/demo/id-verified.jpg')} alt="" className="img-fluid" />
                                    </div>
                                </Link>
                                <h4>ID Verified</h4>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-4 col-sm-6">
                            <div className="demo_img">
                                <Link to={'./add-debit-card'} target="_blank">
                                    <div className="img-wrap">
                                        <img src={require('./../../images/demo/add-debit-card.jpg')} alt="" className="img-fluid" />
                                    </div>
                                </Link>
                                <h4>Add Debit Card</h4>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-4 col-sm-6">
                            <div className="demo_img">
                                <Link to={'./verify-step-6'} target="_blank">
                                    <div className="img-wrap">
                                        <img src={require('./../../images/demo/success.jpg')} alt="" className="img-fluid" />
                                    </div>
                                </Link>
                                <h4>Success</h4>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-4 col-sm-6">
                            <div className="demo_img">
                                <Link to={'./verify-step-5'} target="_blank">
                                    <div className="img-wrap">
                                        <img src={require('./../../images/demo/choose-account.jpg')} alt="" className="img-fluid" />
                                    </div>
                                </Link>
                                <h4>Recommendation</h4>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-4 col-sm-6">
                            <div className="demo_img">
                                <Link to={'./add-bank-acc'} target="_blank">
                                    <div className="img-wrap">
                                        <img src={require('./../../images/demo/add-bank.jpg')} alt="" className="img-fluid" />
                                    </div>
                                </Link>
                                <h4>Add Bank Account</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Demo;