import React, { useEffect, useState } from 'react'

import Products from "../../components/products/Products"

import fetchProducts from '../../api/fetchProducts'
import { get as getOrders } from "../../api/order"

import { useDispatch, useSelector } from 'react-redux';
import { fillProducts, fillOrders } from '../../features/customer/custormerSlice';

const Home = () => {
  const { products, filters } = useSelector(state => state.customer);
  const dispatch = useDispatch();
  const { userId } = JSON.parse(localStorage.getItem("user"));
  
  useEffect(() => {
    fetchProducts(filters)
      .then(products => dispatch(fillProducts(products)))
      .catch(error => console.log(error))

    getOrders({customer: userId})
          .then(orders => {
            console.log(orders)
            const important_orders = orders.filter(order => order.status !== "delivered")
            dispatch(fillOrders(important_orders))
          })
          .catch(error => console.log(error))
      
  }, [filters])



  return (
    <div>
        <div className="flex flex-row box pad-1em-2em">
            <input type="text" placeholder="What are you looking for?" className="search-bar w-full"/>
        </div>
        <Products products={products} />
    </div>
  )
}

export default Home
