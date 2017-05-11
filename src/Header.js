import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <div className="flexRow">
      <div className="flexRow">
        <img alt="Narwa11y 'Wally' logo, a rainbow colored narwhal with glasses" className="logo" src="./narwha11y.png" />
        <h1 className="pageTitle">Narwha11y: Accessibility Assessment Tool</h1>
      </div>
      <nav className="mainButtons">
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/create'>Create New</Link></li>
        </ul>
      </nav>
    </div>
  </header>
)

export default Header;
