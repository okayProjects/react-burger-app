import React from 'react';
import classes from './BuildControl.css';

const buildControl = (props) => (
    <div className={classes.BuildControl}>

        <div className={classes.Label}>{props.label}</div>
        <p className={classes.Price}>{props.priceList}$ / item</p>
        <button className={classes.More} onClick={props.add}>More</button>
        <button className={classes.Less} onClick={props.remove} disabled={props.disabled}>Less</button>
    </div>
)

export default buildControl;