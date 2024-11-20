import { textFieldClasses } from '@mui/material'
import { useState } from 'react'

export const useField = ({
    name,
    id = name,
    label = name,
    placeholder = name,
    type = 'text',
}) => {
    const [value, setValue] = useState('')

    const onChange = (event) => setValue(event.target.value)

    const reset = () => setValue('')

    const inputProps = () => ({
        name,
        placeholder,
        type,
        value,
        onChange,
    })

    const textfieldProps = () => ({
        id,
        label,
        name,
        placeholder,
        type,
        value,
        onChange,
    })

    return {
        name,
        placeholder,
        id,
        type,
        value,
        onChange,
        reset,
        inputProps,
        textfieldProps,
    }
}
