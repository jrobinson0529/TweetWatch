import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button, Card, Image, Label
} from 'semantic-ui-react';

function TopicCard({ ...topicInfo }) {
  const history = useHistory();
  const handleClick = (type) => {
    switch (type) {
      case 'view':
        history.push(`/topic/${topicInfo.id}`);
        break;
      case 'delete':
        console.warn('delete');
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
          <Button basic color='red'>
            Remove
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
}

export default TopicCard;
