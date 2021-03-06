import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';

export default class Layout extends Component {
  render() {
    return (
      <div className='layout'>
        <Header className='layout__header'/>
        <div className='layout__content'>
        Check console for card values as you draw
          {this.props.children}
        </div>
        <Footer className='layout__footer'/>
      </div>
    );
  }
}
