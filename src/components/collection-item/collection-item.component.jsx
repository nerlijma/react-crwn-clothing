import React from 'react'
import { addItem } from '../../redux/cart/cart.actions'
import { connect } from 'react-redux'
import {
    CollectionItemContainer,
    CollectionImage,
    CollectionFooter,
    FooterNameContainer,
    FooterPriceContainer,
    AddCustomButton
} from './collection-item.styles'



const CollectionItem = ({ item, addItem }) => {
    const { name, price, imageUrl } = item;

    return (
        <CollectionItemContainer>
            <CollectionImage className='image' imageUrl={imageUrl} />
            <CollectionFooter>
                <FooterNameContainer>{name}</FooterNameContainer>
                <FooterPriceContainer>{price}</FooterPriceContainer>
            </CollectionFooter>

            <AddCustomButton onClick={() => addItem(item)} inverted>ADD TO CART</AddCustomButton>

        </CollectionItemContainer>
    )
}

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
})


export default connect(
    null,
    mapDispatchToProps
)(CollectionItem);