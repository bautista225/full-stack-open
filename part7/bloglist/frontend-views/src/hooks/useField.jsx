import { useState } from 'react'

export const useField = (name, placeholder = name, type = 'text') => {
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

    return {
        name,
        placeholder,
        type,
        value,
        onChange,
        reset,
        inputProps,
    }
}