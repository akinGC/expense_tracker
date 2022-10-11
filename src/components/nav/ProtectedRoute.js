
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate,Navigate } from 'react-router-dom';
function ProtectedRoute({ children }) {
    const nav = useNavigate()
    const logdin = useSelector(state=>state.auth.isLoggedIn)
    // const auth = useAuth();
    return logdin ? children : <Navigate to="/login" />;
  }

  export default ProtectedRoute