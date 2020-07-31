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

import Product from './Product';
import css from './ProductPage.css';

/* Sharetribe SDK : connecting to database */
const sharetribeSdk = require('sharetribe-flex-sdk');
const clientId = process.env.REACT_APP_SHARETRIBE_SDK_CLIENT_ID;
var sdk = sharetribeSdk.createInstance({clientId});

class ProductPage extends React.Component {
  constructor(props){
    super(props);
    this.state = { listings: null, images: null};
  }

  componentDidMount() {
    sdk.ownListings.query({include: ['images'],}).then(res => {
      console.log("response:")
      console.log(res);

      // get image data
      var images_dict = {};
      res.data.included.forEach(imageElement => {
          images_dict[imageElement.id.uuid] = imageElement.attributes.variants.default.url;
        });

      /* get listing data */
      let listingsTemp = [];
      console.log("Fetched " + res.data.data.length + " listings.");
      res.data.data.forEach(listing => {
        // collect images array
        let images = listing.relationships.images.data;
        let listing_images = [];
        images.forEach(image => {
          if (images_dict[image.id.uuid]) {
              listing_images.push(images_dict[image.id.uuid]);
          }
        });

        listingsTemp.push({listing, listing_images});
      })
      console.log("listings:")
      console.log(listingsTemp);
      this.setState({product: listingsTemp});
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
                {this.state.product && this.state.product.map((item,index) => {
                  return (
                    <Product 
                            key={index}
                            productID={item.listing.id.uuid}
                            productBanner={item.listing_images && item.listing_images[1]}
                            productName={item.listing.attributes.title}
                            productDescription={item.listing.attributes.description}
                            productImg={item.listing_images && item.listing_images[0]}
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