import React from 'react'
import { useState } from 'react'

import styles from './BonusesSection.module.css'

const BonusesSection = ({ children, title }) => {
    const [sectionOpen, setSectionOpen] = useState(false)

    const changeSectionOpen = () => setSectionOpen((prev) => !prev)

    return (
        <div className={styles.bonuses__section}>
            <div className={styles.coupons} onClick={changeSectionOpen}>
                {title}
                <img
                    src='/svg/next.svg'
                    alt=''
                    width={24}
                    className={
                        sectionOpen
                            ? `${styles.bonuses__next} ${styles.bonuses__next__open}`
                            : styles.bonuses__next
                    }
                />
            </div>
            <div className={sectionOpen ? styles.coupon__panel__open : styles.coupon__panel}>
                {children}
            </div>
        </div>
    )
}

export { BonusesSection }
