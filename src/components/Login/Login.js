import { Link } from 'react-router-dom'
import { auth } from '../../services/firebase'

const Login = (props) => {

    return (
        <div>
            Please Login First
            <Link to='/'>Home Page</Link>
        </div>
    )
}

export default Login