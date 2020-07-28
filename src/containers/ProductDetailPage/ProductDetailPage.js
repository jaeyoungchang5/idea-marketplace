import React from 'react';
import { StaticPage, TopbarContainer } from '..';
// import { Link, Route } from 'react-router-dom';

import {
    LayoutSingleColumn,
    LayoutWrapperTopbar,
    LayoutWrapperMain,
    LayoutWrapperFooter,
    Footer,
    // NamedLink,
    // ExternalLink,
} from '../../components';

import products from '../ProductPage/products';
import css from './ProductDetailPage.css';
const sharetribeSdk = require('sharetribe-flex-sdk');
const clientId = process.env.REACT_APP_SHARETRIBE_SDK_CLIENT_ID;
var sdk = sharetribeSdk.createInstance({clientId});

class ProductDetailPage extends React.Component {
    
  // const productID = props.params.id;
  // const imgSrc = require("../ProductPage/img/" + products[productID - 1].productImg + "");
  // const bannerSrc = require("../ProductPage/img/" + products[productID - 1].productBanner + "");
  constructor(props){
    super(props);
    this.state = { listing: {} };
  }

  componenDidMount() {
      console.log("PID1: " + this.props.params.id);
      sdk.ownListings.show({id: this.props.params.id}).then(res => {
        this.setState({listing: res});
      })
  }

  render(){
    console.log("PID2: " + this.props.params.id);
      return (
      <StaticPage
        className={css.root}
        title = "Product-Detail"
        schema={{
          '@context': 'http://schema.org',
          '@type': 'ProductDetailPage',
          description: 'Product Detail Page',
          name: 'Product Detail Page',
        }}
      >
        <LayoutSingleColumn>
          <LayoutWrapperTopbar>
            <TopbarContainer />
          </LayoutWrapperTopbar>
          <LayoutWrapperMain>
            {/* <div className={css.productContainer}>
              <div className={css.productImageBanner}>
                  <img className={css.banner} src={bannerSrc} alt={products[productID-1].productName}></img>
              </div>
              <div className={css.productContent}>
                  <div className={css.words}>
                      <div className={css.productHeader}>
                          <h3>
                              {products[productID-1].productName}
                          </h3>
                      </div>
                      <div className={css.productDescript}>
                          <p>{products[productID-1].productDescription}</p>
                      </div>
                  </div>
                  <div className={css.feature}>
                      <img className={css.productImage} src={imgSrc} alt={products[productID-1].productName}></img>
                  </div>
              </div>
          </div> */}
          </LayoutWrapperMain>
          <LayoutWrapperFooter>
            <Footer />
          </LayoutWrapperFooter>
        </LayoutSingleColumn>
      </StaticPage>
    );
  }
};

export default ProductDetailPage;