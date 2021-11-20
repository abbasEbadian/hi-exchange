import React , {useState } from "react";
import {  useHistory} from "react-router-dom";
import Header2 from "../layout/header2";
import Sidebar from "../layout/sidebar";
import {useDispatch, useSelector } from 'react-redux'
import {userUpdateImage} from '../../redux/actions'
import Loader from 'react-loader-spinner'
import { toast, ToastContainer } from "react-toastify";

function ProfileImages({source=undefined}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state=>state.session.user)
    const [filename1, setFilename1] = useState("آپلود تصویر پرسنلی یا سلفی")
    const [filename2, setFilename2] = useState("آپلود تصویر کارت ملی")
    const [filename3, setFilename3] = useState("آپلود تصویر شناسنامه")
    const [filename4, setFilename4] = useState("آپلود تصویر قبض")
    const [file1, setFile1] = useState(undefined)
    const [file2, setFile2] = useState(undefined)
    const [file3, setFile3] = useState(undefined)
    const [file4, setFile4] = useState(undefined)


    const [ uploading, setUploading ] = useState(false)

    const handleFile = (e, id)=>{
        
        e.preventDefault()
        e.stopPropagation()
        
        if(!e || !e.target || !e.target.files || !e.target.files.length>0) return false;
        let reader = new FileReader();
        let filee = e.target.files[0]
        reader.readAsDataURL(filee);
        reader.onload = function () {
            switch(id){
                case 1: 
                    setFile1(reader.result);
                    setFilename1(filee.name)
                    break
                case 2:
                    setFile2(reader.result);
                    setFilename2(filee.name)
                    break
                case 3:
                    setFile3(reader.result);
                    setFilename3(filee.name)
                    break
                case 4:
                    setFile4(reader.result);
                    setFilename4(filee.name)
                    break
                default: break
            }

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
        data.append('selfie_photo', file1)
        data.append('card', file2)
        data.append('birth_certificate', file3)
        data.append('bill', file4)
        dispatch(userUpdateImage(data)).then(({status, message})=>{
            if(status === 200){
                toast.success(message)
                setTimeout(() => {
                    setUploading(false)
                    if(!source) history.push("/verify-step-4")
                }, 1000);

            }else{
                toast.error(message)
            }
        }).catch(err=>{
            console.log(err);
        }).finally(f=>{
            setUploading(false);
        })
        return false
        
    }
    return (<>
    {source?
        <div className="card-body">
            <form
                action="#"
                className="identity-upload"
                onSubmit={handleSubmit}
            >
                

                <div className="mb-5">
                
                <div
                    className="file-upload-wrapper"
                    data-text={filename1}
                >
                    {user.scans&&user.scans.selfie?<label className='form-label text-start'>
                        <i className="la la-check"></i>
                        {" آپلود شده "}
                    </label>:undefined}
                    <input
                        name="file-upload-field"
                        type="file"
                        accept="image/*"
                        className="file-upload-field"
                        onChange={e=>handleFile(e, 1)}
                    />
                </div>
                <div
                    className="file-upload-wrapper my-3"
                    data-text={filename2}
                >
                    {user.scans&&user.scans.national_card?<label className='form-label text-start'>
                        <i className="la la-check"></i>
                        {" آپلود شده "}
                    </label>:undefined}
                    <input
                        name="file-upload-field"
                        type="file"
                        accept="image/*"
                        className="file-upload-field"
                        onChange={e=>handleFile(e, 2)}
                    />
                </div>
                <div
                    className="file-upload-wrapper"
                    data-text={filename3}
                >
                    {user.scans&&user.scans.birth_certificate?<label className='form-label text-start'>
                        <i className="la la-check"></i>
                        {" آپلود شده "}
                    </label>:undefined}
                    <input
                        name="file-upload-field"
                        type="file"
                        accept="image/*"
                        className="file-upload-field"
                        onChange={e=>handleFile(e, 3)}
                    />
                    {/* <small className="form-text">اختیاری</small> */}
                </div>
                <div
                    className="file-upload-wrapper mt-3"
                    data-text={filename4}
                >
                    {user.scans && user.scans.bill?<label className='form-label text-start'>
                        <i className="la la-check"></i>
                        {" آپلود شده "}
                    </label>:undefined}
                    <input
                        name="file-upload-field"
                        type="file"
                        accept="image/*"
                        className="file-upload-field"
                        onChange={e=>handleFile(e, 4)}
                    />
                    <small className="form-text">اختیاری</small>
                </div>
            </div>
        
          
                <div className="text-center mt-5">
                    <button
                        type="submit"
                        className={"btn btn-success w-100 d-flex justify-content-center align-items-center " + (!file1 || !file2 || !file3?"disabled":undefined)}
                        disabled={!file1 || !file2 || !file3?"disabled":undefined}
                    >
                        ارسال
                        {uploading?
                            <Loader className="mx-2" type="ThreeDots" width={25} height={25} color="#fff"></Loader>
                            :undefined }
                    </button>
                </div>
            </form>
        </div>

        :<div className="verification section-padding">
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
                    لطفا تصاویر زیر را آپلود نمایید
                    </p>
                </div>

                <div className="my-5">
                
                    <div
                        className="file-upload-wrapper"
                        data-text={filename1}
                    >
                        {user.scans&&user.scans.selfie?<label className='form-label text-start'>
                            <i className="la la-check"></i>
                            {" آپلود شده "}
                        </label>:undefined}
                        <input
                            name="file-upload-field"
                            type="file"
                            accept="image/*"
                            className="file-upload-field"
                            onChange={e=>handleFile(e, 1)}
                        />
                    </div>
                    <div
                        className="file-upload-wrapper my-3"
                        data-text={filename2}
                    >
                        {user.scans&&user.scans.national_card?<label className='form-label text-start'>
                            <i className="la la-check"></i>
                            {" آپلود شده "}
                        </label>:undefined}
                        <input
                            name="file-upload-field"
                            type="file"
                            accept="image/*"
                            className="file-upload-field"
                            onChange={e=>handleFile(e, 2)}
                        />
                    </div>
                    <div
                        className="file-upload-wrapper"
                        data-text={filename3}
                    >
                        {user.scans&&user.scans.birth_certificate?<label className='form-label text-start'>
                            <i className="la la-check"></i>
                            {" آپلود شده "}
                        </label>:undefined}
                        <input
                            name="file-upload-field"
                            type="file"
                            accept="image/*"
                            className="file-upload-field"
                            onChange={e=>handleFile(e, 3)}
                        />
                        {/* <small className="form-text">اختیاری</small> */}
                    </div>
                    <div
                        className="file-upload-wrapper mt-3"
                        data-text={filename4}
                    >
                        {user.scans && user.scans.bill?<label className='form-label text-start'>
                            <i className="la la-check"></i>
                            {" آپلود شده "}
                        </label>:undefined}
                        <input
                            name="file-upload-field"
                            type="file"
                            accept="image/*"
                            className="file-upload-field"
                            onChange={e=>handleFile(e, 4)}
                        />
                        <small className="form-text">اختیاری</small>
                    </div>
                </div>
            
                <div className="text-center mt-5">
                    <button
                        type="submit"
                        className={"btn btn-success w-100 d-flex justify-content-center align-items-center " + (!(file1 || (user.scans&&user.scans.selfie)) || !(file2 || (user.scans&&user.scans.national_card))|| !(file3 || (user.scans&&user.scans.birth_certificate))?"disabled":undefined)}
                        disabled={!(file1 || (user.scans&&user.scans.selfie)) || !(file2 || (user.scans&&user.scans.national_card))|| !(file3 || (user.scans&&user.scans.birth_certificate))?"disabled":undefined}
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
    }
    </>
    )
}

export default ProfileImages
