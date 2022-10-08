import { Fragment, useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Contextcreate from '../context/Contextcreate';
import Eform from '../Expense/Eform';
import {useSelector,useDispatch} from 'react-redux'
import { expaction } from '../redux/Expensereduce';
import { authaction } from '../redux/Auth';
import './Welcome.css'
function Welcome() {
  // const auth = useContext(Contextcreate)
  const dispatch = useDispatch()
  const idtokrnget = useSelector(state=>state.auth.idToken)
  const emailverifyget = useSelector(state=>state.exp.emailverify)
  const [txt,settxt] = useState('Verify Email')

  async function verifymail(){
    try{
      settxt('Verifying...')
      const resp = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBlpCleMXXgnN35xDSjEfIsKsfLOS6wNVM',{
      method:'POST',
      body:JSON.stringify({
        requestType:'VERIFY_EMAIL',
        idToken:idtokrnget
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    const data = await resp.json()
    if(!resp.ok){
      alert (data.error.message)
      settxt('Verify Email')
      // auth.setisLoggesdIn(false)
      dispatch(authaction.setloged(false))
    }
    else{
      if(data.email==emailverifyget){
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
    // auth.setidToken('')
    dispatch(authaction.seIdToken(''))
    // auth.setisLoggesdIn(false)
    dispatch(authaction.setloged(false))
  }
    return ( 
       <Fragment>
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
       <Eform/>
       </Fragment>
     );
}

export default Welcome
