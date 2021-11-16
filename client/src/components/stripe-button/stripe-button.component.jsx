import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import './stripe-button.styles.scss';


const StripeButton = ({ price }) => {
    const priceForStripe = price * 100;
    const pusheableKey = 'pk_test_51JsCzQK9ynoDN394dQOZUJ5FP9Uwq5OeZFXTCWytheU6GZSPTw3tDy43zCCSlhPwuipPQKov2u0I462sAP0pFJpN008mMq0jlM';

    const onToken = (token) => {
        console.log('new token: 2', token);
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then(response => {
            alert('payment successful');
        }).catch(error => {
            console.log('payment error', JSON.parse(error));
        });
    }

    return (
        <StripeCheckout
            label='Pay Now'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/Cuz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={pusheableKey}

        />
    )
}

export default StripeButton;;
