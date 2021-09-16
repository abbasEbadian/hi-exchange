import React, { } from 'react';
import { Link } from 'react-router-dom';
// import { Row, Col, Card } from 'react-bootstrap'



function Footer2() {

    return (
        <>
            <div className="footer">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-xl-6 col-md-6">
                            <div className="copy_right">
                                Copyright © 2020 Quixlab. All Rights Reserved.
                        </div>
                        </div>
                        <div className="col-xl-6 col-md-6 text-lg-right text-center">
                            <div className="social">
                                <Link href="https://www.youtube.com/channel/UChN1goECpg64jlUxSzySiNg?view_as=subscriber"><i className="fa fa-youtube-play"></i></Link>
                                <Link href="https://twitter.com/quixlab"><i className="fa fa-twitter"></i></Link>
                                <Link href="https://www.facebook.com/qxlab"><i className="fa fa-facebook"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer2;