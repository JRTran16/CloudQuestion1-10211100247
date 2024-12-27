import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;
console.log(API_BASE_URL)

const auth = async (token) => {
  try {
    if (token) {
        const res = await axios.get(`${API_BASE_URL}/api/v1/protected-route`, {
            headers: { 'Authorization': `Bearer ${token}` }
          })

          const data = res.data
          console.log(true)
          return true
          
    }
  }
  catch (error) {
      console.log('error: ', error)
      if (error.message !== 'Network Error') return false;
      if (error.message === 'Invalid or expired token') localStorage.removeItem('user')  
    }
}

const login = async (page, email, username, password) => {
  try {
    if (page === 'sign-up') {
      await axios.post(`${API_BASE_URL}/api/v1/auth/register`, { username, email, password });
      return 'registered'
      navigate('..');
    } else {
      console.log(API_BASE_URL)
      const response = await axios.post(`${API_BASE_URL}/api/v1/auth/login`, { email, password });
      localStorage.setItem('token', response.data.token);
      // dispatch(setUser(response.data.user))
      localStorage.setItem('user', JSON.stringify(response.data.user))
      return 'signed-in'
    }
  } catch (error) {
    console.log(error)
    return "error"
  }
};

export {
    auth,
    login
}