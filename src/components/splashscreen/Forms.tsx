import React, { useRef, useState } from 'react';
import styles from '../../styles/Forms.module.css';

const handleClick = () => {};

const Forms = () => {
  return (
    <group>
      <div className={styles.selectCreateOrJoin}>
        <h1 className={styles.welcome}>Welcome to [Cool App]</h1>
        <h2 className={styles.instructions}>
          Would you like to create a new call, or join an existing one?
        </h2>
        <input
          className={styles.submitButtonCreateRoom}
          type="submit"
          value="Create Call"
        />
        <input
          className={styles.submitButtonCreateRoom}
          type="submit"
          value="Join Call"
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
          <h3 className={styles.formLabel}> Number of rooms</h3>
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
        />
      </form>

      <div className={styles.displayInviteLink}>
        <h1 className={styles.generatedLink}>Here is your link, bitch</h1>
        <h2 className={styles.printLink}>THIS IS THE URL</h2>
        <input
          className={styles.submitButtonCreateRoom}
          type="submit"
          value="Join Call"
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
        <input
          className={styles.submitButtonInvited}
          type="submit"
          value="Join call"
        />
      </form>
    </group>
  );
};

export default Forms;