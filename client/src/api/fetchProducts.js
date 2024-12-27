
import axios from 'axios';
// import { products } from './dummydata';
const baseUrl = import.meta.env.VITE_API_URL;

export default async (filters) => {
    try {
        const res = await axios.get(baseUrl + '/api/v1/product', { params: filters })
        return res.data?.products.map(product => ({...product, id: product._id}))
    } catch (error) {
        throw new Error(error)
    }
}