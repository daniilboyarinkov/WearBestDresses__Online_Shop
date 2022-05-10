import { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import styles from './CouponCard.module.css'

export const CouponCard = () => {
    const [codeCopied, setCodeCopied] = useState(false)
    return (
        <div className={styles.coupon__card}>
            <div className={styles.coupon__front}>
                <img width={350} src='/img/coupon.png' alt='' />
            </div>
            <div className={styles.coupon__back}>
                <h3>You are lucky to have a coupon card.</h3>
                <h3>Use it when you pay for your purchase.</h3>
                <h2>
                    Coupon code:
                    <CopyToClipboard text='TEST100' onCopy={() => setCodeCopied(true)}>
                        <span className={styles.coupon__code}>TEST100</span>
                    </CopyToClipboard>
                </h2>
                {codeCopied && <h1>Copied!</h1>}
            </div>
        </div>
    )
}
