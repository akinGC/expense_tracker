
import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Contextcreate from './components/context/Contextcreate';
import Login from './components/Login&signUp/Login';
import SignUp from './components/Login&signUp/SignUp';
import Welcome from './components/Welcome';

function App() {
  const auth = useContext(Contextcreate)
  return (

    <Routes>
      <Route path='/' element={<SignUp/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/wel' element={auth.isLoggedIn? <Welcome/>:<Login/>}/>
    </Routes>
    
  );
}

export default App;
