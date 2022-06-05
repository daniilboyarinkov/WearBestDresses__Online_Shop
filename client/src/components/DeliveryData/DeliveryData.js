import styles from './DeliveryData.module.css'

export const DeliveryData = ({ deliveryData, total }) => {
    const { country, region, city, street, flat, postcode, fio } = deliveryData

    return (
        <div className={styles.deliveryData__form}>
            <h1>Данные доставки</h1>
            <p>
                Заказ на сумму <em>{total.toLocaleString('ru-RU')}</em> ₽ будет доставлен по адресу:
            </p>
            <div className={styles.deliveryData__content}>
                <p>
                    Страна: <em>{country}</em>
                </p>
                <p>
                    Регион: <em>{region}</em>
                </p>
                <p>
                    Город: <em>{city}</em>
                </p>
                <p>
                    Улица: <em>{street}</em>
                </p>
                <p>
                    Дом/квартира: <em>{flat}</em>
                </p>
                <p>
                    Индекс: <em>{postcode}</em>
                </p>
                <p>
                    ФИО: <em>{fio}</em>
                </p>
            </div>
            <p>В течение 20 дней после оформления заказа</p>
        </div>
    )
}
