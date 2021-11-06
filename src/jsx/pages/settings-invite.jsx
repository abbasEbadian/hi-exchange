import React, {useState, useEffect} from 'react'
import Header2 from '../layout/header2'
import Sidebar from '../layout/sidebar'
import PageTitle from '../element/page-title'
import SettingsNav from '../element/settings-nav'
import {Constants} from '../../Constants'
import axios from 'axios';
import Loader from 'react-loader-spinner'
import {Alert} from 'react-bootstrap'
import {useSelector} from 'react-redux'
function SettingsInvite() {
    const [refData, setRefData] = useState([]) 
    const [loading, setLoading] = useState(false)
    const [copying, setCopying] = useState(false)
    const user  = useSelector(state => state.session.user)
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
    const copyToClipboard = (text)=>{
        setCopying(true)
        if (window.clipboardData && window.clipboardData.setData) {
            // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
            return window.clipboardData.setData("Text", text);
    
        }
        else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
            var textarea = document.createElement("textarea");
            textarea.textContent = text;
            textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in Microsoft Edge.
            document.body.appendChild(textarea);
            textarea.select();
            try {
                return document.execCommand("copy");  // Security exception may be thrown by some browsers.
            }
            catch (ex) {
                console.warn("Copy to clipboard failed.", ex);
                return false;
            }
            finally {
                document.body.removeChild(textarea);
                setTimeout(() => {
                    setCopying(false)
                }, 2000);
            }
        }
        
        
    }
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
                                    
                                    {
                                    loading?
                                        <Loader type="Oval" color="#00BFFF" className="p-4" height={50} width={50} />:   
                                    refData  ?
                                    <div className="table-responsive">
                                        <table className="table table-responsive-sm px-2 fs-6">
                                            <thead>
                                                <tr>
                                                    <th>تعداد افراد دعوت شده توسط شما</th>
                                                    <th>میزان درآمد شما</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <td>{refData.user_count}</td>
                                                <td>{refData.total_get}</td>
                                            </tbody>
                                        </table>
                                        {/* <p className="px-4 text-left">
                                            <span>مقدار بازگشتی :</span>
                                            {" "}
                                            <span className="text-success">{refData.total_get}</span>
                                        </p> */}
                                        </div>:
                                        <p className="p-4">تا کنون دعوتی نداشته اید</p>
                                    }
                                    <div className="card-footer">
                                        <p>لینک دعوت شما: </p>
                                        <Alert  variant={"primary"} className='mb-1 text-start  bg-transparent text-success  border-gray'>
                                            {Constants.REFERRAL_BASE + (refData.referral_code || 123456 )}
                                        </Alert>
                                        <a onClick={e=>copyToClipboard(Constants.REFERRAL_BASE + (refData.referral_code || 123456 ))} className="pb-3text-success px-2 mb-3">
                                            <small>کپی</small>
                                        </a>
                                        {copying?<small>کپی شد</small>: undefined}

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

export default SettingsInvite
