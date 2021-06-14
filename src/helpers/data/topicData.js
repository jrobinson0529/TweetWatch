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
const createTopic = (topicObject) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/topics.json`, topicObject)
    .then((response) => {
      const body = { id: response.data.name };
      axios.patch(`${dbUrl}/topics/${response.data.name}.json`, body).then((res) => resolve(res.data.id));
    }).catch((error) => reject(error));
});
export { getFavoriteTopics, getSingleTopic, createTopic };
