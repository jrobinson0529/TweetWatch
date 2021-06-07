import axios from 'axios';
import { firebaseConfig } from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;
const getUserCategories = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/categories.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});
const getCategoryTopics = (categoryId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/topics.json?orderBy="categoryId"&equalTo="${categoryId}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});
const getCategoryTweeters = (categoryId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/tweeters.json?orderBy="categoryId"&equalTo="${categoryId}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});
export {
  getUserCategories,
  getCategoryTopics,
  getCategoryTweeters
};
