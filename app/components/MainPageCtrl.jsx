/**
 * Created at 16/1/30.
 * @Author Ling.
 * @Email i@zeroling.com
 */
import React from 'react';
import MainPage from './MainPage.jsx';
import TimeLineStore from '../stores/TimeLineStore';

import request from 'superagent';
import __MOCK_DATA__ from 'json!../mock.json';
function mockTimeLine () {
    return new Promise((res, rej) => {
        return res(__MOCK_DATA__.timeline);
    });
}

export default class MainPageCtrl extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            timeLine: TimeLineStore.getAll()
        };
    }

    componentDidMount() {
        this.__onChange = this._onChange.bind(this);
        TimeLineStore.addChangeListener(this.__onChange);
    }
    componentWillUnmount() {
        TimeLineStore.removeChangeListener(this.__onChange);
        this.__onChange = null;
    }

    _onChange() {
        let timeLine = TimeLineStore.getAll();
        this.setState({ timeLine });
    }

    render () {
        let processedData = this.state.timeLine.map(status => ({
            id: status.id,
            head: status['user']['profile_image_url'],
            username: status['user']['screen_name'],
            time: status['created_at'],
            content: status['text'],
            source: status['source'],
            imgList: status['pic_urls'].map(o => ({
                thumbnail: o['thumbnail_pic'],
                large: o['thumbnail_pic'].replace('thumbnail', 'large')
            }))
        }));
        return <MainPage data={processedData}/>;
    }
}