import { useState, useEffect } from 'react'

import { InputError } from '../InputError'
import { useInput } from '../../Hooks/useInput'
import { detectPaySystem } from '../../helpers/paySystem'
import { deleteAllSpaces, countSpaces, isAllDigits } from '../../helpers/Strings'
import { getFromSessionStorage, regularSetToSessionStorage } from '../../helpers/SessionStorage'

import styles from './CreditCard.module.css'

export const CreditCard = ({ setIsCreditCardOK, showPopup, setIsCreditCardEmpty }) => {
    const cardNumber = useInput('', {
        isEmpty: true,
        maxLength: 16,
        requiredLength: 16,
        allNumbers: true,
    })
    const cardHolder = useInput('FULL NAME', {
        isEmpty: true,
        maxLength: 21,
        minLength: 5,
        noNumbersError: true,
    })
    const cvv = useInput('', {
        isEmpty: true,
        maxLength: 3,
        requiredLength: 3,
        allNumbers: true,
    })

    const month = useInput('', { monthValidate: true })
    const year = useInput('22', { yearValidate: true })

    const [backFace, setBackFace] = useState(false)
    const [randomIndex] = useState(Math.floor(Math.random() * 27))
    const [paySystem, setPaySystem] = useState('visa')

    useEffect(() => {
        const paymentData = getFromSessionStorage('paymentData')

        if (paymentData) {
            cardNumber.setV(paymentData?.cardNumber)
            cardHolder.setV(paymentData?.cardHolder)
            month.setV(paymentData?.month)
            year.setV(paymentData?.year)
            cvv.setV(paymentData?.cvv)
        }
    }, [])

    useEffect(() => {
        setPaySystem(detectPaySystem(cardNumber.value))
    }, [cardNumber])

    const onSubmit = () => {
        const errors = []

        if (cardNumber.isEmpty) errors.push('Номер карты не может быть пустым')
        if (cardNumber.lengthError) errors.push('Длина номера карты 16 цифр')

        if (cardHolder.isEmpty || cardHolder.value === 'FULL NAME')
            errors.push('Поле ФИО не может быть пустым')
        if (cardHolder.minLengthError)
            errors.push('Длина поля ФИО не может быть меньше 3 симоволов')
        if (cardHolder.noNumbersError) errors.push('Поле ФИО не может содержать цифры')

        if (month.value === '') errors.push('Поле Expiration Date не может быть пустым')
        if (month.monthExpiredError && year.yearExpiredError)
            errors.push('Срок действия карты истек')

        if (cvv.isEmpty) errors.push('Поле CVV не может быть пустым')
        if (cvv.lengthError) errors.push('Длина CVV должна быть 3 симолва')

        if (errors.length === 0) {
            // сохранить введенные данные в сессионное хранилище
            const paymentData = {
                cardNumber: cardNumber.value,
                cardHolder: cardHolder.value,
                month: month.value,
                year: year.value,
                cvv: cvv.value,
            }
            regularSetToSessionStorage('paymentData', paymentData)

            // return feedback
            setIsCreditCardOK(true)
        } else {
            setIsCreditCardOK(false)
        }

        setIsCreditCardEmpty(false)
        showPopup()
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.credit_card}>
                <div
                    className={
                        backFace
                            ? `${styles.card_front_side} ${styles.card_front_side_backface}`
                            : styles.card_front_side
                    }>
                    <img
                        className={styles.card__bg}
                        src={`https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/${randomIndex}.jpeg`}
                        alt=''
                    />
                    <div className={styles.card_type_imgs}>
                        <img
                            className={styles.card_type_img}
                            src='https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png'
                            alt='chip'
                        />
                        <img
                            className={styles.card_type_img}
                            src={`https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/${paySystem}.png`}
                            alt=''
                        />
                    </div>

                    <div className={styles.card__number}>
                        {new Array(16).fill(0).map((x, i) => (
                            <span key={x + i} className={styles.card_numberItem}>
                                {i % 4 === 0 && (
                                    <span className={styles.card_numberItem_gap}> </span>
                                )}
                                {cardNumber.value.replace(/\s/gm, '')[i] || '#'}
                            </span>
                        ))}
                    </div>

                    <div className={styles.card__content}>
                        <div className={styles.holder}>
                            <div className={styles.card__content_title}>Card Holder</div>
                            <div className={styles.card__content_info}>
                                {cardHolder.value.toUpperCase()}
                            </div>
                        </div>
                        <div className={styles.expires}>
                            <div className={styles.card__content_title}>Expires</div>
                            <div className={styles.card__content_info}>
                                {month.value || 'MM'} / {year.value || 'YY'}
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={
                        backFace
                            ? `${styles.card_back_side} ${styles.card_back_side_backface}`
                            : styles.card_back_side
                    }>
                    <img
                        className={styles.card__back__bg}
                        src={`https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/${randomIndex}.jpeg`}
                        alt=''
                    />
                    <div className={styles.cvv__title}>CVV</div>
                    <div className={styles.cvv__band}>{cvv.value}</div>
                    <div className={styles.card_itemType_back}>
                        <img
                            className={styles.card_type_img}
                            src={`https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/${paySystem}.png`}
                            alt=''
                        />
                    </div>
                </div>
            </div>
            <div className={styles.credit_card_form}>
                <div className={styles.card_form_number}>
                    Card Number
                    {cardNumber.isDirty && cardNumber.maxLengthError && (
                        <InputError>
                            * Длина номера банковской карты не может быть больше 16
                        </InputError>
                    )}
                    {cardNumber.isDirty && cardNumber.lengthError && (
                        <InputError>* Длина номера банковской карты 16 цифр</InputError>
                    )}
                    {cardNumber.isDirty && cardNumber.allNumbersError && (
                        <InputError>* В номере банковской карты не может быть букв</InputError>
                    )}
                    <input
                        className={styles.card_form_number__inp}
                        type='text'
                        name='cardNumber'
                        maxLength={16 + 3}
                        value={cardNumber.value}
                        onBlur={(e) => cardNumber.onBlur(e)}
                        onChange={(e) => {
                            const cleanValue = deleteAllSpaces(e.target.value)
                            if (!isAllDigits(cleanValue) && cleanValue.length !== 0) return
                            cardNumber.onChange(e)
                        }}
                    />
                </div>
                <div className={styles.card_form_holder}>
                    Card Holder
                    {cardHolder.isDirty && cardHolder.noNumbersError && (
                        <InputError>* Имя не может содержать цифры</InputError>
                    )}
                    {cardHolder.isDirty && cardHolder.minLengthError && (
                        <InputError>* Минимальная длина 5 символов</InputError>
                    )}
                    <input
                        className={styles.card_form_holder__inp}
                        type='text'
                        name='cardHolder'
                        maxLength={21}
                        value={cardHolder.value === 'FULL NAME' ? '' : cardHolder.value}
                        onBlur={(e) => cardHolder.onBlur(e)}
                        onChange={(e) => {
                            if (countSpaces(e.target.value) > 1) return
                            if (!/^[a-zA-Z ]*$/.test(e.target.value)) return
                            cardHolder.onChange(e)
                        }}
                    />
                </div>
                <div className={styles.card_form_expiration}>
                    Expiration Date
                    {year.value !== '' &&
                        month.value !== '' &&
                        year.yearExpiredError &&
                        month.monthExpiredError && <InputError>* Срок истек</InputError>}
                    <div className={styles.card_form_expiration_dates}>
                        <select
                            name='month'
                            id=''
                            value={month.value}
                            onChange={(e) => month.onChange(e)}>
                            <option value='' disabled={true}>
                                Month
                            </option>
                            {[...Array(12).keys()]
                                .map((i) => i + 1)
                                .map((month) => (
                                    <option key={month} value={month > 9 ? month : '0' + month}>
                                        {month > 9 ? month : '0' + month}
                                    </option>
                                ))}
                        </select>
                        <select name='year' id='' onChange={(e) => year.onChange(e)}>
                            <option value='' disabled={true}>
                                Year
                            </option>
                            {[...Array(12).keys()].map((i) => (
                                <option key={i} value={new Date().getFullYear() + i}>
                                    {new Date().getFullYear() + i}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className={styles.card_form_cvv}>
                    CVV
                    {cvv.isDirty && cvv.lengthError && (
                        <InputError>* CVV - 3 цифры с оборота карты</InputError>
                    )}
                    <input
                        className={styles.card_form_cvv__inp}
                        type='text'
                        name='cardCVV'
                        maxLength={3}
                        value={cvv.value}
                        onFocus={() => setBackFace(true)}
                        onBlur={(e) => {
                            cvv.onBlur(e)
                            setBackFace(false)
                        }}
                        onChange={(e) => {
                            const value = e.target.value
                            if (!isAllDigits(value) && value.length !== 0) return
                            cvv.onChange(e)
                        }}
                    />
                </div>
                <button onClick={onSubmit} className={styles.card_form_submit}>
                    Submit
                </button>
            </div>
        </div>
    )
}
