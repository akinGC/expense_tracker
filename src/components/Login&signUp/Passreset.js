import './SignUp.css'
import bgimg from '../Resources/signbg.png'
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Passreset() {
    const mailref = useRef()
    const nav = useNavigate()
  async  function resetfunc(e){
        e.preventDefault()
        try{
            const resp = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBlpCleMXXgnN35xDSjEfIsKsfLOS6wNVM',{
                method:'POST',
                body:JSON.stringify({
                    requestType:'PASSWORD_RESET',
                    email:'akarshgc1998@gmail.com'
                }),
                headers:{
                    'Content-Type': 'application/json'
                }
            })

            const data = resp.json()
            if(!resp.ok){
                alert(data.error.message)
            }
            else{
                nav('/login',{replace:true})
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
                <span className='signhdg passreset'>Enter Email with which you have Registered</span>
                <form className='sign_frm'>
                <input className='signinp' type='email'name='email'ref={mailref} placeholder='Email Id' required ></input>


                <div className='signinp'><button className='signbtn sbtn' onClick={resetfunc}>Send Reset Link</button></div>
                </form>
                
            </div>

        </div>
            
        </div>
        <img className='signbgimg' src={bgimg}></img>
    
    </div>
     );
}

export default Passreset;