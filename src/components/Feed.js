import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

function Feed({ tweets }) {
  return (
    <div style={{
      width: '50%',
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
        {tweets?.map((tweet) => <div key={tweet} className='tweet-card'>
           <h1>{tweet}</h1>;
            <Button>Save Tweet</Button>
          </div>)
        }
    </div>
  );
}
Feed.propTypes = {
  tweets: PropTypes.array
};

export default Feed;
