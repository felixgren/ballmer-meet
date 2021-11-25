import styles from '@/styles/Chat.module.css';

const Chat = () => {
  return (
    <div className={styles.chatWrapper}>
      <div className={styles.outputBox}>
        {/* insert socket code to conditionally render the below block */}
        <div className={styles.chatMessageWrapper}>
          <p className={styles.sentUserMessage}>User: </p>
          <p className={styles.chatMessage}>crazy frog is amazing</p>
        </div>
        <div className={styles.chatMessageWrapper}>
          <p className={styles.sentUserMessage}>User: </p>
          <p className={styles.chatMessage}>
            i know bro, the new album is soooo good!! =))
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
