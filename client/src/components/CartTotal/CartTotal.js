import styles from './CartTotal.module.css'

export default function CartTotal({ discount, totalPrice, confirmPurchase }) {
    return (
        <div className={styles.total}>
            <div className={styles.total__section}>
                <div className={styles.discount__block}>
                    Скидка:
                    <span>
                        <em> — {discount} ₽ </em>
                    </span>
                </div>
                <br />
                <h1 className={styles.totalPrice__block}>
                    Всего:
                    <span>{totalPrice} ₽</span>
                </h1>
            </div>
            <button onClick={confirmPurchase} className={styles.buyBtn}>
                Оплатить покупку
            </button>
        </div>
    )
}
