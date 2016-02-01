/**
 * Created at 16/1/27.
 * @Author Ling.
 * @Email i@zeroling.com
 */
import { EventEmitter } from 'events';

export default class WeiboStore extends EventEmitter {
    static pageStatus = "timeline";
    static userInfo = {};
    static timeLine = [];

    static getUserInfo () {
        return WeiboStore.userInfo;
    }

    static setUserInfo (info) {
        return WeiboStore.userInfo = info;
    }
    static getPage() {
        return WeiboStore.pageStatus;
    }
    static setPage(page) {
        WeiboStore.pageStatus = page;
        return page;
    }
    static getTimeLine () {
        return WeiboStore.timeLine;
    }
    static addTimeLine (data) {
        if (Array.isArray(data)) {
            WeiboStore.timeLine.concat(data);
        } else {
            WeiboStore.timeLine.push(data);
        }
    }

}