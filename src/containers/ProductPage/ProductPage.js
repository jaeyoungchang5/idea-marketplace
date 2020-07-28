import React from 'react';
import { StaticPage, TopbarContainer } from '../../containers';

import {
    LayoutSingleColumn,
    LayoutWrapperTopbar,
    LayoutWrapperMain,
    LayoutWrapperFooter,
    Footer,
    // NamedLink,
    // ExternalLink,
} from '../../components';

// import products from './products';
import Product from './Product';
import css from './ProductPage.css';

/* Sharetribe SDK : connecting to database */
const sharetribeSdk = require('sharetribe-flex-sdk');
const clientId = process.env.REACT_APP_SHARETRIBE_SDK_CLIENT_ID;
var sdk = sharetribeSdk.createInstance({clientId});

class ProductPage extends React.Component {
  constructor(props){
    super(props);
    this.state = { finalArray: []};
  }

  componentDidMount() {
    sdk.ownListings.query({
        include: ['images'],
      }).then(res => {
      let temp = [];
      console.log("Fetched " + res.data.data.length + " listings.");
      res.data.data.forEach(listing => {
        temp.push(listing.attributes);
      })
      console.log(temp);
      this.setState({finalArray: temp});
    });
  }

  render(){
      return (
      <StaticPage
        className={css.root}
        title="Product"
        schema={{
          '@context': 'http://schema.org',
          '@type': 'ProductPage',
          description: 'Feature products',
          name: 'Product page',
        }}
      >
        <LayoutSingleColumn>
          <LayoutWrapperTopbar>
            <TopbarContainer />
          </LayoutWrapperTopbar>
          <LayoutWrapperMain>
              <div className={css.PageTitle}>
                <h1>Our Products</h1>
              </div>
              <div className={css.productWrapper}>
                {this.state.finalArray.map((item,index) => {
                  return (
                    <Product 
                            key={index}
                            productID={index}
                            // productBanner={item.image}
                            productName={item.title}
                            productDescription={item.description}
                            //productImg={item.banner}
                    />
                  )
                })}
              </div>
          </LayoutWrapperMain>
          <LayoutWrapperFooter>
            <Footer />
          </LayoutWrapperFooter>
        </LayoutSingleColumn>
      </StaticPage>
    );
  }
};

export default ProductPage;

// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { compose } from 'redux';
// import { connect } from 'react-redux';
// import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
// import { propTypes } from '../../util/types';
// import { parse } from '../../util/urlHelpers';
// import { isScrollingDisabled } from '../../ducks/UI.duck';
// import {
//   ManageListingCard,
//   Page,
//   PaginationLinks,
//   UserNav,
//   LayoutSingleColumn,
//   LayoutWrapperTopbar,
//   LayoutWrapperMain,
//   LayoutWrapperFooter,
//   Footer,
// } from '../../components';
// import { TopbarContainer } from '../../containers';

// import {
//   closeListing,
//   openListing,
//   getOwnListingsById,
//   queryOwnListings,
// } from '../ManageListingsPage/ManageListingsPage.duck';
// import css from '../ManageListingsPage/ManageListingsPage.css';

// // Pagination page size might need to be dynamic on responsive page layouts
// // Current design has max 3 columns 42 is divisible by 2 and 3
// // So, there's enough cards to fill all columns on full pagination pages
// const RESULT_PAGE_SIZE = 42;

// export class ManageListingsPageComponent extends Component {
//   constructor(props) {
//     super(props);

//     this.state = { listingMenuOpen: null };
//     this.onToggleMenu = this.onToggleMenu.bind(this);
//   }

//   onToggleMenu(listing) {
//     this.setState({ listingMenuOpen: listing });
//   }

//   render() {
//     const {
//       closingListing,
//       closingListingError,
//       listings,
//       onCloseListing,
//       onOpenListing,
//       openingListing,
//       openingListingError,
//       pagination,
//       queryInProgress,
//       queryListingsError,
//       queryParams,
//       scrollingDisabled,
//       intl,
//     } = this.props;

//     const hasPaginationInfo = !!pagination && pagination.totalItems != null;
//     const listingsAreLoaded = !queryInProgress && hasPaginationInfo;

//     const loadingResults = (
//       <h2>
//         <FormattedMessage id="ManageListingsPage.loadingOwnListings" />
//       </h2>
//     );

//     const queryError = (
//       <h2 className={css.error}>
//         <FormattedMessage id="ManageListingsPage.queryError" />
//       </h2>
//     );

//     const noResults =
//       listingsAreLoaded && pagination.totalItems === 0 ? (
//         <h1 className={css.title}>
//           <FormattedMessage id="ManageListingsPage.noResults" />
//         </h1>
//       ) : null;

//     const heading =
//       listingsAreLoaded && pagination.totalItems > 0 ? (
//         <h1 className={css.title}>
//           <FormattedMessage
//             id="ManageListingsPage.youHaveListings"
//             values={{ count: pagination.totalItems }}
//           />
//         </h1>
//       ) : (
//         noResults
//       );

