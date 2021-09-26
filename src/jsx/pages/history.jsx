import React, { } from 'react';
import Header2 from '../layout/header2';
import Sidebar from '../layout/sidebar';
import PageTitle from '../element/page-title';
import IndexTransactions from '../layout/index-transactions';




function History() {

    return (
        <>
            <Header2 />
            <Sidebar />
            <PageTitle />

            <div className="content-body">
                <div className="container-fluid">
                    <div className="row">
                        <IndexTransactions visibleTrancactionCount={1000}></IndexTransactions>
                    </div>
                </div>
            </div>

            
        </>
    )
}

export default History;