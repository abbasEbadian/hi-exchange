import React, {useState, useEffect} from 'react'
import Header2 from '../layout/header2'
import Sidebar from '../layout/sidebar'
import PageTitle from '../element/page-title'
import SettingsNav from '../element/settings-nav'
import {Constants} from '../../Constants'
import axios from 'axios';

function SettingsInvite() {
    const [refs, setRefs] = useState([]) 
    useEffect(() => {
        axios.get(Constants.BASE_URL+"/api/v2/account/referral/").then(response=>{
            const { data } = response
            setRefs(data)
        }).catch(error=>{
            console.log(error);
            
        })
    }, [])
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
                                    
                                    {refs && refs.length ?
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
                                                {refs.map((item, idx)=>{
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
                                        <p className="p-4">تا کنون دعوتی نداشته اید</p>
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
