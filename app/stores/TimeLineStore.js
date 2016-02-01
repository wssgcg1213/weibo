/**
 * Created at 16/1/30.
 * @Author Ling.
 * @Email i@zeroling.com
 */
import { EventEmitter } from 'events';
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
    }
});

export default TimeLineStore;