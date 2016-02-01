import React from 'react';

import Gallery from './Gallery.jsx';
require('../style/Cell.less');

export default class Cell extends React.Component {
  constructor(...args) {
    super(...args);
  }

  render () {

    let elegantTime = Cell.formatTime(new Date(this.props.data.time));
    return (<article className="cell">
      <img className="head" src={this.props.data.head} alt="head"/>
      <div className="cell-main">
        <div className="cell-basic">
          <span className="username">{this.props.data.username}</span>
          <span className="time">{elegantTime.toString()}</span>
        </div>
        <p className="cell-content" dangerouslySetInnerHTML={{__html: Cell.addLinks(this.props.data.content)}} />
        <Gallery imgList={this.props.data.imgList}/>
        <div className="cell-footer">

          <span className="cell-source" dangerouslySetInnerHTML={{__html: `来自 ${this.props.data.source}`}} />
        </div>
      </div>
    </article>);
  }

  /**
   * 为微博正文添加超链接
   * @param text
   */
  static addLinks(text) {
    return text.replace(/(http:\/\/t\.cn\/\w+)/gi, $1 => `<a class="content-link" href="${$1}" rel="nofollow" target="_blank">
      <span class="left">网页</span>
      <span class="right">></span>
    </a>`)
        .replace(/#([\s\S]+)#/gi, ($1, $2) => `<a class="huati-link" href="http://huati.weibo.com/k/${$2}">${$1}</a>`)
  }
  static formatTime(d) {
    if (d.constructor !== Date) throw new TypeError('not a Date obj');
    const now = new Date();
    const gap = now - d;
    if (gap < 60 * 1000) { //less than 1 minute
      return '刚刚';
    } else if (gap < 60 * 1000 * 60) { //less than an hour
      return parseInt(gap/60000) + ' 分钟前';
    } else if (gap < 3600 * 1000 * 24) { //less than a day
      return parseInt(gap/3600000) + ' 小时前';
    } else {
      return parseInt(gap/24/3600000) + ' 天前';
    }
  }
}