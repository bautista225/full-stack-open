import { useField } from '../hooks/useField'
import { Box, TextField, Grid2 as Grid } from '@mui/material'
import { LoadingButton } from '@mui/lab'

const CreateCommentForm = ({ onSubmit }) => {
    const content = useField({ name: 'comment' })

    const resetForm = () => {
        content.reset()
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        onSubmit({ content: content.value })
        resetForm()
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
        >
            <TextField
                {...content.textfieldProps()}
                variant="outlined"
                size="small"
                required
                fullWidth
            />

            <LoadingButton
                type="submit"
                variant="outlined"
                loading={false}
                loadingIndicator="Adding..."
            >
                add comment
            </LoadingButton>
        </Box>
    )
}

export default CreateCommentForm
