import React, { useState } from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { Button } from 'semantic-ui-react';

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
      width: '50%',
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
        {tweetArray.map((tweet) => <div key={tweet} className='tweet-card'>
            <TwitterTweetEmbed tweetId={tweet} className='tweet-embed-card'/>
            <Button>Save Tweet</Button>
          </div>)
        }
    </div>
  );
}

export default Feed;
