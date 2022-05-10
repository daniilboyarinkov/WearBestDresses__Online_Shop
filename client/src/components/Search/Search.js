import { useEffect, useState } from 'react'
import styles from './Search.module.css'

export const Search = ({ filterProducts }) => {
    const [value, setValue] = useState('')

    useEffect(() => filterProducts(value), [value, filterProducts])

    return (
        <div className={styles.search}>
            <input
                onSubmit={() => filterProducts(value)}
                onChange={(e) => setValue(e.target.value)}
                className={styles.search__input}
                type='text'
                placeholder='Поиск...'
            />
            <img
                onClick={() => filterProducts(value)}
                draggable={false}
                className={styles.search__icon}
                src='/svg/search.svg'
                alt=''
            />
        </div>
    )
}
