import { useState } from 'react'

import styles from './Favourite.module.css'
import { getFromSessionStorage, setToSessionStorage } from '../../helpers/SessionStorage'
import { ProductsHorizontalList } from '../../components/ProductsHorizontalList/ProductsHorizontalList'
import { Empty } from '../../components/Empty/Empty'

const Favourite = () => {
    const [products, setProducts] = useState(getFromSessionStorage('favouriteObjects') ?? [])
    const handleSetProducts = (obj) => setProducts((prev) => prev.filter((o) => o.id !== obj.id))

    const deleteFromFavourite = (obj) => {
        setToSessionStorage('favouriteObjects', obj)
        handleSetProducts(obj)
    }
    return (
        <>
            {products.length > 0 ? (
                <>
                    <h1 className={styles.favourite__page}>Ваш список желаний: </h1>
                    <div className={styles.container}>
                        <div className={styles.favourited__products}>
                            <ProductsHorizontalList
                                products={products}
                                handleSetProducts={handleSetProducts}
                                deleteProducts={deleteFromFavourite}
                            />
                        </div>
                        <div className={styles.favourite__img__block}>
                            <img
                                className={styles.favourite__img}
                                width={500}
                                src='/img/wishlist.png'
                                alt=''
                            />
                        </div>
                    </div>
                </>
            ) : (
                <Empty
                    title={'Ничего нет...'}
                    description={'Добавьте что-нибудь в избранное, чтобы это отобразилось здесь...'}
                    img={'/img/dust.png'}
                />
            )}
        </>
    )
}

export default Favourite
