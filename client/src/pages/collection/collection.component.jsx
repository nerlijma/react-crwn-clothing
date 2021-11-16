import React from 'react';
import './collection.styles.scss';
import { useParams } from 'react-router-dom';
import CollectionItem from '../../components/collection-item/collection-item.component';
import { selectCollection } from '../../redux/shop/shop.selectors';
import { useSelector } from 'react-redux';

const CollectionPage = () => {
    // if (!collection) return null;
    console.log('collection component render');

    const { collectionId } = useParams();

    const collection = useSelector(selectCollection(collectionId));

    const { title, items } = collection;
    return (
        <div className='collection-page'>
            <h2 className='title'>{title}</h2>
            <div className='items'>
                {
                    items.map(item => <CollectionItem key={item.id} item={item} />)
                }
            </div>
        </div>
    );
}

// const mapStateToProps = (state, ownProps) => {
//     const { collectionId } = ownProps.match.params;
//     console.log('collectionId:', collectionId);
//     return ({
//         collection: selectCollection(collectionId)(state)
//     })
// };

export default CollectionPage;
