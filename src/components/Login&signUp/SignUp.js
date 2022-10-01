import './SignUp.css'
import bgimg from '../Resources/signbg.png'
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
function SignUp() {
    const nav = useNavigate()
    const [val,seVal] = useState({
        mail:'',
        pass:'',
        cpass:''
    })
    function changhandle(e){
        switch (e.target.name) {
            case 'email':
                seVal({...val,mail:e.target.value})
                break;
            case 'pass':
                seVal({...val,pass:e.target.value})
                break;
            case 'cpass':
                seVal({...val,cpass:e.target.value})
                break;
            default:
                break;
        }
    }

   async function submtsig(e){
    e.preventDefault()
        if(val.pass==val.cpass){
            try{
                const resp = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBlpCleMXXgnN35xDSjEfIsKsfLOS6wNVM',{
                    method:'POST',
                    body:JSON.stringify({
                        email:val.mail,
                        password:val.pass,
                        returnSecureToken:true
                    }),
                    headers:{
                        'Content-Type':'application/json'
                    }
                })
                
                const data = await resp.json()
                if(!resp.ok){
                    alert(data.error.message)
                }
                else{
                    console.log('user has successfully signed up!')
                    nav('/login')
                }
            }
            catch(err){
                alert('error encounterd try again ')
            }
           
            

        }
        else{
            alert('password entered must be same as confirmed password')
        }

    seVal({
        mail:'',
        pass:'',
        cpass:''
    })

    }

    return ( 
        <div className='sign_whole'>
           
            <div className='signcnt'>
            <div >
            <div className='sign_contain'>
                    <span className='signhdg'>Sign Up</span>
                    <form className='sign_frm'>
                    <input className='signinp'value={val.mail} type='email'name='email' placeholder='Email Id' required onChange={changhandle}></input>
                    <input className='signinp'value={val.pass} type='password'name='pass' placeholder='Password' required onChange={changhandle}></input>
                    <input className='signinp'value={val.cpass} type='password'name='cpass' placeholder='Confirm Password'onChange={changhandle} required></input>
                    <div className='signinp'><button className='signbtn sbtn' onClick={submtsig}>Sign Up</button></div>
                    </form>
                    
                </div>
              <NavLink className='navlnkclass' to='/login'> <div className='logredirect'>Already have an account? Log In</div></NavLink> 
            </div>
                
            </div>
            <img className='signbgimg' src={bgimg}></img>
        
        </div>
     );
}

export default SignUp;