import axios from 'axios';
import { firebaseConfig } from '../apiKeys';
import { getCategoryTweeters, getUserCategories } from './categoryData';
import { deleteTopic, getCategoryTopics } from './topicData';
import { getTweeterInfo } from './tweeterData';

const dbUrl = firebaseConfig.databaseURL;
const getCategoryTweeterInfo = (categoryId) => new Promise((resolve, reject) => {
  getCategoryTweeters(categoryId).then((response) => {
    if (response.length !== 0) {
      getTweeterInfo(response.map((tweeter) => tweeter.twitterId)).then(resolve);
    }
  }).catch((error) => reject(error));
});
const createTweeter = (categoryId, tweeterObject) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/tweeters.json`, tweeterObject)
    .then((response) => {
      const body = { id: response.data.name };
      axios.patch(`${dbUrl}/tweeters/${response.data.name}.json`, body).then(() => getCategoryTweeterInfo(categoryId).then(resolve));
    }).catch((error) => reject(error));
});
const getSingleTweeterbyUsername = (username) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/tweeters.json?orderBy="twitterId"&equalTo="${username}"`)
    .then((response) => resolve(Object.values(response.data)[0]))
    .catch((error) => reject(error));
});
const deleteTweeter = (username) => new Promise((resolve, reject) => {
  getSingleTweeterbyUsername(username).then((response) => {
    axios.delete(`${dbUrl}/tweeters/${response.id}.json`)
      .then(() => {
        getCategoryTweeterInfo(response.categoryId).then(resolve);
      });
  }).catch((error) => reject(error));
});
const deleteCategory = (uid, categoryId) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/categories/${categoryId}.json`).then(() => {
    getCategoryTweeters(categoryId).then((response) => {
      const deleteArray = response.map((tweeter) => deleteTweeter(tweeter.twitterId));
      Promise.all(deleteArray);
    });
    getCategoryTopics(categoryId).then((response) => {
      const deleteArray = response.map((topic) => deleteTopic(topic.id));
      Promise.all(deleteArray).then(() => {
        getUserCategories(uid).then(resolve);
      });
    });
  }).catch((error) => reject(error));
});
export {
  createTweeter, getCategoryTweeterInfo, deleteTweeter, deleteCategory, getSingleTweeterbyUsername
};
