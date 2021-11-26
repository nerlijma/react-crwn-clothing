import React, { lazy, Suspense } from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
import { selectIsFetching, selectIsCollectionsLoaded } from 'redux/shop/shop.selectors'
import { Switch, Route } from 'react-router-dom';
import Spinner from 'components/spinner/spinner.component';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
// import CollectionPage from '../collection/collection.component';
// import CollectionPageContainer from 'pages/collection/collection.container';
import WithSpinner from 'components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
// const CollectionPageWithSpinner = WithSpinner(CollectionPage);


const CollectionPageContainer = lazy(() => import('pages/collection/collection.container'));

class ShopPage extends React.Component {

    componentDidMount() {
        console.log('componentDidMount fired');
        const { fetchCollectionsStart } = this.props;

        // Para thunk
        // fetchCollectionsStartAsync();

        // Para saga
        fetchCollectionsStart();
    }

    componentWillUnmount() {
        console.log('componentWillUnmount fired');
    }

    render() {
        console.log('render shop');
        // Se podia usar tanto isFetching como isCollectionsLoaded 
        const { match, isCollectionsLoaded } = this.props;

        return (
            <div className='shop-page' >
                <Switch>
                    <Route exact
                        path={`${match.path}`}
                        render={(props) => <CollectionsOverviewWithSpinner isLoading={!isCollectionsLoaded} {...props} />}
                    />
                    <Suspense fallback={<Spinner />}>
                        <Route
                            path={`${match.path}/:collectionId`}
                            component={CollectionPageContainer}
                        />
                    </Suspense>
                </Switch>
            </div>
        )
    }
}



const mapStateToProps = createStructuredSelector({
    isFetching: selectIsFetching,
    isCollectionsLoaded: selectIsCollectionsLoaded
});

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShopPage);
