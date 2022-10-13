import {createSlice} from '@reduxjs/toolkit'

let init={
    idToken:localStorage.getItem('expidtok'),
    isLoggedIn:localStorage.getItem('expidtok')?true:false
}
const auth = createSlice({
    name:'auth',
    initialState:init,
    reducers:{
        seIdToken(state, action){
            state.idToken=action.payload
        },
        setloged(state, action){
            state.isLoggedIn=action.payload
        }
    }
})

export const authaction = auth.actions
export default auth.reducer