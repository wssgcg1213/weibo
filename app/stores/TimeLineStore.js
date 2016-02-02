/**
 * Created at 16/1/30.
 * @Author Ling.
 * @Email i@zeroling.com
 */
import { EventEmitter } from 'events';
let TimeLineStore = Object.assign({}, EventEmitter.prototype, {
    timeLine: [],
    timeLineHash: {},

    getAll () {
        return this.timeLine;
    },

    addNewItemHandler (data, isNew) {
        data = this.deduplicate(data);
        if (!isNew) {
            this.timeLine = this.timeLine.concat(data);
        } else {
            this.timeLine = data.concat(this.timeLine);
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

    /**
     * 去重 return arr
     * @param newTimeLine
     * @returns {*}
     */
    deduplicate (newTimeLine) {
        if (Array.isArray(newTimeLine)) { //arr
            return newTimeLine.filter(obj => {
                if (!(obj.id in this.timeLineHash)) {
                    this.timeLineHash[obj.id] = obj.id;
                    return true;
                } else {
                    return false;
                }
            });
        } else { //obj
            if (!(newTimeLine.id in this.timeLineHash)) {
                this.timeLineHash[newTimeLine.id] = newTimeLine.id;
                return [newTimeLine];
            } else {
                return [];
            }
        }
    }
});

export default TimeLineStore;