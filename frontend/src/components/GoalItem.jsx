import { toast } from 'react-toastify';
import {useDeleteGoalMutation, useUpdateGoalMutation } from '../slices/goalApiSlice'
import Loader from './Loader';
import { FaEdit, FaTrash } from 'react-icons/fa';


const GoalItem = ({goal, handleEdit}) => {

  const [deleteGoal, {isLoading: loadingDelete, isError ,error}] = useDeleteGoalMutation();
  
  const deleteHandler = async(e) => {
    if(window.confirm("Are you sure to delete this goal?")){
       await deleteGoal(goal._id)
    }
  }

  return (
    <>
      {loadingDelete ? <Loader/> : isError ? toast.error(error?.data?.message || error.error) : (
        <>
          <div className="goal">
            <div>
            <img src={goal.image} alt="goal" />
            </div>
            <div className="goal-content">
              <h2>{goal.text}</h2>
              {goal.tags.length > 0 && <h3>Tags : {goal.tags}</h3>}
              <div className="goal-buttons">
                <button 
                  className="del-button"
                  onClick={deleteHandler}
                >
                  <FaTrash/>
                </button >
                <button 
                  className='edit-button' style={{ border: 'none', background: 'transparent' }} 
                  onClick={handleEdit}
                >
                  <FaEdit fill='green'/>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default GoalItem