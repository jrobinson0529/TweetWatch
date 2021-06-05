import React, { useState } from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';

function Feed() {
  const [tweetArray] = useState([
    '1400927883971895297',
    '1400724673558614020',
    '1400932950762532868',
    '1400494817168216066',
    '1399330043126484992',
    '1401184173264707590'
  ]);

  return (
    <div style={{
      width: '75%',
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
        {tweetArray.map((tweet) => <TwitterTweetEmbed key={tweet} tweetId={tweet} style={{ maxWidth: '100%!important' }}/>)
        }
    </div>
  );
}

export default Feed;
