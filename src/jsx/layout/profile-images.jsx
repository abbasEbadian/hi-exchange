import React , {useState } from "react";
import { Redirect, useHistory}  from "react-router-dom";
import {useSelector } from 'react-redux'
import Loader from 'react-loader-spinner'
import { toast} from "react-toastify";
import axios from 'axios'
import {Constants} from '../../Constants'
import {ProgressBar} from 'react-bootstrap'

function ProfileImages({source=undefined}) {
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
    const [percent, setPercent] = React.useState(0)
    const [invis, setInvis] = React.useState(true)

    const [ uploading, setUploading ] = useState(false)
    const [ redirect, setRedirect ] = useState(false)
   
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
        setInvis(false)

        const data = new FormData() 
        data.append('selfie_photo', file1)
        data.append('card', file2)
        data.append('birth_certificate', file3)
        data.append('bill', file4)
        axios.post(Constants.BASE_URL+"/api/v2/account/document/", data,{
                onUploadProgress: (event)=>{
                    const {loaded, total} = event
                    setTimeout(() => {
                        setPercent(Math.round(Math.floor((loaded*100)/total)))
                    }, 500);
                    if(Math.round(Math.floor((loaded*100)/total) === 100))
                        setTimeout(() => {
                            setInvis(true);
                            setPercent(0)
                        }, 2000 );
                    else{
                        setInvis(false)
                    }
                }
            }).then(response=>{
            const {data} = response 
            
            if(data.status === 200){
            
                toast.success(data.message)
                setTimeout(() => {
                    setUploading(false)
                    if(!source) history.push("/panel/verify-step-4")
                }, 1000);

            }else{
                toast.error(data.message)
            }
        }).catch(err=>{
            return toast.error("با خطا مواجه شد.")
        }).finally(f=>{
            setUploading(false);
            setInvis(true)
        })
    }
    React.useEffect(() => {
       if(user&&user.scans&&user.scans.birth_certificate&&user.scans.national_card&&user.scans.selfie)
        setRedirect(true)
    }, [user])

    return (<>
    {source?
        <div className="card-body">
            <form
                action="#"
                className="identity-upload"
                onSubmit={handleSubmit}
            >
                

                <div className="mb-5">
                    <small style={{fontSize: "11px"}}>حداکثر اندازه فایل ها: یک مگابایت</small>
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
                    {user.scans&&user.scans.birth_certificate ?<label className='form-label text-start'>
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
                    <small className="form-text position-absolute" style={{top: "105% "}}>اختیاری</small>
                </div>
            </div>
        
          
                { (!file1&&!file2&&!file3) || !((file1 || (user.scans&&user.scans.selfie)) && (file2 || (user.scans&&user.scans.national_card))&& (file3 || (user.scans&&user.scans.birth_certificate)))?
                    
                
                    <div className={"text-center mt-5 upload-images-submitter disabled"} alt={"سه فیلد اول الزامی هستند."}>
                        <button
                            type="submit"
                        className={"btn btn-success upload-images-btn disabled"}
                            disabled={"disabled"}
                            >
                            {uploading?
                                !invis? <span className="progress-percent2">
                                    <ProgressBar now={percent} label={`${percent}%`} /> 
                                    </span>: <Loader className="mx-2" type="ThreeDots" width={25} height={25} color="#fff"></Loader>
                                :"ارسال" }
                        </button>
                    </div>
                :<div className={"text-center mt-5 upload-images-submitter "} alt={"سه فیلد اول الزامی هستند."}>
                        <button
                            type="submit"
                            disabled={uploading}
                        className={"btn btn-success upload-images-btn "}>
                            {uploading?
                                !invis? <span className="progress-percent2">
                                    <ProgressBar now={percent} label={`${percent}%`} /> 
                                    </span>: <Loader className="mx-2" type="ThreeDots" width={25} height={25} color="#fff"></Loader>
                                :"ارسال" }
                        </button>
                    </div>}
            </form>
        </div>

        :
        <> 
            {redirect?<Redirect to="/verify-step-4"/>:undefined}
            <div className="verification section-padding">
                <div className="container h-100">
                    <div className="row justify-content-center h-100 align-items-center">
                        <div className="col-xl-7 col-12">
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
                                                <small className="form-text  position-absolute" style={{top: "105% "}}>اختیاری</small>
                                            </div>
                                        </div>
                                        {  (!file1&&!file2&&!file3) || !((file1 || (user.scans&&user.scans.selfie)) && (file2 || (user.scans&&user.scans.national_card))&& (file3 || (user.scans&&user.scans.birth_certificate)))?
                                            
                                        
                                            <div className={"text-center mt-5 upload-images-submitter disabled"} alt={"سه فیلد اول الزامی هستند."}>
                                                <button
                                                    type="submit"
                                                className={"btn btn-success upload-images-btn disabled"}
                                                    disabled={"disabled"}
                                                    >
                                                    {uploading?
                                                        !invis? <span className="progress-percent2">
                                                            <ProgressBar now={percent} label={`${percent}%`} /> 
                                                            </span>: <Loader className="mx-2" type="ThreeDots" width={25} height={25} color="#fff"></Loader>
                                                        :"ارسال" }
                                                </button>
                                            </div>
                                        :<div className={"text-center mt-5 upload-images-submitter "} alt={"سه فیلد اول الزامی هستند."}>
                                            <button
                                                type="submit"
                                                disabled={uploading}
                                            className={"btn btn-success upload-images-btn "}>
                                                {uploading?
                                                    !invis? <span className="progress-percent2">
                                                        <ProgressBar now={percent} label={`${percent}%`} /> 
                                                        </span>: <Loader className="mx-2" type="ThreeDots" width={25} height={25} color="#fff"></Loader>
                                                    :"ارسال" }
                                            </button>
                                        </div>}
                                    
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
        </>
    }
    </>
    )
}

export default ProfileImages
