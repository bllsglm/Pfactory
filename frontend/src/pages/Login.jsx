import { useState, useEffect } from "react"
import { FaSignInAlt} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {useLoginMutation} from '../slices/userApiSlice';
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";


const Login = () => {
  const [formData,setFormData] = useState({
    email: '',
    password: '',
  })

  const {email,password} = formData
  const onChange = (e) => {
    setFormData((prevState) =>({...prevState, [e.target.name] : e.target.value}))
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, {isLoading} ] = useLoginMutation()
  const {userInfo} = useSelector((state)=> state.auth)


  useEffect(()=>{
    if(userInfo){
    navigate('/')
    }
  },[userInfo , navigate])

  const onSubmit = async(e) => {
    try {
      e.preventDefault();
      const res = await login({email,password}).unwrap()
      dispatch(setCredentials({...res}))
      navigate('/')
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  return <>
    <section className="heading">
      <h1>
        <FaSignInAlt/> Login
      </h1>
      <p>Login and start setting goals</p>
    </section>
    <section className="form">
      <form onSubmit={onSubmit}>

        <div className="form-group">
         <input 
          type="email" 
          className="form-control" 
          id="email" name="email" 
          value={email} 
          placeholder="Enter your email" 
          onChange={onChange}/>
        </div>

        <div className="form-group">
         <input 
          type="password" 
          className="form-control" 
          id="password" name="password" 
          value={password} 
          placeholder="Enter your password" 
          onChange={onChange}/>
        </div>
 
        <div className="form-group">
          <button 
          type="submit" 
          className="btn btn-block" 
          disabled={isLoading}>Submit
          </button>
          {isLoading && <Loader/>}
        </div>
      </form>

    </section>
  </>
}

export default Login