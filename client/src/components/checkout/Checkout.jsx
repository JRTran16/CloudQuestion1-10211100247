
import { useEffect, useState } from "react";
import { BasketFill } from "../product/ProductBasket";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { update as updateStock } from "../../api/stock";   
import { place as placeOrder } from "../../api/order"; 

const tax = 5;
const delivery = 0;

const Checkout = ({ vendor}) => {
    const navigate = useNavigate()
    const { basket } = useSelector(state => state.customer);
    const { stock } = useSelector(state => state.vendor);
    const products = vendor ? stock : basket.filter(product => (product.quantity > 0))
    const subtotal = vendor ? null : products.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0)
    const { userId } = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (products.length === 0) {
            navigate('..')
        }
    }, [products])

    const handleSubmit = () => {
        if (vendor) {
            // update stock
            // console.log(products)
            updateStock({products}).then(() => console.log("Stock updated"))
        } else {
            // console.log(basket)
            const orders = products.map(product => ({owner: product.owner, customer: userId, productId: product.id, quantity: product.quantity, price: product.price}))
            placeOrder({orders}).then(() => console.log("Order placed"))
            // update stock
        }
    }   

  return (
    <div className="checkout box pad-1em">
        <div>
            {
                products.map(product => <Product key={product.id} productState={product} vendor={vendor}/>)
            }
        </div>
        { !vendor &&
        <div className="box pad-1em flex column gap-1em fs-700">
            <div className="">Subtotal: {subtotal}</div>
            <div>Tax: {tax}</div>
            <div>Delivery Fee: {delivery}</div>
            <div className="fw-700">Total: {subtotal + tax + delivery}</div>
        </div>}
        <div className="box pad-1em">
            {/* <input type="text" placeholder="Enter your address" className="box pad-1em w-full"/><br /><br /> */}
            <button className="btn btn-primary box pad-1em fs-700" onClick={handleSubmit}>{vendor ? "Update stock" : "Place order"}</button>
        </div>
    </div>
  )
}

export default Checkout


const Product = ({ productState, vendor }) => {
    const [product, setProduct] = useState(productState);
    return (
        <>
            <hr />
            <div className="box pad-1em flex gap-2em bg-neutral-200">
                <div className="flex align-center gap-1em">
                    <img src={product.image} alt="" style={{width: "100px"}}/>
                    <div>
                        <div>{product.name}</div>
                        <div>{vendor ? `Stock: ${product.available}`: `Quantity: ${product.quantity}`}</div>
                        <div>Price: {product.price}</div>
                    </div>
                </div>
                <BasketFill product={product} setProduct={setProduct} vendor={vendor}/>
            </div>
        </>
    )
}