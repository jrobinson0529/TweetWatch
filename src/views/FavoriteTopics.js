import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';
import PageHeader from '../components/PageHeader';
import TopicCard from '../components/TopicCard';
import { getFavoriteTopics } from '../helpers/data/topicData';

function FavoriteTopics({ uid }) {
  const [favoriteTopics, setFavoriteTopics] = useState([]);
  useState(() => {
    getFavoriteTopics(uid).then(setFavoriteTopics);
  }, []);
  return (
    <div>
      <PageHeader headTitle='Favorite Topics'/>
      <Card.Group style={{ width: '60%', margin: 'auto' }}>
        {favoriteTopics?.map((topicInfo) => <TopicCard key={topicInfo.id} {...topicInfo}/>)}
      </Card.Group>
    </div>
  );
}
FavoriteTopics.propTypes = {
  uid: PropTypes.string,
};
export default FavoriteTopics;
