import { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import styles from './GiftCard.module.css'

export const GiftCard = () => {
    const [codeCopied, setCodeCopied] = useState(false)
    return (
        <div className={styles.gift__card}>
            <div className={styles.front__gift__card}>
                <img style={{ objectFit: 'cover' }} src='/img/gift_card_front.png' alt='' />
            </div>
            <div className={styles.back__gift__card}>
                <img style={{ objectFit: 'cover' }} src='/img/gift_card_back.png' alt='' />
                <CopyToClipboard text='GIFT1000' onCopy={() => setCodeCopied(true)}>
                    <div className={styles.gift__card__code}>GIFT1000</div>
                </CopyToClipboard>
                {codeCopied && <h1>Copied!</h1>}
            </div>
        </div>
    )
}
