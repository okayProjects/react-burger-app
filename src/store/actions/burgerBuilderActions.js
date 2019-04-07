import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingName, priceList) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName,
        priceList
    }
}
export const removeIngredient = (ingName, priceList) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName,
        priceList
    }
}



export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients,
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
    }
}

export const inItIngredients = () => {
    return dispatch => {
        axios.get('https://myreactburger-91980.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data));
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed)
            })
    };
}