import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Socket.module.css';
import io from 'socket.io-client';

const Socket: NextPage = () => {
  console.log('Socket Time...');
  const socket = io('http://localhost:5000');

  socket &&
    socket.on('connect', () => {
      console.log(`Socket connection! ID: ${socket.id}`);
    });

  return (
    <div className={styles.container}>
      <Head>
        <title>node server testing</title>
        <meta
          name="description"
          content="Site to test connection to node server; sockets, WebRTC"
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Node Server Testing</h1>
        <p className={styles.description}>output will go here </p>
        <p className={styles.description}>
          <code className={styles.code}>sample sample sample</code>
        </p>
        {/* <form className={styles.form}>
          <input className={styles.input} type="text" />
          <button className={styles.button} type="submit">
            Submit
          </button>
        </form> */}
      </main>
    </div>
  );
};

export default Socket;
