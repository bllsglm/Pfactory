import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints : builder => ({
    login : builder.mutation({
      query : (data) => ({
        url : `${USERS_URL}/auth`,
        method : 'POST',
        body : data,
      })
    }),
    register : builder.mutation({
      query : (data) => ({
        url :  USERS_URL,
        method : 'POST',
        body : data,
      })
    }),
    logout : builder.mutation({
      query : () => ({
        url : `${USERS_URL}/logout`,
        method : 'POST'
      })
    }),
    getUser : builder.query({
      query : (userId) => ({
        url : `${USERS_URL}/me`
      }),
      keepUnusedDataFor: 5,
    })
  })
})

export const {useGetUserQuery, useLoginMutation,useRegisterMutation,useLogoutMutation} = usersApiSlice