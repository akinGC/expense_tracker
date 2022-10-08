import {configureStore} from '@reduxjs/toolkit'
import Expensereduce from './Expensereduce'
import Auth from './Auth'
const store = configureStore({
    reducer:{exp:Expensereduce ,auth:Auth }
})



export default store