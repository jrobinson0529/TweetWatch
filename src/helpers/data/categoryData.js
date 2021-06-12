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

const getSingleCategory = (categoryId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/categories/${categoryId}.json`)
    .then((response) => resolve((response.data)))
    .catch((error) => reject(error));
});
const createCategory = (categoryObject) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/categories.json`, categoryObject)
    .then((response) => {
      const body = { id: response.data.name };
      axios.patch(`${dbUrl}/categories/${response.data.name}.json`, body).then((res) => resolve(res.data.id));
    }).catch((error) => reject(error));
});
export {
  getUserCategories,
  getCategoryTopics,
  getCategoryTweeters,
  getSingleCategory,
  createCategory
};
