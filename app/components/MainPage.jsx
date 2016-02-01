import React from 'react';
import Cell from './Cell.jsx';
import '../style/MainPage.less';
import MainPageActions from '../actions/MainPageActions';
import MainPageCtrl from './MainPageCtrl.jsx';
import request from 'superagent';

const STATE_PULLREFRESH_VERTICAL_INIT = {
    captain: '',
    visibility: false
};
const STATE_PULLREFRESH_VERTICAL_SHOW = {
    captain: '下拉刷新',
    visibility: true
};
const STATE_PULLREFRESH_VERTICAL_READY = {
    captain: '松开刷新',
    visibility: true
};
const STATE_PULLREFRESH_VERTICAL_LOADING = {
    captain: '正在加载',
    visibility: true
};
const STATE_PULLREFRESH_VERTICAL_NOMORE = {
    captain: '没有更多数据了',
    visibility: true
};

export default class MainPage extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            timeLine: [],
            pullRefresh: STATE_PULLREFRESH_VERTICAL_INIT,
            pullRefreshDown : STATE_PULLREFRESH_VERTICAL_INIT
        };
    }

    componentDidMount() {
        this.scroller = this.refs['pull-refresh-content'];
        this.wrapper = this.refs['wrapper'];
        this.pullRefresh = this.refs['pull-refresh'];
        this.scrollTo(0, 50, 500);
        this.setState({pullRefresh: STATE_PULLREFRESH_VERTICAL_LOADING});
        this.loadData('new').then(data => {
            if (data) {
                this.scrollTo(0, 0, 500);
                setTimeout(() => {
                    this.setState({pullRefresh: STATE_PULLREFRESH_VERTICAL_SHOW});
                }, 500);
            }
        });
    }

    onTouchStart (ev) {
        this.lastTouchEvent = {
            touchStartTime: ev.timeStamp,
            touchStartClientX: ev.touches[0].clientX,
            touchStartClientY: ev.touches[0].clientY,
            path: []
        };

        switch (this.state.pullRefreshDown) {
            case STATE_PULLREFRESH_VERTICAL_LOADING:
            case STATE_PULLREFRESH_VERTICAL_NOMORE:
            case STATE_PULLREFRESH_VERTICAL_SHOW:
                break;
            default:
                this.setState({pullRefreshDown: STATE_PULLREFRESH_VERTICAL_SHOW});
        }

        switch (this.state.pullRefresh) {
            case STATE_PULLREFRESH_VERTICAL_LOADING:
            case STATE_PULLREFRESH_VERTICAL_NOMORE:
            case STATE_PULLREFRESH_VERTICAL_SHOW:
                break;
            default:
                this.setState({pullRefresh: STATE_PULLREFRESH_VERTICAL_SHOW});
        }
    }
    onTouchMove (ev) {
        this.lastTouchEvent.path.push(ev.touches[0]);
        this.lastTouchEvent.verticalMovation = ev.touches[0].clientY - this.lastTouchEvent.touchStartClientY;
        this.lastTouchEvent.horizontalMovation = ev.touches[0].clientX - this.lastTouchEvent.touchStartClientX;

        if (this.lastTouchEvent.verticalMovation > 0 && this.wrapper.scrollTop === 0) {
            // 2 往下拉
            ev.preventDefault();
            if (this.state.pullRefresh === STATE_PULLREFRESH_VERTICAL_LOADING
                || this.state.pullRefresh === STATE_PULLREFRESH_VERTICAL_NOMORE) {
                let _y = 50 + (ev.touches[0].clientY - this.lastTouchEvent.touchStartClientY) / 3;
                this.scrollTo(0, _y, 0);
                return;
            }
            if (!this.lastTouchEvent.overflow) {
                // 2.1 刚到顶
                //刚开始往下拉 做个标记
                this.lastTouchEvent.overflow = 'top';
                this.lastTouchEvent.overflowStartClientY = ev.touches[0].clientY;
                this.setState({pullRefresh: STATE_PULLREFRESH_VERTICAL_SHOW});
                return false;
            } else {
                // 2.2 到顶后继续拉
                let y = this.y = (ev.touches[0].clientY - this.lastTouchEvent.overflowStartClientY) / 3;
                if (y >= 40 && this.state.pullRefresh !== STATE_PULLREFRESH_VERTICAL_READY) { //到ready界限
                    this.setState({pullRefresh: STATE_PULLREFRESH_VERTICAL_READY});
                }
                if (y < 40 && this.state.pullRefresh !== STATE_PULLREFRESH_VERTICAL_SHOW) {
                    this.setState({pullRefresh: STATE_PULLREFRESH_VERTICAL_SHOW});
                }
                this.scrollTo(0, y, 0);
            }
        } else if (this.lastTouchEvent.verticalMovation < 0 && this.wrapper.scrollTop === this.wrapper.scrollHeight - this.wrapper.clientHeight) {
            //底部加载更多
            ev.preventDefault();
            if (!this.lastTouchEvent.overflow) {
                // 2.1 刚到底
                //刚开始往下拉 做个标记
                this.lastTouchEvent.overflow = 'bottom';
                this.lastTouchEvent.overflowStartClientY = ev.touches[0].clientY;
                this.setState({pullRefreshDown: STATE_PULLREFRESH_VERTICAL_SHOW});
                return false;
            } else {
                // 2.2 到底后继续拉
                let y = this.y = (ev.touches[0].clientY - this.lastTouchEvent.overflowStartClientY) / 3;
                if (y <= -40 && this.state.pullRefreshDown !== STATE_PULLREFRESH_VERTICAL_READY) { //到ready界限
                    this.setState({pullRefreshDown: STATE_PULLREFRESH_VERTICAL_READY});
                }
                if (y > -40 && this.state.pullRefreshDown !== STATE_PULLREFRESH_VERTICAL_SHOW) {
                    this.setState({pullRefreshDown: STATE_PULLREFRESH_VERTICAL_SHOW});
                }
                this.scrollTo(0, y, 0);
            }
        }
    }
    onTouchEnd (ev) {
        this.lastTouchEvent.touchEndTime = ev.timeStamp;
        this.lastTouchEvent.duration = this.lastTouchEvent.touchEndTime - this.lastTouchEvent.touchStartTime;
        if (this.lastTouchEvent.verticalMovation > 0) {
            switch (this.state.pullRefresh) {
                case STATE_PULLREFRESH_VERTICAL_LOADING:
                case STATE_PULLREFRESH_VERTICAL_NOMORE:
                    if (this.y < 50) {
                        this.scrollTo(0, 0, 500);
                        setTimeout(() => {
                            this.setState({pullRefresh: STATE_PULLREFRESH_VERTICAL_INIT});
                        }, 500);
                    } else {
                        this.scrollTo(0, 50, 500);
                    }
                    break;

                case STATE_PULLREFRESH_VERTICAL_READY:
                    this.setState({pullRefresh: STATE_PULLREFRESH_VERTICAL_LOADING});
                    this.scrollTo(0, 50, 500);
                    this.loadData('new').then(hasData => {
                        if (hasData) {
                            this.scrollTo(0, 0, 500);
                            setTimeout(() => {
                                this.setState({pullRefresh: STATE_PULLREFRESH_VERTICAL_INIT});
                            }, 500);
                        } else if (this.state.pullRefresh === STATE_PULLREFRESH_VERTICAL_LOADING) {
                            this.setState({pullRefresh: STATE_PULLREFRESH_VERTICAL_NOMORE});
                            setTimeout(() => {
                                this.scrollTo(0, 0, 500);
                                setTimeout(() => {
                                    this.setState({pullRefresh: STATE_PULLREFRESH_VERTICAL_INIT});
                                }, 500);
                            }, 1000);
                        } else {
                            // no op
                        }
                    });
                    break;

                default:
                    this.scrollTo(0, 0, 500);
            }
        } else if (this.lastTouchEvent.verticalMovation < 0) {
            switch (this.state.pullRefreshDown) {
                case STATE_PULLREFRESH_VERTICAL_LOADING:
                case STATE_PULLREFRESH_VERTICAL_NOMORE:
                    if (this.y > -50) {
                        this.scrollTo(0, 0, 500);
                        setTimeout(() => {
                            this.setState({pullRefreshDown: STATE_PULLREFRESH_VERTICAL_SHOW});
                        }, 500);
                    } else {
                        this.scrollTo(0, 0, 500);
                    }
                    break;

                case STATE_PULLREFRESH_VERTICAL_READY:
                    this.setState({pullRefreshDown: STATE_PULLREFRESH_VERTICAL_LOADING});
                    this.scrollTo(0, 0, 500);
                    this.loadData('before').then(hasData => {
                        if (hasData) {
                            setTimeout(() => {
                                this.setState({pullRefreshDown: STATE_PULLREFRESH_VERTICAL_SHOW});
                            }, 500);
                        } else if (this.state.pullRefreshDown === STATE_PULLREFRESH_VERTICAL_LOADING) {
                            this.setState({pullRefreshDown: STATE_PULLREFRESH_VERTICAL_NOMORE});
                            setTimeout(() => {
                                setTimeout(() => {
                                    this.setState({pullRefreshDown: STATE_PULLREFRESH_VERTICAL_SHOW});
                                }, 500);
                            }, 1000);
                        } else {
                            // no op
                        }
                    });
                    break;

                default:
                    this.scrollTo(0, 0, 500);
            }
        } else {
            return false;
        }
    }
    scrollTo (x, y, delay) {
        this.y = y;
        if (y === 0){
            this.lastTouchEvent.overflow = false;
        }
        let scrollerStyle = this.scroller.style;
        scrollerStyle['transform'] = `translate3d(${x}px, ${y}px, 0px) translateZ(0px)`;
        scrollerStyle['transitionDuration'] = `${delay}ms`;
        setTimeout(() => {
            scrollerStyle['transitionDuration'] = `0ms`;
        }, delay);
    }

    loadData (type) {
        console.log('request data!', type);
        return new Promise((resolve, reject) => {
            request.post('api.php')
                .type('form')
                .send({api: 'timeline', type})
                .end((err, res) => {
                    if (err) return resolve(false);
                    if (type === 'new') {
                        MainPageActions.newTimeLine(res.body.statuses);
                    } else if (type === 'before') {
                        MainPageActions.beforeTimeLine(res.body.statuses);
                    }
                    return resolve(true);
                });
        });
    }

    render () {
        let timeLineItems = this.props.data.map((cellObj, i) =>
            (<Cell key={cellObj.id} data={cellObj} />)
        );
        return (<main className="main" ref="wrapper">
            <div ref="pull-refresh"
                 className="pull-refresh"
                 style={{visibility: this.state.pullRefresh.visibility ? 'visible' : 'hidden'}}>
                <div className="pull-refresh-captain">{this.state.pullRefresh.captain}</div>
            </div>

            <div ref="pull-refresh-content"
                 className="pull-refresh-content"
                 style={{
                   transform: `translate3d(0px, 0px, 0px) translateZ(0px)`,
                   transitionDuration: `0ms`,
                   transitionTimingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1)'
                 }}
                 onTouchStart={this.onTouchStart.bind(this)}
                 onTouchMove={this.onTouchMove.bind(this)}
                 onTouchEnd={this.onTouchEnd.bind(this)}
                 onTouchCancel={this.onTouchEnd.bind(this)}
            >
                {timeLineItems}
            </div>

            <div ref="pull-refresh-down"
                 className="pull-refresh pull-refresh-down"
                 style={{visibility: this.state.pullRefreshDown.visibility ? 'visible' : 'hidden'}}>
                <div className="pull-refresh-captain">{this.state.pullRefreshDown.captain}</div>
            </div>
        </main>);
    }
}