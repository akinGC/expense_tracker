
import { useContext,useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Contextcreate from './components/context/Contextcreate';
import Eform from './components/Expense/Eform';
import Login from './components/Login&signUp/Login';
import Passreset from './components/Login&signUp/Passreset';
import SignUp from './components/Login&signUp/SignUp';
import Update from './components/UI/Update';
import Welcome from './components/UI/Welcome';
import {useSelector,useDispatch} from 'react-redux'
import { authaction } from './components/redux/Auth';
import {expaction ,initfetch} from './components/redux/Expensereduce'
function App() {
  // const auth = useContext(Contextcreate)
  const dispatch = useDispatch()

  const logdin = useSelector(state=>state.auth.isLoggedIn)
  
  useEffect(()=>{
    // expfetch()
    dispatch(initfetch())
    // setidToken(localStorage.getItem('expidtok'))
    dispatch(authaction.seIdToken(localStorage.getItem('expidtok')))
    // setisLoggesdIn(localStorage.getItem('expsilogin'))
    dispatch(authaction.setloged(localStorage.getItem('expsilogin')))
},[])
  return (

    <Routes>
      <Route path='/' element={<Welcome/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/update' element={logdin?<Update/>:<Login/>}/>
      <Route path='/wel' element={logdin? <Welcome/>:<Login/>}/>
      <Route path='/passreset' element={<Passreset/>}/>
    </Routes>
    
  );
}

export default App;
