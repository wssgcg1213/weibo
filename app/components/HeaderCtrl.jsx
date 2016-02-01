/**
 * Created at 16/1/27.
 * @Author Ling.
 * @Email i@zeroling.com
 */
import React from 'react';
import Header from './Header.jsx';
import UserInfoStore from '../stores/UserInfoStore';
import HeaderActions from '../actions/HeaderActions';
import request from 'superagent';

export default class HeaderCtrl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: UserInfoStore.getUserInfo()
        };
    }
    componentDidMount () {
        UserInfoStore.addChangeListener((e => {
            this.setState({userInfo: UserInfoStore.getUserInfo()})
        }).bind(this));
        request.post('api.php')
            .type('form')
            .send({api: 'userinfo'})
            .end((err, res) => {
                if (err) return;
                HeaderActions.setUserInfo(res.body);
            });
    }
    render() {
        return <Header userinfo={this.state.userInfo}/>;
    }
}