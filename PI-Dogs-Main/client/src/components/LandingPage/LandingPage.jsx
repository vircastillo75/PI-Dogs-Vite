import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css'; 

function Landing() {
  return (
    <div className={styles.LandingPage}> 
      <div className={styles.container}>
        <h1>"PI Dogs"</h1>
        <div className={styles.space}></div> 
        <Link to="/home">
          <button>HOME</button>
        </Link>
      </div>
    </div>
  );
}

export default Landing;