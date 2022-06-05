import { useState } from 'react'
import { Link } from 'react-router-dom'

import { CreditCard } from '../../components/CreditCard/CreditCard'
import { DeliveryForm } from '../../components/DeliveryForm/DeliveryForm'
import { ReturnSection } from '../../components/ReturnSection/ReturnSection'
import { PopupNote } from '../../components/PopupNote/PopupNote'
import { checkInSessionStorage } from '../../helpers/SessionStorage'

import styles from './Payment.module.css'

const Payment = () => {
    const [popupNotification, setPopupNotification] = useState(false)
    const [isCreditCardOK, setIsCreditCardOK] = useState(false)
    const [isDeliveryOK, setIsDeliveryOK] = useState(false)
    const [isCreditCardEmpty, setIsCreditCardEmpty] = useState(
        () => !checkInSessionStorage('paymentData')
    )
    const [isDeliveryEmpty, setIsDeliveryEmpty] = useState(
        () => !checkInSessionStorage('deliveryData')
    )

    const closePopup = () => setPopupNotification(false)
    const showPopup = () => setPopupNotification(true)
    return (
        <>
            <div className={styles.content}>
                <CreditCard
                    setIsCreditCardOK={(bool) => setIsCreditCardOK(bool)}
                    setIsCreditCardEmpty={(bool) => setIsCreditCardEmpty(bool)}
                    showPopup={showPopup}
                />
                <DeliveryForm
                    setIsDeliveryOK={(bool) => setIsDeliveryOK(bool)}
                    setIsDeliveryEmpty={(bool) => setIsDeliveryEmpty(bool)}
                    showPopup={showPopup}
                />
            </div>
            <div className={styles.footer}>
                <ReturnSection />
            </div>
            <div
                className={
                    popupNotification
                        ? styles.notification_screen
                        : styles.notification_screen_closed
                }>
                <div className={styles.darker__screen} onClick={closePopup}></div>
                <div className={styles.popup}>
                    {isCreditCardOK && isDeliveryOK ? (
                        <Link to={'/WearBestDresses__Online_Shop/payment/check'}>
                            <PopupNote
                                success={true}
                                message={'Данные были сохранены. Нажмите чтобы получить чек.'}
                                closePopup={closePopup}
                                btnAction={closePopup}
                            />
                        </Link>
                    ) : isCreditCardOK && isDeliveryEmpty ? (
                        <PopupNote
                            success={true}
                            message={'Данные карты сохранены. Заполните адрес доставки.'}
                            closePopup={closePopup}
                            btnAction={closePopup}
                        />
                    ) : isDeliveryOK && isCreditCardEmpty ? (
                        <PopupNote
                            success={true}
                            message={'Данные доставки сохранены. Заполните данные карты.'}
                            closePopup={closePopup}
                            btnAction={closePopup}
                        />
                    ) : isCreditCardOK && !isDeliveryOK ? (
                        <PopupNote
                            success={false}
                            message={
                                'Данные доставки введены некорректно. Проверьте, что заполнены все поля.'
                            }
                            closePopup={closePopup}
                            btnAction={closePopup}
                        />
                    ) : !isCreditCardOK && isDeliveryOK ? (
                        <PopupNote
                            success={false}
                            message={
                                'Данные карты введены некорректно. Проверьте, что заполнены все поля.'
                            }
                            closePopup={closePopup}
                            btnAction={closePopup}
                        />
                    ) : (
                        <PopupNote
                            success={false}
                            message={
                                'Данные были введены некорректно. Проверьте, что заполнены все поля.'
                            }
                            closePopup={closePopup}
                            btnAction={closePopup}
                        />
                    )}
                </div>
            </div>
        </>
    )
}

export default Payment
