import { useState } from 'react'

const FORMATTERS = {
    default: (event) => event.target.value,
    number: (event) => Number(event.target.value),
    select: (option) => option?.value || null,
}

export const useField = ({
    name,
    id = name,
    label = name,
    placeholder = name,
    type = 'text',
    defaultValue = '',
    options = [],
}) => {
    const formatter = FORMATTERS[type] || FORMATTERS['default']
    const [value, setValue] = useState(defaultValue)

    const setFormattedValue = (value) => setValue(formatter(value))

    const onChange = (event) => {
        setFormattedValue(event)
    }
    const reset = () => setValue(defaultValue)

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

    const selectProps = () => ({
        defaultValue,
        onChange,
        options,
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
        selectProps,
    }
}
