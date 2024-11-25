import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBookForm from './components/NewBookForm'
import LoginForm from './components/LoginForm'
import { useLogout, useRestartSession, useUser } from './users/hooks'
import Recommendations from './components/Recommendations'

const App = () => {
    const [page, setPage] = useState('authors')
    const [token, setToken] = useState(null)
    const { logout } = useLogout({ setToken })
    const { restartSession } = useRestartSession({ setToken })

    const isLogged = token !== null
    const visibleWithSession = { display: isLogged ? '' : 'none' }
    const visibleWithoutSession = { display: isLogged ? 'none' : '' }

    useEffect(() => {
        restartSession()
    }, [restartSession])

    return (
        <div>
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                <button
                    onClick={() => setPage('add')}
                    style={visibleWithSession}
                >
                    add book
                </button>
                <button
                    onClick={() => setPage('recommendations')}
                    style={visibleWithSession}
                >
                    recommend
                </button>
                <button
                    onClick={() => {
                        setPage('login')
                        logout()
                    }}
                    style={visibleWithSession}
                >
                    logout
                </button>
                <button
                    onClick={() => setPage('login')}
                    style={visibleWithoutSession}
                >
                    login
                </button>
            </div>

            <Authors show={page === 'authors'} />

            <Books show={page === 'books'} />

            <NewBookForm show={page === 'add'} />

            <Recommendations show={page === 'recommendations'} />

            <LoginForm
                show={page === 'login'}
                setToken={setToken}
                onLogged={() => setPage('authors')}
            />
        </div>
    )
}

export default App
