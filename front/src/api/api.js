  
import * as axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000'
});

export const numberAPI = {
    async getStatistic(date) {
        return await instance.get(`/statistic?date=${date}`);
    },
    async newVote(number) {
        return await instance.post('/vote', {number});
    },
    async getLogs() {
        return await instance.get('/logs');
    }
}