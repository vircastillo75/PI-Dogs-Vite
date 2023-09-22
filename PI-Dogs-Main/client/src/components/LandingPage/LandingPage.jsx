
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css'; 

function Landing() {
  return (
    <div className={styles.LandingPage}> 
      <div className={styles.container}>
        <h1>"PI Dogs"</h1>
        <h3>This is my individual project for SoyHenry.</h3>
        <div className={styles.space}></div> 
        <Link to="/home">
          <button>ENTER</button>
        </Link>
      </div>
    </div>
  );
}

export default Landing;