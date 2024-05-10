import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../slices/authSlice';
import { useLogoutMutation } from '../slices/userApiSlice';
import { toast } from 'react-toastify';

const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {userInfo} = useSelector((state)=> state.auth)
  const [logoutApi] = useLogoutMutation()
  
  const submitHandler = async() => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  return (
    <header className='header'>
      <div className="logo">
        <Link to='/' style={{fontSize: '30px', fontFamily: 'cursive', fontStyle:'italic' , fontWeight:'bolder'}}>Playable Factory</Link>
      </div>
      <ul>
      {!userInfo ? (
        <>
         <li>
          <Link to='/login'>
            <FaSignInAlt/> Login
          </Link>
        </li>
        <li>
        <Link to='/register'>
            <FaUser/> Register
          </Link> 
        </li>
        </>
        ) : (
        <li>
          <button className='btn' onClick={submitHandler}>
            <FaSignOutAlt/> Logout
          </button>
      </li>
        )}
      </ul>
    </header>
  )
}

export default Header