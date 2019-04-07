import React, { Component } from 'react';
import Aux from '../../hoc/Auxx/Auxx';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

const PRICE_LIST = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}


class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    };

    componentDidMount() {
        this.props.onInItIngredients()
        // axios.get('https://myreactburger-91980.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data })
        //     })
        //     .catch(error => { this.setState({ error: true }) })
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true })
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }

    };


    // BEFORE REDUX
    // purchaseContinueHandler = () => {
    //     const queryParams = []

    //     for (let i in this.state.ingredients) {
    //         queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    //     }

    //     queryParams.push('price=' + this.state.totalPrice)
    //     const queryString = queryParams.join('&')

    //     this.props.history.push({
    //         pathname: '/checkout',
    //         search: '?' + queryString
    //     })
    // }

    // WITH REDUX

    purchaseContinueHandler = () => {
        this.props.onPurchaseInIt();
        this.props.history.push('/checkout');
    }


    purchaseClosingHandler() {
        this.setState({ purchasing: false })
    };

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((sum, el) => { return sum + el }, 0);
        return sum > 0;
    };



    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = { ...this.state.ingredients };
    //     updatedIngredients[type] = updatedCount;

    //     const priceAddition = PRICE_LIST[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;

    //     this.setState(
    //         {
    //             totalPrice: newPrice,
    //             ingredients: updatedIngredients
    //         },
    //         this.updatePurchaseState(updatedIngredients)
    //     )
    // }

    // deductIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount <= 0) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = { ...this.state.ingredients };
    //     updatedIngredients[type] = updatedCount;

    //     const priceDeduct = PRICE_LIST[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduct;

    //     this.setState(
    //         {
    //             totalPrice: newPrice,
    //             ingredients: updatedIngredients
    //         },
    //         this.updatePurchaseState(updatedIngredients)
    //     )
    // }

    render() {

        const disabledInfo = { ...this.props.ings };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.props.error ? <p>INGREDIENTS CANNOT BE LOADED</p> : <Spinner />

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls ingredientAdded={this.props.onAddIngredient}
                        ingredientDeducted={this.props.onRemoveIngredient}
                        disabled={disabledInfo}
                        price={this.props.price.toFixed(2)}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        priceList={PRICE_LIST}
                        isAuth={this.props.isAuthenticated}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                purchaseCancelled={this.purchaseClosingHandler.bind(this)}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.price.toFixed(2)} />
            // if (this.state.loading) {
            //     orderSummary = <Spinner />
            // }
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseClosingHandler.bind(this)}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => {

    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (name) => dispatch(actions.addIngredient(name, PRICE_LIST)),
        onRemoveIngredient: (ingrName) => dispatch(actions.removeIngredient(ingrName, PRICE_LIST)),
        onInItIngredients: () => dispatch(actions.inItIngredients()),
        onPurchaseInIt: () => dispatch(actions.purchaseInIt()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setRedirectAuthPath(path))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));