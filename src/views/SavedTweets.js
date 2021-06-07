import React, { useState } from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { Button } from 'semantic-ui-react';
import PageHeader from '../components/PageHeader';

function SavedTweets() {
  const [tweetArray] = useState([
    '1400927883971895297',
    '1400724673558614020',
    '1400932950762532868',
    '1400494817168216066',
    '1399330043126484992',
    '1401184173264707590'
  ]);

  return (
    <div>
     <PageHeader headTitle='Saved Tweets' description='View these for later'/>
     <div className='saved-tweet-container'>
      {tweetArray.map((tweetId) => <div key={tweetId}><TwitterTweetEmbed tweetId={tweetId} className='saved-tweet-card'/><Button>&#10006;</Button></div>)}
     </div>

    </div>
  );
}

export default SavedTweets;
