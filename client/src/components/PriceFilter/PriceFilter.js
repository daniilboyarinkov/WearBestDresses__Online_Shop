import styles from './PriceFilter.module.css'

export const PriceFilter = ({
    filterByPriceUp,
    filterByPriceDown,
    isFilteredByPriceUp,
    isFilteredByPriceDown,
}) => (
    <div className={styles.container}>
        Фильтрация по цене
        <img
            draggable={false}
            onClick={filterByPriceUp}
            className={
                isFilteredByPriceUp ? `${styles.arrow} ${styles.arrow__active}` : styles.arrow
            }
            width={20}
            src='/WearBestDresses__Online_Shop/svg/arrow_up.svg'
            alt=''
        />
        <img
            draggable={false}
            onClick={filterByPriceDown}
            className={
                isFilteredByPriceDown ? `${styles.arrow} ${styles.arrow__active}` : styles.arrow
            }
            width={20}
            src='/WearBestDresses__Online_Shop/svg/arrow_down.svg'
            alt=''
        />
    </div>
)
