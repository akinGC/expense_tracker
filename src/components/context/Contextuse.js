import { useEffect, useState } from "react"
import Contextcreate from "./Contextcreate"

const Contextuse = (props)=>{

    const [idToken,setidToken] = useState('') 
    const [isLoggedIn,setisLoggesdIn] = useState(false) 
    const [emailverify,setEmailverify] = useState('') 
    const [array,setarray] = useState([])

    async function expfetch(){
        const resp = await fetch('https://react-2fea7-default-rtdb.asia-southeast1.firebasedatabase.app/exp.json')
        const data = await resp.json()

        if(!resp.ok){
            alert(data.error.message)
        }
        else{
            // console.log(data)
            let namearr = Object.keys(data)
            let valarr = Object.values(data)
            let finalarr = []
            for(let i=0;i<namearr.length;i++){
                let newObj={
                    amt:valarr[i].amt,
                    desc:valarr[i].desc,
                    cat:valarr[i].cat,
                    id:namearr[i]
                }
                // console.log(newObj)
                finalarr.push(newObj)
                // setarray([...array,newObj])
                // console.log(array)
            }
            // console.log(finalarr)
            setarray(finalarr)
        }
    }

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
        array:array,
        setarray:setarray
    }
    useEffect(()=>{
        expfetch()
        setidToken(localStorage.getItem('expidtok'))
        setisLoggesdIn(localStorage.getItem('expsilogin'))
    },[])

    return(
<Contextcreate.Provider value={val}>{props.children}</Contextcreate.Provider>
    )
}

export default Contextuse