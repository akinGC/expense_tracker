import { useState } from "react"
import Contextcreate from "./Contextcreate"

const Contextuse = (props)=>{

    const [idToken,setidToken] = useState('') 
    const [isLoggedIn,setisLoggesdIn] = useState(false) 
    let val={
        idToken:idToken,
        setidToken:setidToken,
        isLoggedIn:isLoggedIn,
        setisLoggesdIn:setisLoggesdIn
    }

    return(
<Contextcreate.Provider value={val}>{props.children}</Contextcreate.Provider>
    )
}

export default Contextuse