import { useState } from 'react'

import NotFoundPage from '../NotFoundPage/NotFoundPage'
import { DeliveryData } from '../../components/DeliveryData/DeliveryData'
import { CheckBill } from '../../components/CheckBill/CheckBill'
import { getFromSessionStorage } from '../../helpers/SessionStorage'

import styles from './Check.module.css'

const Check = () => {
    const [deliveryData] = useState(getFromSessionStorage('deliveryData') ?? {})
    const [totalData] = useState(getFromSessionStorage('cartTotal') ?? {})
    const [products] = useState(getFromSessionStorage('cartObjects') ?? [])

    return (
        <>
            {Object.keys(deliveryData).length === 0 ||
            Object.keys(totalData).length === 0 ||
            products.length === 0 ? (
                <NotFoundPage />
            ) : (
                <div className={styles.wrapper}>
                    <div className={styles.title}>Оплата прошла успешно!</div>
                    <div className={styles.container}>
                        <DeliveryData deliveryData={deliveryData} total={totalData.total} />
                        <CheckBill totalData={totalData} products={products} />
                    </div>
                </div>
            )}
        </>
    )
}

export default Check
