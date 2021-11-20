import React , {useRef, useState, useEffect}from "react";
import { useHistory } from "react-router-dom";
import Header2 from "../layout/header2";
import Sidebar from "../layout/sidebar";
import {Modal} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import { userUpdatePersonal } from "../../redux/actions";
import {ToastContainer, toast} from 'react-toastify'
import {Constants} from '../../Constants'
import axios from 'axios'

function VerifyStep1() {
    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector(state=>state.session.user)
    const nationalCodeRef = useRef("")
    const homePhoneRef = useRef("")
    const postCodeRef = useRef("")
    const addressRef = useRef("")
    const birthRef = useRef("")
    const emailRef = useRef("")

    const [confirmed, setConfirmed] = useState("")
    const [verifyCode, setVerifyCode] = useState("")
    const [showVerify, setShowVerify] = useState("")
    const [conditionalModal, setConditionalModal] = useState(false)
    const [already, setAlready] = useState(false)

    const openConditionalModal = ()=>setConditionalModal(true)
    const closeConditionalModal = ()=>setConditionalModal(false)
    const openVerify = (e) => {
        e.preventDefault()
        e.stopPropagation()
        axios.get(Constants.BASE_URL+"/api/v2/account/verify/phone/")
        .then(resp=>{
            const {data} = resp
            if (data.error === 1){
                toast.error(data.message)
            }else{
                toast.info(data.message)
                setShowVerify(true) 
            }
        })
        .catch(err=>console.log(err))
        .finally(f=>{  
        })
    }
    const verifyTheCode = ()=>{
        axios.post(Constants.BASE_URL+"/api/v2/account/verify/phone/complete/", {otp: verifyCode})
        .then(resp=>{
            const {data} = resp
            if (data.error === 1){
                toast.error(data.message)
            }else{
                setShowVerify(false)
                submit()
            }
        })
        .catch(err=>console.log(err))
    }
    const submit = ()=>{
        
        const data = {
            card_id: nationalCodeRef.current.value,
            email: emailRef.current.value,
            birth_certificate_id: "0",
            birthday: birthRef.current.value ,
            address: addressRef.current.value,
            phone: user.mobile,
            first_name: user.first_name,
            last_name: user.last_name,
        }
        
        dispatch(userUpdatePersonal(data)).then(response=>{
            if(response === "sent"){
               setTimeout(() => {
                history.push("/verify-step-2")
               }, 2500);
            }
        })
    }
    React.useEffect(() => {
        if(user&&user.personal_data&&user.personal_data.address&&user.personal_data.address.phone){
            setAlready(true)
        }
    }, [user])
    return (<>
            <Header2 />
            <Sidebar />

            <div className="verification section-padding">
                <div className="container h-100">
                    <div className="row justify-content-center h-100 align-items-center">
                        <div className="col-xl-5 col-md-6">
                            {already?<>
                                <div className="card">
                                    <div className="card-body">
                                        شماره شما از قبل تایید شده یا در حال بررسی می باشد.
                                    </div>
                                </div>
                            </>:<div className="auth-form card">
                                <div className="card-body">
                                    <form
                                        action="#"
                                        onSubmit={openVerify}
                                        className="identity-upload"
                                    >
                                        <div className="identity-content">
                                            
                                            <h6 className="mb-4 mx-2">
                                                برای احراز هویت لطفا اطلاعات خواسته شده را وارد نمایید
                                            </h6>
                                           
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">کد ملی</label>
                                            <input ref={nationalCodeRef} className="form-control"/>                   
                                        </div>
                                       
                                        {user && !user.email?
                                         <div className="mb-3" >
                                            <label className="form-label">ایمیل</label>
                                            <input ref={emailRef} type="email" className="form-control"/>
                                        </div>:
                                            <input type="hidden" ref={emailRef}  defaultValue={user.email}/>
                                        }

                                        {user && !user.birthday?
                                         <div className="mb-3" >
                                            <label className="form-label">تاریخ تولد</label>
                                            <input ref={birthRef}  className="form-control" placeholder="1350/01/01"/>
                                        </div>:
                                            <input type="hidden" ref={birthRef}  defaultValue={user.birthday}/>
                                        }

                                        <div className="mb-3">
                                            <label className="form-label">شماره تلفن ثابت</label>
                                            <input ref={homePhoneRef} className="form-control"/>                   
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">کد پستی</label>
                                            <input ref={postCodeRef} className="form-control"/>                   
                                        </div>
                                        {user && !user.address?
                                         <div className="mb-3" >
                                             <label className="form-label">آدرس</label>
                                             <textarea rows={6} ref={addressRef} className="form-control py-2"/>
                                        </div>:
                                            <textarea defaultValue={user.address} ref={addressRef} className="d-none"/>
                                        }
                                        
                                        <div className="row d-flex justify-content-between mt-4 mb-2">
                                            <div className="mb-3 mb-0 d-flex">
                                                <label className="toggle">
                                                    <input
                                                        checked={confirmed}
                                                        onChange={e=>setConfirmed(e.target.checked)}
                                                        className="toggle-checkbox"
                                                        type="checkbox"
                                                    />
                                                    <span className="toggle-switch"></span>

                                                </label>
                                                <span onClick={openConditionalModal} className="px-2 text-success cursor-pointer"><u>قبول شرایط</u></span>
                                                <span> و تایید صحت اطلاعات</span>
                                            </div>
                                           
                                        </div>
                                        <div className="text-center">
                                            <button
                                                // to={"./verify-step-2"}
                                                type="submit"
                                                className={"btn btn-success ps-5 pe-5 " + (!confirmed?"disabled":"")}
                                                disabled={!confirmed}
                                            >
                                                ادامه
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
                <ToastContainer
                    position="bottom-left"
                    autoClose={2500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={true}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    />
                <Modal dialogClassName="modal-90w mx-auto" contentClassName="dark" show={conditionalModal} onHide={() => setConditionalModal(false)}>
                    <Modal.Header closeButton>
                    <Modal.Title>شرایط و مقررات</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <article>
                            <p> های اکسچنج تابع قوانین جمهوری اسلامی ایران بوده و بستری برای تبادل دارایی‌های دیجیتال مانند بیت کوین، لایت کوین و اتریوم با ریال می‌باشد. هیچ گونه تبادل ارزی اعم از خرید و فروش دلار یا سایر ارزهای کاغذی، در این بستر صورت نمی گیرد.</p>
                            <h4>تعهدنامه فعالیت در سایت های اکسچنج</h4>
                            <ul className="conditionalList">
                                <li>کاربران موظفند قبل از ثبت‌نام تمامی مفاد این تعهدنامه را مطالعه نموده و صرفا در صورت پذیرش آن اقدام به ثبت نام نمایند.</li>
                                <li>کاربران سایت می‌پذیرند که کلیه‌ی فعالیت‌های آن‌ها در های اکسچنج در چارچوب قوانین جمهوری اسلامی بوده و هیچ گونه فعالیتی خارج از این چارچوب انجام نخواهند داد.</li>
                                <li>احراز هویت برای استفاده از خدمات های اکسچنج ضروری بوده و کاربران موظفند اطلاعات صحیح خود را بارگذاری نمایند. بدیهی است در صورت وجود هرگونه تخلف در احراز هویت، مسئولیت به عهده‌ی فرد متخلف بوده و های اکسچنج حق توقف ارائه خدمات به کاربر مذبور و ارجاع موارد تخلف به مراجع ذی صلاح را خواهد داشت. </li>
                                <li>های اکسچنج خود را ملزم به حفظ اطلاعات شخصی کاربران خود می‌داند.</li>
                                <li>کاربران های اکسچنج تعهد می دهند که از خدمات سایت های اکسچنج تنها برای خود استفاده نموده و مسئولیت استفاده از خدمات نوبیتکس برای فرد غیر که فرآیند احراز هویت را طی نکرده باشد به عهده کاربر خواهد بود. شماره حساب اعلام شده به سایت و همچنین آدرس کیف پول ها جهت برداشت رمزارز نیز می بایست متعلق به کاربر بوده و کاربران مجاز به دادن آدرس کیف پول متعلق به اشخاص دیگر نیستند.</li>
                                <li> کاربران های اکسچنج می‌پذیرند در صورت تشخیص کارشناسان پشتیانی های اکسچنج، جهت حفظ امنیت دارایی حساب کاربریشان با اطلاع قبلی نسبت به برقراری تماس تصویری با تیم های اکسچنج همکاری نمایند. </li>
                                <li>کاربران های اکسچنج اذغان می‌دارند که از ریسک‌های مربوط به سرمایه‌گذاری در ارزهای دیجیتال مطلع بوده و با علم به این موضوع اقدام به سرمایه‌گذاری و تبادل می‌نمایند.</li>
                                <li>های اکسچنج به عنوان بازار آنلاین تبادل ارزهای دیجیتال، هیچ گونه مسئولیتی در قبال نحوه‌ی معاملات کاربران و سود و زیان حاصل از آن ندارد.</li>
                                <li>هرگونه سهل انگاری کاربران در حفظ اطلاعات امنیتی از جمله گذرواژه کاربر، به عهده‌ی شخص کاربر بوده و های اکسچنج هیچ مسئولیتی به عهده نخواهد داشت. اکیداً توصیه می شود از گذرواژه پیچیده و امن استفاده نمایید.</li>
                                <li>های اکسچنج این اطمینان را می‌دهد که دارایی‌های کاربران را نزد خود به امانت و به بهترین شکل و با بالاترین استانداردهای امنیتی ممکن، حفظ نماید. در صورت بروز هرگونه مشکل امنیتی،های اکسچنج متعهد به جبران خسارت خواهد بود.</li>
                                <li>در صورت تمایل برای برداشت ارزهای دیجیتال، مسئولیت ارائه‌ی آدرس صحیح کیف پول به عهده‌ی کاربر خواهد بود. در صورت بروز هر گونه مشکل اعم از اشتباه در ورود آدرس صحیح، نقص آدرس، مشکلات کیف پول مقصد و بلوکه شدن دارایی‌های کاربران در کیف پول مقصد، هیچ گونه مسئولیتی به عهده یهای اکسچنج نخواهد بود.</li>
                                <li>های اکسچنج در مقابل واریز توکن یا کوین بر بستر اشتباه یا کوین هایی که در های اکسچنج پشتیبانی نمی شود هیچ گونه مسئولیتی نداشته و با توجه به مکانیسم ذخیره سازی سرد امکان استخراج این توکن ها با استفاده از ولت ثالث وجود ندارد. لذا مسئولیت هرگونه واریز اشتباه با خود کاربر بوده و کاربر حق هیچ گونه شکایتی را از های اکسچنج نخواهد داشت.</li>
                                <li>درخواست برداشت ریال از حساب کاربری در سریع‌ترین زمان ممکن پس از ثبت، بررسی خواهد شد. زمان واریز پول به حساب کاربران بر اساس محدودیت‌های انتقال وجه بین بانکی، متفاوت خواهد بود. برای اطلاعات بیش‌تر، به قوانین انتقال وجه بین بانکی ( پایا ، ساتنا) مراجعه فرمایید.</li>
                                <li>کاربر می‌پذیرد که به جز در موارد مورد تعهد های اکسچنج، حق هیچ گونه داعیه، طلب و شکایت از سایت های اکسچنج ، مدیران، کارمندان و افراد مرتبط با این سایت را نخواهد داشت.</li>
                                <li>اگر های اکسچنج تحت هر عنوان اشتباهاً یا من غیر حق، وجوه یا رمزارزی را به حساب کاربر منظور یا در محاسبات خود هر نوع اشتباهی نماید، هر زمان مجاز و مختار است راساً و مستقلاً و بدون انجام هیچ گونه تشریفات اداری و قضائی و دریافت اجازه کتبی از متعهد (صاحب حساب) در رفع اشتباه و برداشت از حساب‌های وی اقدام نماید و تشخیص های اکسچنج نسبت به وقوع اشتباه یا پرداخت بدون حق و لزوم برداشت از حساب معتبر خواهد بود و کاربر حق هرگونه اعتراض و ادعایی را در خصوص نحوه عملکرد های اکسچنج از هر جهت از خود ساقط می نماید.</li>
                                <li>کاربران متعهد شدند برای خرید رمز ارز فقط از طریق کارت های بنام خود که در سایت های اکسچنج ثبت کردند اقدام به واریز وجه در سایت های اکسچنج کنند در غیر اینصورت وجه واریز شده بلوکه و های اکسچنج موظف است بعد از رای مراجع ذیصلاح به همان حسابی که وجه از آن‌ واریز شده ، آن مبلغ را مسترد کند.</li>
                                <li>در صورت بروز هرگونه مشکل یا ابهام در هر یک از معاملات، های اکسچنج حق دارد مستقلاً آن معامله را ابطال و دارایی‌های هر یک از طرفین را به حساب خودشان عودت دهد. بدیهی است که در صورتی که اشکال از سمت های اکسچنج باشد، موظف خواهد بود که جبران خسارت نماید و در غیراین صورت کاربر حق هرگونه اعتراض و ادعایی را در خصوص نحوه عملکرد های اکسچنج از هر جهت از خود ساقط می‌نماید.</li>
                                <li>در صورت هرگونه سوء استفاده از کد ریفرال های اکسچنج در فعالیت‌های خلاف قانون، تمامی مسئولیت آن به عهده کاربر بوده و های اکسچنج  هیچ گونه مسئولیتی در قبال هرگونه سوء استفاده از سیستم معرفی خود به هر نحو ندارد. همچنین های اکسچنج حق باطل کردن کد معرف و بستن حساب در صورت مشاهده هرگونه سوء استفاده بدون نیاز به دستور قضایی را خواهد داشت.</li>
                            </ul>
                      
                        </article>
                    </Modal.Body>
                    <Modal.Footer>
                    <button className="text-danger bg-transparent border-0" onClick={closeConditionalModal}>
                        بستن
                    </button>
                    
                    </Modal.Footer>
                </Modal>
                  <Modal  contentClassName="dark" show={showVerify} onHide={() => setShowVerify(false)}>
                    <Modal.Header closeButton>
                    <Modal.Title>کد تایید</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <p>لطفا کد تایید ارسال شده را وارد نمایید.</p>
                        <div className="mb-4">
                            <label htmlFor="code" className="pb-2">کد تایید</label>
                            <input type="text" name="code" value={verifyCode} onChange={e=>setVerifyCode(e.target.value)} className="form-control"/>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            onClick={verifyTheCode}
                            className={"btn btn-success ps-5 pe-5 " + (!verifyCode?"disabled":"")}
                            disabled={!verifyCode}
                            type="button"
                        >
                            بررسی 
                        </button>
                    </Modal.Footer>
               
                 </Modal>
            </div>
        </>
    );
}

export default VerifyStep1;
