
import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Contextcreate from './components/context/Contextcreate';
import Eform from './components/Expense/Eform';
import Login from './components/Login&signUp/Login';
import Passreset from './components/Login&signUp/Passreset';
import SignUp from './components/Login&signUp/SignUp';
import Update from './components/UI/Update';
import Welcome from './components/UI/Welcome';

function App() {
  const auth = useContext(Contextcreate)
  return (

    <Routes>
      <Route path='/' element={<Welcome/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/update' element={auth.isLoggedIn?<Update/>:<Login/>}/>
      <Route path='/wel' element={auth.isLoggedIn? <Welcome/>:<Login/>}/>
      <Route path='/passreset' element={<Passreset/>}/>
    </Routes>
    
  );
}

export default App;
