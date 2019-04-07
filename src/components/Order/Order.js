import React from 'react';
import classes from './Order.css';

const order = (props) => {
    // w Burger.js jest logika transformująca object w tablicę. Można wykorzystać. Tu jest alternatywa.

    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }


    const ingredientsOutput = ingredients.map(ing => {
        return <span style={{ textTransform: 'capitalize', display: 'inline-block', margin: '0 8px', border: '1px solid #ccc', padding: '5px', color: '#fff', backgroundColor: '#000' }}
            key={ing.name}>{ing.name} {ing.amount}</span>
    })

    return (
        <div className={classes.Order}>
            {ingredientsOutput}
            {/* <p>Ingredients: {props.ingredients}</p> */}
            <p style={{ backgroundColor: "#000", color: '#fff', width: '7rem', textAlign: 'center', padding: '5px 0', border: '1px solid #ccc', fontSize: '1em' }}>Price: {Number.parseFloat(props.price).toFixed(2)}</p>
            {/* props.price jest stringiem. Zamieniam go na number albo parsujśc jak wyżej, albo dodając + w chwili przekazania  propsów, czyli w Orders.js */}

        </div>
    );
}


export default order;