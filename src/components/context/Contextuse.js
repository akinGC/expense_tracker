import { useEffect, useState } from "react"
import Contextcreate from "./Contextcreate"

const Contextuse = (props)=>{

    const [idToken,setidToken] = useState('') 
    const [isLoggedIn,setisLoggesdIn] = useState(false) 
    const [emailverify,setEmailverify] = useState('') 
    const [array,setarray] = useState([])
    function arryadd(e){
        setarray([...array,e])
    }
    let val={
        idToken:idToken,
        setidToken:setidToken,
        isLoggedIn:isLoggedIn,
        setisLoggesdIn:setisLoggesdIn,
        emailverify:emailverify,
        setEmailverify:setEmailverify,
        arryadd:arryadd,
        array:array
    }
    useEffect(()=>{
    
        setidToken(localStorage.getItem('expidtok'))
        setisLoggesdIn(localStorage.getItem('expsilogin'))
    },[])

    return(
<Contextcreate.Provider value={val}>{props.children}</Contextcreate.Provider>
    )
}

export default Contextuse