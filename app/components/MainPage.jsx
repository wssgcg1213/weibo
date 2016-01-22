import React from 'react';
import ScrollFresh from './ScrollFresh.jsx';
import Cell from './Cell.jsx';
import './MainPage.less';

export default class MainPage extends React.Component {
    constructor(...args) {
        super(...args);
    }

    render () {
        let list = this.props.data.map((cellObj, i) =>
            (<Cell key={cellObj.id} data={cellObj} />));
        return (<main className="main">
            <ScrollFresh />
            {list}

        </main>);
    }
}