import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useCookies} from 'react-cookie'
const Logout = () => {
  const [cookies, setCookie,removeCookie] = useCookies(['user'])
    const navigate = useNavigate();
    const handleLogout = () => {
      removeCookie('username');
      removeCookie('email');
      removeCookie('authority');
      removeCookie('token');
      navigate('/')
    }
  return (
    <div>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  )
}

export default Logout
