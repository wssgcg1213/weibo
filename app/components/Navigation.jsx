import React from 'react';
import './Navigation.less';


export default class Navigation extends React.Component {
  constructor(...args) {
    super(...args);
  }

  render () {

    return (<footer className="footer">
      <div className="footer-item">1</div>
      <div className="footer-item">2</div>
      <div className="footer-item">3</div>
      <div className="footer-item">4</div>
    </footer>);
  }
}