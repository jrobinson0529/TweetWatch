import React, { useState } from 'react';
import { Card } from 'semantic-ui-react';
import PageHeader from '../components/PageHeader';
import TopicCard from '../components/TopicCard';

function FavoriteTopics() {
  const [topics] = useState([
    {
      id: '1141414141515',
      title: 'Burgers',
      iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg',
      description: 'topic description topic description',
      searchParams: ['recipe', 'burger', 'burgers', 'lunch', 'ground beef'],
      favorite: true,
    },
    {
      id: '114123123125',
      title: 'Animal Crossing',
      iconUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Animal_Crossing_Logo.png/250px-Animal_Crossing_Logo.png',
      description: 'topic description topic description',
      searchParams: ['animal', 'crossing', 'content', 'patch'],
      favorite: true,
    },
    {
      id: '12351255515',
      title: 'SpaceX',
      iconUrl: 'https://i.guim.co.uk/img/media/5355cb87303398c141223da4e8fba2fe3fe9c3ac/0_99_2991_1795/master/2991.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=c058e8daea9c61f4e2f008ebf463909b',
      description: 'topic description topic description',
      searchParams: ['spacex', 'launch'],
      favorite: true,
    },
  ]);
  return (
    <div>
      <PageHeader headTitle='Favorite Topics'/>
      <Card.Group style={{ width: '60%', margin: 'auto' }}>
        {topics.map((topicInfo) => <TopicCard key={topicInfo.id} {...topicInfo}/>)}
      </Card.Group>
    </div>
  );
}

export default FavoriteTopics;
