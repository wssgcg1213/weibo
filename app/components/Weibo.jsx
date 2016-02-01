/**
 * Created at 16/1/27.
 * @Author Ling.
 * @Email i@zeroling.com
 */
import React from 'react';
import 'normalize.css';
import '../style/App.less';

import HeaderCtrl from './HeaderCtrl.jsx';
import NavigationCtrl from './NavigationCtrl.jsx';
import MainPageCtrl from './MainPageCtrl.jsx';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeline: null,
            userinfo: null,
            loaded: false
        };
    }

    render() {
        return (<div className="container">
            <HeaderCtrl />
            <MainPageCtrl />
            <NavigationCtrl />
        </div>);
    }
}