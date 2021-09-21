
import React from 'react'
import { useSelector } from 'react-redux';

const ProfileImage = () => {
    const currentUser = useSelector(state=>state.session.user)
    return (
        <div className="card">
            <div className="card-header">
                <h4 className="card-title">اطلاعات شخصی</h4>
            </div>
            <div className="card-body">
                <form method="post" name="myform" className="personal_validate">
                    <div className="row">
                        
                        <div className="mb-3 col-xl-6">
                            <label className="form-label">ایمیل</label>
                            <input type="email" className="form-control" value={currentUser.email}
                                placeholder="Hello@example.com" name="email" />
                        </div>
                        <div className="mb-3 col-xl-6">
                            <label className="form-label">تاریخ تولد</label>
                            <input type="text" className="form-control" placeholder="1373/11/24" value={currentUser.email}
                                id="datepicker" autoComplete="off" name="dob" />
                        </div>
                        <div className="mb-3 col-xl-6">
                            <label className="form-label">آدرس</label>
                            <input type="text" className="f form-control" value={currentUser.email}
                                placeholder="تبریز ولیعصر" name="presentaddress" />
                        </div>
                        
                        
                        <div className="mb-3 col-xl-6">
                            <label className="form-label">موبایل</label>
                            <input type="text" className="form-control disabled pointer-events-none" placeholder="1234567890" value={currentUser.mobile}
                                name="mobile"  />
                        </div>
                        
                        <div className="mb-3 col-12">
                            <button className="btn btn-success ps-5 pe-5">ذخیره</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
                              
    )
}

export default ProfileImage
