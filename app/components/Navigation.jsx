import React from 'react';
import '../style/Navigation.less';

export default class Navigation extends React.Component {
  constructor(...args) {
    super(...args);
  }
  changePage(pageName) {

  }
  render () {

    return (<footer className="footer">
      {this.props.navigation.map((navi, id) => {
        return <div className="footer-item" key={id}>{navi}</div>;
      })}
    </footer>);
  }
}