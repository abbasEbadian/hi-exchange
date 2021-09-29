import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../element/page-title';
import SettingsNav from '../element/settings-nav';
import Header2 from '../layout/header2';
import Sidebar from '../layout/sidebar';
import { useSelector } from 'react-redux';




function SettingsAccount() {
    const cards = useSelector(state => state.accounts.cards)
    const user = useSelector(state => state.session.user)
   
    return (
        <>
            <Header2 />
            <Sidebar />
            <PageTitle />

            <div className="content-body">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-3 col-md-4">
                        <SettingsNav />
                    </div>
                    <div className="col-xl-9 col-md-8">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">حساب یا کارت های متصل</h4>
                            </div>
                            <div className="card-body">
                                <div className="form">
                                    <ul className="linked_account">
                                        {cards.length?
                                            cards.map((card, idx)=>{
                                                return <li key={idx}>
                                                <div className="row">
                                                    <div className="col-9">
                                                        <div className="d-flex">
                                                            <span className="ms-3"><i className="fa fa-credit-card"></i></span>
                                                            <div>
                                                                <h5 className="mt-0 mb-1">بانک{" "}{card.bank}</h5>
                                                                <p dir="ltr" className="mb-0"> {card.card.slice(0,4)}{"*".repeat(12)} کارت</p>
                                                            </div>
                                                           
                                                        </div>
                                                    </div>
                                                    <div className="col-3">
                                                        <div className="verify">
                                                            {card.status==="confirmed" ?
                                                                <div className="verified">
                                                                    <span><i className="la la-check"></i></span>
                                                                    <Link>تایید شده</Link>
                                                                </div>
                                                                : 
                                                                (
                                                                card.status==="pending"? 
                                                                <div className="not-verify">
                                                                    <span><i className="icofont-info"></i></span>
                                                                    <Link>در انتظار تایید</Link>
                                                                </div>:
                                                                <div className="not-verify">
                                                                    <span><i className="icofont-close-line"></i></span>
                                                                    <Link>تایید نشده</Link>
                                                                </div>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            })
                                        :<p>حساب ثبت نشده است</p>}

                                        
                                    </ul>

                                    <div className="mt-5">
                                        {user&& user.authentication_status !=="accepted"?
                                        <>
                                        <Link to={'/add-debit-card'} className="btn btn-success px-4 disabled" disabled>افزودن کارت اعتباری</Link>
                                        <small className="mx-3 text-danger">برای افزودن کارت باید حساب شما تایید شده باشد.
                                            <Link className="mx-2 text-warning" to="/verify-step-1">احراز هویت</Link>
                                        </small>
                                        </>
                                        :<Link to={'/add-debit-card'} className="btn btn-success px-4">افزودن کارت اعتباری</Link>
                                    }
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

export default SettingsAccount;