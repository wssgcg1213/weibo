import React from 'react';
import './Header.less';

export default class Header extends React.Component {
    constructor(...args) {
        super(...args);
    }

    render () {

        return (<header className="header">
            <h1>{this.props.data.username}</h1>
        </header>);
    }
}