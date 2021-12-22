import React from 'react';
import classes from '../loading/index.module.css';

const Loading: React.FC = () => {
  return (
    <div className={classes.box}>
      <div className={classes.container}>
        <div className={classes.ring}></div>
        <div className={classes.ring}></div>
        <div className={classes.ring}></div>
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
