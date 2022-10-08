import './SignUp.css'
import bgimg from '../Resources/signbg.png'
import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Contextcreate from '../context/Contextcreate';
import {useDispatch} from 'react-redux'
import {authaction} from '../redux/Auth'
import {expaction} from '../redux/Expensereduce'
function Login() {
    // const auth = useContext(Contextcreate)
    const dispatch = useDispatch()
    const nav=useNavigate()
   
    
    const [val,seVal] = useState({
        mail:'',
        pass:''
       
    })

    function changhandle(e){
        switch (e.target.name) {
            case 'email':
                seVal({...val,mail:e.target.value})
                break;
            case 'pass':
                seVal({...val,pass:e.target.value})
                break;
           
            default:
                break;
        }
    }
 async   function sbtlog(e){
        e.preventDefault()
       try{
        const resp = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBlpCleMXXgnN35xDSjEfIsKsfLOS6wNVM',{
            method:'POST',
            body:JSON.stringify({
                email:val.mail,
                password:val.pass,
                returnSecureToken:true
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        const data = await resp.json()
        if(!resp.ok){
            alert(data.error.message) 
        }
        else{
            localStorage.setItem('expidtok',data.idToken)
            localStorage.setItem('expsilogin',true)
            // auth.setidToken(data.idToken)
            dispatch(authaction.seIdToken(data.idToken))
            // auth.setisLoggesdIn(true)
            dispatch(authaction.setloged(true))
            // auth.setEmailverify(val.mail)
            dispatch(expaction.emailverify(val.mail))
            nav('/wel',{replace:true})
        }
       
       }
       catch(err){
        console.log(err)
       }


    }
    return ( 
        <div className='sign_whole'>
           
        <div className='signcnt'>
        <div >
        <div className='sign_contain'>
                <span className='signhdg'>Login</span>
                <form className='sign_frm'>
                <input className='signinp'value={val.mail} type='email'name='email' placeholder='Email Id' required onChange={changhandle}></input>
                <input className='signinp'value={val.pass} type='password'name='pass' placeholder='Password' required onChange={changhandle}></input>

                <div className='signinp'><button className='signbtn sbtn' onClick={sbtlog}>Login</button></div>
                </form>
                <NavLink className='navlnkclass'style={{color:'red'}} to='/passreset'>Forgot Password?</NavLink>
            </div>
           <NavLink className='navlnkclass' to={'/'}> <div className='logredirect' >Don't have an Account? Sign Up</div></NavLink>
        </div>
            
        </div>
        <img className='signbgimg' src={bgimg}></img>
    
    </div>
     );
}

export default Login;