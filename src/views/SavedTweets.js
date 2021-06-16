import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { Button } from 'semantic-ui-react';
import PageHeader from '../components/PageHeader';
import { deleteSavedTweet, getSavedTweets } from '../helpers/data/savedTweetsData';

function SavedTweets({ uid }) {
  const [savedTweets, setSavedTweets] = useState([]);
  useEffect(() => {
    getSavedTweets(uid).then(setSavedTweets);
  }, []);
  const SavedTweetCard = ({ id, tweetId }) => {
    const handleClick = () => {
      deleteSavedTweet(uid, id).then((response) => {
        setSavedTweets(response);
      });
    };
    return (
      <div>
        <TwitterTweetEmbed tweetId={tweetId} className='saved-tweet-card'/><Button onClick={handleClick}>&#10006;</Button>
        </div>
    );
  };
  SavedTweetCard.propTypes = {
    tweetId: PropTypes.string,
    id: PropTypes.string,
  };
  return (
    <div>
     <PageHeader headTitle='Saved Tweets' description='View these for later'/>
     <div className='saved-tweet-container'>
      {savedTweets.map((tweet) => <SavedTweetCard key={tweet.id} id={tweet.id} tweetId={tweet.tweetId}/>)}
     </div>
    </div>
  );
}
SavedTweets.propTypes = {
  uid: PropTypes.string,
};
export default SavedTweets;
