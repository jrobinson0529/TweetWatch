import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Icon, Label } from 'semantic-ui-react';
import Feed from '../components/Feed';
import PageHeader from '../components/PageHeader';
import { getSingleCategory } from '../helpers/data/categoryData';
import { getCategoryTweeterInfo } from '../helpers/data/tweeterData';

function Category() {
  const { id } = useParams();
  const [category, setCategory] = useState({});
  const [tweeters, setTweeters] = useState([]);
  useEffect(() => {
    getSingleCategory(id).then(setCategory);
    getCategoryTweeterInfo(id).then(setTweeters);
  }, [id]);
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
      <PageHeader headTitle={category?.title} description={category?.description}/>
      <Button color='twitter'>
      <Icon name='twitter' /> Add Tweeter
      </Button>
      <Label.Group style={{ margin: '20px' }}>
        {tweeters.length > 0 ? tweeters.map((tweeterInfo) => <TweeterCard key={tweeterInfo.id} {...tweeterInfo} />) : <h3>Add Tweeters to start Tracking!</h3> }
      </Label.Group>
      <Feed />
    </>
  );
}

export default Category;
