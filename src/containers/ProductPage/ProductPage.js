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

      /* get listing data */
      let listingsTemp = [];
      console.log("Fetched " + res.data.data.length + " listings.");
      res.data.data.forEach(listing => {
        listingsTemp.push(listing);
        console.log(listing)
      })
      console.log("listings:")
      console.log(listingsTemp);
      this.setState({listings: listingsTemp});

      /* get image data */
      let imagesTemp = [];
      console.log("Fetched " + res.data.included.length + " images.");
      res.data.included.forEach(imageElement => {
        imagesTemp.push({
          id: imageElement.id.uuid,
          url: imageElement.attributes.variants.default.url,
        })
      })
      console.log("images:");
      console.log(imagesTemp);
      this.setState({images: imagesTemp});
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
                {this.state.listings && this.state.listings.map((item,index) => {
                  return (
                    <Product 
                            key={index}
                            productID={item.id.uuid}
                            productBanner={this.state.images && this.state.images[index*2+1].url}
                            productName={item.attributes.title}
                            productDescription={item.attributes.description}
                            productImg={this.state.images && this.state.images[index*2].url}
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