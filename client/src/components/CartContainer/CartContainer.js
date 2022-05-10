import styles from './CartContainer.module.css'
import Coupons from '../Coupons/Coupons'
import { ProductsHorizontalList } from '../ProductsHorizontalList/ProductsHorizontalList'

const CartContainer = ({ changeDiscount, products, handleSetProducts, deleteProducts }) => (
    <div className={styles.cart__container}>
        <ProductsHorizontalList
            products={products}
            handleSetProducts={handleSetProducts}
            deleteProducts={deleteProducts}
        />
        <div className={styles.right__side}>
            <Coupons changeDiscount={changeDiscount} />
        </div>
    </div>
)

export { CartContainer }
