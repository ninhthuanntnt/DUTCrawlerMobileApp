import { FETCH_NOTIFICATION, FETCH_SCORE, FETCH_SCHEDULE, FETCH_LOGINED_DATA, CLEAR_LOGINED_DATA, SERVER_DOMAIN } from "../const/ActionType"
import Axios from "axios";
import * as SecureStore from 'expo-secure-store';

export const loadNotification = (type, page) => {
    return (dispatch) => {
        console.log("Called");
        Axios({
            method: 'GET',
            url: `${SERVER_DOMAIN}/api/notifications?notiType=${type}&pageNumber=${page}`
        }).then(res => {
            dispatch(fetchNotification(res.data));
        })
    }
}

export const login = (username, password) => {
    return (dispatch) => {
        Axios({
            method: 'POST',
            url: `${SERVER_DOMAIN}/api/login`,
            data: {
                username,
                password
            }
        }).then(res => {
            dispatch(fetchLoginedData(res.data));
        }).catch(err =>{
            dispatch(fetchLoginedData(err.response.data));
        });
    }
}

export const loadScore = (token) => {
    console.log(`${SERVER_DOMAIN}/api/score`);
    return (dispatch) => {
        Axios({
            method: "GET",
            url: `${SERVER_DOMAIN}/api/score`,
            headers: {
                'Authorization': 'Bearer ' + token
            },
            withCredentials: true
        }).then(res => {
            dispatch(fetchScore(res.data));
        });
    }
}
export const loadSchedule = (token, type) => {
    console.log(`${SERVER_DOMAIN}/api/schedule?type=${type}`);
    

    return (dispatch) => {
        Axios({
            method: "GET",
            url: `${SERVER_DOMAIN}/api/schedule?type=${type}`,
            headers: {
                'Authorization': 'Bearer ' + token
            },
            withCredentials: true
        }).then(res => {
            dispatch(fetchSchedule(res.data));
        });
    }
}

export const fetchLoginedData = (data) => {
    return {
        type: FETCH_LOGINED_DATA,
        data
    }
}

export const loadDataFromLocal = () => {
    let data = {
        token: SecureStore.getItemAsync("token"),
        additionalData: SecureStore.getItemAsync("class")
    }
    return dispatch => dispatch(fetchLoginedData(data));
}

export const fetchScore = (data) => {
    return {
        type: FETCH_SCORE,
        data
    }
}

export const fetchSchedule = (data) => {
    return {
        type: FETCH_SCHEDULE,
        data: data
    }
}

export const logout = () => {
    return {
        type: CLEAR_LOGINED_DATA
    }
}

export const resetLoginData = () =>{
    return {
        type: CLEAR_LOGINED_DATA
    }
}

export const fetchNotification = (data) => {
    return {
        type: FETCH_NOTIFICATION,
        data: data
    }
}