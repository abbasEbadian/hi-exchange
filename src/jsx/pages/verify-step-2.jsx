import React , {useState } from "react";
import { Link, useHistory} from "react-router-dom";
import Header2 from "../layout/header2";
import Sidebar from "../layout/sidebar";
import {useDispatch } from 'react-redux'
import {userUpdateImage} from '../../redux/actions'
import Loader from 'react-loader-spinner'
import { toast, ToastContainer  } from "react-toastify";

function VerifyStep2() {
    const dispatch = useDispatch()
    const history = useHistory()

    const [filename, setFilename] = useState("انتخاب فایل...")
    const [file, setFile] = useState(undefined)
    const [ uploading, setUploading ] = useState(false)

    const handleFile = (e)=>{
        
        e.preventDefault()
        e.stopPropagation()
        console.log(e.target);
        
        if(!e || !e.target || !e.target.files || !e.target.files.length>0) return false;
        let reader = new FileReader();
        let filee = e.target.files[0]
        reader.readAsDataURL(filee);
        reader.onload = function () {
            setFile(reader.result);
            setFilename(filee.name)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
        

    const handleSubmit = (e)=>{
        setUploading(true)
        e.preventDefault()
        e.stopPropagation()
        const data = new FormData() 
        data.append('image', file)
        dispatch(userUpdateImage(file)).then(status=>{
            if(status === 200){
                setTimeout(() => {
                    setUploading(false)
                    history.push("/verify-step-4")
                }, 1000);

            }else{
                toast.error("خطا هنگام ارتباط")
            }
        })
        return false
        
    }
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
                                        onSubmit={handleSubmit}
                                    >
                                        <div className="identity-content">
                                            <h4>آپلود تصویر </h4>
                                            

                                            <p>
                                             لطفا تصویر 
                                                3x4
                                                خود را آپلود کنید
                                            </p>
                                        </div>

                                        <div className="my-5">
                                           
                                            <div
                                                className="file-upload-wrapper"
                                                data-text={filename}
                                            >
                                                <input
                                                    name="file-upload-field"
                                                    type="file"
                                                    accept="image/*"
                                                    className="file-upload-field"
                                                    onChange={handleFile}
                                                />
                                            </div>
                                        </div>
                                       
                                        <div className="text-center mt-5">
                                            <button
                                                type="submit"
                                                className={"btn btn-success w-100 d-flex justify-content-center align-items-center " + (!file?"disabled":undefined)}
                                                disabled={!file?"disabled":undefined}
                                            >
                                                ارسال
                                                {uploading?
                                                    <Loader className="mx-2" type="ThreeDots" width={25} height={25} color="#fff"></Loader>
                                                    :undefined }
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer
                    position="bottom-left"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={true}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    />
            </div>
        </>
    );
}

export default VerifyStep2;
