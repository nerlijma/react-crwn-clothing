import React from 'react';
import CollectionPreview from '../../components/collection-preview/collection-preview.component';
import { selectCollectionsAsArray } from '../../redux/shop/shop.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './collections-overview.styles.scss'

const CollectionsOverview = ({ collections }) => {
    return (
        <div className='collections-overview'>
            <div>Collections</div>
            {
                collections.map(({ id, ...otherCollectionProps }) =>
                    <CollectionPreview key={id} {...otherCollectionProps} />
                )

            }
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsAsArray
})

export default connect(
    mapStateToProps,
    null
)(CollectionsOverview);


