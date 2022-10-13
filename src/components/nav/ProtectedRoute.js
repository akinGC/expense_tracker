
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate,Navigate, Outlet } from 'react-router-dom';
import Update from '../UI/Update';
function ProtectedRoute() {
    const nav= useNavigate()
    const logdin = useSelector(state=>state.auth.isLoggedIn)
    // const auth = useAuth();

   
    return logdin ? <Outlet/> : <Navigate to='/login'/>;
  }

  export default ProtectedRoute