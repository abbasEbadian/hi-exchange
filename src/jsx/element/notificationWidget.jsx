import React from 'react'
import { Dropdown, Badge, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import TimeAgo from 'react-timeago'
import farsiStrings from 'react-timeago/lib/language-strings/fa'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import { mark_notifications_asread } from '../../redux/actions';
import { useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
function NotificationWidget() {
    const dispatch = useDispatch()
    const formatter = buildFormatter(farsiStrings)
    const notifications = useSelector(state=>state.notifications.unreadNotificationList);
  const read_messages = ()=>{
    dispatch(mark_notifications_asread())
    toast.success("انجام شد")
  }
    return (
        <Dropdown className="mx-3" id="notification-dropdown">
            <Dropdown.Toggle as={CustomToggle} >
                <span className="fa fa-bell fs-2"></span>
                <Badge className="bg-danger" style={{borderRadius: "50%"}}>{notifications.length || 0}</Badge>
            </Dropdown.Toggle>

            <Dropdown.Menu >
                {notifications.length? 
                    notifications.slice(0, 5).map((item, idx)=>{
                        return <div className="dropdown-item notif-item" key={idx} >
                        <OverlayTrigger
                          key={"bottom"}
                          placement={"bottom"}
                          overlay={
                            <Tooltip>
                              {item.text}
                            </Tooltip>
                          }
                        >
                          <Link to="/notifications" style={{fontSize:"14px"}}>{item.text}</Link>
                        </OverlayTrigger>
                            <small style={{fontSize:"11px"}}><TimeAgo date={item.published} formatter={formatter}></TimeAgo></small>
                        </div>
                    })
                    :
                    <span className="py-3 px-2 text-white text-end w-100 d-block">اعلانی ندارید</span>
                }
                <Dropdown.Divider />
                <div class="d-flex justify-content-between p-2">
                  <Link className="" to="/notifications">نمایش همه</Link>
                  {notifications.length ? <button className="btn-simple text-white py-0" onClick={e=>read_messages()}>خواندم</button>:undefined}
                </div>
            </Dropdown.Menu>
        </Dropdown>
    )
}

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Link
      to="#"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
     
    </Link>
  ));

 
export default NotificationWidget
