import React from 'react'
import { userUpdateDetail, uploading_avatar} from '../../redux/actions'
import {Constants} from '../../Constants'
import axios from 'axios'
import {toast} from 'react-toastify'
import {useDispatch, useSelector} from 'react-redux'
import profile from "../../images/profile/2.png";
import {ProgressBar} from 'react-bootstrap'
function UploadableAvatar() {

    const  dispatch = useDispatch()
    const user = useSelector(state =>state.session.user)
    const avatar = React.useRef()
    const [percent, setPercent] = React.useState(0)
    const [invis, setInvis] = React.useState(true)
    const changeAvatar = (e)=>{
        if (e.target.files.length>0){
        const image = e.target.files[0]
        const data = new  FormData()
        data.append('file', image);
        
        axios.post(Constants.BASE_URL+"/api/v2/account/avatar/", data,{
                header:{
                    "Content-Type": "application/form-data"
                },
                onUploadProgress: (event)=>{
                    const {loaded, total} = event
                    setPercent(Math.round(Math.floor((loaded*100)/total)))
                    if(Math.round(Math.floor((loaded*100)/total) === 100))
                        setTimeout(() => {
                            setInvis(true);
                        }, 2000 );
                    else{
                        setInvis(false)
                    }

                }
            }).then(data=>{
                if(data.data.error === 1){
                    toast.error(data.data.message); 
                }else{
                    toast.success(data.data.message); 
                    dispatch(userUpdateDetail())
                }
            }).catch(err=>{
                console.log(err);
                if(toast) toast.error("با خطا مواجه شد.")
            }).finally(f=>{
                dispatch(uploading_avatar(false))
            })
        
        }
    }
    return (
        <div className="main-profile uploadableAvatar">
			<div className='w-20 mx-auto position-relative mt-4 rounded-circle'>
                <div className='image' style={{backgroundImage: `url(${user&&user.avatar?user.avatar: profile})`}} >
                </div>
                    {/* <img src={user&&user.avatar?user.avatar: profile} alt="avatar"  className='rounded-circle'/> */}
                <i className="icofont-pencil bg-white text-dark rounded-circle p-1 border"
                    onClick={e=>avatar.current.click()} 
                    aria-hidden="true"></i>
                {!invis? <span className="progress-percent">
                    <ProgressBar now={percent} label={`${percent}%`} /> 
                </span>: undefined}
            </div>
            <input type="file" className="d-none" ref={avatar} onChange={changeAvatar}/>

		</div>
    )
}

export default UploadableAvatar
