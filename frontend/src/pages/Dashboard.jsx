import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import GoalForm from "../components/GoalForm";



const Dashboard = () => {
  const { userInfo } = useSelector((state) => state.auth)

  const navigate = useNavigate()

  useEffect(() => {
    if(!userInfo){
      navigate('/login')
    }
  }, [navigate, userInfo])

  return  <>
    <section className="heading">
      <h1>Welcome {userInfo && userInfo.name}</h1>
      <p>Goals Dashboard</p>
      <GoalForm/>
    </section>
  </>
  
}

export default Dashboard