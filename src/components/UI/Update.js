import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import { faEdge } from '@fortawesome/free-brands-svg-icons';
import { Fragment, useContext, useEffect, useState } from 'react';
import './Welcome.css'
import { useNavigate } from 'react-router-dom';
import Contextcreate from '../context/Contextcreate';
import {useSelector} from 'react-redux'
function Update() {
   const idtokenval = useSelector(state=>state.auth.idToken)
    // const auth = useContext(Contextcreate)
    const nav=useNavigate()
    const [showtxt,setshowtxt] = useState(false)
    const [values,setValues]=useState({
        name:'',
        url:''
    })
    function changeevent(e){
        switch (e.target.name) {
            case 'name':
                setValues({...values,name:e.target.value})
                break;
            case 'url':
                setValues({...values,url:e.target.value})
                 break;
            default:
                break;
        }
    }
function updateshowtxt(){
    setshowtxt(true)
}
function redirectowelPage(){
    setshowtxt(false)
    nav('/wel')
}

 async function submitvalus(){
    try{
        const resp = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBlpCleMXXgnN35xDSjEfIsKsfLOS6wNVM',{
        method:'POST',
        body:JSON.stringify({
            idToken:idtokenval,
            displayName:values.name,
            photoUrl:values.url,
            returnSecureToken:false
        })
    })

        const data = await resp.json()
        if(!resp.ok){
            alert(data.error.message)
        }
        else{
           console.log(data)
        }
        setValues({ name:'',
        url:''})
        nav('/wel')
    }
    catch(err){
        console.log(err)
    }
}
async function initlFetch(){
    try{
        const resp = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBlpCleMXXgnN35xDSjEfIsKsfLOS6wNVM',{
        method:'POST',
        body:JSON.stringify({
            idToken:idtokenval
        })

    })
    const data = await resp.json()
    if(resp.ok){
        setValues({
            name:data.users[0].displayName,
        url:data.users[0].photoUrl
        })
       
    }
    else{
        alert(data.error.message)
    }
    }
    catch(err){
        console.log(err)
    }

}
useEffect(()=>{
    initlFetch()


},[])

    return ( 
   <Fragment>
         <div className="wel_nav_contain">
        <div className="wel_nav_quote">Winners never quite, Quitters never win.</div>
        <div className="wel_nav_updatebtn">Your profile is <span style={{fontWeight:'700',color:'black'}}>64%</span> Completed.A complete profile has higher 
        chance of landing a job.< span className='nav_up_cmp' onClick={updateshowtxt}>Complete now</span> </div>
       </div>

       {showtxt && <div className='upd_content'>
        <div className='upd_frst'>
            <span className='upd_frst_txt'>Contact Details</span>
            <span className='upd_frst_btn' onClick={redirectowelPage}>Cancel</span>
        </div>
        <div className='upd_scnd'>
            <FontAwesomeIcon icon={faGithub} className='upd_icons'></FontAwesomeIcon>
            <span className='upscnd_title'>Full Name:</span>
            <input type='text' className='upscnd_inp inptitle'value={values.name} name='name' onChange={changeevent}></input>
            <FontAwesomeIcon icon={faEdge}></FontAwesomeIcon>
            <span className='upscnd_title'>Prfile URL:</span>
            <input type='text' className='upscnd_inp'name='url'onChange={changeevent} value={values.url}></input>
        </div>
        <div className='upd_thrd' onClick={submitvalus}>Update</div>
       </div>}
   </Fragment>
     );
}

export default Update;