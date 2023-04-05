import React, { Component } from 'react';
import Header from './HeaderComponent';

const Layout = (props) => {
  const { children } = props
  return (
    <div className='layout'>
      <Header />
      {children}
    </div>
  );
}

export default Layout;