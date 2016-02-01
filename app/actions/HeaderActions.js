/**
 * Created at 16/1/27.
 * @Author Ling.
 * @Email i@zeroling.com
 */
import AppDispatcher from '../dispatcher/AppDispatcher';

let HeaderActions = {
    setUserInfo(userInfo) {
        AppDispatcher.dispatch({
            actionType: 'SET_USERINFO',
            data: userInfo
        });
    }
};

export default HeaderActions;