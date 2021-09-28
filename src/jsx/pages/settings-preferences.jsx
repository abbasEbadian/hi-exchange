import React from 'react';
import PageTitle from '../element/page-title';
import SettingsNav from '../element/settings-nav';
import Header2 from '../layout/header2';
import Sidebar from '../layout/sidebar';




function Preferences() {

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
                                            <h4 className="card-title">هشدارها</h4>
                                        </div>
                                        <div className="card-body">
                                            <form action="#">
                                                <div className="row col-6">
                                                    <div className="mb-3 mb-0">
                                                        <label className="toggle">
                                                            <input className="toggle-checkbox" type="checkbox" defaultChecked={true} />
                                                            <span className="toggle-switch"></span>
                                                            <span className="toggle-label">ارسال یا دریافت ارز دیجیتال</span>
                                                        </label>
                                                        <label className="toggle">
                                                            <input className="toggle-checkbox" type="checkbox" />
                                                            <span className="toggle-switch"></span>
                                                            <span className="toggle-label">دریاف پیام از معامله گر</span>
                                                        </label>
                                                        <label className="toggle">
                                                            <input className="toggle-checkbox" type="checkbox" />
                                                            <span className="toggle-switch"></span>
                                                            <span className="toggle-label">وجود پیشنهاد برای اکانت من</span>
                                                        </label>
                                                    </div>

                                                    <div className="col-12">
                                                        <button className="btn btn-success">ذخیره</button>
                                                    </div>
                                                </div>
                                            </form>
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

export default Preferences;