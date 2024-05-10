import { createSlice } from '@reduxjs/toolkit';

const initialState = {goals : []}

const goalSlice = createSlice({
  name : 'goals',
  initialState,
  reducers :{
    settingGoals : (state,action) => {
      state.goals.push(action.payload)
      localStorage.setItem('goals', JSON.stringify(state.goals))
    },
    resetGoals : (state, action) => {
      state.goals = null;
      localStorage.clear()
    }
  }
})

export const {settingGoals , resetGoals} = goalSlice.actions;
export default goalSlice.reducer;