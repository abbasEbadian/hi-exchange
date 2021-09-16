import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';



function Header3() {

    return (
        <>
            <div className="header landing_page">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="navigation">
                                <Navbar expand="lg">
                                    <Link className="navbar-brand" to={'/'}><
                                        img src={require('./../../images/logo.png')} alt="" />
                                        <span>Cheerio </span>
                                    </Link>
                                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                    <Navbar.Collapse>
                                        <Nav className="me-auto">
                                            <Nav.Item><a className="nav-link" href="#intro">Home</a></Nav.Item>
                                            <Nav.Item><a className="nav-link" href="#market">Market</a></Nav.Item>
                                            <Nav.Item><a className="nav-link" href="#portfolio">Portfolio</a></Nav.Item>
                                            <Nav.Item><a className="nav-link" href="#features">Features</a></Nav.Item>
                                            <Nav.Item><a className="nav-link" href="#testimonial">Testimonial</a></Nav.Item>
                                            <Nav.Item><a className="nav-link" href="#contact">Contact</a></Nav.Item>
                                        </Nav>

                                    </Navbar.Collapse>

                                    <div className="header_auth">
                                        <Link to={'./signin'} className="btn btn-primary" >Signin</Link>
                                    </div>
                                </Navbar>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header3;