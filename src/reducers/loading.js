import { START_LOADING, STOP_LOADING } from '../const/ActionType';

var initState = false;
export const loading = (state = initState, action) => {
    switch (action.type) {
        case START_LOADING:
            return true;
        case STOP_LOADING:
            return false;
        default:
            return state;
    }
}