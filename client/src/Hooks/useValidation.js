import { useState, useEffect } from 'react'

import { isAllDigits, isNoDigits } from '../helpers/Strings'
import { validateMonth, validateYear } from '../helpers/DateValidate'

export const useValidation = (value, validations) => {
    const [isEmpty, setIsEmpty] = useState(true)
    const [lengthError, setLengthError] = useState(false)
    const [maxLengthError, setMaxLengthError] = useState(false)
    const [minLengthError, setMinLengthError] = useState(false)
    const [allNumbersError, setAllNumbersError] = useState(false)
    const [noNumbersError, setNoNumbersError] = useState(false)
    const [monthExpiredError, setMonthExpiredError] = useState(false)
    const [yearExpiredError, setYearExpiredError] = useState(false)

    useEffect(() => {
        const cleanValue = value.replace(/\s/gm, '')

        for (const validation in validations) {
            switch (validation) {
                case 'maxLength':
                    cleanValue.length > validations[validation]
                        ? setMaxLengthError(true)
                        : setMaxLengthError(false)
                case 'minLength':
                    cleanValue.length < validations[validation]
                        ? setMinLengthError(true)
                        : setMinLengthError(false)
                case 'isEmpty':
                    value ? setIsEmpty(false) : setIsEmpty(true)
                case 'requiredLength':
                    cleanValue.length !== validations[validation]
                        ? setLengthError(true)
                        : setLengthError(false)
                case 'allNumbers':
                    if (validations[validation] === true)
                        setAllNumbersError(!isAllDigits(cleanValue) && cleanValue.length !== 0)
                case 'noNumbers':
                    if (validations[validation] === true) setNoNumbersError(isNoDigits(value))
                case 'monthValidate':
                    if (validations[validation] === true) setMonthExpiredError(!validateMonth(+value))
                case 'yearValidate':
                    if (validations[validation] === true) setYearExpiredError(!validateYear(+(20 + value)))
            }
        }
    }, [value])

    return {
        isEmpty,
        maxLengthError,
        minLengthError,
        lengthError,
        allNumbersError,
        noNumbersError,
        monthExpiredError,
        yearExpiredError,
    }
}