//     const page = queryParams ? queryParams.page : 1;
//     const paginationLinks =
//       listingsAreLoaded && pagination && pagination.totalPages > 1 ? (
//         <PaginationLinks
//           className={css.pagination}
//           pageName="ManageListingsPage"
//           pageSearchParams={{ page }}
//           pagination={pagination}
//         />
//       ) : null;

//     const listingMenuOpen = this.state.listingMenuOpen;
//     const closingErrorListingId = !!closingListingError && closingListingError.listingId;
//     const openingErrorListingId = !!openingListingError && openingListingError.listingId;

//     const title = intl.formatMessage({ id: 'ManageListingsPage.title' });

//     const panelWidth = 62.5;
//     // Render hints for responsive image
//     const renderSizes = [
//       `(max-width: 767px) 100vw`,
//       `(max-width: 1920px) ${panelWidth / 2}vw`,
//       `${panelWidth / 3}vw`,
//     ].join(', ');

//     return (
//       <Page title={title} scrollingDisabled={scrollingDisabled}>
//         <LayoutSingleColumn>
//           <LayoutWrapperTopbar>
//             <TopbarContainer />
//           </LayoutWrapperTopbar>
//           <LayoutWrapperMain>
//             {queryInProgress ? loadingResults : null}
//             {queryListingsError ? queryError : null}
//             <div className={css.listingPanel}>
//               {/* {heading} */}
//               <h1>Products</h1>
//               <div className={css.listingCards}>
//                 {listings.map(l => (
//                   <ManageListingCard
//                     className={css.listingCard}
//                     key={l.id.uuid}
//                     listing={l}
//                     isMenuOpen={!!listingMenuOpen && listingMenuOpen.id.uuid === l.id.uuid}
//                     actionsInProgressListingId={openingListing || closingListing}
//                     onToggleMenu={this.onToggleMenu}
//                     onCloseListing={onCloseListing}
//                     onOpenListing={onOpenListing}
//                     hasOpeningError={openingErrorListingId.uuid === l.id.uuid}
//                     hasClosingError={closingErrorListingId.uuid === l.id.uuid}
//                     renderSizes={renderSizes}
//                   />
//                 ))}
//               </div>
//               {paginationLinks}
//             </div>
//           </LayoutWrapperMain>
//           <LayoutWrapperFooter>
//             <Footer />
//           </LayoutWrapperFooter>
//         </LayoutSingleColumn>
//       </Page>
//     );
//   }
// }

// ManageListingsPageComponent.defaultProps = {
//   listings: [],
//   pagination: null,
//   queryListingsError: null,
//   queryParams: null,
//   closingListing: null,
//   closingListingError: null,
//   openingListing: null,
//   openingListingError: null,
// };

// const { arrayOf, bool, func, object, shape, string } = PropTypes;

// ManageListingsPageComponent.propTypes = {
//   closingListing: shape({ uuid: string.isRequired }),
//   closingListingError: shape({
//     listingId: propTypes.uuid.isRequired,
//     error: propTypes.error.isRequired,
//   }),
//   listings: arrayOf(propTypes.ownListing),
//   onCloseListing: func.isRequired,
//   onOpenListing: func.isRequired,
//   openingListing: shape({ uuid: string.isRequired }),
//   openingListingError: shape({
//     listingId: propTypes.uuid.isRequired,
//     error: propTypes.error.isRequired,
//   }),
//   pagination: propTypes.pagination,
//   queryInProgress: bool.isRequired,
//   queryListingsError: propTypes.error,
//   queryParams: object,
//   scrollingDisabled: bool.isRequired,

//   // from injectIntl
//   intl: intlShape.isRequired,
// };

// const mapStateToProps = state => {
//   const {
//     currentPageResultIds,
//     pagination,
//     queryInProgress,
//     queryListingsError,
//     queryParams,
//     openingListing,
//     openingListingError,
//     closingListing,
//     closingListingError,
//   } = state.ManageListingsPage;
//   const listings = getOwnListingsById(state, currentPageResultIds);
//   return {
//     currentPageResultIds,
//     listings,
//     pagination,
//     queryInProgress,
//     queryListingsError,
//     queryParams,
//     scrollingDisabled: isScrollingDisabled(state),
//     openingListing,
//     openingListingError,
//     closingListing,
//     closingListingError,
//   };
// };

// const mapDispatchToProps = dispatch => ({
//   onCloseListing: listingId => dispatch(closeListing(listingId)),
//   onOpenListing: listingId => dispatch(openListing(listingId)),
// });

// const ProductPage = compose(
//   connect(
//     mapStateToProps,
//     mapDispatchToProps
//   ),
//   injectIntl
// )(ManageListingsPageComponent);

// ProductPage.loadData = (params, search) => {
//   const queryParams = parse(search);
//   const page = queryParams.page || 1;
//   return queryOwnListings({
//     ...queryParams,
//     page,
//     perPage: RESULT_PAGE_SIZE,
//     include: ['images'],
//     'fields.image': ['variants.landscape-crop', 'variants.landscape-crop2x'],
//     'limit.images': 1,
//   });
// };

// export default ProductPage;