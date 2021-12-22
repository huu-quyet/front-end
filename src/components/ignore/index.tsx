import { makeStyles } from '@mui/styles';
import React from 'react';
import img from '../../img/comming-soon.png';

const style = makeStyles({
  img: {
    width: '30rem',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
  },
});

const Coming: React.FC = () => {
  const classes = style();
  return <img className={classes.img} src={img}></img>;
};

export default Coming;
