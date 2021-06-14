import React from 'react';
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/services">Services</Link>
      <Link to="/blog/article1">Article1</Link>
      <Link to="/blog/article2">Article2</Link>
    </div>
  )
}

export default Header;
