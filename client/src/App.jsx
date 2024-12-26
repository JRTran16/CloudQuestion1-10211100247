import './App.css';
import Home from './home/Home';
import Customer from "./pages/customer/Customer"
import Vendor from './pages/vendor/Vendor';
import Header from './header/Header';
// import More from './pages/external/More';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

const token = localStorage.getItem('token') || "placeholder";
const user = localStorage.getItem('user') || "placeholder"
import { useState, useEffect } from 'react';
import { auth } from './api/auth';


function App() {
  const [userAuthed, setUserAuthed] = useState((token && user) ? true : false); 
  useEffect(() => {
    const isAuthed = auth(token);
    console.log(isAuthed)
    if (isAuthed) setUserAuthed(true)
    if (!isAuthed) setUserAuthed(false)
  }, [token]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/*' element={<Home userAuthed={userAuthed} setUserAuthed={setUserAuthed}/>} />
          <Route path="/portal/*" element={<ProtectedRoute element={Portal} userAuthed={userAuthed} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

const Portal = () => {

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path='customer/*' element={<Customer />} />
          {/* <Route path='more/*' element={<More />} /> */}
          <Route path='vendor/*' element={<Vendor />} />
        </Routes>
      </main>
      <footer>
      </footer>
    </>
  );
}
