import React from 'react';
import { Link } from 'react-router-dom';

import Trinary from './Trinary';

const Header = () => (
  <header>
    <div className="flexRow">
      <div className="flexRow">
        <Link to="/">
          <img alt="Narwa11y 'Wally' logo, a rainbow colored narwhal wearing glasses. Its single horn is sparkly." className="logo" src="/narwha11y.png" />
        </Link>
        <h1 className="pageTitle">Narwha11y: Accessibility Assessment Tool<div>beta</div></h1>
      </div>
      <nav className="mainButtons">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><a href="/api/create">Create New</a></li>
        </ul>
      </nav>
    </div>
    <Trinary title={ 'key' } onClick={() => {}} index={ 0 } indeterminate={true} />
    <Trinary title={ 'key' } onClick={() => {}} index={ 0 } />
  </header>
);

export default Header;
