import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Icon, Label } from 'semantic-ui-react';
import Feed from '../components/Feed';
import PageHeader from '../components/PageHeader';

function Category() {
  const { id } = useParams();
  const [tweeters] = useState([
    {
      protected: false,
      verified: true,
      username: 'GordonRamsay',
      id: '110365072',
      name: 'Gordon Ramsay',
      profile_image_url: 'https://pbs.twimg.com/profile_images/1349755150316040194/VpUCtbH8_normal.jpg'
    },
    {
      protected: false,
      verified: false,
      username: 'rate_dogs',
      id: '963256776371113984',
      name: 'we rate dogs',
      profile_image_url: 'https://pbs.twimg.com/profile_images/963426365260300288/wBl1mNSm_normal.jpg'
    },
    {
      protected: false,
      verified: true,
      username: 'AJEnglish',
      id: '4970411',
      name: 'Al Jazeera English',
      profile_image_url: 'https://pbs.twimg.com/profile_images/1190503555901394944/T4qowO0X_normal.jpg'
    },
    {
      protected: false,
      verified: false,
      username: 'Sapporo_Tepp',
      id: '917279371',
      name: 'Sapporo Teppanyaki',
      profile_image_url: 'https://pbs.twimg.com/profile_images/1214514121795919873/n6RTA-ls_normal.jpg'
    },
  ]);
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
