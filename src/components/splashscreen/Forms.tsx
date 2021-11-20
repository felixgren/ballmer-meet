//@ts-nocheck
import React, { useRef, useEffect } from 'react';
import styles from '../../styles/Forms.module.css';

const Forms = () => {
  const sectionRef = useRef(null);
  useEffect(() => {}, [sectionRef]);

  const handleClick = (index) => {
    if (sectionRef.current) {
      Object.values(sectionRef.current.children).map((item) => {
        item.style.display = 'none';
      });
      sectionRef.current.children[index].style.display = 'flex';
    }
  };

  return (
    <group ref={sectionRef}>
      <div className={styles.selectCreateOrJoin}>
        <h1 className={styles.welcome}>Welcome to [Cool App]</h1>
        <h2 className={styles.instructions}>
          Would you like to create a new call, or join an existing one?
        </h2>
        <input
          className={styles.submitButtonCreateRoom}
          type="submit"
          value="Create Call"
          onClick={(e) => handleClick(1)}
        />
        <input
          className={styles.submitButtonCreateRoom}
          type="submit"
          value="Join Call"
          onClick={(e) => handleClick(4)}
        />
      </div>

      <form className={styles.formContainerCreateRoom}>
        <h1 className={styles.welcome}>Welcome to [Cool App]</h1>
        <h2 className={styles.instructions}>
          To create a call please choose a username and a number of voice
          channels.
        </h2>
        <label>
          <h3 className={styles.formLabel}> Username</h3>
          <input
            className={styles.inputField}
            placeholder="Enter username"
            required
            type="text"
            name="name"
          />
        </label>

        <label>
          <h3 className={styles.formLabel}> Number of channels</h3>
          <select
            required
            className={styles.selectDropdown}
            name="rooms"
            id="rooms"
          >
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="6">6</option>
          </select>
        </label>

        <input
          className={styles.submitButtonCreateRoom}
          type="submit"
          value="Create call"
          onClick={(e) => handleClick(2)}
        />
      </form>

      <div className={styles.displayInviteLink}>
        <h1 className={styles.generatedLink}>Here is your link, bitch</h1>
        <h2 className={styles.printLink}>THIS IS THE URL</h2>
        {/* Här ska man skickas direkt till spelet */}
        <input
          className={styles.submitButtonCreateRoom}
          type="submit"
          value="Enter Call"
        />
      </div>

      <form className={styles.formContainerInvited}>
        <h1 className={styles.welcome}>Welcome to call (call id)</h1>
        <h2 className={styles.instructions}>
          Please choose a username to join call
        </h2>
        <label>
          <input
            className={styles.inputField}
            placeholder="Enter username"
            required
            type="text"
            name="name"
          />
        </label>
        {/* Här ska man skickas direkt till spelet */}
        <input
          className={styles.submitButtonInvited}
          type="submit"
          value="Join call"
        />
      </form>

      <form className={styles.formContainerEnterUrl}>
        <h2 className={styles.instructions}>
          Enter an URL to join an existing call
        </h2>
        <label>
          <input
            className={styles.inputField}
            placeholder="Enter URL"
            required
            type="text"
            name="name"
          />
        </label>
        {/* Här ska man skickas direkt till spelet */}
        <input
          className={styles.submitButtonInvited}
          type="submit"
          value="Join call"
          onClick={(e) => handleClick(3)}
        />
      </form>
    </group>
  );
};

export default Forms;
