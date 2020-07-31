import React from 'react';
import { StaticPage, TopbarContainer } from '..';
// import { Link, Route } from 'react-router-dom';
// for evergreen UI components
import { SideSheet, Pane, Heading, Paragraph, Card, Button, Combobox } from 'evergreen-ui'

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
        let temp = res.data.data;
        console.log(temp);
        console.log('Price');
        console.log(temp.attributes.price.amount)
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

      // set initial state for side box
      this.setState({isShown: false});
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
              <Pane
                elevation={2}
                float="left"
                width={700}
                height={500}
                margin={50}
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                <img className={css.productImage} src={this.state.images && this.state.images[0].url} alt={this.state.listing && this.state.listing.attributes.title}></img>
              </Pane>
              <div className={css.productDetails}>
                <h1>{this.state.listing && this.state.listing.attributes.title}</h1>
                <h2>${this.state.listing && this.state.listing.attributes.price.amount}</h2>
                <div className={css.productDescription}>
                    <p>{this.state.listing && this.state.listing.attributes.description}</p>
                </div>
                <div className={css.dropdown}>
                  <Combobox
                    openOnFocus
                    items={['Small', 'Medium', 'Large', 'X-Large']}
                    onChange={selected => console.log(selected)}
                    placeholder="Size"
                    padding-bottom="1rem"
                  />
                </div>
                <Button height={40} marginRight={16} appearance="primary" intent="success" onClick={() => this.setState({ isShown: true })}>Purchase</Button>
              </div>
            </div>
            <React.Fragment>
              <SideSheet
                isShown={this.state.isShown}
                onCloseComplete={() => this.setState({ isShown: false })}
                containerProps={{
                  display: 'flex',
                  flex: '1',
                  flexDirection: 'column',
                }}
              >
                <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor="white">
                  <Pane padding={16}>
                    <Heading size={1000}>{this.state.listing && this.state.listing.attributes.title}</Heading>
                    <Paragraph size={500}>${this.state.listing && this.state.listing.attributes.price.amount}</Paragraph>
                  </Pane>
                </Pane>
                <Pane flex="1" overflowY="scroll" background="tint1" padding={16}>
                  <Card
                    backgroundColor="white"
                    elevation={0}
                    height={240}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Heading>Display Purchase Process Here</Heading>
                  </Card>
                </Pane>
              </SideSheet>
            </React.Fragment>
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