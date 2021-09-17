import React, { useContext } from 'react';
import { UserContext } from '../UserContext';



function PageTitle() {
    const {user: currentUser } = useContext(UserContext);
    return (
        <>
            <div className="page_title">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="page_title-content">
                                <p>خوش آمدید ،
                                <span> {currentUser.name} </span>
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