import { Empty } from '../../components/Empty/Empty'

import styles from './NotFoundPage.module.css'

const NotFoundPage = () => (
    <>
        <img className={styles.logo} src='/WearBestDresses__Online_Shop/icons/logo-large.svg' alt='' />
        <Empty
            title={'Кажется такой страницы не существует...'}
            img={'/img/dust.png'}
            description={'Вернитесь лучше на главную. Вероятно там гораздо интереснее...'}
        />
    </>
)

export default NotFoundPage
