import styles from './PopupNote.module.css'

export const PopupNote = ({ success, message, closePopup, btnAction }) => (
    <div id={styles.container}>
        <div id={success ? styles.success_box : styles.error_box}>
            <div onClick={closePopup} className={styles.dot}></div>
            <div onClick={closePopup} className={`${styles.dot} ${styles.two}`}></div>
            <div className={success ? styles.face : styles.face2}>
                <div className={styles.eye}></div>
                <div className={`${styles.eye} ${styles.right}`}></div>
                <div
                    className={
                        success
                            ? `${styles.mouth} ${styles.happy}`
                            : `${styles.mouth} ${styles.sad}`
                    }></div>
            </div>
            <div
                className={
                    success ? `${styles.shadow} ${styles.scale}` : `${styles.shadow} ${styles.move}`
                }></div>
            <div className={styles.message}>
                <h1 className={`${styles.alert} ${styles.h1}`}>{success ? 'Success!' : 'Error'}</h1>
                <p className={styles.p}>{message}</p>
            </div>
            <button className={styles.button_box} onClick={btnAction}>
                <h1
                    className={
                        success ? `${styles.green} ${styles.h1}` : `${styles.red} ${styles.h1}`
                    }>
                    {success ? 'continue' : 'try again'}
                </h1>
            </button>
        </div>
    </div>
)
