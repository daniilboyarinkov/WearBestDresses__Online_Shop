import { useEffect } from 'react'

import { useInput } from '../../Hooks/useInput'
import { InputError } from '../InputError'
import { getFromSessionStorage, regularSetToSessionStorage } from '../../helpers/SessionStorage'

import styles from './DeliveryForm.module.css'

export const DeliveryForm = ({ setIsDeliveryOK, showPopup, setIsDeliveryEmpty }) => {
    const fio = useInput('', { isEmpty: true, maxLength: 42, noNumbers: true, minLength: 5 })
    const country = useInput('', { isEmpty: true, noNumbers: true })
    const region = useInput('', { isEmpty: true, noNumbers: true, minLength: 3 })
    const city = useInput('', { isEmpty: true, noNumbers: true })
    const street = useInput('', { isEmpty: true, minLength: 3 })
    const flat = useInput('', { isEmpty: true })
    const postcode = useInput('', { isEmpty: true, requiredLength: 6 })

    const changeFIO = (e) => {
        const target = e.target.value
        if (target.match(/\s/g)?.length > 2) return
        if (/\d+/.test(target)) return
        fio.onChange(e)
    }

    const changeCountry = (e) => {
        if (/\d+/.test(e.target.value)) return
        country.onChange(e)
    }

    const changeRegion = (e) => {
        if (/\d+/.test(e.target.value)) return
        region.onChange(e)
    }

    const changeCity = (e) => {
        const value = e.target.value
        // no spaces
        if (value.match(/\s/g)) return
        // no digits
        if (/\d+/.test(value)) return
        city.onChange(e)
    }

    const changeStreet = (e) => {
        const value = e.target.value
        if (value.replace(/\s/g, '').length > 21) return
        street.onChange(e)
    }

    const changeFlat = (e) => {
        const value = e.target.value
        if (!/^\d+$/.test(value) && value !== '') return
        flat.onChange(e)
    }

    const changePostcode = (e) => {
        const value = e.target.value
        // only digits
        if (!/^\d+$/.test(value) && value !== '') return
        postcode.onChange(e)
    }

    const onSubmit = () => {
        const errors = []

        if (fio.isEmpty) errors.push('Поле ФИО не может быть пустым')
        if (country.isEmpty) errors.push('Поле Страна не может быть пустым')
        if (region.isEmpty) errors.push('Поле Регион не может быть пустым')
        if (city.isEmpty) errors.push('Поле Город не может быть пустым')
        if (street.isEmpty) errors.push('Поле Улица не может быть пустым')
        if (flat.isEmpty) errors.push('Поле Дом / Квартира не может быть пустым')
        if (postcode.isEmpty) errors.push('Поле Почтовый индекс не может быть пустым')

        if (errors.length === 0) {
            // сохранить введенные данные в сессионное хранилище
            const deliveryData = {
                fio: fio.value,
                country: country.value,
                region: region.value,
                city: city.value,
                street: street.value,
                flat: flat.value,
                postcode: postcode.value,
            }
            regularSetToSessionStorage('deliveryData', deliveryData)

            // return feedback
            setIsDeliveryOK(true)
        } else {
            setIsDeliveryOK(false)
        }

        setIsDeliveryEmpty(false)
        showPopup()
    }

    useEffect(() => {
        const deliveryData = getFromSessionStorage('deliveryData')

        if (deliveryData) {
            fio.setV(deliveryData?.fio)
            country.setV(deliveryData?.country)
            region.setV(deliveryData?.region)
            city.setV(deliveryData?.city)
            street.setV(deliveryData?.street)
            flat.setV(deliveryData?.flat)
            postcode.setV(deliveryData?.postcode)
        }
    }, [])

    return (
        <div className={styles.wrapper}>
            <img src='/WearBestDresses__Online_Shop/svg/postman.svg' alt='' width={120} />
            <div className={styles.delivery__form}>
                <div className={styles.field}>
                    ФИО получателя
                    {fio.isDirty && fio.minLengthError && (
                        <InputError>* Минимальная длина 5 символов</InputError>
                    )}
                    <input
                        type='text'
                        value={fio.value}
                        maxLength={42}
                        onBlur={(e) => fio.onBlur(e)}
                        onChange={changeFIO}
                    />
                </div>
                <div className={styles.field}>
                    Страна
                    <input
                        type='text'
                        maxLength={21}
                        value={country.value}
                        onBlur={(e) => country.onBlur(e)}
                        onChange={changeCountry}
                    />
                </div>
                <div className={styles.horizontal}>
                    <div className={styles.field}>
                        Регион
                        {region.isDirty && region.minLengthError && (
                            <InputError>* Минимальная длина 3 символа</InputError>
                        )}
                        <input
                            type='text'
                            maxLength={21}
                            value={region.value}
                            onBlur={(e) => region.onBlur(e)}
                            onChange={changeRegion}
                        />
                    </div>
                    <div className={styles.field}>
                        Город
                        <input
                            type='text'
                            maxLength={21}
                            value={city.value}
                            onBlur={(e) => city.onBlur(e)}
                            onChange={changeCity}
                        />
                    </div>
                </div>
                <div className={styles.horizontal}>
                    <div className={styles.field}>
                        Улица
                        {street.isDirty && street.minLengthError && (
                            <InputError>* Минимальная длина 3 символа</InputError>
                        )}
                        <input
                            type='text'
                            maxLength={21}
                            value={street.value}
                            onBlur={(e) => street.onBlur(e)}
                            onChange={changeStreet}
                        />
                    </div>
                    <div className={styles.field}>
                        Дом / квартира
                        <input
                            type='text'
                            maxLength={6}
                            value={flat.value}
                            onChange={changeFlat}
                            onBlur={(e) => flat.onBlur(e)}
                        />
                    </div>
                </div>
                <div className={styles.field}>
                    Почтовый индекс
                    {postcode.isDirty && postcode.lengthError && (
                        <InputError>* Длина почтового индекса 6 символов</InputError>
                    )}
                    <input
                        type='text'
                        maxLength={6}
                        value={postcode.value}
                        onChange={changePostcode}
                        onBlur={(e) => postcode.onBlur(e)}
                    />
                </div>
                <button onClick={onSubmit} className={styles.card_form_submit}>
                    Submit
                </button>
            </div>
        </div>
    )
}
