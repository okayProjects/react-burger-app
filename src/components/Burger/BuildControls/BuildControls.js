import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';


const controls = [
    { label: 'Lettuce', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];


const buildControls = (props) => (

    <div className={classes.BuildControls}>
        <p className={classes.Price}>The current balance due is: <strong>{props.price} $</strong></p>
        {controls.map(ctrl => <BuildControl
            key={ctrl.label}
            label={ctrl.label}
            type={ctrl.type}
            add={() => props.ingredientAdded(ctrl.type)}
            remove={() => props.ingredientDeducted(ctrl.type)}
            disabled={props.disabled[ctrl.type]}
            priceList={props.priceList[ctrl.type]}
        />)}

        <button onClick={props.ordered}
            className={classes.OrderButton}
            disabled={!props.purchasable}
        >{props.isAuth ? 'OREDER NOW' : 'SIGN UP TO ORDER'}
        </button>
    </div>
)

export default buildControls;