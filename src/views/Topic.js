import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Label } from 'semantic-ui-react';
import Feed from '../components/Feed';
import PageHeader from '../components/PageHeader';
import getSingleTopic from '../helpers/data/topicData';

function Topic() {
  const { id } = useParams();
  const [topic, setTopic] = useState({
    searchParams: []
  });
  const [category, setCategory] = useState({});
  useEffect(() => {
    getSingleTopic(id).then(setTopic);
  }, []);
  return (
    <>
      <PageHeader headTitle={topic?.title} description={topic.description}/>
      <Label.Group className='topic-label-container' color='teal' size='large'>
        {topic.searchParams.map((string, i) => <Label key={i} content={string}/>)}
      </Label.Group>
      <Feed />
    </>
  );
}

export default Topic;
