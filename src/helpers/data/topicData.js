import axios from 'axios';
import { firebaseConfig } from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;
const getSingleTopic = (topicId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/topics/${topicId}.json`)
    .then((response) => resolve((response.data)))
    .catch((error) => reject(error));
});

export default getSingleTopic;
