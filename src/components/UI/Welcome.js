import { NavLink } from 'react-router-dom';
import './Welcome.css'
function Welcome() {
    return ( 
       <div className="wel_nav_contain">
        <div className="wel_nav_quote">Welcome to Expense Tracker!!!</div>
        <div className="wel_nav_updatebtn">Your profile is Incomplete.<NavLink to='/update' className='nav_link'>Complete now</NavLink> </div>
       </div>
     );
}

export default Welcome
