/**
 * Created at 16/1/30.
 * @Author Ling.
 * @Email i@zeroling.com
 */
import { Dispatcher } from 'flux';
const AppDispatcher = new Dispatcher();

import TimeLineStore from '../stores/TimeLineStore';
import UserInfoStore from '../stores/UserInfoStore';
AppDispatcher.register(action => {
    switch (action.actionType) {
        case 'ADD_NEW_TIMELINE':
            TimeLineStore.addNewItemHandler(action.data, true);
            TimeLineStore.emitChange();
            break;

        case 'ADD_OLD_TIMELINE':
            TimeLineStore.addNewItemHandler(action.data);
            TimeLineStore.emitChange();
            break;

        case 'SET_USERINFO':
            UserInfoStore.setUserInfo(action.data);
            UserInfoStore.emitChange();
            break;
        default:
            //no op
    }
});

export default AppDispatcher;