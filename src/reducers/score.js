import { FETCH_SCORE } from "../const/ActionType";

var initState = {
    detailedScores: [],
    totalScores: []
};

export const score = (state = initState, action) => {

    let score = {...state};
    switch (action.type) {
        case FETCH_SCORE:
            let detailedScores = action.data.scores;
            let totalScores = action.data.totalScores;
            for (let s of detailedScores) {
                for(let key in s){
                    s[key] = (s[key] === -1)?"":s[key]; 
                }
            }
            for (let s of totalScores) {
                for(let key in s){
                    s[key] = (s[key] === -1)?"":s[key]; 
                }
            }
            score = {
                detailedScores,
                totalScores
            }
            return score;
        default:
            return state;
    }
}