import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Button, Card, Image, Label
} from 'semantic-ui-react';
import { favoriteTopic, getFavoriteTopics } from '../helpers/data/topicData';

function TopicCard({ setFavoriteTopics, uid, ...topicInfo }) {
  const history = useHistory();
  const handleClick = (type) => {
    switch (type) {
      case 'view':
        history.push(`/topic/${topicInfo.id}`);
        break;
      case 'delete':
        favoriteTopic(topicInfo.id, {
          favorite: false
        }).then(() => getFavoriteTopics(uid).then(setFavoriteTopics));
        break;
      default:
    }
  };
  return (
    <Card>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src={topicInfo.iconUrl}
        />
        <Card.Header>{topicInfo.title}</Card.Header>
        <Card.Meta>{topicInfo.searchParams.map((param, i) => <Label key={i} content={param}/>)}</Card.Meta>
        <Card.Description>
         {topicInfo.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green' onClick={() => handleClick('view')}>
            View
          </Button>
          <Button basic color='red' onClick={() => handleClick('delete')}>
            Remove
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
}
TopicCard.propTypes = {
  setFavoriteTopics: PropTypes.func,
  uid: PropTypes.string,
};

export default TopicCard;
