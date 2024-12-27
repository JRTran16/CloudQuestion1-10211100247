
import { useNavigate } from "react-router-dom"

import { useDispatch } from "react-redux";
import { chooseProduct } from "../../features/customer/custormerSlice";
import { chooseProduct as chooseStock } from "../../features/vendor/vendorSlice";

const Product = ({ product, vendor }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const loadProduct = (product) => {
    dispatch(vendor ? chooseStock(product) : chooseProduct(product))
    navigate(`product/?id=${product.id}`)
  }

  return (
    <div key={product.id} className='box pad-1em w-fifth bg-neutral-900 pointer hover' onClick={() => loadProduct(product)}>
        <div className='box pad-half color-primary-900 fw-700 fs-700'>{product.name}</div>
        <div className='box pad-half color-primary-500 fs-700'>{product.shortDescr}</div>
        <img src={product.image} alt="Product image" className="w-full" style={{height: "auto", aspectRatio: "1"}}/>
        <div className="flex justify-between">
          <span className="flex column">
            <span className="">
              <Rating rating={product.rating}/>
              {vendor && <span className="color-primary-500">({product.reviews?.length || 0})</span>}
            </span>
            <span>Stock: {product.available}</span>
          </span>
          <span className="btn-primary box pad-half">{vendor ? "🏭 Add to stock" :"🛒 Add to cart"}</span>
        </div>
    </div>
  )
}

export default Product

const Rating = ({ rating, reviewing }) => {
  const stars = []
  const nonStars = []
  for (let i=0; i < Math.floor(rating); i++) stars.push("star")
  for (let i=0; i < Math.ceil(5-rating); i++) nonStars.push("none")
  return (
    <span className={reviewing ? "pointer" : ""}>
      <span style={{color: "gold"}}>{stars.map(star => "★")}</span>
      <span  style={{color: "gold"}}className="" >{nonStars.map(no => "☆")}</span>
    </span>
  )
}

export { Rating}