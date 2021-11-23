//@ts-nocheck
import styles from '@/styles/Chat.module.css';

const Chat = () => {
  return (
    <div className={styles.chatWrapper}>
      <div className={styles.outputBox}></div>
      <div className={styles.inputBox}>
        <form>
          <input
            className={styles.inputField}
            placeholder="send message"
            required
            type="text"
            name="send-message"
          />
          <input className={styles.submitBtn} type="submit" value="send" />
        </form>
      </div>
    </div>
  );
};

export default Chat;
