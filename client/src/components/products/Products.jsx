
import React from 'react';
import Product from './Product'
import { useNavigate } from 'react-router-dom';

const Products = ({ products, vendor}) => {
  const navigate = useNavigate();
  const handleAddStock = () => {
    navigate('add-stock')
  }
  return (
    <div className="w-full wrap box pad-1em-2em">
      <div className='box pad-1em flex justify-between'>
        <h2>{vendor ? "Existing stock" : "Products"}</h2>
        {vendor && <button className='btn btn-primary fw-900 hover' onClick={handleAddStock}>Add new stock</button>}
      </div>
      { products.length === 0 ? <div className='box pad-1em'>No products available</div> :
        <div className='flex w-full wrap gap-2em pad-2em'> 
        { products.map(product => <Product  product={product} vendor={vendor}/>)}
      </div>
      }
    </div>
  )
}

export default Products
