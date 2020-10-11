import { numberAPI } from '../../api/api';

var _ = require('lodash');

const GET_LOGS = 'GET_LOGS';
const GET_VOTES = 'GET_VOTES';

let initialState = {
    votes: [],
    logs: []
}

const votesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LOGS: {
            let stateCopy = _.cloneDeep(state);
            stateCopy.logs = [...action.logs];
            return stateCopy;
        }
        case GET_VOTES: {
            let stateCopy = _.cloneDeep(state);
            stateCopy.votes = [...action.votes];
            return stateCopy;
        }
        default: return state;
    }
}

export const getLogs = (logs) => ({
    type: GET_LOGS,
    logs
});
export const getVotes = (votes) => ({
    type: GET_VOTES,
    votes
});

export const getLogsThunkCreator = () => {
    return async (dispatch) => {
        try {
            const response = await numberAPI.getLogs();
            dispatch(getLogs(response.data));
        } catch (error) { }
    }
}
export const getVotesThunkCreator = (date) => {
    return async (dispatch) => {
        try {
            const response = await numberAPI.getStatistic(date);
            dispatch(getVotes(response.data));
            dispatch(getLogsThunkCreator());
        } catch (error) { }
    }
}
export const newVoteThunkCreator = (number, date) => {
    return async (dispatch) => {
        try {
            const response = await numberAPI.newVote(number);
            dispatch(getVotesThunkCreator(date));
        } catch (error) { }
    }
}


export default votesReducer;