import { useState } from "react"
import Contextcreate from "./Contextcreate"

const Contextuse = (props)=>{

    const [idToken,setidToken] = useState('') 
    const [isLoggedIn,setisLoggesdIn] = useState(false) 
    const [emailverify,setEmailverify] = useState('') 
    let val={
        idToken:idToken,
        setidToken:setidToken,
        isLoggedIn:isLoggedIn,
        setisLoggesdIn:setisLoggesdIn,
        emailverify:emailverify,
        setEmailverify:setEmailverify
    }

    return(
<Contextcreate.Provider value={val}>{props.children}</Contextcreate.Provider>
    )
}

export default Contextuse