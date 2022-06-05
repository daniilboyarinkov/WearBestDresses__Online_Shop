import { useParams } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'

import { setToSessionStorage, checkProductInSessionStorage } from '../../helpers/SessionStorage'
import { productSizes } from '../../catalog/productSizes'

import styles from './ProductPage.module.css'

const Productpage = () => {
    const { id } = useParams()
    const [product, setProduct] = useState({})
    const [activeImage, setActiveImage] = useState('')
    const [moreInfoText, setMoreInfoText] = useState('')
    const [addedToCart, setAddedToCart] = useState(false)
    const [addedToFavourite, setAddedToFavourite] = useState(false)

    const mainContnent = useRef()

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
        setTimeout(() => window.scrollTo(0, mainContnent.current.offsetTop - 10), 10)

        const catalog = require('../../catalog/catalog')
        const pr = catalog.default.all.find((p) => +p.id === +id)

        setProduct(pr)
        setActiveImage(pr.images[0])
        setAddedToCart(checkProductInSessionStorage('cartObjects', pr))
        setAddedToFavourite(checkProductInSessionStorage('favouriteObjects', pr))
        setMoreInfoText(pr.description)
    }, [id])

    const [chosenSize, setChosenSize] = useState(0)
    const [isChooseSizeOpen, setIsChooseSizeOpen] = useState(false)
    const [isSizeInfoOpen, setIsSizeInfoOpen] = useState(false)

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
                <div className={styles.active__image__preview__container} ref={mainContnent}>
                    <img className={styles.active__image__preview} src={activeImage} alt='' />
                    <img
                        onClick={() => {
                            setAddedToFavourite((prev) => !prev)
                            setToSessionStorage('favouriteObjects', product)
                        }}
                        className={styles.favourite}
                        width={64}
                        src={
                            addedToFavourite
                                ? '/WearBestDresses__Online_Shop/svg/like_done.svg'
                                : '/WearBestDresses__Online_Shop/svg/like_undone.svg'
                        }
                        alt=''
                    />
                    <div className={styles.image__navigation}>
                        <img
                            onClick={prevImage}
                            className={styles.prev}
                            width={32}
                            src='/WearBestDresses__Online_Shop/svg/next.svg'
                            alt='prev'
                        />
                        <img
                            onClick={nextImage}
                            className={styles.next}
                            width={32}
                            src='/WearBestDresses__Online_Shop/svg/next.svg'
                            alt='next'
                        />
                    </div>
                </div>
                <div className={styles.product__info}>
                    <div className={styles.product__name}>{product.name}</div>
                    <div className={styles.product__articul}>{product['venor code']}</div>
                    <div className={styles.product__price}>{product.price} ₽</div>

                    <hr />

                    <div className={styles.choose__size}>
                        <div
                            className={styles.choose__size__main}
                            onClick={() => setIsChooseSizeOpen((prev) => !prev)}>
                            Выберите размер
                        </div>
                        <div
                            className={
                                isChooseSizeOpen ? styles.choose__size__popup : styles.closed
                            }>
                            {productSizes.map((size) => (
                                <div
                                    className={styles.choose__size__popup__item}
                                    key={size.id}
                                    onClick={() => setChosenSize(size.id)}>
                                    {size.int}
                                    {size.id === chosenSize && (
                                        <img
                                            className={styles.choose__size__popup__item__check}
                                            width={18}
                                            height={18}
                                            src='/WearBestDresses__Online_Shop/svg/check.svg'
                                            alt=''
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div
                        className={styles.open__size__info}
                        onClick={() => setIsSizeInfoOpen(true)}>
                        Как выбрать размер?
                    </div>
                    <div className={isSizeInfoOpen ? styles.size__info : styles.closed}>
                        <div className={styles.dark__screen} />
                        <div className={styles.size__info__video}>
                            <iframe
                                src='https://video.lmcdn.ru/videos/48322_12Ml5gMNq5zHMl'
                                allowFullScreen={true}
                                width={376}
                                height={212}
                                frameBorder={0}
                            />
                            <div className={styles.size__info__description}>
                                <h2>Как определить размер?</h2>
                                <div>
                                    <p>
                                        Сантиметровая лента должна плотно прилегать к телу, но не
                                        перетягивать его. Измерьте обхват груди по наиболее
                                        выступающим точкам, пропустив ленту под подмышечными
                                        впадинами. Обхват талии измеряется по самой узкой части
                                        тела, проходя через самую выступающую точку живота. Измерьте
                                        обхват бедер по наиболее выступающим точкам ягодиц.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.size__table}>
                            <img
                                onClick={() => setIsSizeInfoOpen(false)}
                                className={styles.cross}
                                width={48}
                                src='/WearBestDresses__Online_Shop/svg/cross.svg'
                                alt='X'
                            />
                            <h2>Женская одежда</h2>
                            <div className={styles.row}>
                                <div>RUS</div>
                                <div>INT</div>
                                <div>
                                    Обхват груди
                                    <div className={styles.styles__units}>см</div>
                                </div>
                                <div>
                                    Обхват талии
                                    <div className={styles.styles__units}>см</div>
                                </div>
                                <div>
                                    Обхват бедер
                                    <div className={styles.styles__units}>см</div>
                                </div>
                            </div>
                            {productSizes.map((size) => (
                                <div className={styles.row} key={size.id}>
                                    <div>{size.rus}</div>
                                    <div>
                                        <b>{size.int}</b>
                                    </div>
                                    <div>{size.chest}</div>
                                    <div>{size.waist}</div>
                                    <div>{size.hips}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <hr />
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
                                        src='/WearBestDresses__Online_Shop/svg/check.svg'
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
                                    `Доставка производится по Москве, Московской области, Тюменской области и Красноярском крае. Доставка производится "до двери" в удобные для заказчика день и время. Доставка занимает от 7 до 20 дней со дня оформления заказа. Оплата производится по карте онлайн.`
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
