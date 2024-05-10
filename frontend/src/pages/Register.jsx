import { useState, useEffect } from "react"
import { FaUser } from "react-icons/fa";
import {useRegisterMutation} from '../slices/userApiSlice'
import { setCredentials } from "../slices/authSlice";
import { useDispatch } from "react-redux";
import {toast} from 'react-toastify';
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [formData,setFormData] = useState({
    name : '',
    email: '',
    password: '',
    password2 : '',
  })

  const {name,email,password,password2} = formData
  const onChange = (e) => {
    setFormData((prevState) =>({...prevState, [e.target.name] : e.target.value}))
  }

  const [register, {isLoading ,error}] = useRegisterMutation()
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async(e) => {
   try {
    e.preventDefault();
    if(password === password2){
      const res = await register({name,email,password}).unwrap();
      dispatch(setCredentials({...res}));
      navigate('/')
      toast.success(`Welcome ${res.name}. Your account is ready. What goal will you set first?`)
      setFormData({
        name : '',
        email: '',
        password: '',
        password2 : '',
      })
    }else{
      toast.error('Passwords do not match')
    }
   } catch (error) {
    toast.error(error?.data?.message || error.error)
   }
  }


  return <>
    <section className="heading">
      <h1>
        <FaUser/> Register
      </h1>
      <p>Please Create an account</p>
    </section>
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
         <input 
          type="text" 
          className="form-control" 
          id="name" name="name" 
          value={name} 
          placeholder="Enter your name" 
          onChange={onChange}/>
        </div>
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
         <input 
          type="password" 
          className="form-control" 
          id="password2" name="password2" 
          value={password2} 
          placeholder="Confirm password" 
          onChange={onChange}/>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-block">Submit</button>
        </div>
      </form>
        Already have an account? <Link to='/login'> <FaUser/><strong>Login</strong></Link>
    </section>
  </>
}

export default Register