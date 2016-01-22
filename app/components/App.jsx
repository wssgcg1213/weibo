import React from 'react';
require('./App.less');
import request from 'superagent';
import Header from './Header.jsx';
import Navigation from './Navigation.jsx';
import MainPage from './MainPage.jsx';

import MOCK from 'json!../mock.json';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeline: null,
            userinfo: null,
            loaded: false
        };
    }

    static api (type) {
        return new Promise((resolve, reject) => {
            // todo mock
            if (type === 'timeline') {
                return resolve(MOCK.timeline);
            } else if (type === 'userinfo') {
                return resolve(MOCK.userinfo);
            }

            request.post('/api.php')
                .type('form')
                .send({api: type})
                .end((err, res) => {
                    if (err) return reject(err);
                    return resolve(res.body);
                });
        })
    }
    componentDidMount() {
        Promise.all([App.api('timeline'), App.api('userinfo')])
            .then(vals => {
                this.setState({
                    timeline: vals[0],
                    userinfo: vals[1],
                    loaded: true
                });
            });
    }

    render() {
        if ( !this.state.loaded ) {
            return (<div>loading</div>);
        }
        const mainPageData = this.state.timeline['statuses'].map(status => ({
            id: status.id,
            head: status['user']['profile_image_url'],
            username: status['user']['screen_name'],
            time: status['created_at'],
            content: status['text'],
            source: status['source'],
            imgList: status['pic_urls'].map(o => o['thumbnail_pic'])
        }));
        return (<div className="container">
            <Header userinfo={this.state.userinfo}/>
            <MainPage data={mainPageData}/>
            <Navigation data=""/>
        </div>);
    }
}
