import { apiSlice } from "./apiSlice";
import { GOALS_URL } from "../constants";
import { UPLOAD_URL } from "../constants";



export const goalApiSlice = apiSlice.injectEndpoints({
  endpoints : builder => ({
    getGoals : builder.query({
      query : ({keyword}) => ({
        url : `${GOALS_URL}`,
        params : {
          keyword,
        }
      }),
      keepUnusedDataFor : 5,
      providesTags : ['Goal']
    }),
    setGoals : builder.mutation({
      query : (data) => ({
        url : GOALS_URL,
        method : 'POST',
        body :data,
      })
    }),
    updateGoal : builder.mutation({
      query : (data) => ({
        url :`${GOALS_URL}/${data._id}`,
        method : 'PUT',
        body : data
      })
    }),
    uploadGoalImage : builder.mutation({
      query : (data) => ({
        url : `${UPLOAD_URL}`,
        method : 'POST',
        body :data,
      })
    }),
    deleteGoal : builder.mutation({
      query : (goalId) => ({
        url :`${GOALS_URL}/${goalId}`,
        method : 'DELETE',
      }),
      invalidatesTags : ['Goal'],
      providesTags : ['Goal']
    })
  })
})

export const {useDeleteGoalMutation,useGetGoalsQuery,useSetGoalsMutation,useUpdateGoalMutation, useUploadGoalImageMutation} = goalApiSlice