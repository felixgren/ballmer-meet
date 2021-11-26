import React from 'react';
import styles from '../../styles/Webcams.module.css';

const Webcams = () => {
  const { RTCPeerConnection } = window;
  const peerConnection = new RTCPeerConnection();

  // Activates voice & video, sends video stream to video component
  peerConnection.ontrack = ({ streams: [stream] }) => {
    const remoteVideo = document.getElementById('remote-video');
    if (remoteVideo) {
      remoteVideo.srcObject = stream;
    }
  };

  navigator.mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then((stream) => {
      const localVideo = document.getElementById('local-video');
      if (localVideo) {
        localVideo.srcObject = stream;
      }
      stream
        .getTracks()
        .forEach((track) => peerConnection.addTrack(track, stream));
    });

  return (
    <div className={styles.webcamsWrapper}>
      <div className="video-container">
        <p className={styles.username}>User</p>
        <video autoPlay className={styles.webcams} id="local-video"></video>
        {/* <video autoPlay className={styles.webcams} id="remote-video"></video> */}
      </div>

      <div className="video-container">
        <p className={styles.username}>User joining...</p>
        <video autoPlay className={styles.webcams}></video>
      </div>

      <div className="video-container">
        <p className={styles.username}>User joining...</p>
        <video autoPlay className={styles.webcams}></video>
      </div>
    </div>
  );
};

export default Webcams;
