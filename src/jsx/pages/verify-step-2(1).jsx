import React from "react";
import { Link } from "react-router-dom";
import Header2 from "../layout/header2";
import Sidebar from "../layout/sidebar";

function VerifyStep2() {
    return (
        <>
            <Header2 />
            <Sidebar />

            <div className="verification section-padding">
                <div className="container h-100">
                    <div className="row justify-content-center h-100 align-items-center">
                        <div className="col-xl-5 col-md-6">
                            <div className="auth-form card">
                                <div className="card-body">
                                    <form
                                        action="#"
                                        className="identity-upload"
                                    >
                                        <div className="identity-content">
                                            <h4>Upload your ID card</h4>
                                            <span>
                                                (Driving License or Government
                                                ID card)
                                            </span>

                                            <p>
                                                Uploading your ID helps as
                                                ensure the safety and security
                                                of your founds
                                            </p>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">
                                                Upload Front ID{" "}
                                            </label>
                                            <span className="float-right">
                                                Maximum file size is 2mb
                                            </span>
                                            <div
                                                className="file-upload-wrapper"
                                                data-text="front.jpg"
                                            >
                                                <input
                                                    name="file-upload-field"
                                                    type="file"
                                                    className="file-upload-field"
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-5">
                                            <label className="form-label">
                                                Upload Back ID{" "}
                                            </label>
                                            <span className="float-right">
                                                Maximum file size is 2mb
                                            </span>
                                            <div
                                                className="file-upload-wrapper"
                                                data-text="back.jpg"
                                            >
                                                <input
                                                    name="file-upload-field"
                                                    type="file"
                                                    className="file-upload-field"
                                                />
                                            </div>
                                        </div>

                                        <div className="text-center">
                                            <Link
                                                to={"./verify-step-3"}
                                                type="submit"
                                                className="btn btn-success w-100"
                                            >
                                                Submit
                                            </Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default VerifyStep2;
