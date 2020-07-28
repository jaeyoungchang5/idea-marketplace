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

import css from './ProductDetailPage.css';

const sharetribeSdk = require('sharetribe-flex-sdk');
const clientId = process.env.REACT_APP_SHARETRIBE_SDK_CLIENT_ID;
var sdk = sharetribeSdk.createInstance({clientId});

class ProductDetailPage extends React.Component {
  constructor(props){
    super(props);
    this.state = { listing: null, images: null, id: this.props.params.id };
  }

  componentDidMount() {
    /* get individual listing data based on uuid */
      sdk.ownListings.show({id: this.state.id, include: ['images']},).then(res => {
        console.log("response:");
        console.log(res);
        let temp = res.data.data;
        console.log(temp);
        this.setState({listing: temp});

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
        this.setState({images: imagesTemp})
      });
  }

  render(){
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
            <div className={css.productContainer}>
              <div className={css.productImageBanner}>
                  <img className={css.banner} src={this.state.images && this.state.images[1].url} alt={this.state.listing && this.state.listing.attributes.title}></img>
              </div>
              <div className={css.productContent}>
                  <div className={css.words}>
                      <div className={css.productHeader}>
                          <h3>{this.state.listing && this.state.listing.attributes.title}</h3>
                      </div>
                      <div className={css.productDescript}>
                          <p>{this.state.listing && this.state.listing.attributes.description}</p>
                      </div>
                  </div>
                  <div className={css.feature}>
                      <img className={css.productImage} src={this.state.images && this.state.images[0].url} alt={this.state.listing && this.state.listing.attributes.title}></img>
                  </div>
              </div>
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

export default ProductDetailPage;