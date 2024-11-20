import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import { useField } from '../hooks/useField'
import {
    Box,
    Card,
    CardContent,
    TextField,
    Typography,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'

const CreateBlogForm = () => {
    const dispatch = useDispatch()
    const title = useField({ name: 'title' })
    const author = useField({ name: 'author' })
    const url = useField({ name: 'url' })

    const resetForm = () => {
        title.reset()
        author.reset()
        url.reset()
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        dispatch(
            createBlog({
                title: title.value,
                author: author.value,
                url: url.value,
            }),
        )

        dispatch(
            setNotification({
                message: `a new blog ${title} by ${author} added`,
            }),
        )

        resetForm()
    }

    return (
        <Card>
            <CardContent>
                <Typography component="h3" variant="h4" gutterBottom>
                    Create new blog
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ display: 'grid', gap: 2 }}
                >
                    <TextField
                        {...title.textfieldProps()}
                        variant="outlined"
                        size="small"
                        required
                    />
                    <TextField
                        {...author.textfieldProps()}
                        variant="outlined"
                        size="small"
                        required
                    />
                    <TextField
                        {...url.textfieldProps()}
                        variant="outlined"
                        size="small"
                        required
                    />
                    <LoadingButton variant='outlined'>create</LoadingButton>
                </Box>
            </CardContent>
        </Card>
    )
}

export default CreateBlogForm
