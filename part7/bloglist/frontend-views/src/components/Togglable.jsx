import { Box, Button } from '@mui/material'
import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility,
        }
    })

    return (
        <Box>
            <div style={hideWhenVisible}>
                <Button variant="outlined" onClick={toggleVisibility}>
                    {props.buttonLabel}
                </Button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <Button
                    color='error'
                    variant="outlined"
                    onClick={toggleVisibility}
                    sx={{ mt: 1 }}
                >
                    cancel
                </Button>
            </div>
        </Box>
    )
})

Togglable.displayName = 'Togglable'

export default Togglable
