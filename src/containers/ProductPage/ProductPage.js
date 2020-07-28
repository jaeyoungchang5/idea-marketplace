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
    this.state = { finalArray: []};
  }

  componentDidMount() {
    sdk.ownListings.query({
        include: ['images'],
      }).then(res => {
      let temp = [];
      console.log("Fetched " + res.data.data.length + " listings.");
      res.data.data.forEach(listing => {
        temp.push(listing);
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
                            productID={item.id.uuid}
                            productBanner={item.relationships.images.data[1]}
                            productName={item.attributes.title}
                            productDescription={item.attributes.description}
                            productImg={item.relationships.images.data[0]}
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