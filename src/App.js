
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
import {premiumfetch} from './components/redux/Premium'
import dark from './components/UI/Theme'
import ProtectedRoute from './components/nav/ProtectedRoute';
function App() {
  // const auth = useContext(Contextcreate)
  const dispatch = useDispatch()
  const arry = useSelector(state=>state.exp.array)
  const logdin = useSelector(state=>state.auth.isLoggedIn)
  useEffect(()=>{
    dispatch(premiumfetch(arry))
   
  },[arry])
  useEffect(()=>{
    // expfetch()
    dispatch(initfetch())
    // document.body.style.backgroundColor='black'
    // setidToken(localStorage.getItem('expidtok'))
    dispatch(authaction.seIdToken(localStorage.getItem('expidtok')))
    // setisLoggesdIn(localStorage.getItem('expsilogin'))
    dispatch(authaction.setloged(localStorage.getItem('expsilogin')))
},[])
// console.log(logdin)
  return (

    <Routes>
      {console.log(logdin)}
      <Route path='/' element={<SignUp/>}/>
      <Route path='/login' element={<Login/>}/>
  
      {/* <Route path='/update' element={ <ProtectedRoute ><Update/></ProtectedRoute> }/> */}
      <Route  element={ <ProtectedRoute />}>
              <Route path='/wel' element={<Welcome/>}/>
              <Route path='/update' element={<Update/>}/>
      </Route>
    
      {/* <Route path='/wel' element={ logdin ? <Welcome/> : <Login/>}/> */}
      <Route path='/passreset' element={<Passreset/>}/>
      <Route path="*" element={<p>There's nothing here: 404!</p>} />
    </Routes>
    
  );
}

export default App;
