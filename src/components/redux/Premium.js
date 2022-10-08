import {createSlice} from '@reduxjs/toolkit'


let init={
    isPremium:false,
    theme:'light'
}
const premium = createSlice({
    name:'premium',
    initialState:init,
    reducers:{
        setPremium(state,action){
            state.isPremium=action.payload
        },
        setheme(state, action){
            state.theme=action.payload
        }
    }
})

export const premiumfetch =(arry)=>{
    return (dispatch)=>{
        let sum=0;
       
        for (let i = 0; i < arry.length; i++) {
            sum=sum+parseInt(arry[i].amt)
            
        }
       if(sum>10000){
        dispatch(premiumAction.setPremium(true))
       }
       else if(sum<=10000){
        dispatch(premiumAction.setPremium(false))
       }
    //    console.log(sum)
    }
}

export const premiumAction = premium.actions
export default premium.reducer