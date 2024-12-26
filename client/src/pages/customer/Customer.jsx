import React, { useEffect } from 'react';

import Home from './Home';
import ProductBasket from '../../components/product/ProductBasket';
import ProductSearch from '../../components/product/ProductSearch';
import Checkout from '../../components/checkout/Checkout';
import Orders from './Orders';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const Customer = () => {
  return (
    <div className="w-full bg-neutral-100">
      <Routes>
        <Route path="" element={<Home />}/>
        <Route path="product" element={<ProductBasket />}/>
        <Route path="product-search" element={<ProductSearch />}/>
        <Route path="checkout" element={<Checkout />}/>
        <Route path='orders'  element={<Orders />} />
      </Routes>
    </div>
  )
}

export default Customer
