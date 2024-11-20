import Notification from '../components/Notification'
import LoginForm from '../components/LoginForm'
import { Typography, Container, Card, CardContent } from '@mui/material'

const LoginView = () => (
    <Container>
        <Card>
            <CardContent>
                <Typography variant="h5" component="h1" mb={2}>
                    Log in to Blog App
                </Typography>
                <Notification />
                <LoginForm />
            </CardContent>
        </Card>
    </Container>
)

export default LoginView
