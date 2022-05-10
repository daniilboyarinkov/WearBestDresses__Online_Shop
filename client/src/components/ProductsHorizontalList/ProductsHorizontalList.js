import styles from './ProductsHorizontalList.module.css'

import { CartproductCard } from '../CartProductCard/CartProductCard'

const ProductsHorizontalList = ({ products, deleteProducts }) => (
    <div className={styles.products}>
        {products.map((product, index) => (
            <CartproductCard
                key={product + index}
                product={product}
                index={index}
                deleteProducts={deleteProducts}
            />
        ))}
    </div>
)

export { ProductsHorizontalList }
