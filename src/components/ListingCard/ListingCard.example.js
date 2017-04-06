/* eslint-disable no-console, import/prefer-default-export */
import React from 'react';
import ListingCard from './ListingCard';
import { createUser, createListing, currencyConfig, fakeIntl } from '../../util/test-data';

const author = createUser('user1');
const listing = { ...createListing('listing1'), author };

const ListingCardWrapper = props => (
  <div style={{ width: '400px' }}>
    <ListingCard {...props} />
  </div>
);

export const ListingCardWrapped = {
  component: ListingCardWrapper,
  props: {
    currencyConfig,
    intl: fakeIntl,
    listing,
  },
};