import { configureStore } from '@reduxjs/toolkit'
import notificationSlice from './reducers/notificationReducer'
import blogSlice from './reducers/blogReducer'
import userSlice from './reducers/userReducer'

const store = configureStore({
    reducer: {
        notification: notificationSlice,
        blogs: blogSlice,
        user: userSlice
    }
})

export default store