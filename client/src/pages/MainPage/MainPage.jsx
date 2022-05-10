import { CouponCard } from '../../components/CouponCard/CouponCard'
import { GiftCard } from '../../components/GiftCard/GiftCard'

import styles from './MainPage.module.css'

const MainPage = () => {
    return (
        <div className={styles.content__container}>
            <h1>Wear Best Dresses</h1>            
            <p>
                {' — Это интернет магазин, pet проект '}
                <a href='https://github.com/daniilboyarinkov'> BDW </a>.
            </p>

            <p>
                Он был создан с целью практики имеющихся знаний и навыков в области Web-разработки.
            </p>

            <div className={styles.coupon__card__container}>
                <h3>Небольшой купончик для вас: </h3>
                <div className={styles.coupon__card}>
                    <CouponCard />
                </div>
                <p>P.S. Используйте его в коризине</p>
            </div>

            <p>
                Этот проект был сделан при помощи
                <a href='https://ru.wikipedia.org/wiki/React'> JS библиотеки React.</a>
            </p>

            <div className={styles.technologies}>
                <div className={styles.div_ul}>
                    В ходе разработки использовались следующие технологии:
                    <ul>
                        <li>
                            <a href='https://reactjs.org/'>React</a>
                        </li>
                        <li>
                            <a href='https://v5.reactrouter.com/web/guides/quick-start'>
                                React-roter-dom
                            </a>
                        </li>
                        <li>
                            <a href='https://www.npmjs.com/package/react-copy-to-clipboard'>
                                React-copy-to-clickboard
                            </a>
                        </li>
                        <li>
                            <a href='https://expressjs.com/'>Express</a>
                            <ul>
                                <li>
                                    (для поднятия сервера с необходимыми данными о товарах и
                                    раздачей статики)
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href='https://pypi.org/project/beautifulsoup4/'>Python Scraping</a>
                            <ul>
                                <li>(для заполнения сервера правдивой информацией о товарах)</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>

            <div className={styles.additional__info}>
                <p>
                    Время выполнения проекта: <span>1 неделя.</span>
                </p>
                <div className={styles.div_ul}>
                    Над проектом работали:
                    <ul>
                        <li>
                            <a href='https://github.com/daniilboyarinkov'>Бояринков Даниил</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className={styles.gift__card}>
                <h2>Вам подарочная карта за прочтение! </h2>
                <GiftCard />
                <p>P.S. Используйте её в коризине</p>
            </div>
        </div>
    )
}

export default MainPage
