import React from 'react';
import '../style/Header.less';

export default class Header extends React.Component {
    constructor(...args) {
        super(...args);
    }

    render () {

        return (<header className="header">
            <img src={this.props.userinfo.avatar_hd} alt="user_header" className="user-head"/>
            <h1>{this.props.userinfo.name}</h1>
            <button className="btn-send-weibo">发微博</button>
        </header>);

    }
}