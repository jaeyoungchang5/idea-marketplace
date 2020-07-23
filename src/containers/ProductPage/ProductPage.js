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

import products from './products';
import Product from './Product';
import css from './ProductPage.css';
// import image from './path/to/image.png';

/* Sharetribe SDK : connecting to database */
const sharetribeSdk = require('sharetribe-flex-sdk');
const clientId = '667f949a-83b7-45ba-86da-5b9dc7c7722e';
var sdk = sharetribeSdk.createInstance({clientId});

const ProductPage = () => {
  let temp = [];
  sdk.ownListings.query({}).then(res => {
      console.log("Fetched " + res.data.data.length + " listings.");
      res.data.data.forEach(listing => {
        temp.push(listing.attributes.title);
      })
      console.log(temp);
  });
  
  console.log("final: " + temp);

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
              {products.map((item, index) => {
                  return (
                      <Product 
                          key={index}
                          productID={item.id}
                          productBanner={item.productBanner}
                          productName={item.productName}
                          productDescription={item.productDescription}
                          productImg={item.productImg}
                      />
                  );
              })}
              {/* {sdk.ownListings.query({}).then(res => {
                  res.data.data.forEach(listing => {
                    return (
                      <Product
                        productName={listing.attributes.title}
                      />
                    );
                  })
                })} */}
            </div>
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default ProductPage;