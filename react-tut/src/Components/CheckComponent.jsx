// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {useNavigate} from 'react-router-dom'
// import SOSHome from './Emergency/SOSHome';
// import Maps from './Maps/Maps';
// import { useCookies } from 'react-cookie'
// import SignIn from './SignIn';
// const CheckComponent = () => {
//     const navigate = useNavigate();
//     const [componentToRender, setComponentToRender] = useState();
//     const [cookies, setCookie, removeCookie] = useCookies(['authority']);

//     useEffect(() => {
//         const fetchData = async () => {
//             if (cookies.authority === "Emergency Responders") {
//                 try {
//                     const res = await axios.get(`http://localhost:5000/api/auth/verifyAPIForSOS`);
//                     console.log(res);
//                     if (res.data.authority === "Emergency Responders") {
//                         navigate('/SOSHome')
//                     }
//                 } catch (err) {
//                     console.log(err);
//                 }
//             }
//             if (cookies.authority === "AIRLINES") {
//                 try {
//                     const res = await axios.get(`http://localhost:5000/api/auth/verifyAPIForAIRLINES`);
//                     console.log(res);
//                     if (res.data.authority === "airlines") {
//                         navigate('/maps')
//                     }
//                 } catch (err) {
//                     console.log(err);
//                 }
//             }

//         };

//         fetchData();
//     }, []);
    
//     return (
//         <div>
//             {componentToRender}
//         </div>
//     );
// }

// export default CheckComponent;
