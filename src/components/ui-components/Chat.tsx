import styles from '@/styles/Chat.module.css';

const Chat = () => {
  return (
    <div className={styles.chatWrapper}>
      <div className={styles.outputBox}>
        <p className={styles.roomName}>Ballmer room</p>

        {/* insert socket code to conditionally render the below block */}
        <div className={styles.chatMessageWrapper}>
          <p className={styles.sentUserMessage}>Userman </p>
          <p className={styles.chatMessage}>
            BRO!!! have you heard the new crazy frog??
          </p>
        </div>
        <div className={styles.chatMessageWrapper}>
          <p className={styles.sentUserMessage}>Userbro </p>
          <p className={styles.chatMessage}>word!! CF is da bomb!!</p>
        </div>
      </div>
      <div className={styles.inputBox}>
        <form>
          <input
            className={styles.inputField}
            placeholder="Type message..."
            required
            type="text"
            name="send-message"
          />
          <input className={styles.submitBtn} type="submit" value="Send" />
        </form>
      </div>
    </div>
  );
};

export default Chat;
