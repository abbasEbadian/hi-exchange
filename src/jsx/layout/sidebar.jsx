import React, { } from 'react';
import { Link, useHistory} from 'react-router-dom';
import { userLogout } from '../../redux/actions'
import { useDispatch } from 'react-redux';


function Sidebar() {
    const dispatch = useDispatch();
    const history = useHistory();
    return (
        <>
            <div className="sidebar">
                
                <div className="menu">
                    <ul>
                        <li>
                            <Link to={"/"} data-toggle="tooltip" data-placement="right" title="اصلی">
                                <span><i className="icofont-ui-home"></i></span>
                            </Link>
                        </li>
                        <li><Link to={"/buy-sell"} data-toggle="tooltip" data-placement="right" title="خرید و فروش">
                            <span><i className="icofont-coins"></i></span>
                        </Link>
                        </li>
                       
                        <li><Link to={"/wallet"} data-toggle="tooltip" data-placement="right" title="کیف پول">
                            <span><i className="icofont-wallet"></i></span>
                        </Link>
                        </li>
                        <li><Link to={"/settings"} data-toggle="tooltip" data-placement="right" title="تنظیمات">
                            <span><i className="icofont-ui-settings"></i></span>
                        </Link>
                        </li>
                        <li className="logout">
                            <button className="border-0 bg-transparent text-white fs-3" onClick={()=>dispatch(userLogout(history))} data-toggle="tooltip" data-placement="right"
                                title="خروج">
                            <span><i className="icofont-power"></i></span>
                        </button>
                        </li>
                    </ul>
                    
                </div>
            </div>
        </>
    )
}

export default Sidebar;