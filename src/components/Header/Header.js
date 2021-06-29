import {login, logout} from '../../services/firebase'

const Header = (props) => (
    <header>
        <h1>MLB Stadium Tracker</h1>
        <ul id='userinfo'>
            {
                props.user ?
                <>
                    <li>Welcome, {props.user.displayName}</li>
                    <li><img id ='userimage' src={props.user.photoURL} alt={props.user.displayName}/></li>
                    <li class='loginlogout'onClick={logout}>Logout</li>
                </>
                :
                <li class='loginlogout'onClick={login}>Login</li>    
            }
        </ul>
    </header>
)

export default Header