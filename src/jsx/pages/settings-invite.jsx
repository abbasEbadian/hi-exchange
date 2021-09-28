import React from 'react'
import Header2 from '../layout/header2'
import Sidebar from '../layout/sidebar'
import PageTitle from '../element/page-title'
import SettingsNav from '../element/settings-nav'
function SettingsInvite() {
    const friends = [
        {
            email: "test.example@gmail.com",
            date: "1400/04/05",
            profit: 1000,
            status: "در حال استفاده"
        },
        {
            email: "test.example2@gmail.com",
            date: "1400/02/01",
            profit: 2000,
            status: "در حال استفاده"
        },
        {
            email: "test.example3@gmail.com",
            date: "1400/02/03",
            profit: 4000,
            status: "در حال استفاده"
        },
        {
            email: "test.example4@gmail.com",
            date: "1400/03/01",
            profit: 5000,
            status: "در حال استفاده"
        },
    ]
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
                        <div className="row">
                           
                            <div className="col-xl-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-title">فعالیت دوستان</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="col-12">
                                            <label htmlFor="" className="form-label"><small>لینک دعوت شما</small></label>
                                            <input type="text" className="form-control" value="https:///hi-exchange.com/test"/>
                                        </div>
                                    </div>
                                    {friends && friends.length ?
                                    <div className="table-responsive">
                                        <table className="table table-responsive-sm px-2 fs-6">
                                            <thead>
                                                <tr>
                                                    <th>ایمیل</th>
                                                    <th>تاریخ عضویت</th>
                                                    <th>میزان بازگشت</th>
                                                    <th>وضعیت</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {friends.map((item, idx)=>{
                                                    return <tr key={idx}>
                                                        <td>{item.email}</td>
                                                        <td>{item.date}</td>
                                                        <td>{item.profit}</td>
                                                        <td>{item.status}</td>
                                                    </tr>

                                                })}
                                            </tbody>
                                        </table>
                                        </div>:
                                        <p>تا کنون دعوتی نداشته اید</p>
                                    }
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

export default SettingsInvite
