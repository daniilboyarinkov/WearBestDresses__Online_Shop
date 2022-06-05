import { getFromSessionStorage, setToSessionStorage } from '../../helpers/SessionStorage'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import CartTotal from '../../components/CartTotal/CartTotal'
import { ProductsHorizontalList } from '../../components/ProductsHorizontalList/ProductsHorizontalList'
import { CartContainer } from '../../components/CartContainer/CartContainer'
import { Empty } from '../../components/Empty/Empty'
import { regularSetToSessionStorage } from '../../helpers/SessionStorage'

import styles from './Cart.module.css'

const Cart = () => {
    const [products, setProducts] = useState(getFromSessionStorage('cartObjects') ?? [])
    const [discount, setDiscount] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [confirm, setConfirm] = useState(false)

    const [coupons, setCoupons] = useState([
        {
            code: 'TEST100',
            used: false,
        },
    ])

    const [giftCards, setGiftCards] = useState([
        {
            code: 'GIFT1000',
            used: false,
            discount: 1000,
        },
    ])

    const changeDiscount = (coupon) => {
        if (
            coupon.type === 'coupon' &&
            (coupons.find((c) => c.code === coupon.code) ?? false) &&
            !coupons.find((c) => c.code === coupon.code).used
        ) {
            setCoupons((prev) => [
                ...prev.filter((c) => c.code !== coupon.code),
                (prev.find((c) => c.code === coupon.code).used = true),
            ])
            setDiscount((prev) => prev + coupon.discount)
        } else if (
            coupon.type === 'gift_card' &&
            (giftCards.find((c) => c.code === coupon.code) ?? false) &&
            !giftCards.find((c) => c.code === coupon.code).used
        ) {
            setGiftCards((prev) => [
                ...prev.filter((c) => c.code !== coupon.code),
                (prev.find((c) => c.code === coupon.code).used = true),
            ])
            setDiscount((prev) => prev + coupon.discount)
        } else if (coupon.type === 'bonuses') setDiscount((prev) => prev + coupon.discount)
        else alert('Incorrect coupon')
    }

    const handleSetProducts = (obj) => setProducts((prev) => prev.filter((o) => o.id !== obj.id))

    const deleteFromCart = (obj) => {
        setToSessionStorage('cartObjects', obj)
        handleSetProducts(obj)
    }

    useEffect(() => {
        const subtotalPrice = products.reduce(
            (prev, next) => prev + +next.price.replace(' ', ''),
            0
        )
        const discountPrice = discount
        const totalPrice = subtotalPrice - discountPrice

        setTotalPrice(totalPrice.toLocaleString('ru-RU'))

        regularSetToSessionStorage('cartTotal', {
            subtotal: subtotalPrice,
            total: totalPrice,
            discount: discountPrice,
        })
    }, [products, discount])

    const confirmPurchase = () => setConfirm(true)

    return (
        <>
            {products.length > 0 ? (
                <div className={styles.container}>
                    <h1 style={{ color: '#3e3e3e', textAlign: 'center' }}>Корзина</h1>
                    <CartContainer
                        products={products}
                        handleSetProducts={handleSetProducts}
                        changeDiscount={changeDiscount}
                        deleteProducts={deleteFromCart}
                    />

                    <CartTotal
                        discount={discount}
                        totalPrice={totalPrice}
                        confirmPurchase={confirmPurchase}
                    />
                    {confirm && (
                        <div className={styles.confirm}>
                            <div
                                className={styles.darker__screen}
                                onClick={() => setConfirm(false)}></div>
                            <form className={styles.confirm__form}>
                                <img
                                    className={styles.close__popup}
                                    width={48}
                                    onClick={() => setConfirm(false)}
                                    src='/WearBestDresses__Online_Shop/svg/cross.svg'
                                    alt='X'
                                />
                                <h2>Подтверждение заказа</h2>
                                Ваш заказ:
                                <div className={styles.order}>
                                    <ProductsHorizontalList
                                        products={products}
                                        handleSetProducts={handleSetProducts}
                                        deleteProducts={deleteFromCart}
                                    />
                                </div>
                                {discount > 0 && (
                                    <div className={styles.total}>
                                        Скидка: <div className={styles.dots} />{' '}
                                        <em> — {discount}</em>
                                    </div>
                                )}
                                <div className={styles.total}>
                                    Всего: <div className={styles.dots} /> <b>{totalPrice}</b>
                                </div>
                                <div className={styles.btn__container}>
                                    <button
                                        className={`${styles.confirm__btn} ${styles.confirm__no}`}
                                        onClick={() => setConfirm(false)}>
                                        Нет, вернуться в корзину
                                    </button>
                                    <Link to={`/WearBestDresses__Online_Shop/payment`}>
                                        <button
                                            className={`${styles.confirm__btn} ${styles.confirm__yes}`}>
                                            Да, оплатить заказ
                                        </button>
                                    </Link>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            ) : (
                <Empty
                    title={'Корзина пуста...'}
                    img={'/WearBestDresses__Online_Shop/img/empty_cart.png'}
                    description={'Добавьте что-нибудь в корзину, чтобы это появилось здесь...'}
                />
            )}
        </>
    )
}

export default Cart
