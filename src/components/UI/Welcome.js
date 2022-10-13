import { Fragment, useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Contextcreate from '../context/Contextcreate';
import Eform from '../Expense/Eform';
import {useSelector,useDispatch} from 'react-redux'
import { expaction } from '../redux/Expensereduce';
import { authaction } from '../redux/Auth';
import './Welcome.css'
function Welcome() {

  const nav = useNavigate()
  // const auth = useContext(Contextcreate)
  const dispatch = useDispatch()
  const idtokrnget = useSelector(state=>state.auth.idToken)
  const premiumstate = useSelector(state=>state.premium.isPremium)
  const emailverifyget = useSelector(state=>state.exp.emailverify)
  const [txt,settxt] = useState('Verify Email')
  const theme = useSelector(state=>state.premium.theme)
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
    nav('/login',{replace:true})

  }

  const [premiumclicked,setPremiumclicked]=useState(false)
  function premiumclickedd(){
    setPremiumclicked(!premiumclicked)
  }
    return ( 
       <Fragment>
        <div className="wel_nav_contain" data-theme={theme}>
        <div className="wel_nav_quote">Welcome to Expense Tracker!!!</div>
        <div className='rightcontent_wel'>
        {premiumstate && <div className='wel_nav_updatebtn emailverify' style={{color:'indigo'}} onClick={premiumclickedd}>Premium</div>}
        <div className='wel_nav_updatebtn emailverify' onClick={verifymail}>{txt}</div>
          {/* <div className='wel_nav_updatebtn emailverifying' onClick={verifymail}>verifying...</div>
          <div className='wel_nav_updatebtn emailverified' onClick={verifymail}>Email verified</div> */}
        <div className="wel_nav_updatebtn">Your profile is Incomplete.<NavLink to='/update' className='nav_link'>Complete now</NavLink> </div>
        <di className='wel_nav_updatebtn logout' onClick={logoutclicked}>Logout</di>
        </div>
       </div>
       <Eform val={premiumclicked}/>
       </Fragment>
     );
}

export default Welcome
