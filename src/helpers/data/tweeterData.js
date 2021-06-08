/* eslint-disable quotes */
/* eslint-disable quote-props */
import axios from 'axios';
import { twitterConfig } from '../apiKeys';

const { bearerToken } = twitterConfig;
const corsApiUrl = 'https://cors-anywhere.herokuapp.com/';
const getTweeterInfo = (usernames) => new Promise((resolve, reject) => {
  axios.get(`${corsApiUrl}https://api.twitter.com/2/users/by?usernames=${usernames}&user.fields=id,name,profile_image_url,protected,username,verified`, {
    headers: {
      "Authorization": `Bearer ${bearerToken}`
    }
  })
    .then((response) => resolve((Object.values(response.data)[0])))
    .catch((error) => reject(error));
});

export default getTweeterInfo;
