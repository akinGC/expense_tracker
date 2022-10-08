import {configureStore} from '@reduxjs/toolkit'
import Expensereduce from './Expensereduce'
import Auth from './Auth'
import Premium from './Premium'
const store = configureStore({
    reducer:{exp:Expensereduce ,auth:Auth,premium:Premium }
})



export default store