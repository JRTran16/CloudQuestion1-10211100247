
const baseUrl = import.meta.env.VITE_API_URL;
import axios from 'axios';

const add = async (stock) => {
    try {
        const added = await axios.post(`${baseUrl}/api/v1/product`, stock)
        return true
    } catch (error) {
        console.error(error);
    }
    
}


const update = async (stock) => {
    try {
        const updated = await axios.patch(`${baseUrl}/api/v1/stock`, stock)
        return true
    } catch (error) {
        console.error(error);
        return false
    }
    
}


export {
    add,
    update
}
