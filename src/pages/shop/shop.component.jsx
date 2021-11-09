import React from 'react';

import { connect } from 'react-redux';
import { updateCollections } from '../../redux/shop/shop.actions';
import { Switch, Route } from 'react-router-dom';
import { convertCollectionSnapshotToMap, getCollections, onSnapshot } from '../../firebase/firebase.utils'

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {

    state = {
        loading: true
    };

    collectionSnapshotListener = null;

    componentDidMount() {
        console.log('componentDidMount fired');
        const { updateCollections } = this.props;
        const collectionsRef = getCollections();
        this.collectionSnapshotListener = onSnapshot(collectionsRef, (collSnapshot) => {
            const collectionsMap = convertCollectionSnapshotToMap(collSnapshot);
            updateCollections(collectionsMap);
            this.setState({ loading: false });
        });
    }

    componentWillUnmount() {
        this.collectionSnapshotListener();
    }

    render() {
        const { match } = this.props;
        const { loading } = this.state;

        return (
            <div className='shop-page' >
                <Switch>
                    <Route exact
                        path={`${match.path}`}
                        render={(props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props} />}
                    />
                    <Route
                        path={`${match.path}/:collectionId`}
                        render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props} />}
                    />
                </Switch>
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => ({
    updateCollections: collections => dispatch(updateCollections(collections))
})


export default connect(
    null,
    mapDispatchToProps
)(ShopPage);
