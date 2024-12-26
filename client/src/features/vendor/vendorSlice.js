
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    orders: [],
    product: {
        name: '',
        image: '',
        price: '',
        available: 0,
        quantity: 0,
        shortDescr: '',
        longDescr: '',
        rating: 0,
        reviews: [
            {
                user: '',
                rating: 0,
                review: ''
            }
        ]
    },
    stock: [
        
    ]
}

const vendorSlice = createSlice({
    name: 'vendor',
    initialState,
    reducers: {
        fillProducts: (state, action) => {state.products = action.payload},
        chooseProduct: (state, action) => { state.product = action.payload},
        updateStock: (state, action) => {
            const product = action.payload;
            const productIndex = state.stock.findIndex(item => item.id === product.id);
            if (productIndex >= 0) {
                if (product.status === "delivered") return state.orders = state.orders.filter(order => order.id !== product.id);
                state.stock[productIndex].available = product.available;
            } else {
                state.stock.push(product)
            }
        },
        fillOrders: (state, action) => {state.orders = action.payload},
        updateOrder: (state, action) => {
            const order = action.payload;
            const orderIndex = state.orders.findIndex(item => item.id === order.id);
            if (orderIndex >= 0) {
                state.orders[orderIndex].status = order.status;
            }
        },
        chooseFilters: (state, action) => {
            const filter = action.payload;
            if (filter["value"] === "all" && state.filters[filter["key"]]) {
                delete state.filters[filter["key"]]
            } else {
                state.filters[filter["key"]] = filter["value"]
            }
        }
    }
})

export default vendorSlice.reducer;
export const { fillProducts, chooseProduct, updateStock, fillOrders, updateOrder, chooseFilters } = vendorSlice.actions