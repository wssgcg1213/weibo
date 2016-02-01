/**
 * Created at 16/1/27.
 * @Author Ling.
 * @Email i@zeroling.com
 */
import React from 'react';
import Navigation from './Navigation.jsx';

export default class NavigationCtrl extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return <Navigation navigation={['测试 啥子都没得']}/>;
    }
}