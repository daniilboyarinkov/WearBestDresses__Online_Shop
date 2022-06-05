import { useState } from 'react'

import { useValidation } from './useValidation'
import { deleteAllSpaces } from '../helpers/Strings'

export const useInput = (initialValue, validations) => {
    const [value, setValue] = useState(initialValue)
    const [isDirty, setIsDirty] = useState(false)
    const valid = useValidation(value, validations)

    const onChange = (e) => {
        let targetValue = e.target.value

        if (e.target.name === 'cardNumber') {
            const cleanValue = deleteAllSpaces(targetValue)
            // adding spaces
            if (cleanValue.length % 4 === 0 && cleanValue.length !== 16) targetValue += ' '
            // trimming spaces
            if (targetValue.trim() === value.trim()) targetValue = targetValue.trim()
        }

        if (e.target.name === 'year') targetValue = targetValue.slice(-2)

        setValue(targetValue)
    }

    const setV = (v) => setValue(v)

    const onBlur = (e) => {
        if (!isDirty) setIsDirty(true)
    }

    return {
        value,
        onChange,
        onBlur,
        isDirty,
        ...valid,
        setV,
    }
}
