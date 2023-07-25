import styles from './text.module.css'

const Text = (props) => {
    return (
        <div className={styles.text}>{props.children}</div>
    )
}

export default Text;