import styles from './CartTotal.module.css'

export default function CartTotal({ discount, totalPrice, products }) {
    return (
        <div className={styles.total}>
            <div className={styles.total__section}>
                <div className={styles.discount__block}>
                    Скидка: <div className={styles.dotted__line__discount} />
                    <span> — {discount} ₽</span>
                </div>
                <br />
                <h1 className={styles.totalPrice__block}>
                    Всего: <div className={styles.dotted__line__total} />
                    <span>{totalPrice} ₽</span>
                </h1>
            </div>
            <button
                onClick={() =>
                    alert(
                        `Поздравляю вы прошли квест! \n Вы купили: \n ${products.map(
                            (pr) => pr.name + ' \n '
                        )} \n За ${totalPrice} рублей`.replace(/,/gm, '')
                    )
                }
                className={styles.buyBtn}>
                Оплатить покупку
            </button>
        </div>
    )
}
