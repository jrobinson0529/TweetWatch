/* eslint-disable quotes */
/* eslint-disable quote-props */
import axios from 'axios';
import { twitterConfig } from '../apiKeys';
import { getCategoryTweeters } from './categoryData';

const { bearerToken } = twitterConfig;
const corsProxy = 'https://green-star-5960.jesse0529robinson.workers.dev/?';
const getTweeterInfo = (usernames) => new Promise((resolve, reject) => {
  axios.get(`${corsProxy}https://api.twitter.com/2/users/by?usernames=${usernames}&user.fields=id,name,profile_image_url,protected,username,verified`, {
    headers: {
      "Authorization": `Bearer ${bearerToken}`
    }
  })
    .then((response) => resolve((Object.values(response.data)[0])))
    .catch((error) => reject(error));
});
const getCategoryTweeterInfo = (categoryId) => new Promise((resolve, reject) => {
  getCategoryTweeters(categoryId).then((response) => {
    getTweeterInfo(response.map((tweeter) => tweeter.twitterId)).then(resolve)
      .catch((error) => reject(error));
  });
});
const getUserTweets = (username) => new Promise((resolve, reject) => {
  axios.get(`${corsProxy}https://api.twitter.com/2/tweets/search/recent?query=from:${username}&max_results=25`, {
    headers: {
      "Authorization": `Bearer ${bearerToken}`
    }
  })
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});
const contains = (target, pattern) => {
  let value = 0;
  pattern.forEach((word) => {
    value += target.includes(word.toLowerCase());
  });
  return (value === 1);
};
const getUserTweetsFiltered = (usernames, searchParams) => new Promise((resolve, reject) => {
  const mappedPromises = usernames.map((username) => getUserTweets(username));
  Promise.all(mappedPromises).then((response) => {
    let filteredTweetsArray = [];
    const removeEmptyResponseArray = response.filter((array) => array.length > 1);
    const tweetObjectArrays = removeEmptyResponseArray.map((array) => array[0]);
    const tweets = tweetObjectArrays.map((array) => array.map((tweet) => tweet));
    const filteredTweets = tweets.map((array) => array.filter((tweet) => contains(tweet.text.toLowerCase(), searchParams)));
    filteredTweets.forEach((array) => filteredTweetsArray.push(...array));
    filteredTweetsArray = filteredTweetsArray.map((tweet) => tweet.id);
    resolve(filteredTweetsArray);
  }).catch((error) => reject(error));
});

export {
  getCategoryTweeterInfo, getTweeterInfo, getUserTweets, getUserTweetsFiltered
};
