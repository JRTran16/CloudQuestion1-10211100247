
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    orders: [],
    filters: {},
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
    basket: [
        
    ]
}

const custormerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        fillProducts: (state, action) => {state.products = action.payload},
        chooseProduct: (state, action) => { state.product = action.payload},
        updateBasket: (state, action) => {
            const product = action.payload;
            if (product.quantity > 0) {
                const productIndex = state.basket.findIndex(item => item.id === product.id);
                if (productIndex >= 0) {
                    state.basket[productIndex].quantity = product.quantity;
                    state.basket[productIndex].available = state.product.available - product.quantity;
                } else {
                    state.basket.push(product)
                }
            }
            else {
                state.basket = state.basket.filter(item => item.id !== product.id)
            }
        },
        fillOrders: (state, action) => {state.orders = action.payload},
        removeFromBasket: (state, action) => {state.basket = state.basket.filter(product => product.id !== action.payload.id)},
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

export default custormerSlice.reducer;
export const { fillProducts, chooseProduct, updateBasket, fillOrders, chooseFilters } = custormerSlice.actions