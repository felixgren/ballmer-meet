import styles from '@/styles/Chat.module.css';

const Chat = () => {
  return (
    <div className={styles.chatWrapper}>
      <div className={styles.outputBox}>
        {/* insert code to conditionally render the below block */}
        <div className={styles.chatMessageWrapper}>
          <p className={styles.sentUserMessage}>User: </p>
          <p className={styles.chatMessage}>
            This is a placeholder message (bitch)
          </p>
        </div>
        <div className={styles.chatMessageWrapper}>
          <p className={styles.sentUserMessage}>User: </p>
          <p className={styles.chatMessage}>
            Who are you calling bitch, bitch?
          </p>
        </div>
      </div>
      <div className={styles.inputBox}>
        <form>
          <input
            className={styles.inputField}
            placeholder="Send message"
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
