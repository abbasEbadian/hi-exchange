import React, {useState, useEffect} from 'react'
import Header2 from '../layout/header2'
import Sidebar from '../layout/sidebar'
import PageTitle from '../element/page-title'
import SettingsNav from '../element/settings-nav'
import {Constants} from '../../Constants'
import axios from 'axios';
import Loader from 'react-loader-spinner'

function SettingsInvite() {
    const [refData, setRefData] = useState([]) 
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        axios.get(Constants.BASE_URL+"/api/v2/account/referral/").then(response=>{
            const { data } = response
            setRefData(data)
        }).catch(error=>{
            console.log(error);
        }).finally(f=>{
            setLoading(false)

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
                                        <span>
                                            <span>تعداد کل کاربرها: </span>
                                        <span className="text-info">{refData.user_count}</span>
                                        </span>
                                    </div>
                                    
                                    {
                                    loading?
                                        <Loader type="Oval" color="#00BFFF" className="p-4" height={50} width={50} />:   
                                    refData && refData.users && refData.users.length ?
                                    <div className="table-responsive">
                                        <table className="table table-responsive-sm px-2 fs-6">
                                            <thead>
                                                <tr>
                                                    <th>زدیف</th>
                                                    <th>شناسه</th>
                                                    <th>همراه</th>
                                                    {/* <th>میزان بازگشت</th>
                                                    <th>وضعیت</th> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {refData.users.map((item, idx)=>{
                                                    return <tr key={idx}>
                                                        <td>{idx+1}</td>
                                                        <td>{item.id}</td>
                                                        <td>{item.mobile}</td>
                                                    </tr>

                                                })}
                                            </tbody>
                                        </table>
                                        <p className="px-4 text-left">
                                            <span>مقدار بازگشتی :</span>
                                            {" "}
                                            <span className="text-success">{refData.total_get}</span>
                                        </p>
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
