import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './ProductsSpace.module.css'

import ProductCard from '../ProductCard/ProductCard'
import { checkProductInSessionStorage } from '../../helpers/SessionStorage'
import { Pagination } from '../../components/Pagination/Pagination'
import { Search } from '../Search/Search'
import { PriceFilter } from '../PriceFilter/PriceFilter'
import { Empty } from '../Empty/Empty'

const ProductsSpace = ({ productsPerPage }) => {
    const { category = 'all', page = '1' } = useParams()
    const [products, setProducts] = useState([])
    const [productsOnPage, setProductsOnPage] = useState([])
    const [filterQuery, setFilterQuery] = useState('')
    const [isFilteredByPriceUp, setIsFilteredByPriceUp] = useState(false)
    const [isFilteredByPriceDown, setIsFilteredByPriceDown] = useState(false)

    const filterProducts = (query) => setFilterQuery(query)
    const filterByPriceUp = () => {
        setIsFilteredByPriceUp((prev) => !prev)
        setIsFilteredByPriceDown(false)
    }
    const filterByPriceDown = () => {
        setIsFilteredByPriceDown((prev) => !prev)
        setIsFilteredByPriceUp(false)
    }
    const isAddedToCart = (obj) => checkProductInSessionStorage('cartObjects', obj)
    const isAddedToFavourite = (obj) => checkProductInSessionStorage('favouriteObjects', obj)

    useEffect(() => {
        const setNewProducts = async () => {
            const catalog = require('../../catalog/catalog')
            const prs = catalog[`${category}`]
            if (isFilteredByPriceUp)
                prs.sort((a, b) => +a.price.replace(' ', '') - +b.price.replace(' ', ''))
            else if (isFilteredByPriceDown)
                prs.sort((a, b) => +b.price.replace(' ', '') - +a.price.replace(' ', ''))
            await setProducts(
                prs.filter(
                    (pr) =>
                        pr.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
                        pr.brand.toLowerCase().includes(filterQuery.toLowerCase())
                )
            )
            await setProductsOnPage(
                products.slice(+page * productsPerPage - productsPerPage, +page * productsPerPage)
            )
        }
        setNewProducts()
    }, [
        products,
        category,
        page,
        filterQuery,
        isFilteredByPriceUp,
        isFilteredByPriceDown,
        productsPerPage,
    ])

    return (
        <>
            <div>
                <div className={styles.filters__container}>
                    <PriceFilter
                        filterByPriceUp={filterByPriceUp}
                        filterByPriceDown={filterByPriceDown}
                        isFilteredByPriceUp={isFilteredByPriceUp}
                        isFilteredByPriceDown={isFilteredByPriceDown}
                    />
                    <Search filterProducts={filterProducts} />
                </div>
                {products.length > 0 ? (
                    <>
                        <div className={styles.products__space}>
                            {productsOnPage.map((product, index) => {
                                const { id, name, brand, price, images, description } = product
                                return (
                                    <ProductCard
                                        key={product + index}
                                        id={id}
                                        name={name}
                                        brand={brand}
                                        price={price}
                                        img={images[0]}
                                        vendorCode={`${product['vendor code']}`}
                                        description={description}
                                        images={images}
                                        isAddedToCart={() => isAddedToCart(product)}
                                        isAddedToFavourite={() => isAddedToFavourite(product)}
                                    />
                                )
                            })}
                        </div>
                        <Pagination
                            first={1}
                            current={page}
                            last={Math.ceil(products.length / productsPerPage)}
                        />
                    </>
                ) : (
                    <Empty
                        title={'Пусто...'}
                        description={'Товаров нет... Приходите завтра'}
                        img={'/WearBestDresses__Online_Shop/icons/logo-large.svg'}
                    />
                )}
            </div>
        </>
    )
}

export { ProductsSpace }
