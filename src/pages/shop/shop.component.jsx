import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import { selectIsFetching, selectIsCollectionsLoaded } from 'redux/shop/shop.selectors'
import { Switch, Route } from 'react-router-dom';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
// import CollectionPage from '../collection/collection.component';
import CollectionPageContainer from 'pages/collection/collection.container';
import WithSpinner from 'components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
// const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {

    componentDidMount() {
        console.log('componentDidMount fired');
        const { fetchCollectionsStartAsync } = this.props;
        fetchCollectionsStartAsync();
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
                    <Route
                        path={`${match.path}/:collectionId`}
                        component={CollectionPageContainer}
                    />
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
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShopPage);
