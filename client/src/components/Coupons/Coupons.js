import styles from './Coupons.module.css'

import { BonusesSection } from '../BonusesSection/BonusesSection'
import { useState } from 'react'

export default function Coupons({ changeDiscount }) {
    const [coupon, setCoupon] = useState('')
    const [bonuses, setBonuses] = useState(500)
    const [giftCardCode, setGiftCardCode] = useState('')

    const changeCoupon = (e) => setCoupon(e.target.value)
    const changeGiftCardCode = (e) => setGiftCardCode(e.target.value)

    const sendDiscountCoupon = (e) => {
        e.preventDefault()
        changeDiscount({
            type: 'coupon',
            code: coupon,
            discount: 100,
        })
    }

    const sendDiscountBonuses = (e) => {
        e.preventDefault()
        changeDiscount({
            type: 'bonuses',
            discount: bonuses,
        })
        setBonuses(0)
    }

    const sendGiftCardCode = (e) => {
        e.preventDefault()
        changeDiscount({
            type: 'gift_card',
            code: giftCardCode,
            discount: 1000,
        })
    }

    return (
        <div className={styles.bonuses__panel}>
            <BonusesSection title={'Купоны'}>
                <form className={styles.bonuses__form} onSubmit={(e) => sendDiscountCoupon(e)}>
                    <h3 className={styles.label__title}> У вас есть купон? </h3>
                    <div className={styles.label__section}>
                        Введите его:
                        <input
                            onChange={(e) => changeCoupon(e)}
                            placeholder='TEST100'
                            name='coupon__input'
                            id='coupon__input'
                            type='text'
                        />
                        {coupon.length > 0 && (
                            <div className={styles.code__submit}>
                                <div className={styles.code__confirm}>
                                    Ваш купон: <b>{coupon}</b>?
                                </div>
                                <input type='submit' value={'Да, использовать купон'} />
                            </div>
                        )}
                    </div>
                </form>
            </BonusesSection>

            <BonusesSection title={'Бонусы'}>
                <form className={styles.bonuses__form} onSubmit={(e) => sendDiscountBonuses(e)}>
                    <h3 className={styles.label__title}>Ваши бонусы: {bonuses}</h3>

                    <div>
                        {bonuses > 0 && (
                            <div className={styles.code__submit}>
                                <div className={styles.code__confirm}>
                                    Хотите воспользоваться бонусами?
                                </div>
                                <input type='submit' value='Да, использовать бонусы' />
                            </div>
                        )}
                    </div>
                </form>
            </BonusesSection>

            <BonusesSection title={'Подарочная карта'}>
                <form className={styles.bonuses__form} onSubmit={(e) => sendGiftCardCode(e)}>
                    <h3 className={styles.label__title}>
                        Хотите воспользоваться подарочной картой?
                    </h3>
                    <div className={styles.label__section}>
                        Введите код с её оборота:
                        <input type='text' onChange={(e) => changeGiftCardCode(e)} />
                        {giftCardCode.length > 0 && (
                            <div className={styles.code__submit}>
                                <div className={styles.code__confirm}>
                                    Это код вашей подарочной карты: <b>{giftCardCode}</b>?
                                </div>
                                <input type='submit' value='Да, использовать подарочную карту' />
                            </div>
                        )}
                    </div>
                </form>
            </BonusesSection>
        </div>
    )
}
