import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Label } from 'semantic-ui-react';
import Feed from '../components/Feed';
import PageHeader from '../components/PageHeader';

function Topic() {
  const { id } = useParams();
  const [searchParams] = useState([
    'burger',
    'lunch',
    'brunch',
    'hotdog'
  ]);

  return (
    <>
      <PageHeader headTitle={id} description='Topic Description Here' />
      <Label.Group className='topic-label-container' color='teal' size='large'>
        {searchParams.map((string, i) => <Label key={i} content={string}/>)}
      </Label.Group>
      <Feed />
    </>
  );
}

export default Topic;
