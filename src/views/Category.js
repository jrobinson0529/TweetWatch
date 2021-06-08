import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Icon, Label } from 'semantic-ui-react';
import Feed from '../components/Feed';
import PageHeader from '../components/PageHeader';
import { getCategoryTweeters } from '../helpers/data/categoryData';
import getTweeterInfo from '../helpers/data/tweeterData';

function Category() {
  const { id } = useParams();
  const [tweeters, setTweeters] = useState([]);
  useEffect(() => {
    getCategoryTweeters(id).then((response) => {
      getTweeterInfo(response.map((tweeter) => tweeter.twitterId)).then((tweeterInfo) => setTweeters(tweeterInfo));
    });
  }, []);
  const TweeterCard = ({ ...tweeterInfo }) => (
    <Label image size='big'>
        <img src={tweeterInfo.profile_image_url} />
      {tweeterInfo.username}
    { tweeterInfo.verified && <Icon color='blue' name='check circle' style={{ marginLeft: '5px' }}/> }
    <Icon name='delete' />
    </Label>
  );

  return (
    <>
      <PageHeader headTitle={id} description='Category Description Here'/>
      <Button color='twitter'>
      <Icon name='twitter' /> Add Tweeter
      </Button>
      <Label.Group style={{ margin: '20px' }}>
        {tweeters.map((tweeterInfo) => <TweeterCard key={tweeterInfo.id} {...tweeterInfo} />)}
      </Label.Group>
      <Feed />
    </>
  );
}

export default Category;
