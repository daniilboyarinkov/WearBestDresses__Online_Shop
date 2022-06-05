import { useState } from 'react'

import LeftMenu from '../../components/LeftMenu/LeftMenu'
import { ProductsSpace } from '../../components/ProductsSpace/ProductsSpace'

import styles from './Catalog.module.css'

export default function Catalog() {
    const [opened, setOpened] = useState(false)
    const [openedCategory, setOpenedCategory] = useState(true)
    const [productsPerPage, setProductsPerPage] = useState(8)
    return (
        <div className={opened ? styles.container__open : styles.container}>
            <div>
                <img
                    onClick={() => {
                        setOpened((prev) => !prev)
                        setProductsPerPage(6)
                    }}
                    className={opened ? styles.burger__open : styles.burger}
                    width={48}
                    src='/WearBestDresses__Online_Shop/svg/burger.svg'
                    alt='Burger'
                />
                <div className={opened ? styles.popup__open : styles.popup}>
                    <div className={styles.category}>
                        <div onClick={() => setOpenedCategory((prev) => !prev)}>
                            Категории платьев:
                        </div>
                        <img
                            onClick={() => {
                                setOpened((prev) => !prev)
                                setProductsPerPage(8)
                            }}
                            className={styles.back}
                            width={28}
                            height={28}
                            src='/WearBestDresses__Online_Shop/svg/cross.svg'
                            alt='Back'
                        />
                    </div>
                    <div
                        className={
                            opened && openedCategory ? styles.leftMenu__open : styles.leftMenu
                        }>
                        <LeftMenu />
                    </div>
                </div>
            </div>
            <ProductsSpace productsPerPage={productsPerPage} />
        </div>
    )
}
