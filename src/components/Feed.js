import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { Button, Icon } from 'semantic-ui-react';
import { getCurrentUsersUid } from '../helpers/data/userData';
import { saveTweet } from '../helpers/data/savedTweetsData';

function Feed({ tweets }) {
  const TweetCard = ({ tweetId }) => {
    const uid = getCurrentUsersUid();
    const [toggle, setToggle] = useState('Save Tweet');
    const [tweet] = useState({
      uid,
      tweetId,
    });
    let saveWait;
    const timeout = () => {
      saveWait = setTimeout(() => {
        setToggle('Tweet is already saved');
      }, 5000);
    };
    const handleClick = () => {
      timeout();
      setToggle(<Icon name='spinner' loading/>);
      saveTweet(uid, tweet).then(() => {
        setToggle('Saved!');
        clearTimeout(saveWait);
      });
    };

    return (
          <div className='tweet-card'>
            <TwitterTweetEmbed tweetId={tweetId} className='tweet-embed-card'/>
            <Button onClick={handleClick}>{toggle}</Button>
          </div>
    );
  };
  TweetCard.propTypes = {
    tweetId: PropTypes.string,
  };
  return (
    <div style={{
      width: '50%',
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
        {tweets?.map((tweet) => <TweetCard key={tweet} tweetId={tweet}/>)
        }
    </div>
  );
}
Feed.propTypes = {
  tweets: PropTypes.array
};

export default Feed;
