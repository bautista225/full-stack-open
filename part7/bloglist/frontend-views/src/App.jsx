import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    Routes,
    Route,
    Link,
    Navigate,
    useParams,
    useNavigate,
    useMatch,
} from 'react-router-dom'
import blogService from './services/blogs'
import usersService from './services/users'
import UsersInfo from './views/UsersInfo'
import UserDetails from './views/UserDetails'
import BlogList from './views/BlogList'
import BlogDetails from './views/BlogDetails'
import LoginView from './views/LoginView'
import Menu from './components/Menu'
import { initializeBlogs } from './reducers/blogReducer'
import { restartUserSession } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

const App = () => {
    const dispatch = useDispatch()
    const [user, systemUsers] = useSelector((state) => [state.user, state.users])

    useEffect(() => {
        dispatch(restartUserSession())
        dispatch(initializeBlogs())
    }, [dispatch])

    useEffect(() => {
        if (user) {
            blogService.setToken(user.token)
            usersService.setToken(user.token)
            if (systemUsers.length === 0) dispatch(initializeUsers())
        }
    }, [user, dispatch, systemUsers])

    if (!user) return <LoginView />

    return (
        <>
            <Menu />
            <Routes>
                <Route path="/" element={<BlogList />} />
                <Route path="/users" element={<UsersInfo />} />
                <Route path="/users/:id" element={<UserDetails />} />
                <Route path="/blogs" element={<BlogList />} />
                <Route path="/blogs/:id" element={<BlogDetails />} />
            </Routes>
        </>
    )
}

export default App
