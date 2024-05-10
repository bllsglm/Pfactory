import { useState,useEffect } from "react"
import {useSelector, useDispatch } from 'react-redux';
import {useGetGoalsQuery ,useSetGoalsMutation, useUpdateGoalMutation} from '../slices/goalApiSlice';
import { toast } from 'react-toastify';
import Loader from './Loader';
import { settingGoals, resetGoals } from "../slices/goalSlice";
import GoalItem from "./GoalItem";
import SearchBox from "./Searchbox";
import { useParams } from "react-router-dom";


const GoalForm = () => {
  const [text,setText] = useState('');
  const [tags, setTags] = useState('');
  const [editButton, setEditButton] = useState(false)
  const [currentGoal, setCurrentGoal] = useState({})
  const dispatch = useDispatch();
  const { keyword } = useParams();
  console.log(keyword);


  const { userInfo } = useSelector((state) => state.auth)
  console.log(userInfo);

  const [setGoalApi, {isLoading :loaderSetting } ] = useSetGoalsMutation()
  const [updateGoal,{isLoading: loaderUpdate}] = useUpdateGoalMutation()
  const {data : goalList, isLoading : loadingGetGoal , refetch} = useGetGoalsQuery({keyword});


  const EditHandler = (goal) => {
    setText(goal.text)
    setTags(goal.tags)
    setEditButton(true)
    setCurrentGoal(goal)
  }

  const onSubmit = async(e) => {

    if(editButton === true) {
      await updateGoal({...currentGoal, text, tags})
      setEditButton(false)
      toast.success("Goal edited")
    }else{

      try {
        e.preventDefault()
        const res = await setGoalApi({text, tags:tags.split(",")}).unwrap();
        dispatch(settingGoals({...res}))
        refetch()
        toast.success('Goals set, success ahead.')
        setText('')
      } catch (error) {
        toast.error(error?.data?.message || error.error)
      }
      
    }
    
  }

  useEffect(()=>{
    if(goalList){
    refetch()
    }

    if(!userInfo){
      resetGoals()
    }

  },[goalList, refetch, userInfo ])


  if(loadingGetGoal){
   return <Loader/>
  }

  return (<>
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Goal</label>
          <input 
          type="text" 
          name="text"
          id="text" 
          value={text} 
          placeholder="Add a Goal.."
          onChange={(e)=>setText(e.target.value)}/>
          <input 
          type="text" 
          value={tags} 
          name="tags"
          id="tags"
          placeholder="Add some Tags for your goals.."
          onChange={(e) => setTags(e.target.value)} />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">{editButton ? "Edit Goal": "Add Goal"}</button>
          {loaderSetting && <Loader/>}
          <SearchBox />
        </div>
      </form>
    </section>
    <section className="content">
      {goalList?.length > 0 ? (
        <div className="goals">
          {goalList.map((goal)=> (
            <GoalItem key={goal._id} goal={goal} handleEdit={()=> EditHandler(goal)}/>
          ))}
        </div>
      ) : (<h3>You have not set any goals</h3>) }
    </section>
    </>
  )
}

export default GoalForm