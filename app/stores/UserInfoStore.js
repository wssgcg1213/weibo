/**
 * Created at 16/2/2.
 * @Author Ling.
 * @Email i@zeroling.com
 */
/**
 * Created at 16/1/30.
 * @Author Ling.
 * @Email i@zeroling.com
 */
import { EventEmitter } from 'events';
import request from 'superagent';

let UserInfoStore = Object.assign({}, EventEmitter.prototype, {
    userInfo: {},

    getUserInfo () {
        return this.userInfo;
    },

    setUserInfo (userInfo) {
        return this.userInfo = userInfo;
    },

    emitChange () {
        this.emit('change');
    },

    addChangeListener (cb) {
        this.on('change', cb);
    },

    removeChangeListener (cb) {
        this.removeListener('change', cb);
    }
});

export default TimeLineStore;