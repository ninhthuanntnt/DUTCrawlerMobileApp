import { FETCH_LOGINED_DATA, CLEAR_LOGINED_DATA } from '../const/ActionType';
import * as SecureStore from 'expo-secure-store';
var initState = {
    token: null,
    class: null,
    isFailed: false,
};

export const login = (state = initState, action) => {

    let loginedData = { ...state };
    console.log(action.type);
    switch (action.type) {
        case FETCH_LOGINED_DATA:
            let status = action.data.status;
            if(status){
                if(status === 500 || status === 401 || status === 403){
                    loginedData.isFailed = true;
                    return loginedData;
                }
            }

            loginedData.token = action.data.token;
            loginedData.class = action.data.additionalData;
            loginedData.semester = renderListSemester(loginedData.class);

            SecureStore.setItemAsync("token", loginedData.token);
            SecureStore.setItemAsync("class", loginedData.class);

            return loginedData;
        case CLEAR_LOGINED_DATA:
            console.log(action.data);
            loginedData.token = null;
            loginedData.class = null;
            loginedData.isFailed = false;
            
            SecureStore.deleteItemAsync("token");
            SecureStore.deleteItemAsync("class");

            return loginedData;
        default:
            return state;
    }
}

function renderListSemester(userClass) {
    if (userClass == null) {
        return null;
    }

    let startYear = +("20" + userClass.substring(0, 2));
    let endYear = startYear + 1;
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let semester = []

    while (+endYear <= currentYear + 1) {
        semester.push(`1/${startYear}-${endYear}`);
        semester.push(`2/${startYear}-${endYear}`);
        semester.push(`Hè/${startYear}-${endYear}`);
        startYear += 1;
        endYear += 1;
    }

    if (currentYear < endYear) {
        semester.pop();
        semester.pop();
    } else if (currentDate.getMonth() < 7) {
        semester.pop();
    }
    return semester;
}
