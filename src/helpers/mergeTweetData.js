import { getCategoryTweeterInfo } from './data/categoryTweeterData';
import { getCategoryTopics } from './data/topicData';
import { getUserTweetsFiltered } from './data/tweeterData';

const mergeTweetData = (id, setTweeters, setTweets) => new Promise(() => {
  const paramArray = [];
  Promise.all([getCategoryTweeterInfo(id), getCategoryTopics(id)])
    .then((response) => {
      setTweeters(response[0]);
      response[1].forEach((object) => paramArray.push(...object.searchParams));
      const tweeterUsernames = response[0].map((tweeterObject) => tweeterObject.username);
      getUserTweetsFiltered(tweeterUsernames, paramArray).then(setTweets);
    });
});
export default mergeTweetData;
