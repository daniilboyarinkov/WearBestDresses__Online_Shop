import { Link, useLocation } from 'react-router-dom'

import styles from './Header.module.css'

export default function Header() {
    const { pathname } = useLocation()
    return (
        <header>
            <div className={styles.header__section}>
                <div className='header__item header__logo'>
                    <Link to={`/WearBestDresses__Online_Shop`}>
                        {window.screen.availWidth > 720 ? (
                            <img
                                className={styles.logo__pic}
                                width='150px'
                                height='70px'
                                src='/WearBestDresses__Online_Shop/icons/logo-large.svg'
                                alt=''
                            />
                        ) : (
                            <img
                                className={styles.logo__pic__small}
                                width='50px'
                                height='70px'
                                src='/WearBestDresses__Online_Shop/icons/logo.svg'
                                alt=''
                            />
                        )}
                    </Link>
                </div>
            </div>
            <div className={styles.header__section}>
                <div className={`${styles.header__item} ${styles.header__button}`}>
                    <Link
                        className={styles.headerLink}
                        to={`/WearBestDresses__Online_Shop/catalog`}>
                        Каталог
                    </Link>
                </div>
                <div className={`${styles.header__item} ${styles.header__button}`}>
                    <Link to={`/WearBestDresses__Online_Shop/favourite`}>
                        <img
                            width={42}
                            src={
                                pathname === '/WearBestDresses__Online_Shop/favourite'
                                    ? '/WearBestDresses__Online_Shop/svg/like_done_gray.svg'
                                    : '/WearBestDresses__Online_Shop/svg/like_grey.svg'
                            }
                            alt=''
                        />
                    </Link>
                </div>
                <div className={`${styles.header__item} ${styles.header__button}`}>
                    <Link to={`/WearBestDresses__Online_Shop/cart`}>
                        <img
                            className='cart'
                            width='42px'
                            height='42px'
                            src={
                                pathname === '/WearBestDresses__Online_Shop/cart'
                                    ? '/WearBestDresses__Online_Shop/svg/cart_white.svg'
                                    : '/WearBestDresses__Online_Shop/svg/cart.svg'
                            }
                            alt=''
                        />
                    </Link>
                </div>
            </div>
        </header>
    )
}
