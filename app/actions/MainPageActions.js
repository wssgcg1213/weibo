/**
 * Created at 16/1/27.
 * @Author Ling.
 * @Email i@zeroling.com
 */
import AppDispatcher from '../dispatcher/AppDispatcher';

let MainPageActions = {
    newTimeLine(data) {
        AppDispatcher.dispatch({
            actionType: 'ADD_NEW_TIMELINE',
            data: data
        });
    },
    beforeTimeLine(data) {
        AppDispatcher.dispatch({
            actionType: 'ADD_OLD_TIMELINE',
            data: data
        });
    }
};

export default MainPageActions;