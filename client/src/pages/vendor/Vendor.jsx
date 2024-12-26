import React from 'react';

import Home from './Home';
import ProductBasket from '../../components/product/ProductBasket';
import ProductSearch from '../../components/product/ProductSearch';
import Checkout from '../../components/checkout/Checkout';
import AddStock from './AddStock';
import Orders from './Orders';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const Vendor = () => {
  return (
    <div className="w-full bg-neutral-100">
      <Routes>
        <Route path="" element={<Home vendor={true}/>}/>
        <Route path="product" element={<ProductBasket vendor={true}/>}/>
        <Route path="product-search" element={<ProductSearch />}/>
        <Route path="checkout" element={<Checkout vendor={true}/>}/>
        <Route path="add-stock" element={<AddStock />}/>
        <Route path="orders" element={<Orders />}/>
      </Routes>
    </div>
  )
}

export default Vendor
