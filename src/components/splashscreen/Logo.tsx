import styles from '../../styles/logo.module.css';

const Logo = () => {
  return (
    <div>
      <h1 className={styles.welcome}>Welcome to room X</h1>
      <h2 className={styles.instructions}>
        Please choose a username to continue
      </h2>
    </div>
  );
};
export default Logo;
