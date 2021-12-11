import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import PageTitle from '../element/page-title';
import Header2 from '../layout/header2';
import Sidebar from '../layout/sidebar';
import { toast, ToastContainer } from 'react-toastify';
import { add_credit_card } from '../../redux/actions';
import { useDispatch, useSelector} from 'react-redux'
import {FiChevronDown} from 'react-icons/fi'


function AddDebitCard() {
    const [ card, setCard ] = useState("")
    const [ shaba, setShaba ] = useState("")
    const [ bank, setBank ] = useState("")
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)

    const onsubmit = e=>{
        e.preventDefault()
        e.stopPropagation()
        if(!card || !shaba || !bank){
            toast.warn("تمامی فیلد ها الزامی است")
            return
        }
        dispatch(add_credit_card({card, bank , shaba:"IR"+shaba}, toast))
    }
    const banks = [
            'سپه',
            'صنعت و معدن',
            'کشاورزی',
            'مسکن',
            'صادرات',
            'تعاون',
            'ایران',
            'اقتصاد نوین',
            'پارسیان',
            'کارآفرین',
            'سامان',
            'سینا',
            'خاورمیانه',
            'شهر',
            'دی',
            'ملت',
            'تجارت',
            'رفاه',
            'آینده',
            'گردشگری',
            'ایران زمین',
            'قوامین',
            'انصار',
            'سرمایه',
            'پاسارگاد',
            'رسالت',
            'مهر ایران',
    ]
    return (
        <>
       {user && user.authentication_status !== "accepted"?
            <Redirect to={"/accounts"}></Redirect>:undefined
        }
            <Header2 />
            <Sidebar />
            <PageTitle />

            <div className="verification section-padding">
                <div className="container h-100">
                    <div className="row justify-content-center h-100 align-items-center">
                        <div className="col-xl-5 col-md-6">
                            <div className="auth-form card">
                                <div className="card-header">
                                    <h4 className="card-title">افزودن کارت اعتباری</h4>
                                </div>
                                <div className="card-body">
                                    <form action="#" className="identity-upload" onSubmit={onsubmit}>
                                        <div className="row">
                                            <div className="mb-3 col-xl-12">
                                                <label className="form-label">شماره کارت</label>
                                                <input type="text" className="form-control"  value={card} onChange={e=>setCard(e.target.value)}
                                                placeholder="6037***********" />
                                            </div>
                                            
                                            <div className="input-group mb-3 col-xl-12">
                                                <label className="form-label w-100">شماره شبا </label>
                                                <input type="text" className="form-control" value={shaba} onChange={e=>setShaba(e.target.value)}
                                                placeholder="85***********" />
                                                <div class="input-group-append pe-0">
                                                    <span class="input-group-text px-3" id="basic-addon1">IR</span>
                                                </div>
                                            </div>
                                            <div className="mb-4 col-xl-12 position-relative">
                                                <label className="form-label">نام بانک</label>
                                                <select  className="form-control"  value={bank} onChange={e=>setBank(e.target.value)}>
                                                    {banks.map((item, idx)=>{
                                                        return <option key={idx} value={item}>{item}</option>
                                                    })}
                                                </select>
                                                <FiChevronDown className="position-absolute" style={{left: "18px", bottom: "12px"}}/>

                                            </div>
                                            <div className="text-center col-12">
                                                <button type="submit" className="btn btn-success w-100">افزودن</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer
                    position="bottom-left"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={true}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    />
            </div>

            
        </>
    )
}

export default AddDebitCard;