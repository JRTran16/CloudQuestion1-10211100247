import React, { useEffect, useState } from 'react'

import { Rating } from '../products/Product';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateBasket } from '../../features/customer/custormerSlice';
import { updateStock } from '../../features/vendor/vendorSlice';

const ProductBasket = ({ vendor }) => {
  const { product: template, basket} = useSelector(state => state.customer);
  const { product: stockTemplate, stock} = useSelector(state => state.vendor);
  const existingProduct = vendor ? stock.find(item => item.id === stockTemplate.id) : basket.find(item => item.id === template.id)
  const [product, setProduct] = useState(existingProduct || vendor ? stockTemplate : { ...template, quantity: 1});
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  const handleReviewSubmit = (e) => {
    e.preventDefault();
  }

  useEffect(() => {
    if (vendor) dispatch(updateStock(product))
    else dispatch(updateBasket(product))
  }, [])

  const handleCheckout = () => {navigate('../checkout')}

  return (
    <div className="box pad-2em flex gap-2em wrap w-full">
      <div className="box w-third pad-half bg-neutral-200">
        <img src={product.image} alt="" className="w-full"/>
      </div>
      <div className="box w-third flex column gap-2em">
        <div className='fs-800 fw-700 flex align-center gap-2em'>{product.name}
          <span className="fs-800 fw-900"><Rating rating={product.rating}/></span>
        </div>
        <div className='fs-700'>{product.shortDescr}</div>
        <BasketFill product={product} setProduct={setProduct} vendor={vendor}/>
        <div className="flex column gap-1em">
          <button className='btn btn-primary fit-content box pad-1em' onClick={handleCheckout}>{vendor ? "Update stock": "Checkout"}</button>
          { !vendor &&
            <div className="bg-neutral-200 box pad-1em color-primary-500">
            Price: {product.price}
            <div>Subtotal: {product.price * product.quantity}</div><br />
            <div>Stock: {product.available ? product.available : "out of stock"}</div>
          </div>}
        </div>
        { !vendor &&
          <form className="user-review pad-1em fs-700 flex column gap-1em" onSubmit={handleReviewSubmit}>
          <div className='fs-700'>Leave a review</div>
          <div className="fs-800 fw-900"><Rating rating={0} reviewing={true}/></div>
          <textarea name="" id="" className='box pad-1em'></textarea>
          <input className='btn btn-primary pad-1em box' type="submit" value="Submit" />
        </form>}
      </div>
      <div className="box w-full flex wrap">
        <div className='fs-700 w-half pad-1em box'>{product.longDescr}</div>
        <div className="reviews w-third flex column gap-1em">
          <div className='fs-800 fw-700'>Reviews</div>
          {product.reviews.length === 0 && <div className='box pad-1em'>No reviews yet {!vendor && "- Be the first to review this product!"}</div>}
          {product.reviews.map(review => (
            <div className='box pad-1em'>
              <div className='fs-700'>{review.user}</div>
              <div className='fs-700'><Rating rating={review.rating}/></div>
              <div className='fs-700'>{review.review}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductBasket

const BasketFill = ({ product, setProduct, vendor}) => {
  const { basket } = useSelector(state => state.customer);
  const { stock } = useSelector(state => state.vendor);

  const dispatch = useDispatch();

  useEffect(() => {
    const productInBasket = basket.find(item => item.id === product.id)
    if (productInBasket) setProduct(productInBasket) 
    else setProduct({...product, quantity: 0})
  }, [basket])

  useEffect(() => {
    const productInStock = stock.find(item => item.id === product.id)
    if (productInStock) setProduct(productInStock)
    else setProduct({...product, available: 0})
  }, [stock])

  const handleUpdate = (increment) => {
    if (product.quantity + increment < 0 || (product.available - increment) < 0) return
    const prod = {...product, quantity: product.quantity + increment, available: product.available - increment}
    if (prod.quantity === product.quantity) return
    dispatch(updateBasket(prod))
  }

  const handleAddToStock = (increment) => {
    if (product.available + increment < 0) return
    const prod = {...product, available: product.available + increment}
    if (prod.available === product.available) return
    dispatch(updateStock(prod))
  }

  return (
    <div className='cart flex row gap-1em btn-secondary fit-content align-center box pad-half'>
          <div className="btn-secondary flex align-center">{vendor ? "Add to stock": "Add to cart"}</div>
          <div className='btn btn-primary fw-900' onClick={() => vendor ? handleAddToStock(-1) : handleUpdate(-1)}>–</div>
          <div className='fs-900 color-primary-500'>{vendor ? product.available : product.quantity}</div>
          <div className='btn btn-primary fw-900' onClick={() => vendor ? handleAddToStock(1) :  handleUpdate(1)}>╋</div>
    </div>
  )
}

export {
  BasketFill
}