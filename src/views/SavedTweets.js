import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { Button } from 'semantic-ui-react';
import PageHeader from '../components/PageHeader';
import getSavedTweets from '../helpers/data/savedTweetsData';

function SavedTweets({ uid }) {
  const [savedTweets, setSavedTweets] = useState([]);
  useEffect(() => {
    getSavedTweets(uid).then(setSavedTweets);
  }, []);

  return (
    <div>
     <PageHeader headTitle='Saved Tweets' description='View these for later'/>
     <div className='saved-tweet-container'>
      {savedTweets.map((tweet) => <div key={tweet.id}><TwitterTweetEmbed tweetId={tweet.tweetId} className='saved-tweet-card'/><Button>&#10006;</Button></div>)}
     </div>

    </div>
  );
}
SavedTweets.propTypes = {
  uid: PropTypes.string,
};
export default SavedTweets;
