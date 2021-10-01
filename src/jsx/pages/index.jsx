import React, { useEffect } from "react";
import PageTitle from "../element/page-title";
import Convert from "../element/convert";
import Header2 from "../layout/header2";
import Sidebar from "../layout/sidebar";
import IndexTransactions from "../layout/index-transactions";
import Balance from "../element/balance";
import { useSelector, useDispatch } from "react-redux";
import IndexChart from "../layout/index-chart";
import "react-toastify/dist/ReactToastify.css";
import {Link } from 'react-router-dom'
import { get_wallet_list } from "../../redux/actions";
import UserAvatar from "../element/userAvatar";
function Dashboard() {
  const currentUser = useSelector(state => state.session.user);
  const wallet = useSelector(state=>state.wallet.wallet)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(get_wallet_list())
  }, [])
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
                  <div className="col-12 d-flex flex-wrap ">
                    <div className="col-12 col-lg-4">
                      <div className="card welcome-profile transparent">
                        <div className="card-body">
                          <UserAvatar></UserAvatar>

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
                            {currentUser &&
                                currentUser.authentication_status !==
                                  "accepted" ?
                                <Link to="/verify-step-1">
                                    <span className="not-verified">
                                      <i className="icofont-close-line"></i>
                                    </span>
                                  تایید حساب
                                </Link>:
                                <>
                                  <a href="#">
                                    <span className="verified">
                                    <i className="icofont-check-alt"></i>

                                </span>
                                  تایید شده
                                  </a>
                                </>}
                            </li>
                            
                            <li>
                              <Link to="/wallet">
                                {wallet && wallet.length && wallet.filter(item=>{return item&&item.balance>0}).length ? (
                                  <span className="verified">
                                    <i className="icofont-check-alt" ></i>
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
                  <div className="col-12 d-flex flex-wrap">
                    <IndexChart></IndexChart>
                  </div>
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
      
        <span></span>
      
    </>
  );
}

export default Dashboard;
