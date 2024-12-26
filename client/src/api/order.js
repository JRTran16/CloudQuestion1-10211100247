
import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;

const place = async (order) => {
    try {
        const added = await axios.post(`${baseUrl}/api/v1/order`, order);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

const get = async (filters) => {
    try {
        const res = await axios.get(baseUrl + '/api/v1/order', { params: filters });
        return res.data?.orders.map(order => ({...order, id: order._id}));
    } catch (error) {
        throw new Error(error);
    }
}

const update = async (order) => {
    try {
        const res = await axios.patch(baseUrl + '/api/v1/order', order);
        return res.data;
    } catch (error) {
        throw new Error(error);
    }
}

export {
    place,
    get,
    update
}