

import React from 'react';
import styles from './About.module.css';

function About() {
  return (
    <div className={styles.box}>
      <div className={styles.container}>
        <h1 className={styles.tittle}>About me</h1>
        <div className={styles.content}>
          <div className={styles.containerText}>
            <h2 className={styles.subtittle}>My name is Maria Virginia Castillo</h2>
            <p className={styles.description}>
              I have a degree in International Relations and I am a lawyer. I am finishing the Full Stack Developer course at Soy Henry; This is my first personal project.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
