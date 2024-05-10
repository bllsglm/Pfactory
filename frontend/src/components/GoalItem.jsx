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
            <img src="https://images.unsplash.com/photo-1715271040278-9c6fcd6e669b?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Goal" />
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