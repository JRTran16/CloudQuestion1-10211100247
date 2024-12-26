
import { useSelector } from "react-redux";
const statuses = [
    "pending",
    "approved",
    "rejected",
    "delivered",
]

import { useDispatch } from "react-redux";
import { updateOrder } from "../../features/vendor/vendorSlice";
import { update } from "../../api/order";

const Orders = () => {
    const { orders } = useSelector((state) => state.vendor);
    const { products } = useSelector((state) => state.customer);

    const dispatch = useDispatch();

    const handleChange = async (e, id) => {
        try {
            const { value } = e.target;
            const order = await update({ id, status: value });
            dispatch(updateOrder({ id, status: value }));
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className="box pad-2em">
      <h2 className='box pad-1em'>Orders</h2>
      <div className="flex row wrap gap-2em">
        {
            orders.map( order => (
                <div key={order.id} className="box pad-1em bg-neutral-500 flex column gap-1em w-fifth" >
                    <img src={products.find(product => product.id === order.productId).image} alt="Product image" className="w-full pad-half box bg-primary-500"/>
                    <p className="fs-800 fw-500">{products.find(product => product.id === order.productId).name}</p>
                    <p>Order date: {order.created}</p>
                    <select name="" id="" className="box pad-half fw-700 fs-700 btn-primary" value={order.status} onChange={(e) => handleChange(e, order.id)}> 
                        {
                            statuses.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))
                        }
                    </select>
                    <p>Price: {order.price}</p>
                    <p>Quantity: {order.quantity}</p>
                </div>
            ))
        }
      </div>
    </div>
  )
}

export default Orders
