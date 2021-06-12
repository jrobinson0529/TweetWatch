import axios from 'axios';
import { firebaseConfig } from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;
const getSingleTopic = (topicId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/topics/${topicId}.json`)
    .then((response) => resolve((response.data)))
    .catch((error) => reject(error));
});
const getFavoriteTopics = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/topics.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => resolve(Object.values(response.data).filter((topic) => topic.favorite)))
    .catch((error) => reject(error));
});
export { getFavoriteTopics, getSingleTopic };
