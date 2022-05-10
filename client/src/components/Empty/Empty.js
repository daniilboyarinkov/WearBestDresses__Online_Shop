import styles from './Empty.module.css'

export const Empty = ({ title, img, description }) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.description}>{description}</div>
            <div className={styles.img__block}>
                <img className={styles.img} draggable={false} src={img} alt='' />
            </div>
        </div>
    )
}
