import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import PageTitle from '../element/page-title';
import Header2 from '../layout/header2';
import Sidebar from '../layout/sidebar';
import { toast, ToastContainer } from 'react-toastify';
import { add_credit_card } from '../../redux/actions';
import { useDispatch, useSelector} from 'react-redux'



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
        dispatch(add_credit_card({card, bank , shaba}, toast))
    }
  
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
                                            <div className="mb-3 col-xl-12">
                                                <label className="form-label">شماره شبا </label>
                                                <input type="text" className="form-control" value={shaba} onChange={e=>setShaba(e.target.value)}
                                                placeholder="IR85***********" />
                                            </div>
                                            <div className="mb-4 col-xl-12">
                                                <label className="form-label">نام بانک</label>
                                                <input type="text" className="form-control f"  value={bank} onChange={e=>setBank(e.target.value)}
                                                placeholder="ملی" />
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