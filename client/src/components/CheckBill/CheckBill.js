import { useRef } from 'react'

import { exportAsImage } from '../../helpers/exportAsImage'

import styles from './CheckBill.module.css'

export const CheckBill = ({ totalData, products }) => {
    const { subtotal, discount, total } = totalData
    const exportCheck = useRef()

    return (
        <div className={styles.checkBill} ref={exportCheck}>
            <h1>Чек</h1>
            <hr />
            <h2>Товары</h2>
            <div className={styles.products}>
                {products.map((product) => (
                    <div className={styles.product} key={product.id}>
                        <span className={styles.productName}>• {product.name}</span>
                        <span>{product.price} ₽</span>
                    </div>
                ))}
            </div>
            <br />
            <div className={styles.subtotal}>
                <span>Всего:</span> <span>{subtotal.toLocaleString('ru-RU')} ₽</span>
            </div>
            <div className={styles.discount}>
                <span>Скидка:</span> <span>- {discount.toLocaleString('ru-RU')} ₽</span>
            </div>
            <hr />
            <div className={styles.total}>
                <span>Всего:</span> <span>{total.toLocaleString('ru-RU')} ₽</span>
            </div>
            <br />
            <div className={styles.percents}>
                <span>Сумма НДС:</span> <span>{(total * 0.2).toFixed(2)} ₽</span>
            </div>
            <hr />
            <div className={styles.thanks}>Спасибо за покупку!</div>
            <div
                className={styles.download}
                onClick={() => {
                    exportAsImage(exportCheck.current, 'receipt')
                }}>
                Нажмите, чтобы скачать чек
            </div>
        </div>
    )
}
