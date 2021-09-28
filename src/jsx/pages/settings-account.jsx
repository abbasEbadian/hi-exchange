import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../element/page-title';
import SettingsNav from '../element/settings-nav';
import Header2 from '../layout/header2';
import Sidebar from '../layout/sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { fetch_accounts } from '../../redux/actions';




function SettingsAccount() {
    const cards = useSelector(state => state.accounts.cards)
   
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
                                                            {/* <div className="edit-option">
                                                                <Link to={'#'}><i className="fa fa-eye"></i></Link>
                                                                <Link to={'#'}><i className="fa fa-pencil"></i></Link>
                                                                <Link to={'#'}><i className="fa fa-trash"></i></Link>
                                                            </div> */}
                                                        </div>
                                                    </div>
                                                    <div className="col-3">
                                                        <div className="verify">
                                                            {card.status==="confirmed" ?
                                                                <div className="verified">
                                                                    <span><i className="la la-check"></i></span>
                                                                    <a>تایید شده</a>
                                                                </div>
                                                                : 
                                                                (
                                                                card.status==="pending"? 
                                                                <div className="not-verify">
                                                                    <span><i className="icofont-info"></i></span>
                                                                    <a>در انتظار تایید</a>
                                                                </div>:
                                                                <div className="not-verify">
                                                                    <span><i className="icofont-close-line"></i></span>
                                                                    <a>تایید نشده</a>
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
                                        {/* <Link to={'./verify-step-5'} className="btn btn-primary px-4 ms-3">افزودن شماره حساب</Link> */}
                                        <Link to={'/add-debit-card'} className="btn btn-success px-4">افزودن کارت اعتباری</Link>
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