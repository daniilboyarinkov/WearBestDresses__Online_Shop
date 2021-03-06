import { Link, useParams } from 'react-router-dom'

import styles from './Pagination.module.css'

const Pagination = ({ first, current, last }) => {
    const { category = 'all' } = useParams()
    return (
        <div className={styles.pagination__container}>
            {+current > 1 && (
                <Link to={`/catalog/${category}/page/${+current - 1}`}>
                    <img className={styles.previous} width={32} src='/svg/next.svg' alt='' />
                </Link>
            )}

            <Link to={`/catalog/${category}/page/${first}`} style={{ textDecoration: 'none' }}>
                <div className={styles.first}>{first}</div>
            </Link>
            <div className={styles.current}>{current}</div>
            <Link to={`/catalog/${category}/page/${last}`} style={{ textDecoration: 'none' }}>
                <div className={styles.last}>{last}</div>
            </Link>

            {+current < +last && (
                <Link to={`/catalog/${category}/page/${+current + 1}`}>
                    <img className={styles.next} width={32} src='/svg/next.svg' alt='' />
                </Link>
            )}
        </div>
    )
}

export { Pagination }
