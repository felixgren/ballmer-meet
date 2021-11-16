import React from 'react';
import styles from '../../styles/forms.module.css';

const Forms = () => {
  return (
    <form className={styles.formContainer}>
      <label>
        <input
          className={styles.inputField}
          placeholder="Enter username"
          required
          type="text"
          name="name"
        />
      </label>
      <input className={styles.submitButton} type="submit" value="Submit" />
    </form>
  );
};

export default Forms;
