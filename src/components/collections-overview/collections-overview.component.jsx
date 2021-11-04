import React from 'react';
import CollectionPreview from '../../components/collection-preview/collection-preview.component';
import { selectCollections } from '../../redux/shop/shop.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './collections-overview.styles.scss'

const CollectionsOverview = ({ collections }) => {
    return (
        <div className='collections-overview'>
            <div>Collections</div>
            {
                Object.keys(collections).map((key) => {
                    const item = collections[key];
                    return (
                        <CollectionPreview key={item.id} {...item} />
                    )
                })
            }
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    collections: selectCollections
})

export default connect(
    mapStateToProps,
    null
)(CollectionsOverview);


