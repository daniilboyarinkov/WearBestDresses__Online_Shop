import { useEffect, useState } from 'react'
import { getFromSessionStorage, setToSessionStorage } from '../../helpers/SessionStorage'

import { CartContainer } from '../../components/CartContainer/CartContainer'
import CartTotal from '../../components/CartTotal/CartTotal'
import { Empty } from '../../components/Empty/Empty'

const Cart = () => {
    const [products, setProducts] = useState(getFromSessionStorage('cartObjects') ?? [])
    const [discount, setDiscount] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)

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
        setTotalPrice(
            (
                products.reduce((prev, next) => prev + +next.price.replace(' ', ''), 0) - discount
            ).toLocaleString('ru-RU')
        )
    }, [products, discount])

    return (
        <>
            {products.length > 0 ? (
                <>
                    <h1 style={{ color: '#3e3e3e', textAlign: 'center' }}>Корзина</h1>
                    <CartContainer
                        products={products}
                        handleSetProducts={handleSetProducts}
                        changeDiscount={changeDiscount}
                        deleteProducts={deleteFromCart}
                    />

                    <CartTotal products={products} discount={discount} totalPrice={totalPrice} />
                </>
            ) : (
                <Empty
                    title={'Корзина пуста...'}
                    img={'/img/empty_cart.png'}
                    description={'Добавьте что-нибудь в корзину, чтобы это появилось здесь...'}
                />
            )}
        </>
    )
}

export default Cart
