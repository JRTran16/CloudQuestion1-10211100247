

import React, { useState } from 'react';
import './Header.css';

import {useNavigate, useLocation} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { chooseFilters } from '../features/customer/custormerSlice';
import { chooseFilters as vendorChooseFilters } from '../features/vendor/vendorSlice';

import Logo from '../home/Logo'

const categories = [
  "electronics",
  "fashion",
  "groceries",
  "home",
  "books",
  "all",
]
const Header = () => {
  const path = useLocation().pathname;
  const userType = path.includes('vendor') ? 'vendor' : 'customer'
  const { orders, filters, products } = useSelector(state => userType === "vendor" ? state.vendor : state.customer)
  console.log(orders, filters, products)
  const user = JSON.parse(localStorage.getItem('user')) || {username: "John"}
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [menuShow, setMenuShow] = useState(false)
  const [dropdownVisible, setDropdownVisible] = React.useState(false);


  return (
    <header className="bg-neutral-200">
  <div
    className="header-logo"
    style={{ cursor: "pointer" }}
    onClick={() => navigate(`/portal/${userType}`)}
  >
    <Logo />
  </div>
  <nav>
    <ul className={`nav-right ${menuShow && "show"}`}>
      <li className="btn btn-secondary flex align-center" style={{ position: "relative" }}>
        <span onClick={() => setDropdownVisible(!dropdownVisible)}>
          {filters?.category || "Categories"} ▼
        </span>
        {dropdownVisible && (
          <ul
            className="dropdown-menu"
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              background: "white",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
              zIndex: 10,
              listStyle: "none",
              padding: "0.5rem",
              margin: 0,
            }}
          >
            {categories.map((category, index) => (
              <li
                key={index}
                className="dropdown-item"
                style={{
                  padding: "0.5rem 1rem",
                  cursor: "pointer",
                  borderBottom: "1px solid #ddd",
                }}
                onClick={() => dispatch(chooseFilters({key: "category", value: category}))}
              >
                {category}
              </li>
            ))}
          </ul>
        )}
      </li>
      <li
        className="btn btn-primary"
        onClick={() => navigate(`/portal/${userType}/checkout`)}
      >
        {userType === "customer" ? "checkout" : "stock"}
      </li>
      <li
        className="btn btn-primary"
        onClick={() => navigate(`/portal/${userType}/orders`)}
      >
        Orders ({orders.length})
      </li>
      <li
        className="btn btn-secondary"
        onClick={() =>
          navigate(`/portal/${userType === "customer" ? "vendor" : "customer"}`)
        }
      >
        {userType === "customer" ? "Selling" : "Purchasing"}
      </li>
    </ul>
    <div className="nav-profile">
      <span className="color-primary-500">{user.username}</span>
      <span></span>
    </div>
  </nav>
</header>
  )
}

export default Header
