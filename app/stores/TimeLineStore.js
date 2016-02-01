/**
 * Created at 16/1/30.
 * @Author Ling.
 * @Email i@zeroling.com
 */
import { EventEmitter } from 'events';
import request from 'superagent';
import __MOCK_DATA__ from 'json!../mock.json';
function mockTimeLine () {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(__MOCK_DATA__.timeline);
        }, 2000);
    });
}

let TimeLineStore = Object.assign({}, EventEmitter.prototype, {
    timeLine: [],

    getAll () {
        return this.timeLine;
    },

    addNewItemHandler (data, isNew) {
        if (!isNew) {
            if (Array.isArray(data)) {
                this.timeLine = this.timeLine.concat(data);
            } else {
                this.timeLine.push(data);
            }
        } else {
            if (Array.isArray(data)) {
                this.timeLine = data.concat(this.timeLine);
            } else {
                this.timeLine.unshift(data);
            }
        }
    },

    emitChange () {
        this.emit('change');
    },

    addChangeListener (cb) {
        this.on('change', cb);
    },

    removeChangeListener (cb) {
        this.removeListener('change', cb);
    },

    ajaxData (type) {
        switch (type) {
            case 'new':
            case 'more':
                break;
            default:
                return Promise.resolve(false);
        }
        return new Promise ((resolve, reject) => {
            setTimeout(() => {

                resolve(true);
            }, 2000);
        });
    }
});

export default TimeLineStore;