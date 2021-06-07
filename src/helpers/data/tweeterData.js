/* eslint-disable quotes */
/* eslint-disable quote-props */
import axios from 'axios';
import { twitterConfig } from '../apiKeys';

const { bearerToken } = twitterConfig;
const getTweeterInfo = (usernames) => new Promise((resolve, reject) => {
  axios.get(`https://api.twitter.com/2/users/by?usernames=${usernames.join(',')}&user.fields=id,name,profile_image_url,protected,username,verified`, {
    headers: {
      "Authorization": `Bearer ${bearerToken}`
    }
  })
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

export default getTweeterInfo;
