import { Link } from 'react-router-dom'

import styles from './CartProductCard.module.css'

const CartproductCard = ({ product, index, deleteProducts }) => (
    <div className={styles.product}>
        <span className={styles.product__id}>{index + 1}.</span>

        <img
            className={styles.product__cross}
            onClick={() => deleteProducts(product)}
            width={42}
            src='/svg/cross.svg'
            alt=''
        />
        <Link to={`/catalog/product/${product.id}`}>
            <img
                className={styles.product__img}
                width={150}
                height={200}
                src={`${product.img ?? product.images[0]}`}
                alt='Product'
                draggable='false'
            />
        </Link>
        <div className={styles.product__info}>
            <div className={styles.product__name}>{product.name}</div>
            <div className={styles.product__price}>
                <b>{product.price} ₽</b>
            </div>
        </div>
    </div>
)

export { CartproductCard }
