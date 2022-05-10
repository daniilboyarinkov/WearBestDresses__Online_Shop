import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import styles from './ProductPage.module.css'
import { setToSessionStorage, checkProductInSessionStorage } from '../../helpers/SessionStorage'

const Productpage = () => {
    const { id } = useParams()
    const [product, setProduct] = useState({})
    const [activeImage, setActiveImage] = useState('')
    const [moreInfoText, setMoreInfoText] = useState('')
    const [addedToCart, setAddedToCart] = useState(false)
    const [addedToFavourite, setAddedToFavourite] = useState(false)

    const nextImage = () => {
        const prevIndex = product?.images.indexOf(activeImage)
        const currIndex = (prevIndex + 1) % product?.images.length
        setActiveImage(product?.images[currIndex])
    }

    const prevImage = () => {
        const prevIndex = product?.images.indexOf(activeImage)
        const currIndex = prevIndex - 1 < 0 ? product?.images.length - prevIndex - 1 : prevIndex - 1
        setActiveImage(product?.images[currIndex])
    }

    useEffect(() => {
        const doSth = async () => {
            const catalog = require('../../catalog/catalog')
            const pr = catalog.all.find((p) => +p.id === +id)

            setProduct(pr)
            setActiveImage(pr.images[0])
            setAddedToCart(checkProductInSessionStorage('cartObjects', pr))
            setAddedToFavourite(checkProductInSessionStorage('favouriteObjects', pr))
            setMoreInfoText(pr.description)
        }
        doSth()
    }, [id])

    return (
        <div className={styles.product__page}>
            <div className={styles.container}>
                <div className={styles.images__preview}>
                    {product.images?.map((img) => (
                        <img
                            onClick={() => setActiveImage(img)}
                            className={
                                img === activeImage
                                    ? `${styles.img__preview} ${styles.img__preview__as__active}`
                                    : styles.img__preview
                            }
                            key={img}
                            width={100}
                            src={`${img}`}
                            alt=''
                        />
                    ))}
                </div>
                <div className={styles.active__image__preview__container}>
                    <img
                        className={styles.active__image__preview}
                        src={activeImage}
                        width='500px'
                        alt=''
                    />
                    {addedToFavourite ? (
                        <img
                            onClick={() => {
                                setAddedToFavourite((prev) => !prev)
                                setToSessionStorage('favouriteObjects', product)
                            }}
                            className={styles.favourite}
                            width={64}
                            src='/svg/like_done.svg'
                            alt=''
                        />
                    ) : (
                        <img
                            onClick={() => {
                                setAddedToFavourite((prev) => !prev)
                                setToSessionStorage('favouriteObjects', product)
                            }}
                            className={styles.favourite}
                            width={64}
                            src='/svg/like_undone.svg'
                            alt=''
                        />
                    )}
                    <div className={styles.image__navigation}>
                        <img
                            onClick={prevImage}
                            className={styles.prev}
                            width={32}
                            src='/svg/next.svg'
                            alt='prev'
                        />
                        <img
                            onClick={nextImage}
                            className={styles.next}
                            width={32}
                            src='/svg/next.svg'
                            alt='next'
                        />
                    </div>
                </div>
                <div className={styles.product__info}>
                    <div className={styles.product__name}>{product.name}</div>
                    <div className={styles.product__articul}>{product['venor code']}</div>
                    <div className={styles.product__price}>{product.price} ₽</div>
                    <div
                        onClick={() => setToSessionStorage('cartObjects', product)}
                        className={styles.add__to__cart}>
                        <button
                            onClick={() => setAddedToCart((prev) => !prev)}
                            className={
                                addedToCart
                                    ? `${styles.btn__added__to__cart} ${styles.btn__add__to__cart}`
                                    : styles.btn__add__to__cart
                            }>
                            {addedToCart ? (
                                <>
                                    {'Добавлено в корзину'}
                                    <img
                                        className={styles.added__to__cart}
                                        src='/svg/check.svg'
                                        alt=''
                                    />
                                </>
                            ) : (
                                'Добавить в корзину'
                            )}
                        </button>
                    </div>
                    <div className={styles.more__info}>
                        <div
                            onClick={() => setMoreInfoText(product.description)}
                            className={styles.info__title}>
                            Описание
                        </div>
                        <div
                            onClick={() =>
                                setMoreInfoText(
                                    `Доставим что угодно, куда угодно в течение меясца, вы только покупайте. Пожалуйста.`
                                )
                            }
                            className={styles.info__title}>
                            Доставка и оплата
                        </div>
                    </div>
                    <div className={styles.more__info__text}>
                        <div className={styles.product_description__block}>{moreInfoText}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Productpage
