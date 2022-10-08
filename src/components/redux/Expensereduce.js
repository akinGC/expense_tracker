import {createSlice} from '@reduxjs/toolkit'

let init={
    emailverify:'',
    array:[]
}
const exp = createSlice({
    name:'exp',
    initialState:init,
    reducers:{
        emailverify(state, action){
            state.emailverify=action.payload
        },
        arrayset(state, action){
            state.array=[...state.array,action.payload]
        },
        arrayreplace(state, action){
            state.array=action.payload
        }
    }
})

export const initfetch = ()  =>{
    return (dispatch) =>{
        async function fetchin(){
            const resp = await fetch('https://react-2fea7-default-rtdb.asia-southeast1.firebasedatabase.app/exp.json')
            const data = await resp.json()
        
            if(!resp.ok){
                alert(data.error.message)
            }
            else{
               
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
                    finalarr.push(newObj)      
                }
                dispatch(expaction.arrayreplace(finalarr))
            }
            }
            fetchin()
    }
}


export const expaction = exp.actions
export default exp.reducer