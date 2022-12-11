import React from 'react';

import { client, urlFor } from '../lib/client';
import { Product, FooterBanner, HeroBanner } from '../components';

export default function Home({ products, banner }) {
  return (
    <div>
      <HeroBanner heroBanner={banner.length && banner[0]} />

      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Headphones and speakers of many variations</p>
      </div>

      <div className='products-container'>
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>

      <FooterBanner footerBanner={banner && banner[0]} />
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const bannerQuery = '*[_type == "banner"]';

  const products = await client.fetch(query);
  const banner = await client.fetch(bannerQuery);

  return {
    props: { products, banner },
  };
};
