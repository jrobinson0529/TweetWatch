import axios from 'axios';
import { firebaseConfig } from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;
const getSavedTweets = (uid) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/savedTweets.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});
const saveTweet = (uid, tweetObject) => new Promise((resolve, reject) => {
  getSavedTweets(uid)
    .then((response) => {
      const checkExistingTweet = response.filter(
        (tweet) => tweet.tweetId === tweetObject.tweetId
      );
      if (checkExistingTweet.length === 0) {
        axios
          .post(`${dbUrl}/savedTweets.json`, tweetObject)
          .then((res) => {
            const body = { id: res.data.name };
            axios.patch(`${dbUrl}/savedTweets/${res.data.name}.json`, body);
          })
          .then(() => resolve(true));
      }
    })
    .catch((error) => reject(error));
});
const deleteSavedTweet = (uid, id) => new Promise((resolve, reject) => {
  axios
    .delete(`${dbUrl}/savedTweets/${id}.json`)
    .then(() => {
      getSavedTweets(uid).then(resolve);
    })
    .catch((error) => reject(error));
});
export { saveTweet, getSavedTweets, deleteSavedTweet };
