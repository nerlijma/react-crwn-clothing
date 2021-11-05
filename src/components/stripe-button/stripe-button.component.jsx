import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import './stripe-button.styles.scss'

const StripeButton = ({ price }) => {
    const priceForStripe = price * 100;
    const pusheableKey = 'pk_test_51JsCzQK9ynoDN394dQOZUJ5FP9Uwq5OeZFXTCWytheU6GZSPTw3tDy43zCCSlhPwuipPQKov2u0I462sAP0pFJpN008mMq0jlM';

    const onToken = (token) => console.log(token);

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

export default StripeButton;