import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
const statuses = [
    "pending",
    "approved",
    "rejected",
    "delivered",
]

const Orders = () => {
    const vendor = useLocation().pathname.includes("vendor")
    const { orders } = useSelector((state) => vendor ? state.vendor: state.customer);
    console.log(orders)
    const { products } = useSelector((state) => state.customer);

  return (
    <div className="box pad-2em">
      <h2 className='box pad-1em'>Orders</h2>
      <div className="flex row wrap gap-2em">
        {
            orders.map( order => (
                <div key={order.id} className="box pad-1em bg-neutral-500 gap-2em w-full flex" >
                    <img src={products.find(product => product.id === order.productId).image} alt="Product image" className="w-fifth pad-half box bg-primary-500"/>
                    <hr />
                    <div className="flex column gap-2em fw-500">  
                        <p className="fs-800 fw-500">{products.find(product => product.id === order.productId).name}</p>
                        <p>Order date: {order.created}</p>
                        <p>Order status: <span className="btn-primary btn">{order.status}</span></p>
                        <p>Price: {order.price}</p>
                        <p>Quantity: {order.quantity}</p>
                    </div>
                </div>
            ))
        }
      </div>
    </div>
  )
}

export default Orders
