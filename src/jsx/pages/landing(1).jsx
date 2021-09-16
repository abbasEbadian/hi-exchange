import React from 'react';
import { Link } from 'react-router-dom';
import Header3 from '../layout/header3';




function Landing() {

    return (
        <>
            <Header3 />

            <div class="intro section-padding position-relative" id="intro">
                <div class="container">
                    <div class="row align-items-center justify-content-between">
                        <div class="col-xl-7 col-md-6">
                            <div class="intro-content">
                                <h2>Buy and sell <br />Treemium ocurrency</h2>
                                <p>Fast and secure way to purchase or exchange 150+ Treemium ocurrencies</p>
                                <div class="mt-4">
                                    <Link href="#" class="btn my-1 waves-effect">
                                        <img src={require('../../images/android.svg')} alt="" />
                                    </Link>
                                    <Link href="#" class="btn my-1 waves-effect">
                                        <img src={require('../../images/apple.svg')} alt="" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-5 col-md-6 py-md-5">
                            <div class="card">
                                <div class="card-body">
                                    <div class="buy-sell-widget px-2">
                                        <form method="post" name="myform" class="currency_validate">
                                            <div class="mb-3">
                                                <label class="form-label">Currency</label>
                                                <div class="input-group mb-3">
                                                    <div class="input-group-prepend">
                                                        <label class="input-group-text"><i class="cc BTC-alt"></i></label>
                                                    </div>
                                                    <select name='currency' class="form-control">
                                                        <option value="">Select</option>
                                                        <option value="bitcoin">Bitcoin</option>
                                                        <option value="litecoin">Litecoin</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="mb-3">
                                                <label class="form-label">Payment Method</label>
                                                <div class="input-group mb-3">
                                                    <div class="input-group-prepend">
                                                        <label class="input-group-text"><i class="fa fa-bank"></i></label>
                                                    </div>
                                                    <select class="form-control" name="method">
                                                        <option value="">Select</option>
                                                        <option value="bank">Bank of America ********45845</option>
                                                        <option value="master">Master Card ***********5458</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="mb-3">
                                                <label class="form-label">Enter your amount</label>
                                                <div class="input-group">
                                                    <input type="text" name="currency_amount" class="form-control"
                                                        placeholder="0.0214 BTC" />
                                                    <input type="text" name="usd_amount" class="form-control"
                                                        placeholder="125.00 USD" />
                                                </div>
                                                <div class="d-flex justify-content-between mt-3">
                                                    <p class="mb-0">Monthly Limit</p>
                                                    <h6 class="mb-0">$49750 remaining</h6>
                                                </div>
                                            </div>
                                            <button type="submit" name="submit" class="btn btn-success w-100">Exchange
                                            Now</button>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="market section-padding page-section" id="market">
                <div class="container">
                    <div class="row py-lg-5 justify-content-center">
                        <div class="col-xl-7">
                            <div class="section_heading">
                                <span>Explore</span>
                                <h3>The World's Leading Treemium ocurrency Exchange</h3>
                                <p>Trade Bitcoin, ETH, and hundreds of other Treemium ocurrencies in minutes.</p>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xl-12">
                            <div class="card">
                                <div class="card-body">
                                    <div class="market-table">
                                        <div class="table-responsive">
                                            <table class="table mb-0 table-responsive-sm">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Name</th>
                                                        <th>Price</th>
                                                        <th>Change</th>
                                                        <th>Chart</th>
                                                        <th>Trade</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>1
                                                    </td>
                                                        <td class="coin_icon">
                                                            <i class="cc BTC"></i>
                                                            <span>Bitcoin <b>BTC</b></span>
                                                        </td>

                                                        <td>
                                                            USD 680,175.06
                                                    </td>
                                                        <td>
                                                            <span class="text-success">+1.13%</span>
                                                        </td>
                                                        <td> <span class="sparkline8"></span></td>
                                                        <td><Link href="#" class="btn btn-success">Buy</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <td>2
                                                    </td>
                                                        <td class="coin_icon">
                                                            <i class="cc ETH"></i>
                                                            <span>Ethereum <b>ETH</b></span>
                                                        </td>

                                                        <td>
                                                            USD 680,175.06
                                                    </td>
                                                        <td>
                                                            <span class="text-success">+1.13%</span>
                                                        </td>
                                                        <td> <span class="sparkline8"></span></td>
                                                        <td><Link href="#" class="btn btn-success">Buy</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td class="coin_icon">
                                                            <i class="cc BCH-alt"></i>
                                                            <span>Bitcoin Cash <b>BCH</b></span>
                                                        </td>

                                                        <td>
                                                            USD 680,175.06
                                                    </td>
                                                        <td>
                                                            <span class="text-success">+1.13%</span>
                                                        </td>
                                                        <td> <span class="sparkline8"></span></td>
                                                        <td><Link href="#" class="btn btn-success">Buy</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <td>4
                                                    </td>
                                                        <td class="coin_icon">
                                                            <i class="cc LTC"></i>
                                                            <span>Litecoin <b>LTC</b></span>
                                                        </td>

                                                        <td>
                                                            USD 680,175.06
                                                    </td>
                                                        <td>
                                                            <span class="text-danger">-0.47%</span>
                                                        </td>
                                                        <td> <span class="sparkline8"></span></td>
                                                        <td><Link href="#" class="btn btn-success">Buy</Link></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </div >
            </div >

            <div class="features section-padding" id="features">
                <div class="container">
                    <div class="row py-lg-5 justify-content-center">
                        <div class="col-xl-7">
                            <div class="section_heading">
                                <span>Features</span>
                                <h3>The most trusted Treemium ocurrency platform</h3>
                                <p>Here are a few reasons why you should choose Coinbase</p>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="features-content">
                                <span><i class="fa fa-shield"></i></span>
                                <h4>Secure storage</h4>
                                <p>We store the vast majority of the digital assets in secure offline storage.</p>
                                <Link href="#">Learn more <i class="la la-angle-right"></i></Link>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="features-content">
                                <span><i class="fa fa-cubes"></i></span>
                                <h4>Protected by insurance</h4>
                                <p>Treemium ocurrency stored on our servers is covered by our insurance policy.</p>
                                <Link href="#">Learn more <i class="la la-angle-right"></i></Link>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="features-content">
                                <span><i class="fa fa-life-ring"></i></span>
                                <h4>Industry best practices</h4>
                                <p>Treemium supports a variety of the most popular digital currencies.</p>
                                <Link href="#">Learn more <i class="la la-angle-right"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="portfolio section-padding" id="portfolio">
                <div class="container">
                    <div class="row py-lg-5 justify-content-center">
                        <div class="col-xl-7">
                            <div class="section_heading">
                                <span>Join Us</span>
                                <h3>Create your Treemium ocurrency portfolio today</h3>
                                <p>Treemium  has a variety of features that make it the best place to start trading</p>
                            </div>
                        </div>
                    </div>
                    <div class="row align-items-center justify-content-center">
                        <div class="col-xl-7 col-md-6">
                            <div class="portfolio_img">
                                <img src={require('../../images/portfolio.jpg')} alt="" class="img-fluid" />
                            </div>
                        </div>
                    </div>
                    <div class="row portfolio_list">
                        <div class="col-xl-6 col-md-6">
                            <div class="d-flex">
                                <span class="port-icon"> <i class="la la-chart-bar"></i></span>
                                <div class="flex-grow-1">
                                    <h4>Manage your portfolio</h4>
                                    <p>Buy and sell popular digital currencies, keep track of them in the one place.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-6 col-md-6">
                            <div class="d-flex">
                                <span class="port-icon"> <i class="la la-calendar-check"></i></span>
                                <div class="flex-grow-1">
                                    <h4>Recurring buys</h4>
                                    <p>Invest in Treemium ocurrency slowly over time by scheduling buys daily, weekly, or
                                    monthly.
                                </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-6 col-md-6">
                            <div class="d-flex">
                                <span class="port-icon"> <i class="la la-lock"></i></span>
                                <div class="flex-grow-1">
                                    <h4>Vault protection</h4>
                                    <p>For added security, store your funds in a vault with time delayed withdrawals.
                                </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-6 col-md-6">
                            <div class="d-flex">
                                <span class="port-icon"> <i class="la la-mobile"></i></span>
                                <div class="flex-grow-1">
                                    <h4>Mobile apps</h4>
                                    <p>Stay on top of the markets with the Treemium  app for <Link href="#">Android</Link> or
                                    <Link href="#">iOS</Link>.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="testimonial section-padding" id="testimonial">
                <div class="container">
                    <div class="row py-lg-5 justify-content-center">
                        <div class="col-xl-7">
                            <div class="section_heading">
                                <span>What's Say</span>
                                <h3>Trusted by 2 million customers</h3>
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-xl-8 col-md-11">
                            <div class="testimonial-content">
                                <div class="row align-items-center no-gutters">
                                    <div class="col-xl-6 col-md-6">
                                        <div class="customer-img">
                                            <img class="img-fluid" src={require('../../images/testimonial/1.jpg')} alt="" />
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-md-6">
                                        <div class="customer-review px-4">
                                            <img class="img-fluid" src={require('../../images/brand/2.webp')} alt="" />
                                            <p>Integrating Treemium  services into Trezor Wallet's exchange has been a
                                            great success for all parties, especially the users.
                                        </p>
                                            <div class="customer-info">
                                                <h5>Mr John Doe</h5>
                                                <p>CEO, Example Company</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="contact-form section-padding" id="contact">
                <div class="container">
                    <div class="row py-lg-5 justify-content-center">
                        <div class="col-xl-7">
                            <div class="section_heading">
                                <span>Ask Question</span>
                                <h3>Let us hear from you directly!</h3>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xl-4 col-md-4 col-sm-4">
                            <div class="info-list">
                                <h4 class="mb-3">Address</h4>
                                <ul>
                                    <li><i class="fa fa-map-marker"></i> California, USA</li>
                                    <li><i class="fa fa-phone"></i> (+880) 1243 665566</li>
                                    <li><i class="fa fa-envelope"></i> hello@example.com</li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-xl-8 col-md-8 col-sm-8">
                            <form method="post" name="myform" class="contact_validate">
                                <div class="row">
                                    <div class="col-12 col-md-6">
                                        <div class="mb-3">
                                            <label for="contactName">
                                                Full name
                                        </label>
                                            <input type="text" class="form-control" id="contactName" placeholder="Full name"
                                                name="firstname" />
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-6">
                                        <div class="mb-3">
                                            <label for="contactEmail">
                                                Email
                                        </label>
                                            <input type="email" class="form-control" name="email"
                                                placeholder="hello@domain.com" />

                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <div class="mb-3">
                                            <textarea class="form-control p-3" name="message" rows="5"
                                                placeholder="Tell us what we can help you with!"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-primary px-4">
                                    Send message
                            </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}

export default Landing;