import React from 'react'
import { addItemStart } from '../../redux/cart/cart.actions'
import { connect } from 'react-redux'
import {
    CollectionItemContainer,
    CollectionImage,
    CollectionFooter,
    FooterNameContainer,
    FooterPriceContainer,
    AddCustomButton
} from './collection-item.styles'



const CollectionItem = ({ item, addItemStart }) => {
    const { name, price, imageUrl } = item;

    return (
        <CollectionItemContainer>
            <CollectionImage className='image' imageUrl={imageUrl} />
            <CollectionFooter>
                <FooterNameContainer>{name}</FooterNameContainer>
                <FooterPriceContainer>{price}</FooterPriceContainer>
            </CollectionFooter>

            <AddCustomButton onClick={() => addItemStart(item)} inverted>ADD TO CART</AddCustomButton>

        </CollectionItemContainer>
    )
}

const mapDispatchToProps = dispatch => ({
    addItemStart: item => dispatch(addItemStart(item))
})


export default connect(
    null,
    mapDispatchToProps
)(CollectionItem);