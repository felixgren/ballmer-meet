//@ts-nocheck
import React, { useRef, useEffect, useState } from 'react';
import styles from '../../styles/Forms.module.css';
import Link from 'next/link';

const Forms = () => {
  const sectionRef = useRef(null);
  useEffect(() => {}, [sectionRef]);

  const handleClick = (e, index) => {
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
        <h1 className={styles.welcome}>Welcome to [Ballmer Meet]</h1>
        <img
          src="https://media4.giphy.com/media/l3q2zbskZp2j8wniE/giphy-downsized-large.gif"
          alt="ballmer meet gif"
        />
        <h2 className={styles.instructions}>
          Would you like to create a new call, or join an existing one?
        </h2>
        <input
          className={styles.submitButtonCreateRoom}
          type="submit"
          value="Create Call"
          onClick={(e) => handleClick(e, 1)}
        />
        <input
          className={styles.submitButtonCreateRoom}
          type="submit"
          value="Join Call"
          onClick={(e) => handleClick(e, 3)}
        />
      </div>

      <form className={styles.formContainerCreateRoom}>
        <h1 className={styles.welcome}>Welcome to [Ballmer Meet]</h1>
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
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
        </label>

        <Link href="/game" passHref={true}>
          <input
            className={styles.submitButtonCreateRoom}
            type="submit"
            value="Create call"
            // onClick={(e) => { handleClick(e, 2);} } // remove for presentation
          />
        </Link>
      </form>

      <div className={styles.displayInviteLink}>
        <h1 className={styles.generatedLink}>Here is your link</h1>
        <h2 className={styles.printLink}>THIS IS THE URL</h2>
        {/* Här ska man skickas direkt till spelet */}
        <Link href="/game" passHref={true}>
          <input
            className={styles.submitButtonCreateRoom}
            type="submit"
            value="Enter Call"
          />
        </Link>
      </div>

      <form className={styles.formContainerInvited}>
        <h1 className={styles.welcome}>Welcome to call</h1>
        <h2 className={styles.instructions}>
          Please choose a username and an invite-link to join call
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
          className={styles.inputField}
          placeholder="Enter URL"
          required
          type="text"
          name="name"
        />
        {/* Här ska man skickas direkt till spelet */}
        <Link href="/game" passHref={true}>
          <input
            className={styles.submitButtonInvited}
            type="submit"
            value="Join call"
          />
        </Link>
      </form>
    </group>
  );
};

export default Forms;
