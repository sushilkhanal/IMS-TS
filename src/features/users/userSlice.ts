import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const apiUrl = 'http://localhost:8080'
export const userSlice = createApi({
  reducerPath: 'userSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    //get all users
    getUsers: builder.query({
      query: () => '/users',
      providesTags: ['User']
    }),
    //create new user
    postUser: builder.mutation({
      query: (payload) => ({
        url: '/user',
        method: 'POST',
        body: payload,
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
      }),
      invalidatesTags: ['User']
    }),
    //update user
    updateUser: builder.mutation({
      query: (payload) => ({
        url: `/user/${payload.id}`,
        method: 'POST',
        body: payload.body,
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
      }),
      invalidatesTags: ['User']
    }),
    //delete user
    deleteUser: builder.mutation({
      query: (payload) => ({
        url: `/user/${payload.id}`,
        method: 'POST'
      }),
      invalidatesTags: ['User']
    })
  })
})
export const {
  useGetUsersQuery,
  usePostUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation
} = userSlice
