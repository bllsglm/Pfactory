import { useState,useEffect } from "react"
import {useSelector, useDispatch } from 'react-redux';
import {useGetGoalsQuery ,useSetGoalsMutation, useUpdateGoalMutation, useUploadGoalImageMutation} from '../slices/goalApiSlice';
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
  const [image, setImage] = useState('');

  const dispatch = useDispatch();
  const { keyword } = useParams();


  const { userInfo } = useSelector((state) => state.auth)
  console.log(userInfo);

  const [setGoalApi, {isLoading :loaderSetting } ] = useSetGoalsMutation()
  const [updateGoal,{isLoading: loaderUpdate}] = useUpdateGoalMutation()
  const {data : goalList, isLoading : loadingGetGoal , refetch} = useGetGoalsQuery({keyword});
  const [uploadImage, {isLoading : loadingUpload}] = useUploadGoalImageMutation()


  const EditHandler = (goal) => {
    setText(goal.text)
    setTags(goal.tags)
    setEditButton(true)
    setCurrentGoal(goal)
  }

  const onSubmit = async(e) => {

    if(editButton === true) {
      await updateGoal({...currentGoal, text, tags, image})
      setEditButton(false)
      toast.success("Goal edited")
    }else{

      try {
        e.preventDefault()
        const res = await setGoalApi({text, tags:tags.split(","), image}).unwrap();
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


  const uploadFileHandler = async(e) => {
    if (e.target.files && e.target.files.length > 0) {
      const formData = new FormData();
      formData.append('image', e.target.files[0]);
      try {
        const res = await uploadImage(formData).unwrap();
        console.log("res is",res);
        toast.success(res.message);
        console.log("res.image is",res.image);
        setImage(res.image)
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }
  

  return (<>
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
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
          placeholder="Add some Tags for your to-dos.."
          onChange={(e) => setTags(e.target.value)} />
           
        </div>
        <input 
          className="upload-image"
          type="file" 
          accept="image/*" 
          name="image" 
          id="image" 
          onChange={uploadFileHandler} 
        />
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