import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './LeftMenu.module.css'

export default function LeftMenu() {
    // Вынести бы это в отдельный конфиг...
    const defaultDressTypesRoutes = {
        'Вечерние платья': `evening-dresses`,
        'Джинсовые платья': `denim-dresses`,
        'Кожанные платья': `leather-dresses`,
        'Платья со спущенными плечами': `off-scheduled-dresses`,
        'Платья-майки': `tank-dresses`,
        'Платья-пиджаки': `jacket-dresses`,
        'Платья-рубашки': `shirt-dresses`,
        'Платья-свитеры': `sweater-dresses`,
        'Платья-футболки': `tshirt-dresses`,
        'Платья-футляр': `sheath-dresses`,
        'Повседневные платья': `everyday-dresses`,
    }
    const defaultDressTypes = Object.keys(defaultDressTypesRoutes)
    const [dressTypes] = useState(defaultDressTypes)

    return (
        <div className={styles.left__menu}>
            <div className={styles.dress__type__menu}>
                {dressTypes.map((el) => {
                    const category = defaultDressTypesRoutes[`${el}`]
                    return (
                        <Link
                            to={`/WearBestDresses__Online_Shop/catalog/${category}`}
                            key={`${category}`}
                            className={styles.dress__type}>{`${el}`}</Link>
                    )
                })}
            </div>
        </div>
    )
}
