import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Contextcreate from '../context/Contextcreate';
import './Welcome.css'
function Welcome() {
  const auth = useContext(Contextcreate)

  const [txt,settxt] = useState('Verify Email')

  async function verifymail(){
    try{
      settxt('Verifying...')
      const resp = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBlpCleMXXgnN35xDSjEfIsKsfLOS6wNVM',{
      method:'POST',
      body:JSON.stringify({
        requestType:'VERIFY_EMAIL',
        idToken:auth.idToken
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    const data = await resp.json()
    if(!resp.ok){
      alert (data.error.message)
      settxt('Verify Email')
      auth.setisLoggesdIn(false)
    }
    else{
      if(data.email==auth.emailverify){
        settxt('Email Verified')
       
     
      }
    }
    }
    catch(err){
      console.log(err)
    }


  }

  function logoutclicked(){
    localStorage.setItem('expidtok','')
    localStorage.setItem('expsilogin',false)
    auth.setidToken('')
    auth.setisLoggesdIn(false)
  }
    return ( 
       <div className="wel_nav_contain">
        <div className="wel_nav_quote">Welcome to Expense Tracker!!!</div>
        <div className='rightcontent_wel'>
        <div className='wel_nav_updatebtn emailverify' onClick={verifymail}>{txt}</div>
          {/* <div className='wel_nav_updatebtn emailverifying' onClick={verifymail}>verifying...</div>
          <div className='wel_nav_updatebtn emailverified' onClick={verifymail}>Email verified</div> */}
        <div className="wel_nav_updatebtn">Your profile is Incomplete.<NavLink to='/update' className='nav_link'>Complete now</NavLink> </div>
        <di className='wel_nav_updatebtn logout' onClick={logoutclicked}>Logout</di>
        </div>
       </div>
     );
}

export default Welcome
