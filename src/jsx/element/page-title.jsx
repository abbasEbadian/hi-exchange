import React from 'react';
import { useSelector } from 'react-redux';



function PageTitle() {
    const currentUser = useSelector(state=>state.session.user)
    return (
        <>
            <div className="page_title d-none">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="page_title-content">
                                <p>خوش آمدید ،
                                <span> {(currentUser.first_name||'') + " " + currentUser.last_name} </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PageTitle;