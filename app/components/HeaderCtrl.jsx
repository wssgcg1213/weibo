/**
 * Created at 16/1/27.
 * @Author Ling.
 * @Email i@zeroling.com
 */
import React from 'react';
import Header from './Header.jsx';
import WeiboStore from '../stores/WeiboStore';

export default class HeaderCtrl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: WeiboStore.getUserInfo()
        }
    }
    render() {
        return <Header userinfo={this.state.userInfo}/>;
    }
}