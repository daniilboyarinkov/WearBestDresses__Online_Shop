import { useState, useEffect } from 'react'
import styles from './ProductCard.module.css'

import { setToSessionStorage } from '../../helpers/SessionStorage'
import { Link } from 'react-router-dom'

export default function ProductCard(props) {
    const { id, name, brand, price, img, isAddedToCart, isAddedToFavourite } = props

    const [addedToCart, setAddedToCart] = useState(isAddedToCart)
    const [addedToFavourite, setAddedToFavourite] = useState(isAddedToFavourite)
    const changeAddedToCart = () => {
        setAddedToCart(!addedToCart)
        setToSessionStorage('cartObjects', props)
    }
    const changeAddedToFavourite = () => {
        setAddedToFavourite(!addedToFavourite)
        setToSessionStorage('favouriteObjects', props)
    }

    useEffect(() => setAddedToCart(isAddedToCart), [isAddedToCart])

    useEffect(() => setAddedToFavourite(isAddedToFavourite), [isAddedToFavourite])

    return (
        <div className={styles.product__card}>
            <img
                onClick={changeAddedToFavourite}
                className={styles.favourite}
                width={32}
                src={
                    addedToFavourite
                        ? '/WearBestDresses__Online_Shop/svg/like_done.svg'
                        : '/WearBestDresses__Online_Shop/svg/like_undone.svg'
                }
                alt=''
            />
            <img
                onClick={changeAddedToCart}
                className={styles.add__tocart}
                width={32}
                src={
                    addedToCart
                        ? '/WearBestDresses__Online_Shop/svg/check.svg'
                        : '/WearBestDresses__Online_Shop/svg/add.svg'
                }
                alt=''
            />

            <Link to={`/WearBestDresses__Online_Shop/catalog/product/${id}`}>
                <img className={styles.product__img} draggable='false' src={`${img}`} alt='' />
            </Link>
            <div className='info'>
                <div className={styles.product__price}>{price} ₽</div>
                <div className={styles.product__name}>{name}</div>
                <div className={styles.product__brand}>{brand}</div>
            </div>
        </div>
    )
}
