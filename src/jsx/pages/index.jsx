import React from "react";
import PageTitle from "../element/page-title";
import Convert from "../element/convert";
import Header2 from "../layout/header2";
import Sidebar from "../layout/sidebar";
import IndexTransactions from "../layout/index-transactions";
import Balance from "../element/balance";
import { useSelector } from "react-redux";
import IndexChart from "../layout/index-chart";
import "react-toastify/dist/ReactToastify.css";
import {Link } from 'react-router-dom'
function Dashboard() {
  const currentUser = useSelector(state => state.session.user);
  const wallet = useSelector(state=>state.wallet.wallet)
  return (
    <>
      <Header2 />
      <Sidebar />
      <PageTitle />

      {currentUser.first_name ? (
        <div className="content-body">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-9 col-xxl-12">
                <div className="row">
                  <div className="col-12 row">
                    <div className="col-12 col-lg-4">
                      <div className="card welcome-profile transparent">
                        <div className="card-body">
                          <img
                            src={require("../../images/profile/2.png")}
                            alt=""
                          />

                          {currentUser &&
                            currentUser.authentication_status ===
                              "unverified" && (
                              <p>
                                <small>
                                  حساب کاربری شما هنوز تایید نشده است.
                                </small>
                              </p>
                            )}

                          <ul>
                            <li>
                              <a href="#">
                                {currentUser &&
                                currentUser.authentication_status ===
                                  "accepted" ? (
                                  <span className="verified">
                                    <i className="icofont-check-alt"></i>
                                  </span>
                                ) : (
                                  <span className="not-verified">
                                    <i className="icofont-close-line"></i>
                                  </span>
                                )}
                                تایید حساب
                              </a>
                            </li>
                            
                            <li>
                              <Link to="/wallet">
                                {wallet && wallet.length && wallet.filter(item=>{return item&&item.balance>0}).length ? (
                                  <span className="verified">
                                    <i className="icofont-check-alt"></i>
                                  </span>
                                ) : (
                                  <span className="not-verified">
                                    <i className="icofont-close-line"></i>
                                  </span>
                                )}
                                شارژ کیف پول
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-8">
                      <Convert></Convert>
                    </div>
                  </div>
                  <div className="col-12 row">
                    <IndexChart></IndexChart>
                  </div>
                  {/* <div className="col-xl-4 col-lg-12 col-xxl-4">
                                    
                                </div>

                                <div className="col-xl-8 col-lg-12 col-xxl-8">
                                    
                                    
                                </div> */}
                </div>
              </div>

              <div className="col-xl-3 col-xxl-12">
                <Balance></Balance>
              </div>
            <div className="col-xl-12 col-xxl-12">
                <IndexTransactions visibleTrancactionCount={4}>

                </IndexTransactions>
            </div>
          </div>
        </div>
        </div>
      ) : (
        <span></span>
      )}
    </>
  );
}

export default Dashboard;
